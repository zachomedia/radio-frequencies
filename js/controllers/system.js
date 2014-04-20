'use strict';

angular.module('RadioFrequencies')
   .controller('System', function($scope, radioReference, $routeParams) {
      $scope.requireLogin(function() {
         $scope.contentLoaded(false);
         $scope.setPage('system');

         radioReference.system($routeParams.sid).then(function(response) {
            $scope.system = response.data;
            $scope.contentLoaded(true);
         }, function(error) {
            console.log(error);
            $scope.displayError('An error occured loading the system.');
            $scope.system = {};
         });
      });
   });
