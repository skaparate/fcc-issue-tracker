'use strict';

require('dotenv').config();
const express = require('express');
const bodyParser = require('body-parser');
const helmet = require('helmet');
const cors = require('cors');
const MongoClient = new require('mongodb').MongoClient(process.env.DB, {
  useUnifiedTopology: true
});

const apiRoutes = require('./routes/api.js');
const fccTestingRoutes = require('./routes/fcctesting.js');
const runner = require('./test-runner');

const app = express();

app.use('/public', express.static(process.cwd() + '/public'));

app.use(cors({ origin: '*' })); //For FCC testing purposes only

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

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
    req.db = db;
    next();
  });

  apiRoutes(app);

  //404 Not Found Middleware
  app.use((req, res, next) => {
    res
      .status(404)
      .type('text')
      .send('Not Found');
  });

  const port = process.env.PORT || 3100;

  //Start our server and tests!
  app.listen(port, function() {
    console.log(`Listening on port ${port}`);
    db.collection('projects').createIndex(
      {
        name: 'text'
      },
      {
        background: true,
        unique: false,
        sparse: false,
        name: 'project_name_text'
      }
    );
    if (process.env.NODE_ENV === 'test') {
      console.log('Running Tests...');
      setTimeout(function() {
        try {
          runner.run();
        } catch (e) {
          const error = e;
          console.log('Tests are not valid:');
          console.log(error);
        }
      }, 3500);
    }
    //db.close();
  });
});

module.exports = app; //for testing
