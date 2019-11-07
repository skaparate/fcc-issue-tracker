const ProjectController = require('../controllers/project-controller');
const IssueController = require('../controllers/issue-controller');
const router = require('express').Router();
const slugify = require('underscore.string/slugify');

module.exports = () => {
  router.param('project', (req, res, next, projectName) => {
    const controller = new ProjectController(req.db);
    console.debug('Setting up project for route endpoints');
    const slug = slugify(projectName);

    controller.getBySlug(slug, (err, project) => {
      if (err) {
        return res.json(err);
      }
      if (project === null) {
        return res.json(`Project '${projectName}' doesn't exist`);
      } else {
        console.debug('Current project:', project);
        req.project = project;
        next();
      }
    });
  });

  router
    .route('/api/issues/:project')
    .all((req, res, next) => {
      req.controller = new IssueController(req.db);
      next();
    })
    .get(function(req, res) {
      console.debug('Retrieving issue list', req.project);
      req.controller.list(
        req.project._id,
        (err, list) => {
          console.debug('Error:', err);
          console.debug('List:', list);
          if (err) {
            return res.json(err);
          }
          return res.json(list);
        },
        req.query
      );
    })

    .post(function(req, res) {
      const issue = req.body;
      issue.projectId = req.project._id;
      req.controller.add(issue, (err, doc) => {
        if (err) {
          return res.json(err);
        }
        return res.json(doc);
      });
    })

    .put(function(req, res) {
      const issue = req.body;
      issue.projectId = req.project._id;
      req.controller.update(issue, (err, doc) => {
        if (err) {
          return res.json(err);
        }
        return res.json(doc);
      });
    })

    .delete(function(req, res) {
      const id = req.body._id;
      req.controller.remove(id, (err, doc) => {
        if (err) {
          return res.json(err);
        }
        return res.json(doc);
      });
    });

  return router;
};
