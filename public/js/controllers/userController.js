angular.module('userController', [])

  .controller('usersController', function(User, Auth) {

    var vm = this;

    vm = 'create';

    // function for creating a user
    vm.saveUser = function() {
      vm.processing = true;

      vm.message = '';

      User.create(vm.userData)
        .success(function(data) {
          vm.processing = false;

          vm.message = data.messge;

          Auth.login(vm.userData.email, vm.userData.password)
            .success(function(data) {
              vm.user = data.data;
          });
        });
    };

    vm.doLogout = function() {
      Auth.logout();
      $location.path('/');
    };

    vm.checkLogin = function() {
      Auth.isLoggedIn();
    };
  });
