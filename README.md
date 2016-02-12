### Installation

You will need Nodemon, Webpack, MongoDB, and Redis installed globally:

```sh
$ npm i -g nodemon
$ npm i -g webpack
$ brew install mongodb
$ brew install redis
```

If MongoDB and Redis are not running then run the following:
```sh
$ mongod
$ redis-server
```
To run the dev environment with hot module reloading:
```sh
$ npm run dev
```

To build for production:
```sh
$ npm run build
```

To run for production:
```sh
$ npm start
```

### Tech Stack

* [React](http://facebook.github.io/react/)
* [Flux](https://facebook.github.io/flux/)
* [Node](https://nodejs.org/en/)
* [Express](http://expressjs.com/)
* [Webpack](https://webpack.github.io/)
* [Babel](http://babeljs.io/)
* [Karma](https://karma-runner.github.io/0.13/index.html)
* [Mocha](https://mochajs.org/)
* [Expect.js](https://github.com/Automattic/expect.js)
* [Foundation](http://foundation.zurb.com/)
* [Sass](http://sass-lang.com/)

### Todos

 - Write tests for all components
 - Switch to redux
 - Work with Docker
