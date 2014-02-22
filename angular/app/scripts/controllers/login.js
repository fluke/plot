'use strict';

angular.module('clientApp')
  .controller('LoginCtrl', function ($scope, $http) {
    $scope.loginUser = {email: null, password: null};
    $scope.loginError = {message: null, errors: {}};
    $scope.registerUser = {email: null, password: null, password_confirmation: null};
    $scope.registerError = {message: null, errors: {}};

    $scope.login = function() {
      $scope.submit({method: 'POST',
        url: '/api/v1/users/sign_in.json', // Proxy is on /api/v1 so make sure to scope devise as well
        data: {user: {email: $scope.loginUser.email, password: $scope.loginUser.password}},
        successMessage: 'You have been logged in.',
        errorEntity: $scope.loginError
      });
    };

    $scope.logout = function() {
      $scope.submit({method: 'DELETE',
        url: '/api/v1/users/sign_out.json',
        successMessage: 'You have been logged out.',
        errorEntity: $scope.loginError
      });
    };

    $scope.passwordReset = function () {
      $scope.submit({method: 'POST',
        url: '/api/v1/users/password.json',
        data: {user: {email: $scope.loginUser.email}},
        successMessage: 'Reset instructions have been sent to your e-mail address.',
        errorEntity: $scope.loginError
      });
    };

    $scope.unlock = function () {
      $scope.submit({method: 'POST',
        url: '/api/v1/users/unlock.json',
        data: {user: {email: $scope.loginUser.email}},
        successMessage: 'An unlock e-mail has been sent to your e-mail address.',
        errorEntity: $scope.loginError
      });
    };

    $scope.confirm = function () {
      $scope.submit({method: 'POST',
        url: '/api/v1/users/confirmation.json',
        data: {user: {email: $scope.loginUser.email}},
        successMessage: 'A new confirmation link has been sent to your e-mail address.',
        errorEntity: $scope.loginError
      });
    };

    $scope.register = function() {
      $scope.submit({method: 'POST',
        url: '/api/v1/users.json',
        data: {user: {email: $scope.registerUser.email,
                       password: $scope.registerUser.password,
                       password_confirmation: $scope.registerUser.password_confirmation}},
        successMessage: 'You have been registered and logged in.  A confirmation e-mail has been sent to your e-mail address, your access will terminate in 2 days if you do not use the link in that e-mail.',
        errorEntity: $scope.registerError
      });
    };

    $scope.changePassword = function() {
      $scope.submit({method: 'PUT',
        url: '/api/v1/users/password.json',
        data: {user: {email: $scope.registerUser.email,
                       password: $scope.registerUser.password,
                       password_confirmation: $scope.registerUser.password_confirmation}},
        successMessage: 'Your password has been updated.',
        errorEntity: $scope.registerError
      });
    };

    $scope.submit = function(parameters) {
      $scope.resetMessages();

      $http({method: parameters.method,
             url: parameters.url,
             data: parameters.data})
        .success(function(data, status){
          if (status === 201 || status === 204){
            parameters.errorEntity.message = parameters.successMessage;
            $scope.resetUsers();
          } else {
            if (data.error) {
              parameters.errorEntity.message = data.error;
            } else {
              // note that JSON.stringify is not supported in some older browsers, we're ignoring that
              parameters.errorEntity.message = 'Success, but with an unexpected success code, potentially a server error, please report via support channels as this indicates a code defect.  Server response was: ' + JSON.stringify(data);
            }
          }
        })
        .error(function(data, status){
          if (status === 422) {
            parameters.errorEntity.errors = data.errors;
          } else {
            if (data.error) {
              parameters.errorEntity.message = data.error;
            } else {
              // note that JSON.stringify is not supported in some older browsers, we're ignoring that
              parameters.errorEntity.message = 'Unexplained error, potentially a server error, please report via support channels as this indicates a code defect.  Server response was: ' + JSON.stringify(data);
            }
          }
        });
    };

    $scope.resetMessages = function() {
      $scope.loginError.message = null;
      $scope.loginError.errors = {};
      $scope.registerError.message = null;
      $scope.registerError.errors = {};
    };

    $scope.resetUsers = function() {
      $scope.loginUser.email = null;
      $scope.loginUser.password = null;
      $scope.registerUser.email = null;
      $scope.registerUser.password = null;
      $scope.registerUser.password_confirmation = null;
    };
  });
