angular.module('ngRouting', ['ui.router', 'ngAnimate'])

  .config(function($stateProvider, $urlRouterProvider) {

    $urlRouterProvider.otherwise('/');

    $stateProvider

      .state('home', {
        url         : '/',
        templateUrl : 'views/home.html',
        controller  : 'rootController'
      })

      .state('login', {
        url         : '/login',
        templateUrl : '/views/login.html'
      })

      .state('signup', {
        url         : '/register',
        templateUrl : '/views/register.html'
      });

  });
