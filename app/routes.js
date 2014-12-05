var Nerd = require('./models/nerd');

  module.exports = function(app) {

    // defining srver routes
    // ===================================

    // handling api calls
    app.get('/api/nerds', function(req, res) {
      // using mongoose to get all of the nerds in the database
      Nerd.find(function(err, nerds) {
        //this is saying that if there is an error then send the error and nothing will run after this

        if (err)
          res.send(err);
        res.json(nerds); // return all of them in json format
      });
    });

    // CRUD ROUTES
    //=============================

    // ADD LATER route for posting goes here


    // ADD LATER route for deleting goes here

    // front end routing
    //=============================

    // angular routing
    app.get('*', function(req, res) {
      res.sendfile('./public/views/index.html'); // loading the index file in the path specified as the response
    });
  };