'use strict';

angular.module('clientApp')
  .factory('messageFactory', function ($http) {
    // Service logic

    var baseUrl = '/api/v1/';

    // Public API here
    return {
      getMessage: function () {
        return $http.get(baseUrl + 'greet');
      }
    };
  });