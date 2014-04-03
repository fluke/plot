'use strict';

describe('Service: Project', function () {

  // load the service's module
  beforeEach(module('clientApp'));

  // instantiate service
  var Project, $http, $httpBackend;
  beforeEach(inject(function (_Project_, _$http_, _$httpBackend_) {
    Project = _Project_;
    $http = _$http_;
    $httpBackend = _$httpBackend_;
    $httpBackend.whenGET('/api/v1/stages').respond([{'q': 1}, {'r': 2}]);
    $httpBackend.whenGET('/api/v1/stages/1').respond({'q': 1});
  }));

  it('should return all Users', function () {
    var result = Project.index();
    $httpBackend.flush();
    expect(result.length).toBe(2);
  });

  it('should return a specific User', function () {
    var result = Project.show({'id':1});
    $httpBackend.flush();
    expect(result.q).toBe(1);
  });

});
