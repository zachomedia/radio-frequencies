'use strict';

angular.module('RadioFrequencies')
   .controller('Country', function($scope, radioReference, $routeParams) {
      $scope.requireLogin(function() {
         $scope.contentLoaded(false);
         $scope.setPage('country');

         radioReference.country($routeParams.coid).then(function(response) {
            $scope.country = response.data;
            $scope.contentLoaded(true);

            $scope.$parent.country.name = $scope.country.countryName;
            $scope.$parent.country.id = $scope.country.coid;
         }, function(error) {
            console.log(error);
            $scope.displayError('An error occured loading information about the country.');
            $scope.country = {};
         });
      });
   });
