const ObjectID = require('mongodb').ObjectID;

class ProjectController {
  constructor(db) {
    this.db = db;
  }

  list(projectName, done, filters = {}) {
    if (!projectName) {
      return done('no project specified');
    }

    if (filters.open) {
      if (filters.open === 'true') {
        filters.open = true;
      } else {
        filters.open = false;
      }
    }
    const query = Object.assign(
      {
        project: projectName
      },
      filters
    );
    console.debug('Query:', query);
    this.db
      .collection('issues')
      .find(query)
      .toArray()
      .then(result => {
        return done(null, result);
      })
      .catch(error => {
        console.error('Failed to retrieve issue list:', error);
        return done(`could not retrieve project '${projectName}' issues`);
      });
  }

  add(issue, done) {
    console.debug(`add(issue) =>`, issue);
    if (!issue.issue_title || !issue.issue_text || !issue.created_by) {
      return done('not enough data');
    }
    issue.created_on = new Date();
    issue.updated_on = new Date();
    issue.open = true;
    this.db
      .collection('issues')
      .insertOne(issue)
      .then(createdIssue => {
        console.debug('Issue added:', createdIssue.ops);
        return done(null, createdIssue.ops[0]);
      })
      .catch(reason => {
        console.error('Failed to create issue:', reason);
        done('Error creating issue');
      });
  }

  update(issue, done) {
    if (!issue._id) {
      return done('_id error');
    }

    let objectId;

    try {
      objectId = new ObjectID(issue._id);
    } catch (ex) {
      console.error('Failed to create ObjectID: ', ex);
      return done('_id error');
    }

    if (
      !issue.issue_title &&
      !issue.issue_text &&
      !issue.created_by &&
      !issue.assigned_to &&
      !issue.status_text &&
      issue.open === undefined
    ) {
      return done('no updated field sent');
    }

    const updateObj = {};

    for (let prop in issue) {
      if (prop === '_id') continue;
      if (prop === 'issue_title' && !issue[prop]) continue;
      if (prop === 'issue_text' && !issue[prop]) continue;
      if (prop === 'created_by' && !issue[prop]) continue;
      updateObj[prop] = issue[prop];
    }

    updateObj.updated_on = new Date();
    console.debug('Updating with:', updateObj);

    if (updateObj.hasOwnProperty('open')) {
      if (updateObj.open === 'true') {
        updateObj.open = true;
      } else {
        updateObj.open = false;
      }
    }

    this.db
      .collection('issues')
      .findOneAndUpdate(
        {
          _id: objectId
        },
        {
          $set: updateObj
        },
        {
          returnOriginal: false
        }
      )
      .then(result => {
        console.debug('Updated issue:', result.value);
        done(null, 'successfully updated');
      })
      .catch(error => {
        console.error('Issue update failed:', error);
        done(`could not update ${_id}`);
      });
  }

  remove(issueId, done) {
    if (!issueId) {
      return done('_id error');
    }

    let objectId;

    try {
      objectId = new ObjectID(issueId);
    } catch (ex) {
      console.error('Failed to create ObjectID: ', ex);
      return done('_id error');
    }

    this.db
      .collection('issues')
      .findOneAndDelete({
        _id: objectId
      })
      .then(() => {
        return done(null, `deleted ${issueId}`);
      })
      .catch(error => {
        console.error('Failed to remove issue:', error);
        done(`could not delete ${issueId}`);
      });
  }
}

module.exports = ProjectController;
