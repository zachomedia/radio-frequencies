'use strict';

angular.module('RadioFrequencies')
   .controller('County', function($scope, radioReference, $routeParams) {
      $scope.requireLogin(function() {
         $scope.contentLoaded(false);
         $scope.setPage('county');

         radioReference.county($routeParams.ctid).then(function(response) {
            $scope.county = response.data;
            $scope.contentLoaded(true);

            $scope.$parent.county.name = $scope.county.countyName;
            $scope.$parent.county.id = $scope.county.ctid;
         }, function(error) {
            console.log(error);
            $scope.displayError('An error occured loading information about the county.');
            $scope.county = {};
         });
      });
   });
