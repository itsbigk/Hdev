angular.module('userService', [])

  .factory('User', function($http) {

    // creating a new user object
    var userFactory = {};

    // get a single user
    userFactory.get = function(id) {
      return $http.get('/api/users' + id);
    };

    // get all of the users
    userFactory.all = function() {
      return $http.get('/api/users');
    };

    // create user
    userFactory.create = function(id, userData) {
      return $http.post('/api/users', userData);
    };

    // updating a user
    userFactory.update = function(id, userData) {
      return $http.put('/api/users' + id, userData);
    };

    // delete a user
    userFactory.delete = function(id) {
      return $http.delete('/api/users' + id);
    };

    return userFactory;
  });
