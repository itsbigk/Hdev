angular.module('authService', [])

  .factory('AuthToken', function($window) {
    var authTokenFactory = {};

    // get token from local storage
    authTokenFactory.getToken = function() {
      return $window.localStorage.getItem('token');
    };

    authTokenFactory.setToken = function(token) {
      if (token)
        $window.localStorage.setItem('token', token);
      else
        $window.localStorage.removeItem('token');
    };

    return authTokenFactory;
  })

  .factory('Auth', function($http, $q, AuthToken) {
    var authFactory = {};

    // logging in a user
    authFactory.login = function(email, password) {

      // return promise object and all of the data
      return $http.post('/authenticate', {
        email    : email,
        password : password
      })
        .success(function(data) {
          AuthToken.setToken(data.token);
          return data;
        });
    };

    // logout by clearing the token
    authFactory.logout = function() {
      // clear the token
      AuthToken.setToken();
    };

    // checking to see if the user is logged in
    authFactory.isLoggedIn = function() {
      if (AuthToken.getToken())
        return true;
      else
        return false;
      };
    return authFactory;
  })

  .factory('AuthInterceptor', function($q, $location, AuthToken) {
    var interceptorFactory = {};

    // happening on all http requests
    interceptorFactory.request = function(config) {

      // grab the token
      var token = AuthToken.getToken();

      // if the token exists then add it to the header
      if (token)
        config.headers['x-access-token'] = token;

      return config;
    };

    interceptorFactory.responseError = function(response) {

      // if the server returns a 403 message then redirect to the root page
      if (response.status == 403)
        $location.path('/');

      // return the errors from the server as a promise
      return $q.reject(response);
    };

    return interceptorFactory;
  });
