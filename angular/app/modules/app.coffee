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
