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

'use strict';

angular.module('clientApp')
  .factory('messageFactory', function ($http) {
    // Service logic

    var baseUrl = '/api/v1/';

    // Public API here
    return {
      getMessage: function () {
        return $http.get(baseUrl + 'greet');
      }
    };
  });
'use strict';

angular.module('clientApp')
  .factory('Stage', function ($resource) {
    return $resource('/api/v1/stages/:id', { id: '@id' },
      {
        'create':  { method: 'POST' },
        'index':   { method: 'GET', isArray: true },
        'show':    { method: 'GET', isArray: false },
        'update':  { method: 'PUT' },
        'destroy': { method: 'DELETE' }
      }
    );
  });

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

'use strict';

angular.module('clientApp')
  .controller('NavbarCtrl', function ($scope, $location) {
      $scope.isActive = function (viewLocation) {
          var active = (viewLocation === $location.path());
          return active;
        };
    });

'use strict';

angular.module('clientApp')
  .controller('LoginCtrl', function ($scope, $http, authFactory) {
    $scope.loginUser = {email: null, password: null};
    $scope.loginError = {message: null, errors: {}};
    $scope.registerUser = {email: null, password: null, password_confirmation: null};
    $scope.registerError = {message: null, errors: {}};

    $scope.login = function() {
      $scope.submit({
        method: 'POST',
        url: '/api/v1/users/sign_in.json', // Proxy is on /api/v1 so make sure to scope devise as well
        data: {user: {email: $scope.loginUser.email, password: $scope.loginUser.password}},
        successMessage: 'You have been logged in.',
        errorEntity: $scope.loginError
      });
    };

    $scope.logout = function() {
      $scope.submit({
        method: 'DELETE',
        url: '/api/v1/users/sign_out.json',
        successMessage: 'You have been logged out.',
        errorEntity: $scope.loginError
      });
    };

    $scope.passwordReset = function () {
      $scope.submit({
        method: 'POST',
        url: '/api/v1/users/password.json',
        data: {user: {email: $scope.loginUser.email}},
        successMessage: 'Reset instructions have been sent to your e-mail address.',
        errorEntity: $scope.loginError
      });
    };
    
    $scope.register = function() {
      $scope.submit({
        method: 'POST',
        url: '/api/v1/users.json',
        data: {user: {email: $scope.registerUser.email,
                       password: $scope.registerUser.password,
                       password_confirmation: $scope.registerUser.password_confirmation}},
        successMessage: 'You have been registered and logged in.',
        errorEntity: $scope.registerError
      });
    };

    $scope.changePassword = function() {
      $scope.submit({
        method: 'PUT',
        url: '/api/v1/users/password.json',
        data: {user: {email: $scope.registerUser.email,
                       password: $scope.registerUser.password,
                       password_confirmation: $scope.registerUser.password_confirmation}},
        successMessage: 'Your password has been updated.',
        errorEntity: $scope.registerError
      });
    };

    $scope.submit = function(parameters) {
      $scope.resetMessages();

      $http({
          method: parameters.method,
          url: parameters.url,
          data: parameters.data
        })
        .success(function(data, status){
          if (status === 201 || status === 204){
            parameters.errorEntity.message = parameters.successMessage;
            authFactory.currentUser($scope.loginUser.email || $scope.registerUser.email);
            $scope.resetUsers();
          } else {
            if (data.error) {
              parameters.errorEntity.message = data.error;
            } else {
              // note that JSON.stringify is not supported in some older browsers, we're ignoring that
              parameters.errorEntity.message = 'Success, but with an unexpected success code, potentially a server error, please report via support channels as this indicates a code defect.  Server response was: ' + JSON.stringify(data);
            }
          }
        })
        .error(function(data, status){
          if (status === 422) {
            parameters.errorEntity.errors = data.errors;
          } else {
            if (data.error) {
              parameters.errorEntity.message = data.error;
            } else {
              // note that JSON.stringify is not supported in some older browsers, we're ignoring that
              parameters.errorEntity.message = 'Unexplained error, potentially a server error, please report via support channels as this indicates a code defect.  Server response was: ' + JSON.stringify(data);
            }
          }
        });
    };

    $scope.resetMessages = function() {
      $scope.loginError.message = null;
      $scope.loginError.errors = {};
      $scope.registerError.message = null;
      $scope.registerError.errors = {};
    };

    $scope.resetUsers = function() {
      $scope.loginUser.email = null;
      $scope.loginUser.password = null;
      $scope.registerUser.email = null;
      $scope.registerUser.password = null;
      $scope.registerUser.password_confirmation = null;
    };
  });

'use strict';

angular.module('clientApp')
  .factory('authFactory', function ($http) {

    var current_user,
        error;

    return {
      getUser: function () {
        return $http({
          method: 'GET',
          url: '/api/v1/users/current'
        })
        .success(function(data){
          console.log('success '+data.email);
          current_user = data;
        })
        .error(function(data){
          error = data.error;
        });
      },
      currentUser: function (value) {
        if (arguments.length === 1) {
          current_user = value;
        }
        else {
          return current_user;
        }
      }
    };
  });

'use strict';

angular.module('clientApp')
  .factory('Project', function ($resource) {
    return $resource('/api/v1/projects/:id', { id: '@id' },
      {
        'create':  { method: 'POST' },
        'index':   { method: 'GET', isArray: true },
        'show':    { method: 'GET', isArray: false },
        'update':  { method: 'PUT' },
        'destroy': { method: 'DELETE' }
      }
    );
  });
