'use strict';

angular.module('clientApp')
  .controller('MainCtrl', function ($scope, authFactory, messageFactory, Stage) {

    messageFactory.getMessage().then(function(factory) {
      $scope.message = factory.data.message;
    });

    console.log('If not '+(!authFactory.currentUser()));

    if(!authFactory.currentUser()) {
      authFactory.getUser().then(
      function() {
        $scope.currentUser = authFactory.currentUser();
      },
      null);
    }
    
    $scope.stages = Stage.index({},
      function success() {},
      function err(error) {
        if(error.status === 401) { console.log('not auth.'); }
      }
    );

    // $scope.projects = Project.index({},
    //   function success() {},
    //   function err(error) {
    //     if(error.status === 401) { console.log('not auth.'); }
    //   }
    // );

    console.log($scope.stages);

    $scope.hotspot = Stage.show({'id':73},
      function success() {},
      function err(error) {
        if(error.status === 401) { console.log('not auth.'); }
      }
    );
    
    $scope.createStage = function() {
      Project.create({'title':'Project 1'});
    };

  });
