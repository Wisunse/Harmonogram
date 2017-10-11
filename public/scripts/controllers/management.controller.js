'use strict';

angular.module('Harmonogram')

    .controller('ManagementController', ['$scope', '$http', '$state', '$sce', 'management', 'cars', '$timeout', '$interval',
        function($scope, $http, $state, $sce, management, cars, $timeout, $interval) {

        $scope.management = management;
        $scope.cars = cars;
        $scope.managementArray = [];
        management.monthInfo();
        management.dateNow();
        management.allRegistry();
        cars.allCars();
        $timeout(function() {management.colorBricks()}, 1000);

        $interval( function() {
            cars.allCars();
            management.allRegistry();
            management.colorBricks();
        }, 4000);

        $scope.getNumber = function(num) {
                return new Array(num);
        };

    }]);