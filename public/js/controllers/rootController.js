angular.module('rootController', [])

  .controller('rootController', function($rootScope, $location, Auth) {

    var vm = this;

    // get info if someone is logged in
    vm.loggedIn = Auth.isLoggedIn();

    // check to make sure the user is logged in on every request
    $rootScope.$on('$routeChangeStart', function() {
      vm.loggedIn = Auth.isLoggedIn();
    });

    // get user info on page load
    Auth.getUser()
      .success(function(data) {
        vm.user = data;
      });

    // function for the login form
    vm.doLogin = function() {

      // calling the login function
      Auth.login(vm.loginData.email, vm.loginData.password)
        .success(function(data) {
          vm.user = data.data;
        });
    };
  });
