angular.module('homeless')

.config(function($stateProvider, $urlRouterProvider, $locationProvider) {

  $urlRouterProvider.otherwise('/');

  $locationProvider.html5Mode({
    enabled : true,
    requireBase : false
  });

  // for ng-show on the index page


  $stateProvider

  // main page
  .state('/', {
    templateUrl  : '../views/index.ejs',
    controller   : 'mainController'
  })

  .state('login', {
    templateUrl : '../views/partials/login.ejs',
    controller  : 'mainController'
  });
});
