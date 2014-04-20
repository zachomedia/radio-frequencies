'use strict';

angular.module('RadioFrequencies')
   .controller('Countries', function($scope, radioReference) {
      $scope.requireLogin(function() {
         $scope.contentLoaded(false);
         $scope.setPage('countries');

         radioReference.countries().then(function(response) {
            $scope.countries = response.data;
            $scope.contentLoaded(true);
         }, function(error) {
            console.log(error);
            $scope.displayError('An error occured loading the list of countries.');
            $scope.countries = Array();
         });
      });
   });
