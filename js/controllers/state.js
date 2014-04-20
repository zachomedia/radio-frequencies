'use strict';

angular.module('RadioFrequencies')
   .controller('State', function($scope, radioReference, $routeParams) {
      $scope.requireLogin(function() {
         $scope.contentLoaded(false);
         $scope.setPage('state');

         radioReference.state($routeParams.stid).then(function(response) {
            $scope.state = response.data;
            $scope.contentLoaded(true);

            $scope.$parent.state.name = $scope.state.stateName;
            $scope.$parent.state.id = $scope.state.stid;
         }, function(error) {
            console.log(error);
            $scope.displayError('An error occured loading information about the state.');
            $scope.state = {};
         });
      });
   });
