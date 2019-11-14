/*
import { ProjectController } from '../controllers/project-controller';
 *
 *
 *       Complete the API routing below
 *
 *
 */

'use strict';

const router = require('express').Router();
const projectRouter = require('./project-router');
const issueRouter = require('./issue-router');

const doRoutes = () => {
  //Index page (static HTML)
  router.route('/').get(function(req, res) {
    const viewPath = `${req.rootPath}/public/index.html`;
    console.debug('root hit:', viewPath);
    res.sendFile(viewPath);
  });

  return router;
};

module.exports = app => {
  app.use(projectRouter());
  app.use(issueRouter());
  app.use(doRoutes());
};
