angular.module('homeless')

  .config(funciton($routeProvider, $locationProvider) {
    $locationProvider.html5Mode(true);
    $routeProvider

    // main page
    .when('/', {
      templateUrl : '/views/index.ejs',
      controller  : 'mainController'
    })
  })
