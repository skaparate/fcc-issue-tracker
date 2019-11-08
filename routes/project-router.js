const router = require('express').Router();
const ProjectController = require('../controllers/project-controller');

module.exports = () => {
  router
    .route('/api/projects/:id?')
    .all((req, res, next) => {
      req.controller = new ProjectController(req.db);
      next();
    })
    .get((req, res) => {
      const id = req.params.id;
      if (id) {
        console.debug('Get project by id:', id);
        req.controller.getById(id, (err, found) => {
          if (err) {
            return res.json(err);
          }
          return res.json(found);
        });
      } else {
        console.debug('Retrieving list of projects:', id);
        req.controller.list((err, doc) => {
          if (err) {
            return res.json(err);
          }
          return res.json(doc);
        }, req.query);
      }
    })
    .post((req, res) => {
      const project = req.body;
      console.debug('Creating project:', project);
      req.controller.add(project, (err, result) => {
        if (err) {
          return res.json(err);
        }
        return res.json(result);
      });
    })
    .put((req, res) => {
      const project = req.body;
      console.debug('Updating project:', project);
      req.controller.update(project, (err, result) => {
        if (err) {
          return res.json(err);
        }
        return res.json(result);
      });
    })
    .delete((req, res) => {
      const projectId = req.params.id;
      req.controller.delete(projectId, (err, result) => {
        if (err) {
          return res.json(err);
        }
        return res.json(result);
      });
    });

  return router;
};
