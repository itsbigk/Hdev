angular.module('ngRouting', ['ui.router', 'ngAnimate'])

  .config(function($stateProvider, $urlRouterProvider, $locationProvider) {

    $locationProvider.html5Mode(true);

    $urlRouterProvider.otherwise('/profile');

    $stateProvider

      .state('profile', {
        url         : '/profile',
        templateUrl : 'views/profileHome.ejs',
        controller  : 'rootController'
      })

      .state('new', {
        url         : '/new-case',
        templateUrl : '/views/new-case.html'
      })

      .state('signup', {
        url         : '/register',
        templateUrl : '/views/register.html'
      });

  });
