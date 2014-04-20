'use strict';

angular.module('RadioFrequencies', [
   'ngRoute',
   'ui.bootstrap'
])
   .config(function ($routeProvider) {
      $routeProvider
         .when('/', {
            templateUrl: 'views/main.html',
            controller: 'Main'
         })
         .when('/login', {
            templateUrl: 'views/login.html',
            controller: 'Login'
         })
         .when('/logout', {
            templateUrl: 'views/logout.html',
            controller: 'Logout'
         })
         .when('/countries', {
            templateUrl: 'views/countries.html',
            controller: 'Countries'
         })
         .when('/country/:coid', {
            templateUrl: 'views/country.html',
            controller: 'Country'
         })
         .when('/state/:stid', {
            templateUrl: 'views/state.html',
            controller: 'State'
         })
         .when('/county/:ctid', {
            templateUrl: 'views/county.html',
            controller: 'County'
         })
         .when('/agency/:aid', {
            templateUrl: 'views/agency.html',
            controller: 'Agency'
         })
         .when('/system/:sid', {
            templateUrl: 'views/system.html',
            controller: 'System'
         })
         .otherwise({
            redirectTo: '/'
         });
   });
