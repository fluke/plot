'use strict';

angular.module('clientApp', [
    'ngCookies',
    'ngResource',
    'ngSanitize',
    'ngRoute',
    'ngAnimate',
    'ui.router'
  ])

  // Intercept HTTP responses and redirect to login page if unauthorized
  .config(['$httpProvider', function($httpProvider){
    // Prevent rails from making new sessions each time

    var interceptor = ['$location', '$rootScope', '$q', function($location, $rootScope, $q) {
      function success(response) {
        return response;
      }

      function error(response) {
        if (response.status === 401) {
          $rootScope.$broadcast('event:unauthorized');
          $location.path('/login');
          return response;
        }
        return $q.reject(response);
      }

      return function(promise) {
        return promise.then(success, error);
      };
    }];
    $httpProvider.responseInterceptors.push(interceptor);
  }])

  // The routes
  .config(function ($stateProvider, $urlRouterProvider) {
    
    $urlRouterProvider.otherwise('/');

    $stateProvider
      .state('home', {
        url: '/',
        templateUrl: 'views/main.html',
        controller: 'MainCtrl'
      })
      .state('about', {
        url: '/about',
        templateUrl: 'views/about.html'
      })
      .state('login', {
        url: '/login',
        templateUrl: 'views/login.html',
        controller: 'LoginCtrl'
      });
      
  });
