angular.module('todoController', [])

  // injecting the todo service in the controller's function to simplify a lot of the api actions
  // in this specific case, a factory instead of a service was used but that may be changed later
  .controller('mainController', function($scope, $http, Todos) {
    $scope.formData = {};

    // Getting all of the todos when landing on the page
    // using the service that has been injected to get all of the todos
    Todos.get()
      .success(function(data) {
        $scope.todos = data;
      });

      // sending the text to the node api that has been made when submitting a form
      $scope.createTodo = function() {
        // checking to see if the form has content inside of it
        if (!$.isEmptyObject($scope.formData)) {

          // calling the create funciton from the service if the object is not empty
          // then returns promise object just like it says in the function in the service
          Todos.create($scope.formData)

            // if the creation was successful then it will call the get function to get an updated list of the todos
            .success(function(data) {
              $scope.formData = {}; //clearing the form for the user to add another when they are ready

              // assign a new list of todos
              $scope.todos = data;
            });
        }
      };

      // deleting a todo after checking it
      // passing in the id to the function to look up a specific todo item
      $scope.deleteTodo = function(id) {
        // calling the service function and passing in the id that was passed into the deleteTodo function
        Todos.delete(id)

        // if the todo was successfully deleted then get the updted list of todos
        .success(function(data) {
          $scope.todos = data;
        });
      };
    });


    // ALL BELOW THIS LINE IS THE OLD CODE BEFORE INJECTING THE SERVICES
    // =================================================================
    // once the page loads it automatically will get all of the todos from the api path
    // $http.get('/api/todos')
    // .success(function(data) {
    //   $scope.todos = data;
    //   console.log(data);
    // })
    // .error(function(data) {
    //   console.log('Error: ' + data);
    // });

    // sending the text to the node api that has been made when submitting a form
    // $scope.createTodo = function() {
    //   $http.post('/api/todos', $scope.formData)
    //   .success(function(data) {
    //     $scope.formData = {}; //clears the form at the end so a new entry can be added automatically
    //     $scope.todos = data;
    //     console.log(data);
    //   })
    //   .error(function(data) {
    //     console.log('Error: ' + data);
    //   });
    // };

    // automatically delete a todo after checking it. this may remove the need to update the todo
    // $scope.deleteTodo = function(id) {
    //   $http.delete('/api/todos/' + id)
    //   .success(function(data) {
    //     $scope.todos = data;
    //     console.log(data);
    //   })
    //   .error(function(data) {
    //     console.log('Error: ' + data);
    //   });
    // };
