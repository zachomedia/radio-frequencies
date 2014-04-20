'use strict';

angular.module('RadioFrequencies')
   .controller('Content', function($scope, radioReference, $location) {

      $scope.country = { name: '', id: 0 };
      $scope.state = { name: '', id: 0 };
      $scope.county = { name: '', id: 0 };

      $scope.alerts = [];
      $scope.error = false;
      $scope.loaded = false;

      $scope.page = 0;
      $scope.user = { 'username' : '' };
      $scope.loggedIn = false;
      $scope.loginRedirect = '/';

      $scope.$on('$routeChangeStart', function(next, current) {

         $scope.alerts = [];

         radioReference.loggedIn(function() {
            radioReference.user().then(function(response) {
               $scope.user = response.data;
               $scope.loggedIn = true;
            });
         }, function() {
            $scope.user = { 'username' : '' };
            $scope.loggedIn = false;
         })
      });

      $scope.requireLogin = function(loggedInCallback, loggedOutCallback) {
         $scope.loginRedirect = $location.path();

         if (!radioReference.loggedIn(loggedInCallback, loggedOutCallback)) {
            $location.path('/login');
         }
      }

      $scope.contentLoaded = function(loaded)
      {
         $scope.loaded = loaded;
         $scope.content_loaded = loaded;
         $scope.error = false;
      };

      $scope.setPage = function(page)
      {
         switch(page)
         {
            case 'country':
               $scope.page = 1;
               break;

            case 'state':
               $scope.page = 2;
               break;

            case 'county':
               $scope.page = 3;
               break;

            case 'system':
            case 'agency':
               // do nothing
               break;

            default:
               $scope.page = 0;
               break;
         }
      };

      $scope.displayError = function(error)
      {
         $scope.alerts.push({
            type: 'danger',
            msg: error
         });

         $scope.loaded = false;
         $scope.error = true;
      };
   });
