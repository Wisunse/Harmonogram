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

        $scope.dayName = function(day) {
            var days = ['ND', 'PON', 'WT', 'ŚR', 'CZW', 'PT', 'SO'];
            var d = new Date(management.selectedYear+'-'+management.selectedMonth+'-'+day);
            return days[d.getDay()];
        }

    }]);