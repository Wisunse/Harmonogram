'use strict';

angular.module('Harmonogram')

    .controller('MenuController', ['$scope', '$http', '$state', '$sce','management', '$mdSidenav',
        function($scope, $http, $state, $sce, management, $mdSidenav) {

        $scope.management = management;

        $scope.goManagement = function() {
            $state.go('management');
        };

        $scope.goUsers = function() {
            $state.go('users');
        };

        $scope.goCars = function() {
            $state.go('cars');
        };

        $scope.goLogOut = function() {
            $http.get('/log_out').then(function successCallback() {
                $state.go('login');
            });
        };

        $scope.openLeftMenu = function() {
            $mdSidenav('left').toggle();
        };


    }]);
