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

    factory.translateMonth = [ null, 'Styczeń','Luty', 'Marzec', 'Kwiecień', 'Maj', 'Czerwiec', 'Lipiec', 'Sierpień', 'Wrzesień', 'Październik', 'Listopad', 'Grudzień']

    factory.closeDialog = function() {
        $mdDialog.hide();
    };

    factory.datesNow = function() {
        $http.get('/dates_now').then(function successCallback(response) {
            var data = response.data;
            factory.wholeDate = data;
            factory.daysInMonth = data.days_count;
            console.log(data)
        });
    };

    factory.allRegistry = function() {
        $http.get('/all_registry').then(function successCallback(response) {
            var data = response.data;
            factory.registry = data.all_registry;
            console.log(data)
        });
    };

    factory.monthInfo = function(month) {
        var sendData = JSON.stringify({'month': month});
        $http.post('/month_info', sendData).then(function successCallback(response) {
            var data = response.data;
            factory.daysInMonth = data;
            console.log('monthinfo');
            console.log(data)
        });
    };

    factory.buildMonth = function() {

        cars.cars.forEach(function(car) {
            var readyMonth = { 'car.id': car.id, 'car_name': car.name, month: [] };

            factory.buildedMonth.push(readyMonth);
        });

    };

    factory.showDayDetails = function(ev, day, car_id) {
        factory.pickedDay = day;
        factory.pickedDay.car_id = car_id;
        console.log(day);
        $mdDialog.show({
            controller: 'ManagementController',
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
                        var day_obj = { day_number: day, reg_id: null, data_start: null, data_end: null };
                        if(matchingReg!== null){
                            day_obj.reg_id = matchingReg.id;
                            day_obj.data_start = matchingReg.data_start;
                            day_obj.data_end = matchingReg.data_end;
                        }
                        obj.days.push(day_obj);

                    }
                    $timeout(function() {
                        $rootScope.$apply(function () {
                            factory.managementArray.push(obj)
                        });
                    });
                });

            } else {
                setTimeout(function() { factory.colorBricks() }, 1000);
            }
        };factory.colorBricks() ;



        return factory;
}]);