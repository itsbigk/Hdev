### Installation

You need Webpack, MongoDB, and Redis installed globally:

```sh
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

Run in production:
```sh
$ npm start
```

### Tech Stack

* [React](http://facebook.github.io/react/)
* [Flux](https://facebook.github.io/flux/)
* [Materialize](http://materializecss.com/)
* [Less](http://lesscss.org/)
* [Node](https://nodejs.org/en/)
* [Express](http://expressjs.com/)
* [Webpack](https://webpack.github.io/)

### Todos

 - Write Tests
 - Switch to redux
 - Work with Docker
