angular.module('homeless')

.config(function($locationProvider, $urlRouterProvider, $scope, $state) {
  $urlRouterProvider.otherwise('/');

  $locationProvider.html5Mode(true);

  // for ng-show on the index page


  $stateProvider

  // main page
  .when('/', {
    templateUrl  : '../views/index.ejs',
    controller   : 'mainController'
  })

  .when('login', {
    url         : '/login',
    template    : 'js/templates/login.html',
    controller  : 'mainController'
  });
});
