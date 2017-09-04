'use strict';

angular.module('Harmonogram')

.factory('cars', ['$rootScope', '$http', '$state', '$mdDialog',
    function($rootScope, $http, $state, $mdDialog) {

    var factory = {};

        factory.editCar = {};

        factory.closeDialog = function() {
            $mdDialog.hide();
        };

        factory.allCars = function() {
            $http.get('/all_cars').then(function successCallback(response) {
                var data = response.data;
                factory.cars = data.all_cars;
            });

        };

        factory.deleteCar = function(user) {

            var data = JSON.stringify({'car': car});
            $http.post('/delete_user', data).then(function successCallback() {
                factory.allCars();
            });
        };

        factory.showAddNewCar = function(ev) {

            $mdDialog.show({
                controller: 'CarsController',
                templateUrl: 'views/dialog/add_new_car',
                parent: angular.element(document.body),
                targetEvent: ev,
                clickOutsideToClose:true,
                fullscreen: true
            }).then(function(answer) {

            }, function() {

            });

        };

        factory.showEditCar = function(car, ev) {

            factory.editCar = car;

            $mdDialog.show({
                controller: 'CarsController',
                templateUrl: 'views/dialog/edit_car',
                parent: angular.element(document.body),
                targetEvent: ev,
                clickOutsideToClose:true,
                fullscreen: true
            }).then(function(answer) {

            }, function() {

            });

        };

        factory.showDeleteCar = function(user, ev) {

            var confirm = $mdDialog.confirm()
                .title()
                .textContent('Czy na pewno chcesz usunąć to ten samochód?')
                .ariaLabel('Czy na pewno chcesz usunąć ten samochóð?')
                .targetEvent(ev)
                .ok('TAK')
                .cancel('ANULUJ');

            $mdDialog.show(confirm).then(function() {
                factory.deleteUser(user);
            }, function() {

            });
        };

    return factory;
    }]);
