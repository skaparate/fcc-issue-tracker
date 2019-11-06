/*
import { ProjectController } from '../controllers/project-controller';
 *
 *
 *       Complete the API routing below
 *
 *
 */

'use strict';

const ProjectController = require('../controllers/project-controller');
const path = require('path');
const router = require('express').Router();

const doRoutes = () => {
  console.debug('Routing');

  router
    .route('/api/issues/:project')
    .all((req, res, next) => {
      req.controller = new ProjectController(req.db);
      next();
    })
    .get(function(req, res) {
      const project = req.params.project;
      req.controller.list(project, (err, list) => {
        if (err) {
          return res.json(err);
        }
        return res.json(list);
      }, req.query);
    })

    .post(function(req, res) {
      const issue = req.body;
      issue.project = req.params.project;
      req.controller.add(issue, (err, doc) => {
        if (err) {
          return res.json(err);
        }
        return res.json(doc);
      });
    })

    .put(function(req, res) {
      const issue = req.body;
      issue.project = req.params.project;
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

  //Index page (static HTML)
  router.route('/').get(function(req, res) {
    const viewPath = `${req.rootPath}/views/index.html`;
    console.debug('root hit:', viewPath);
    res.sendFile(viewPath);
  });

  //Sample front-end
  router.route('/projects/:project/').get(function(req, res) {
    const viewPath = `${req.rootPath}/views/issue.html`;
    console.debug('projects route:', viewPath);
    res.sendFile(viewPath);
  });

  router.route('/test').get((req, res) => {
    res.json('Works');
  });

  return router;
};

module.exports = () => {
  return doRoutes();
};
