'use strict';

angular.module('Harmonogram')

.directive('scrollStick', function() {

    return {
        restrict: 'AE',
        scope:{
            data: '='
        },
        link: function (scope, element, attrs) {
                var raw = element[0];
                element.bind('scroll', function () {
                    setInterval(function() {
                    var left = (-raw.scrollLeft+2)+'px';
                    angular.element(document.getElementsByClassName("management__car-name")).css({'margin-left': left});
                });

            });
        }
    };

});