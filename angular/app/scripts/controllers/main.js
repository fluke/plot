'use strict';

angular.module('clientApp')
  .controller('MainCtrl', function ($scope, messageFactory, Stage, Hotspot) {

    $scope.awesomeThings = [
      'HTML5 Boilerplate',
      'AngularJS',
      'Karma'
    ];

    messageFactory.getMessage().then(function(factory) {
      $scope.message = factory.data.message;
    });

    $scope.stage = Stage.show({'id':2});
    $scope.hotspot = Hotspot.show({'id':1});
    
    $scope.createStage = function() {
      Stage.create({'title':'Stage 1','description':'I am an AngularJS god.','imgurl':'hey.jpg','user_id':1});
    };

  });
