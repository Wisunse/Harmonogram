'use strict';

angular.module('Harmonogram')

    .controller('ManagementController', ['$scope', '$http', '$state', '$sce', 'management', 'cars',
        function($scope, $http, $state, $sce, management, cars) {

        $scope.management = management;
        $scope.cars = cars;
        management.datesNow();
        management.allRegistry();
        // management.monthInfo('09');


    }]);