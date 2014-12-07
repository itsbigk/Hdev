// adding a separate module here to add it to the list of dependencies in app.js
// a benefit to doing this would be that specific controllers and services can add their own list of dependencies without requiring all of them in app.ja
angular.module('todoService', [])

  // returning a promise from getting the todos
  .factory('Todos', function($http) {
    return {
      get : function() {
        return $http.get('/api/todos');
      },
      create : function(todoData) {
        return $http.post('/api/todos', todoData);
      },
      delete : function(id) {
        return $http.delete('/api/todos' + id);
      }
    }
  });
