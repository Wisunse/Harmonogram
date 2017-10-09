'use strict';

angular.module('Harmonogram')

    .controller('ManagementController', ['$scope', '$http', '$state', '$sce', 'management', 'cars', '$timeout', '$interval',
        function($scope, $http, $state, $sce, management, cars, $timeout, $interval) {

        $scope.management = management;
        $scope.cars = cars;
        $scope.managementArray = [];

        // management.dateNow();
        // cars.allCars();
        // management.colorBricks();

        $interval( function() {
            // management.monthInfo();
            cars.allCars();
            management.allRegistry();
            management.colorBricks();
        }, 6000);

        $scope.getNumber = function(num) {
                return new Array(num);
        };

        // $scope.colorBricks = function() {
        //
        //     if(management.wholeDate.year !== null && cars.cars !== null && management.registry !== null && management.daysInMonth !== null) {
        //
        //         var year = management.wholeDate.year;
        //         var month = management.wholeDate.month;
        //         $scope.managementArray = [];
        //
        //         cars.cars.forEach(function(car) {
        //
        //             var obj = { car_id: car.id, car_name: car.name,  days: [ ] };
        //
        //             for(var day = 1; day<management.daysInMonth+1; day++) {
        //
        //                 var stringDate = year+'-'+month+'-'+day;
        //                 var date = new Date(stringDate);
        //                 var matchingReg = null;
        //                 management.registry.forEach(function(reg) {
        //
        //                     var dataStart = new Date(reg.data_start);
        //                     var dataEnd = new Date(reg.data_end);
        //
        //                     if(reg.cars_id == car.id && date >= dataStart && date <= dataEnd ) {
        //
        //                         matchingReg = reg;
        //                     }
        //
        //                 });
        //                 var day_obj = { day_number: day, reg_id: null, data_start: null, data_end: null };
        //                 if(matchingReg!== null){
        //                     day_obj.reg_id = matchingReg.id;
        //                     day_obj.data_start = matchingReg.data_start;
        //                     day_obj.data_end = matchingReg.data_end;
        //                 }
        //                 obj.days.push(day_obj);
        //
        //             }
        //             $timeout(function() {
        //                 $scope.$apply(function () {
        //                     $scope.managementArray.push(obj)
        //                 })
        //             },500);
        //         });
        //         console.log($scope.managementArray);
        //     } else {
        //         setTimeout(function() { $scope.colorBricks() }, 1000);
        //     }
        // };$scope.colorBricks();

        // $scope.showDayDetails = function(day) {
        //     console.log(day);
        // };

        $scope.sendDataToRegister = function(form) {
            if (form) {
                var data = JSON.stringify({'pickedDay': management.pickedDay});
                $http.post('/new_register', data).then(function successCallback(response) {

                    $http.get('/all_registry').then(function successCallback(response) {
                        var data = response.data;
                        management.registry = data.all_registry;
                        management.colorBricks();
                        management.closeDialog();
                    });

                });

                }
        }

    }]);