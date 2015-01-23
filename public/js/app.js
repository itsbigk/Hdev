// adding all of the other controllers and services to your dependency list
// the name that will be injected is the name that was defined with 'angular.module'
angular.module('homeless', ['rootController', 'caseController', 'caseService', 'ngRouting', 'userService', 'authService']);
