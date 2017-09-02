'use strict';

angular.module('Harmonogram')

    .controller('MenuController', ['$scope', '$http', '$state', '$sce',
        function($scope, $http, $state, $sce) {

        $scope.goManagement = function() {
            $state.go('management');
        };

        $scope.goUsers = function() {
            $state.go('users');
        };

        $scope.goLogOut = function() {
            $http.get('/log_out').then(function successCallback() {
                $state.go('login');
            });
        }


    }]);
