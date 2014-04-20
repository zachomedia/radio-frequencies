'use strict';

angular.module('RadioFrequencies')
   .controller('Login', function($scope, radioReference, $location) {
      var redirect = $scope.$parent.loginRedirect;

      $scope.requireLogin(function() {
         $location.path('/countries');
      }, function() {
            $scope.contentLoaded(true);
            $scope.setPage('login');

            $scope.user = {
               username: '',
               password: ''
            }

            $scope.login = function() {
               radioReference.login($scope.user.username, $scope.user.password).then(function(response) {
                  if (redirect == '/login' || redirect == '/logout') {
                     redirect = '/countries';
                  }
                  $location.path(redirect);
               }, function(error) {
                  $scope.user.password = '';
                  $scope.displayError('Sorry, the credentials you provided are not valid.');

                  $scope.contentLoaded(true);
               });
            };
      });
   });
