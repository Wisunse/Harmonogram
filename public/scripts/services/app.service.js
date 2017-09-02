'use strict';

angular.module('Harmonogram')

.factory('parameters', function() {

    var factory = {};

    factory.showLoginBox = true;

    factory.showLoginBoxFunction = function() {
        factory.showLoginBox = true;
    };

    return factory;
})


    .factory('authentication', ['$rootScope', '$localStorage', '$http', '$state', 'parameters', 'appAlert', 'translations',
        function($rootScope, $localStorage, $http, $state, parameters, appAlert, translations) {

            var factory = {};

            factory.username = '';
            factory.password = '';
            factory.rememberMe = false;
            factory.useCookie = true;

            factory.login = function() {

                parameters.showLoginBox = false;

                var data = JSON.stringify({'username' : factory.username, 'password' : factory.password, 'rememberMe' : factory.rememberMe, 'useCookie' : factory.useCookie});

                $http.post('/login', data).then(function successCallback(response) {

                    if (response.data.authenticated) {

                        $rootScope.authenticated = true;
                        $rootScope.username = factory.username;

                        if (!factory.useCookie) {
                            $localStorage.currentUser = { token: response.data.token };
                            $http.defaults.headers.common.Authorization = 'Bearer ' + response.data.token;
                        }

                        $state.go('home');
                    }
                    else {

                        factory.password = '';

                        var message = translations.setText(1135);
                        message = '<div class="text-align-center">' + message + '</div>';

                        appAlert.showAppAlert(message, translations.setText(1136), parameters.showLoginBoxFunction, false, null);
                    }
                });

            };

            factory.logout = function() {

                factory.username = '';
                factory.password = '';
                factory.rememberMe = false;

                $http.post('/logout').then(function successCallback(response) {

                    if (response.data.logged_out) {

                        $rootScope.authenticated = false;
                        $rootScope.username = '';

                        if (!factory.useCookie) {
                            delete $localStorage.currentUser;
                            $http.defaults.headers.common.Authorization = '';
                        }

                        $state.go('login');
                    }
                });
            };

            return factory;
        }]);