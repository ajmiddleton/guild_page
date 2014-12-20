'use strict'

angular.module('guild-page',
  ['ngCookies',
   'ngResource',
   'ngSanitize',
   'ui.router',
   'ui.bootstrap',
   'restangular'
   ])

angular.module('guild-page')
  .config ($urlRouterProvider, $httpProvider, $stateProvider, RestangularProvider)->
    console.log "config"

    RestangularProvider.setBaseUrl('/api/');
    RestangularProvider.setDefaultHeaders({'Content-Type': 'application/json'});

    $urlRouterProvider.otherwise "/"

    $stateProvider
    .state('app', {
      url: '/'
      template: '<ui-view/>'
      abstract: true
    })
    .state('app.index', {
      url: ''
      templateUrl: 'modules/core/app.html'
      controller: 'ApplicationCtrl'
    })
