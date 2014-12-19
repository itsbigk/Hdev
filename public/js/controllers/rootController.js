angular.module('rootController', [])

  .controller('rootController', function($scope, $state, Cases) {
    $scope.uiRouterState = $state;

    $scope.logout = function() {
      Case.logout();
    };
  });
