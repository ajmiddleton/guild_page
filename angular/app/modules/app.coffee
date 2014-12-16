'use strict'

angular.module('guild-page',
  ['ngCookies',
   'ngResource',
   'ngSanitize',
   'ui.router',
   'ui.bootstrap'
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
      templateUrl: 'modules/core/app.html'
      controller: 'ApplicationCtrl'
      abstract: true
    })
    .state('app.home', {
      url: ''
      templateUrl: 'modules/core/home.html'
      controller: 'HomeCtrl'
    })
