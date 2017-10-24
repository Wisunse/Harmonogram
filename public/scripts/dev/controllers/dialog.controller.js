'use strict';

angular.module('Harmonogram')

    .controller('DialogController', ['$scope', '$http', '$state', '$sce', 'management', 'cars', '$timeout', '$interval',
        function($scope, $http, $state, $sce, management, cars, $timeout, $interval) {

            $scope.management = management;
            $scope.cars = cars;

        }]);