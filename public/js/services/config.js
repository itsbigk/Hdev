angular.module('ngRouting', ['ui.router'])

  .config(function($stateProvider, $urlRouterProvider, $locationProvider) {

    $locationProvider.html5Mode({
      enabled     : true,
      requireBase : false
    });

    // $urlRouterProvider.otherwise('/');

    $stateProvider

      .state('/', {
        url         : '/',
        templateUrl : 'views/welcome.html'
      })

      .state('login', {
        url          : '/login',
        templateUrl  : 'views/login.html',
        controller   : 'rootController',
        controllerAs : 'login'
      })

      .state('register', {
        url          : '/signup',
        templateUrl  : 'views/register.html',
        controller   : 'usersController',
        controllerAs : 'user'
      })

      .state('profile', {
        url          : '/profile',
        templateUrl  : 'views/profileHome.html',
        controller   : 'caseController',
        controllerAs : 'cases'
      })

      .state('new', {
        url         : '/new-case',
        templateUrl : '/views/new-case.html'
      })

      .state('new-iphone', {
        url         : '/new-iphone-case',
        templateUrl : '/views/new-iphone-case.html',
        controller  : 'caseController'
      })

      .state('new-ipad', {
        url         : '/new-ipad-case',
        templateUrl : '/views/new-ipad-case.html',
        controller  : 'caseController'
      })

      .state('new-ipod', {
        url         : '/new-ipod-case',
        templateUrl : '/views/new-ipod-case.html',
        controller  : 'caseController'
      })

      .state('new-ipod-return', {
        url         : '/new-ipod-case-return',
        templateUrl : '/views/new-ipod-case-return.html',
        controller  : 'caseController'
      })

      .state('new-iphone-return', {
        url         : '/new-ipod-case',
        templateUrl : '/views/new-ipod-case-return.html',
        controller  : 'caseController'
      })

      .state('new-ipad-return', {
        url         : '/new-ipod-case',
        templateUrl : '/views/new-ipod-case-return.html',
        controller  : 'caseController'
      })

      .state('caseSelection', {
        url         : '/case-selection',
        templateUrl : '/views/caseSelection.html',
        controller  : 'caseController'
      })

      .state('caseSelectionReturn', {
        url         : '/case-selection-return',
        templateUrl : '/views/caseSelectionReturn.html',
        controller  : 'caseController'
      })

      .state('cases', {
        url         : '/cases',
        templateUrl : '/views/cases.html',
        controller  : 'caseController'
      });
  });
