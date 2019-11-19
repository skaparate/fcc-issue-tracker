'use strict';

require('dotenv').config();
const express = require('express');
const bodyParser = require('body-parser');
const helmet = require('helmet');
const cors = require('cors');
console.log(`Database name: ${process.env.DB_NAME}`);
const mongoUri = `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASS}@cluster0-9m0ms.mongodb.net/${process.env.DB_NAME}?retryWrites=true&w=majority`;
const MongoClient = new require('mongodb').MongoClient(mongoUri, {
  useUnifiedTopology: true,
});

const apiRoutes = require('./routes/api.js');
const fccTestingRoutes = require('./routes/fcctesting.js');
const runner = require('./test-runner');

const app = express();

app.use(express.static(process.cwd() + '/public'));

app.use(cors({ origin: '*' })); //For FCC testing purposes only

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json({ type: 'application/vnd.api+json' }));

app.use(helmet());

//For FCC testing purposes
fccTestingRoutes(app);

//Routing for API
MongoClient.connect(err => {
  if (err) {
    console.error('Database connection failed:', err);
    throw new Error('An error ocurred connecting to the database');
  }
  console.info('Database connection established');
  const db = MongoClient.db(process.env.DB_NAME);

  app.all('*', (req, res, next) => {
    req.rootPath = process.cwd();
    next();
  });

  app.all('/api/*', (req, res, next) => {
    req.db = db;
    next();
  });

  apiRoutes(app, db);

  const port = process.env.PORT || 3100;

  //Start our server and tests!
  const server = app.listen(port, function() {
    console.log(`Listening on port ${port}`);
    db.collection('projects').createIndex(
      {
        name: 'text',
      },
      {
        background: true,
        unique: false,
        sparse: false,
        name: 'project_name_text',
      }
    );
    if (process.env.NODE_ENV === 'test') {
      console.log('Running Tests...');
      setTimeout(function() {
        try {
          runner.run();
          runner.on('done', () => {
            console.debug('Tests finished');
            //process.exit(0);
          });
        } catch (e) {
          const error = e;
          console.log('Tests are not valid:');
          console.log(error);
        }
      }, 3500);
    }
  });
});

module.exports = app; //for testing
