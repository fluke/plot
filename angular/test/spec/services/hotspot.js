'use strict';

describe('Service: Hotspot', function () {

  // load the service's module
  beforeEach(module('clientApp'));

  // instantiate service
  var Hotspot;
  beforeEach(inject(function (_Hotspot_) {
    Hotspot = _Hotspot_;
  }));

  it('should do something', function () {
    expect(!!Hotspot).toBe(true);
  });

});
