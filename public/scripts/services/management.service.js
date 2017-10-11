'use strict';

angular.module('Harmonogram')

.factory('management', ['$rootScope', '$http', '$state', '$mdDialog', 'cars', '$timeout',
    function($rootScope, $http, $state, $mdDialog, cars, $timeout) {

    var factory = {};
    factory.buildedMonth = [];
    factory.wholeDate = {month: null, year: null};
    factory.registry = null;
    factory.daysInMonth = null;
    factory.managementArray = [{ car_id: null, car_name: null,  days: []}];
    // factory.selectedMonth = 1;
    factory.translateMonth = [ 'Aktualny', 'Styczeń','Luty', 'Marzec', 'Kwiecień', 'Maj', 'Czerwiec', 'Lipiec', 'Sierpień', 'Wrzesień', 'Październik', 'Listopad', 'Grudzień'];
    factory.translateYears = [];
    factory.loaded = false;

    factory.closeDialog = function() {
        $mdDialog.hide();
    };

    factory.allRegistry = function() {
        $http.get('/all_registry').then(function successCallback(response) {
            var data = response.data;
            factory.registry = data.all_registry;
        });
    };

    factory.dateNow = function() {
        $http.get('/dates_now').then(function successCallback(response) {
            var data = response.data;
            factory.whole_date = data.whole_date;
            factory.selectedMonth = data.month;
            factory.selectedYear = data.year;
            factory.translateYears = [];
            
            for(var i=2017; i<=data.year+1;i++) {
                factory.translateYears.push(i);
            }
        });
    };

    factory.monthInfo = function() {
        var sendData = JSON.stringify({'month': factory.selectedMonth, 'year': factory.selectedYear });
        $http.post('/month_info', sendData).then(function successCallback(response) {
            var data = response.data;
            factory.wholeDate = data;
            factory.selectedMonth = factory.wholeDate.month;
            factory.daysInMonth = data.days_count;
            factory.colorBricks();
        });
    };

    factory.buildMonth = function() {

        cars.cars.forEach(function(car) {
            var readyMonth = { 'car.id': car.id, 'car_name': car.name, month: [] };

            factory.buildedMonth.push(readyMonth);
        });

    };

    factory.showDayDetails = function(ev, day, car_id) {

        if (day.data_start === null) {
            day.data_end = day.data_start = '2017'+ '-' + factory.selectedMonth + '-' + day.day_number;
        }


        factory.pickedDay = day;
        factory.pickedDay.car_id = car_id;
        $mdDialog.show({
            controller: 'DialogController',
            templateUrl: 'views/dialog/management_details',
            parent: angular.element(document.body),
            targetEvent: ev,
            clickOutsideToClose:true,
            fullscreen: true
        }).then(function(answer) {

        }, function() {

        });

    };

        factory.colorBricks = function() {

            if(factory.wholeDate.year !== null && cars.cars !== null && factory.registry !== null && factory.daysInMonth !== null) {

                var year = factory.wholeDate.year;
                var month = factory.wholeDate.month;
                console.log(month);
                factory.managementArray = [];
                cars.cars.forEach(function(car) {

                    var obj = { car_id: car.id, car_name: car.name,  days: [ ] };

                    for(var day = 1; day<factory.daysInMonth+1; day++) {

                        var stringDate = year+'-'+month+'-'+day;
                        var date = new Date(stringDate);
                        var matchingReg = null;
                        factory.registry.forEach(function(reg) {

                            var dataStart = new Date(reg.data_start);
                            var dataEnd = new Date(reg.data_end);

                            if(reg.cars_id == car.id && date >= dataStart && date <= dataEnd ) {
                                matchingReg = reg;
                            }

                        });
                        var day_obj = { day_number: day, reg_id: null, data_start: null, data_end: null, info: null, account: null };
                        if(matchingReg!== null) {
                            day_obj.reg_id = matchingReg.id;
                            day_obj.data_start = matchingReg.data_start;
                            day_obj.data_end = matchingReg.data_end;
                            day_obj.info = matchingReg.info;
                            day_obj.account = matchingReg.account;
                        }
                        obj.days.push(day_obj);

                    }
                    // $timeout(function() {
                        // $rootScope.$apply(function () {
                            factory.managementArray.push(obj)
                        // });
                    // });
                });
                factory.loaded = true;
            } else {
                // factory.loaded = false;
                // setTimeout(function() { factory.colorBricks() }, 2000);
            }
        };

        factory.showDeleteRegister = function(register, ev) {

            var confirm = $mdDialog.confirm()
                .title()
                .textContent('Czy na pewno chcesz usunąć ten wpis?')
                .ariaLabel('Czy na pewno chcesz usunąć ten wpis?')
                .targetEvent(ev)
                .ok('TAK')
                .cancel('ANULUJ');

            $mdDialog.show(confirm).then(function() {
                factory.deleteRegister(register);
            }, function() {

            });
        };

    factory.deleteRegister = function(pickedDay, $event) {
        var data = JSON.stringify({'picked_day': pickedDay});
        // factory.loaded = false;
        $http.post('/delete_register', data).then(function successCallback() {
            factory.allRegistry();
            $timeout(function() {
                factory.colorBricks();
            },1000);
        });
    };

    factory.sendDataToRegister = function(form) {

        if (form) {
            var data = JSON.stringify({'pickedDay': factory.pickedDay});
            $http.post('/new_register', data).then(function successCallback(response) {

                $http.get('/all_registry').then(function successCallback(response) {
                    var data = response.data;
                    factory.registry = data.all_registry;
                    factory.colorBricks();
                    factory.closeDialog();
                });

            });

        }
    };

    return factory;

}]);