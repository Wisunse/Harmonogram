'use strict';

angular.module('Harmonogram')

.factory('management', ['$rootScope', '$http', '$state', '$mdDialog', 'cars',
    function($rootScope, $http, $state, $mdDialog, cars) {

    var factory = {};
    factory.buildedMonth = [];
    factory.wholeDate = {month: null, year: null};
    factory.registry = null;
    factory.daysInMonth = null;

    factory.translateMonth = [ null, 'Styczeń','Luty', 'Marzec', 'Kwiecień', 'Maj', 'Czerwiec', 'Lipiec', 'Sierpień', 'Wrzesień', 'Październik', 'Listopad', 'Grudzień']

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


    return factory;
}]);