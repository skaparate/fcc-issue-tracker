const ObjectID = require('mongodb').ObjectID;
const slugify = require('underscore.string/slugify');

class ProjectController {
  constructor(db) {
    this.db = db;
  }

  list(done, filters = {}, pagination = {}) {
    const query = Object.assign({}, filters);
    const pageSettings = Object.assign(
      {
        page: 1,
        pageSize: 10,
      },
      pagination
    );
    console.debug('Query:', query);
    console.debug('Pagination:', pageSettings);

    const page = parseInt(pageSettings.page);
    const rpp = parseInt(pageSettings.pageSize);
    const sliceStart = page ? (page - 1) * rpp : 0;
    const sliceEnd = rpp;

    console.debug('Slice:', sliceStart, sliceEnd);
    this.db
      .collection('projects')
      .aggregate([
        {
          $match: query,
        },
        {
          $lookup: {
            from: 'issues',
            localField: '_id',
            foreignField: 'projectId',
            as: 'issues',
          },
        },
        {
          $addFields: {
            issueCount: {
              $size: {
                $filter: {
                  input: '$issues',
                  as: 'issue',
                  cond: {
                    $eq: ['$$issue.open', true],
                  },
                },
              },
            },
          },
        },
        {
          $project: {
            issues: false,
          },
        },
        {
          $group: {
            _id: null,
            total: {
              $sum: 1,
            },
            data: {
              $push: '$$ROOT',
            },
          },
        },
        {
          $project: {
            _id: false,
            total: true,
            data: {
              $slice: ['$data', sliceStart, sliceEnd],
            },
          },
        },
      ])
      .toArray()
      .then(result => {
        console.debug('Retrieved project list:', result);
        return done(null, result.length === 1 ? result[0] : []);
      })
      .catch(error => {
        console.error('Failed to retrieve project list:', error);
        return done(`Could not retrieve project list`);
      });
  }

  getBySlug(slug, done) {
    this.db
      .collection('projects')
      .findOne({
        slug,
      })
      .then(found => {
        console.debug('Project found:', found);
        return done(null, found);
      })
      .catch(ex => {
        console.error('Failed to fetch project ' + slug + ':', ex);
        done(`Failed to fetch project '${slug}'`);
      });
  }

  getById(id, done) {
    let oid = null;

    try {
      oid = new ObjectID(id);
    } catch (e) {
      console.error('Failed to create object id:', e);
      return done('Invalid project id');
    }

    this.db
      .collection('projects')
      .findOne({
        _id: oid,
      })
      .then(found => {
        return done(null, found);
      })
      .catch(ex => {
        console.error('Failed to fetch project:', ex);
        return done(`Could not read the project ${id}`);
      });
  }

  getByName(name, done) {
    if (!name) {
      return done(null, null);
    }
    const slug = slugify(name);
    return this.getBySlug(slug, done);
  }

  add(project, done) {
    if (!project.name || !project.owner) {
      return done('No project name or owner specified');
    }
    const slug = slugify(project.name.trim());
    this.getBySlug(slug, (err, found) => {
      if (err) {
        return done(err);
      }
      if (found !== null) {
        return done(null, found);
      }
      this.db
        .collection('projects')
        .insertOne({
          name: project.name,
          slug,
          owner: project.owner,
          created_on: new Date(),
          updated_on: new Date(),
        })
        .then(insert => {
          console.debug('Inserted project:', insert);
          return done(null, insert.ops.length === 1 ? insert.ops[0] : {});
        })
        .catch(ex => {
          console.error(`Failed to create project ${project.name}:`, ex);
          return done(`Could not create project ${project.name}`);
        });
    });
  }

  update(project, done) {
    let id = null;

    try {
      id = new ObjectID(project._id);
    } catch (e) {
      console.error('Failed to create object id:', e);
      return done('Invalid project id');
    }
    if (!project.name && !project.owner) {
      return done('Nothing to update');
    }
    const slug = slugify(project.name);
    this.db
      .collection('projects')
      .findOneAndUpdate(
        {
          _id: id,
        },
        {
          $set: {
            slug,
            name: project.name,
            owner: project.owner,
            updated_on: new Date(),
          },
        },
        {
          returnOriginal: false,
        }
      )
      .then(op => {
        return done('Project updated');
      })
      .catch(ex => {
        console.error('Project update failed:', ex);
        return done(`Failed to update project ${project._id}`);
      });
  }

  remove(projectId, done) {
    let id = null;

    try {
      id = new ObjectID(projectId);
    } catch (e) {
      console.error('Failed to create object id:', e);
      return done('Invalid project id');
    }

    // First, remove the child issues:
    this.db
      .collection('issues')
      .deleteMany({
        projectId: id,
      })
      .then(() => {
        // Now remove the project:
        this.db
          .collection('projects')
          .findOneAndDelete({
            _id: id,
          })
          .then(() => {
            return done('Project removed');
          })
          .catch(err => {
            console.error(`Failed to remove project '${projectId}':`, err);
            return done(
              `Could not remove project '${projectId}', but the issues were removed`
            );
          });
      })
      .catch(err => {
        console.error(
          `Failed to remove the project '${projectId}' issues:`,
          err
        );
        return done(`Could not remove project '${projectId}' issues`);
      });
  }
}

module.exports = ProjectController;
