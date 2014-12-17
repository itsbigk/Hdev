angular.module('rootController', [])

  .controller('rootController', function($scope, $state) {
    $scope.uiRouterState = $state;
  });
