angular.module('appRouting', ['ui.router'])

  .config(function($stateProvider, $urlRouterProvider, $locationProvider, $scope, $state) {
    $urlRouterProvider.otherwise('/');

    $locationProvider.html5Mode(true);

    // for ng-show on the index page
    $scope.uiRouterState = $state;

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
