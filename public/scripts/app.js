'use strict';

angular.module('Warehouse', ['ui.router', 'ngSanitize'])

    .config(['$stateProvider', '$locationProvider', '$urlRouterProvider', '$httpProvider', function($stateProvider, $locationProvider, $urlRouterProvider, $httpProvider) {

        $httpProvider.interceptors.push(['$injector', '$q', function ($injector, $q) {
            return {

                'responseError': function (response) {

                    if (response.status === 401) {

                        window.location.href = '/login';
                    }
                    else if (response.status === 470) {

                        window.location.href = '/';
                    }
                    else if (response.status === 520) {

                        window.location.reload();
                    }

                    return $q.reject(response);
                }
            };
        }]);

        $httpProvider.defaults.headers.common['Pragma'] = 'no-cache'; // angular IE caching issue

        if (window.history && window.history.pushState) {

            $locationProvider.html5Mode({
                enabled: true,
                requireBase: false
            });
        }

        $stateProvider

            .state('login', {
                url: '/login',
                views: {
                    mainView: {
                        templateUrl: 'views/public/login',
                        controller: 'LoginController'
                    }
                }
            })

            .state('management', {
                url: '/authenticated',
                views: {
                    headerView: {
                      templateUrl: 'views/protected/menu',
                      controller: 'MenuController'
                    },
                    mainView: {
                        templateUrl: 'views/protected/management',
                        controller: 'ManagementController'
                    }
                }
            })

            .state('error_404', {
                url: '/404',
                views: {
                    errorView: {
                        templateUrl: 'views/error_404'
                    }
                }
            });

        $urlRouterProvider.otherwise('/404');

        // $mdThemingProvider.theme('default')
        //     .primaryPalette('grey', {
        //         'default': '900',
        //         'hue-1': '100',
        //         'hue-2': '600',
        //         'hue-3': 'A100'
        //     }) .accentPalette('yellow', {
        //     'default': 'A200'
        // }) .warnPalette('red');

        // .backgroundPalette('grey');

    }])

    .run(['$rootScope', '$state', '$stateParams', '$http',
        function ($rootScope, $state, $stateParams, $http) {

            $rootScope.state = $state;
            $rootScope.stateParams = $stateParams;

            $rootScope.$on('$locationChangeStart', function (event, newLocation, oldLocation) {

                var newPath = newLocation.split('/').slice(-1)[0];
                var oldPath = oldLocation.split('/').slice(-1)[0];

                if ( newPath === 'authenticated' ) {
                    // pobieranie danych
                }

            });

    }]);