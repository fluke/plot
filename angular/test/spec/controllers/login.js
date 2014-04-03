'use strict';

describe('Controller: LoginCtrl', function () {

  // load the controller's module
  beforeEach(module('clientApp'));

  var LoginCtrl,
    scope;

  // Initialize the controller and a mock scope
  beforeEach(inject(function ($controller, $rootScope) {
    scope = $rootScope.$new();
    LoginCtrl = $controller('LoginCtrl', {
      $scope: scope
    });
  }));

  it('should attach a user object to submit to devise', function () {
    expect(scope.loginUser.email).toBe(null);
    expect(scope.loginUser.password).toBe(null);
  });

  it('should reset users', function () {
    scope.loginUser.email = "kartikluke@gmail.com";
    scope.loginUser.password = "kartikluke";
    scope.resetUsers();
    expect(scope.loginUser.email).toBe(null);
    expect(scope.loginUser.password).toBe(null);
  });

});
