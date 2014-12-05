angular.module('myApp')

  .service('nerdApi', function($http) {
    return {
      // api call to get all nerds in the database
      get : function() {
        return $http.get('/api/nerds');
      },
      // the stuff below would work once the routes to use them is set up
      // calling for post to create new nerd
      create : function(nerdData) {
        return $http.post('/api/nerds', nerdData);
      },
      // call to delete
      delete : function(id) {
        return $http.delete('/api/nerds' + id);
      }
    }
  });