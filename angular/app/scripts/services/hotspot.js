'use strict';

angular.module('clientApp')
  .factory('Hotspot', function ($resource) {
    return $resource('/api/v1/hotspots/:id', { id: '@id' },
      {
        'create':  { method: 'POST' },
        'index':   { method: 'GET', isArray: true },
        'show':    { method: 'GET', isArray: false },
        'update':  { method: 'PUT' },
        'destroy': { method: 'DELETE' }
      }
    );
  });
