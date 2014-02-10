'use strict';

angular.module('clientApp')
  .controller('MainCtrl', function ($scope, messageFactory) {
    $scope.awesomeThings = [
      'HTML5 Boilerplate',
      'AngularJS',
      'Karma'
    ];

    messageFactory.getMessage().then(function(factory) {
      $scope.message = factory.data.message;
    });

  });
