# FCC - Information Security and Quality Assurance - Issue Tracker

This is the back end project for the [Tracky project](https://tracky-angular.nicomv.com/).

## How to Use

1. First, create a [remote mongodb database](https://atlas.mongodb.com/) or [local mongodb database using lando](https://docs.lando.dev/config/mongo.html#configuration) and write down Your _user_, _password_ and _database name_.
2. Create a file named `.env` in the root of the project.
3. Add a `DB_USER`, `DB_PASS` and `DB_NAME` with the corresponding values to the `.env` file with the mongodb URL. If You're a custom URL (or a local mongodb instance), then You need to modify the URL on the `server.js` too.
4. Open a terminal and go to the root of the project.
5. Run `npm install`.

You'll need a front end too. You can create one Yourself, use something like Firefox RESTer or Postman or [download the source code of My project](https://github.com/skaparate/tracky-angular) and follow the instructions there.

To run the project execute the following:

- `npm run watch` To watch for changes in the files and auto reload the server.
- `npm test` To run the tests

## FCC Project Requirements

### User Stories

1. Prevent cross site scripting(XSS attack).
2. I can `POST` /api/issues/{projectname} with form data containing required issue_title, issue_text, created_by, and optional assigned_to and status_text.
3. The object saved (and returned) will include all of those fields (blank for optional no input) and also include created_on (date/time), updated_on (date/time), open (boolean, true for open, false for closed), and \_id.
4. I can`PUT` /api/issues/{projectname} with a \_id and any fields in the object with a value to object said object. Returned will be 'successfully updated' or 'could not update '+\_id. This should always update updated_on. If no fields are sent return 'no updated field sent'.
5. I can `DELETE` /api/issues/{projectname} with a \_id to completely delete an issue. If no \_id is sent return '\_id error', success: 'deleted '+\_id, failed: 'could not delete '+\_id.
6. I can`GET` /api/issues/{projectname} for an array of all issues on that specific project with all the information for each issue as was returned when posted.
7. I can filter my get request by also passing along any field and value in the query(ie. /api/issues/{project}?open=false). I can pass along as many fields/values as I want.
8. All 11 functional tests are complete and passing.

### Example Usage

- `/api/issues/{project}`
- `/api/issues/{project}?open=true&assigned_to=Joe`

### Example return

This is the return for the `POST /api/issues/{project}` only:

`[{"_id":"5871dda29faedc3491ff93bb","issue_title":"Fix error in posting data","issue_text":"When we post data it has an error.","created_on":"2017-01-08T06:35:14.240Z","updated_on":"2017-01-08T06:35:14.240Z","created_by":"Joe","assigned_to":"Joe","open":true,"status_text":"In QA"},...]`
