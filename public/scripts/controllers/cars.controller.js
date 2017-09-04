'use strict';

angular.module('Harmonogram')

.controller('CarsController', ['$scope', '$http', '$state', '$sce', 'cars',
    function($scope, $http, $state, $sce, cars) {

        $scope.cars = cars;
        $scope.customFullscreen = true;
        $scope.newCar = {};

        cars.allCars();

        $scope.addNewCar = function(form) {

            if (form) {

                var data = JSON.stringify({'car': $scope.newCar});
                $http.post('/new_car', data).then(function successCallback(response) {
                    var data = response.data;
                    if (data === '1') {
                        cars.allCars();
                        cars.closeDialog();
                    }
                    else if (response.data === '0') {
                        //    todo tutaj zmienic zmienna w formularzu na 'haslo sie nie zgadza'
                    }
                    else {
                        //    todo nie powiodlo sie
                    }
                });

            }

        };

        $scope.editCar = function(form) {

            if (form) {

                var data = JSON.stringify({'car': cars.editCar});
                $http.post('/edit_car', data).then(function successCallback(response) {
                    var data = response.data;
                    console.log(data === '1');
                    if (data === '1') {
                        cars.allCars();
                        cars.closeDialog();
                    }
                    else if (response.data === '0') {
                        // todo tutaj zmienic zmienna w formularzu na 'haslo sie nie zgadza'
                    }
                    else {
                        // todo nie powiodlo sie
                    }
                });

            }

        };



    }]);
