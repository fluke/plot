'use strict';

describe('Service: Stage', function () {

  // load the service's module
  beforeEach(module('clientApp'));

  // instantiate service
  var Stage, $http, $httpBackend;
  beforeEach(inject(function (_Stage_, _$http_, _$httpBackend_) {
    Stage = _Stage_;
    $http = _$http_;
    $httpBackend = _$httpBackend_;
    $httpBackend.whenGET('/api/v1/stages').respond([{'q': 1}, {'r': 2}]);
    $httpBackend.whenGET('/api/v1/stages/1').respond({'q': 1});
  }));

  it('should return all Users', function () {
    var result = Stage.index();
    $httpBackend.flush();
    expect(result.length).toBe(2);
  });

  it('should return a specific User', function () {
    var result = Stage.show({'id':1});
    $httpBackend.flush();
    expect(result.q).toBe(1);
  });

});
