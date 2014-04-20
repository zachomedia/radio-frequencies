'use strict';

angular.module('RadioFrequencies')
   .controller('Logout', function($scope, radioReference, $location) {
      $scope.contentLoaded(true);
      $scope.setPage('logout');

      $scope.requireLogin(function() {
         radioReference.logout();
      });

      $location.path('/');
   });
