'use strict';

angular.module('clientApp')
  .factory('authFactory', function ($http) {

    var current_user,
        error;

    return {
      getUser: function () {
        return $http({
          method: 'GET',
          url: '/api/v1/users/current'
        })
        .success(function(data){
          console.log('success '+data.email);
          current_user = data;
        })
        .error(function(data){
          error = data.error;
        });
      },
      currentUser: function (value) {
        if (arguments.length === 1) {
          current_user = value;
        }
        else {
          return current_user;
        }
      }
    };
  });
