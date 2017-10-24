'use strict';

angular.module('Harmonogram')

    .controller('LoginController', ['$scope', '$http', '$state', '$sce',
        function($scope, $http, $state, $sce) {

            $scope.login = function() {

                if( $scope.id !== null && $scope.password !== null) {
                    var data = {
                        'login': $scope.id,
                        // 'password': CryptoJS.SHA3($scope.password).toString()
                        'password': $scope.password
                    };
                    $http.post('/try_login', JSON.stringify(data)).then(function successCallback(response) {

                        switch(response.data.status) {
                            case '1':
                                $state.go('management');
                                break;
                            case '-1':
                                alert('puste pole id, albo hasła');
                                break;
                            case '-2':
                                alert('zły login lub hasło');
                                break;
                            case '-3':
                                alert('Nie masz prawa dostępu');
                                break;
                            default:
                                alert('złe logowanie');
                                break;
                        }
                    });
                }
            }

        }]);