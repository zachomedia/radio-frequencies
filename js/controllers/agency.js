'use strict';

angular.module('RadioFrequencies')
   .controller('Agency', function($scope, radioReference, $routeParams) {
      $scope.requireLogin(function() {
         $scope.contentLoaded(false);
         $scope.setPage('agency');

         radioReference.agency($routeParams.aid).then(function(response) {
            $scope.agency = response.data;
            $scope.contentLoaded(true);
         }, function(error) {
            console.log(error);
            $scope.displayError('An error occured loading the agency.');
            $scope.agency = {};
         });
      });
   });
