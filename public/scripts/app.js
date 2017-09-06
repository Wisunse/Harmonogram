'use strict';

angular.module('Harmonogram', ['ui.router', 'ngSanitize', 'ngMaterial', 'ngAnimate', 'ngAria', 'ngMessages'])

    .config(['$stateProvider', '$locationProvider', '$urlRouterProvider', '$httpProvider', '$mdThemingProvider',
        function($stateProvider, $locationProvider, $urlRouterProvider, $httpProvider, $mdThemingProvider) {

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

            .state('users', {
                url: '/authenticated',
                views: {
                    headerView: {
                        templateUrl: 'views/protected/menu',
                        controller: 'MenuController'
                    },
                    mainView: {
                        templateUrl: 'views/protected/users',
                        controller: 'UsersController'
                    }
                }
            })

            .state('cars', {
                url: '/authenticated',
                views: {
                    headerView: {
                        templateUrl: 'views/protected/menu',
                        controller: 'MenuController'
                    },
                    mainView: {
                        templateUrl: 'views/protected/cars',
                        controller: 'CarsController'
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

        $mdThemingProvider.theme('default')
            .primaryPalette('grey', {
                'default': '900',
                'hue-1': '100',
                'hue-2': '600',
                'hue-3': 'A100'
            }) .accentPalette('orange', {
            'default': '500'
        }) .warnPalette('red');

    }])

    .run(['$rootScope', '$state', '$stateParams', '$http', 'management', 'cars',
        function ($rootScope, $state, $stateParams, $http, management, cars) {

            $rootScope.state = $state;
            $rootScope.stateParams = $stateParams;
            $rootScope.authenticated = null;

            // translations.getTranslations();

            $rootScope.$on('$locationChangeStart', function (event, newLocation, oldLocation) {

                var newPath = newLocation.split('/').slice(-1)[0];
                var oldPath = oldLocation.split('/').slice(-1)[0];

                if ($rootScope.authenticated === null) {

                    $http.post('/is_authenticated').then(function successCallback(response) {

                        $rootScope.authenticated = response.data.authenticated;
                        $rootScope.username = response.data.username;
                            management.datesNow();
                            management.allRegistry();
                            cars.allCars();
                            // management.colorBricks();
                    });
                }
                else {

                    if (newPath === 'login' && oldPath === 'authenticated' && $rootScope.authenticated) {

                        event.preventDefault();
                        alert('Czy na pewno chcesz opuscic aplikacje?');
                    }
                    else if (newPath === 'authenticated' && oldPath === 'login' && !$rootScope.authenticated) {

                        event.preventDefault();
                    }
                }

            });

        }]);
