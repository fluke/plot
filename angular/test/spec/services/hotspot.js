'use strict';

describe('Service: hotspot', function () {

  // load the service's module
  beforeEach(module('clientApp'));

  // instantiate service
  var hotspot;
  beforeEach(inject(function (_hotspot_) {
    hotspot = _hotspot_;
  }));

  it('should do something', function () {
    expect(!!hotspot).toBe(true);
  });

});
