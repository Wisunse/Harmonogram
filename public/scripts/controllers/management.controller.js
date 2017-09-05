'use strict';

angular.module('Harmonogram')

    .controller('ManagementController', ['$scope', '$http', '$state', '$sce', 'management', 'cars',
        function($scope, $http, $state, $sce, management, cars) {

        $scope.management = management;
        $scope.cars = cars;
        management.datesNow();
        management.allRegistry();
        cars.allCars();

        $scope.getNumber = function(num) {
                return new Array(num);
        };

        $scope.colorBricks = function(year, month, day, carId) {

            var stringDate = '2017-09-'+day
            var date = new Date(stringDate);
            var result = false;

            management.registry.forEach(function(reg) {

                var dataStart = new Date(reg.data_start);
                var dataEnd = new Date(reg.data_end);

                // console.log('data z funkcji: '+date);
                // console.log('data start: '+ dataStart);
                // console.log('data_end:'+ dataEnd);
                // console.log(date <= dataStart);
                // console.log(date <= dataEnd);
                if(reg.cars_id == carId && date >= dataStart && date <= dataEnd ){
                    result = true;
               }
            });
            return result;
        }


    }]);