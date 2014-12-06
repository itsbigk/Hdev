angular.module('myApp', [])
  // controller will eventualy move to its own folder. all depends
  .controller('mainController', function($scope, $http) {
    $scope.formData = {};
    // once the page loads it automatically will get all of the todos from the api path
    $http.get('/api/todos')
      .success(function(data) {
        $scope.todos = data;
        console.log(data);
      })
      .error(function(data) {
        console.log('Error: ' + data);
      });

    $scope.createTodo = function() {
      $http.post('/api/todos', $scope.formData)
        .success(function(data) {
          $scope.formData = {}; //clears the form at the end so a new entry can be added automatically
          $scope.todos = data;
          console.log(data);
        })
        .error(function(data) {
          console.log('Error: ' + data);
        });
    };

    // automatically delete a todo after checking it. this may remove the need to update the todo
    $scope.deleteTodo = function(id) {
      $http.delete('/api/todos/' + id)
        .success(function(data) {
          $scope.todos = data;
          console.log(data);
        })
        .error(function(data) {
          console.log('Error: ' + data);
        });
    };
  })