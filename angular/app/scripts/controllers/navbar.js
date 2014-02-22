'use strict';

angular.module('clientApp')
  .controller('NavbarCtrl', function ($scope, $location) {
      $scope.isActive = function (viewLocation) {
          var active = (viewLocation === $location.path());
          return active;
        };
    });
