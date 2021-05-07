# Mongodb node.js Plug and Play REST API

## Overview

Plug ang play node.js REST API for mongo. 
Uses the same syntax as [RestHeart](https://restheart.org/docs/) but is implemented usigng node.js.
Core node.js express boilerplate taken from [express-mongoose-es6-rest-api](https://github.com/kunalkapadia/express-mongoose-es6-rest-api). Make shure to check out!

Some Restheart features aren't implemented yet (json schema validation, aggregations, file storage)
Fell free to colaborate

### Usefull information

Api documented with swagger at <host>/docs, (default host is localhost:4040)

Resources routes from Restheart are implemented at folder /server/api (in case you need to change)

Custom routes can be added at /server/plugins, there is an example folder demonstrating how to add new ones,
just be aware that custom routes replaces the defalt ones if they have the same name.

Use docker to help deployment

Let me know any usefull feedbacks: alon.mota.l@gmail.com

### Libs
ES6 support using [Babel](https://babeljs.io/).

JavaScript code linting is done using [ESLint](http://eslint.org) - a pluggable linter tool for identifying and reporting on patterns in JavaScript. Uses ESLint with [eslint-config-airbnb](https://github.com/airbnb/javascript/tree/master/packages/eslint-config-airbnb), which tries to follow the Airbnb JavaScript style guide.

Supports code coverage of ES6 code using [istanbul](https://www.npmjs.com/package/istanbul) and [mocha](https://mochajs.org/). Code coverage reports are saved in `coverage/` directory post `yarn test` execution. Open `coverage/lcov-report/index.html` to view coverage report. `yarn test` also displays code coverage summary on console. Code coverage can also be enforced overall and per file as well, configured via .istanbul.yml

Promisified Code via [bluebird](https://github.com/petkaantonov/bluebird), all our code is promisified, even the tests via [supertest-as-promised](https://www.npmjs.com/package/supertest-as-promised).

API parameter validation via [express-validation](https://www.npmjs.com/package/express-validation), validate body, params, query, headers and cookies of a request (via middleware) and return a response with errors;

Runs lint and tests before any commit is made locally, making sure that only tested and quality code is committed

Secure app via [helmet](https://github.com/helmetjs/helmet)

- CORS support via [cors](https://github.com/expressjs/cors)

- Uses [http-status](https://www.npmjs.com/package/http-status) to set http status code. It is recommended to use `httpStatus.INTERNAL_SERVER_ERROR` instead of directly using `500` when setting status code.

- Has `.editorconfig` which helps developers define and maintain consistent coding styles between different editors and IDEs.

## Getting Started

Clone the repo

Install yarn:
```js
npm install -g yarn
```

Install dependencies:
```sh
yarn
```

Set environment (vars):
```sh
cp .env.example .env
```

Start server:
```sh
# Start server
yarn start
```

### Or use docker-compose
Clone the repo

Install docker and docker compose

run using docker:
```sh
docker-compose up
```

Tests:
```sh
# Run tests written in ES6 
yarn test

# Run test along with code coverage
yarn test:coverage

# Run tests on file change
yarn test:watch

# Run tests enforcing code coverage (configured via .istanbul.yml)
yarn test:check-coverage
```

Lint:
```sh
# Lint code with ESLint
yarn lint

# Run lint on any file change
yarn lint:watch
```

Other gulp tasks:
```sh
# Wipe out dist and coverage directory
gulp clean

# Default task: Wipes out dist and coverage directory. Compiles using babel.
gulp
```

##### Deployment

```sh
# compile to ES5
1. yarn build

# upload dist/ to your server
2. scp -rp dist/ user@dest:/path

# install production dependencies only
3. yarn --production

# Use any process manager to start your services
4. pm2 start dist/index.js
```

In production you need to make sure your server is always up so you should ideally use any of the process manager recommended [here](http://expressjs.com/en/advanced/pm.html).
We recommend [pm2](http://pm2.keymetrics.io/) as it has several useful features like it can be configured to auto-start your services if system is rebooted.

## Logging

Universal logging library [winston](https://www.npmjs.com/package/winston) is used for logging. It has support for multiple transports.  A transport is essentially a storage device for your logs. Each instance of a winston logger can have multiple transports configured at different levels. For example, one may want error logs to be stored in a persistent remote location (like a database), but all logs output to the console or a local file. We just log to the console for simplicity, you can configure more transports as per your requirement.

#### API logging
Logs detailed info about each api request to console during development.
![Detailed API logging](https://cloud.githubusercontent.com/assets/4172932/12563354/f0a4b558-c3cf-11e5-9d8c-66f7ca323eac.JPG)

#### Error logging
Logs stacktrace of error to console along with other details. You should ideally store all error messages persistently.
![Error logging](https://cloud.githubusercontent.com/assets/4172932/12563361/fb9ef108-c3cf-11e5-9a58-3c5c4936ae3e.JPG)

## Code Coverage
Get code coverage summary on executing `yarn test`
![Code Coverage Text Summary](https://cloud.githubusercontent.com/assets/4172932/12827832/a0531e70-cba7-11e5-9b7c-9e7f833d8f9f.JPG)

`yarn test` also generates HTML code coverage report in `coverage/` directory. Open `lcov-report/index.html` to view it.
![Code coverage HTML report](https://cloud.githubusercontent.com/assets/4172932/12625331/571a48fe-c559-11e5-8aa0-f9aacfb8c1cb.jpg)

## Docker

#### Using Docker Compose for Development
```sh
# service restarts on file change
bash bin/development.sh
```

#### Building and running without Docker Compose
```bash
# To use this option you need to make sure mongodb is listening on port 27017

# Build docker 
docker build -t express-mongoose-es6-rest-api .

# Run docker
docker run -p 4040:4040 express-mongoose-es6-rest-api
```


## A Boilerplate-only Option

If you would prefer not to use any of our tooling, delete the following files from the project: `package.json`, `gulpfile.babel.js`, `.eslintrc` and `.travis.yml`. You can now safely use the boilerplate with an alternative build-system or no build-system at all if you choose.

## Docs and Recipes

* [Gulp recipes](https://github.com/gulpjs/gulp/tree/master/docs/recipes) - the official Gulp recipes directory includes a comprehensive list of guides for different workflows you can add to your project.

## Contributing

Contributions, questions and comments are all welcome and encouraged. For code contributions submit a pull request with unit test.

## License
This project is licensed under the [MIT License](https://github.com/alonmota/node-mongodb-core-rest-api/blob/master/LICENSE)

## Support Development
If you like this project or want a better one, offer me a job and I will deliver.

## Meta

Alon Mota
email: alon.mota.l@gmail.com 

