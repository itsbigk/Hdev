angular.module('myApp')

  .config(['$routeProvider', '$locationProvider', function($routeProvider, $locationProvider) {

    $routeProvider
      .when('/', {
        templateUrl: '/views/home.html',
        controller: 'mainCtrl'
      })

      .when('/nerds', {
        templateUrl: 'views/nerd.html',
        controller: 'nerdctrl'
      });
      $locationProvider.html5Mode(true);
  }]);