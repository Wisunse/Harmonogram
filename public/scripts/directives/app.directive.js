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
                // element.bind('scroll', function () {
                 // angular.element(document.getElementsByClassName("new-car-names-label-wrapper"))[0].scrollLeft = raw.scrollLeft;
            // });
        }
    };

});