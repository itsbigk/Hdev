//change name later for everything /public/core.js     This  file will have all of the angular stuff inside but will more than likely be split into multiple files later
var toDo = angular.module('toDo', []);

toDo.controller('mainController', function($scope, $http) {
  $scope.formData = {};

  //Grabbing all of the items that have been saved to the db already. in this case they will be todo items
  $http.get('api/todos')
    .success(function(data) {
      $scope.todos = data;
      console.log(data);
    })
    .error(function() {
      console.log('Error: ' + data);
    })

  $scope.createTodo = function() {
    $http.post('/api/todos', $scope.formData)
    .success(function(data) {
      $scope.formData = {}; //clearing the form so the user can create another
      $scope.todos = data;
      console.log(data);
    })

    .error(function(data) {
      console.log('Error: ' + data);
    });
  };

  //Deleting a todo after checking it
  $scope.deleteTodo = function(id) {
    $http.delete('/api/todos' + id)
    .success(function(data) {
      $scope.todos = data;
      console.log(data);
    })
    .error(function(data) {
      console.log('Error: ' + data);
    });
  };
});