'use strict';

angular.module('Harmonogram')

    .controller('UsersController', ['$scope', '$http', '$timeout', 'users',
        function($scope, $http, $timeout, users) {

            $scope.users = users;
            $scope.customFullscreen = true;
            $scope.newUser = {};
            $scope.passwordNotConfirm = false;

            users.allUsers();

            $scope.addNewUser = function(form) {

                if (form) {
                    if ($scope.newUser.password === $scope.newUser.password_confirm) {

                        $scope.passwordNotConfirm = false;
                        var data = JSON.stringify({'user': $scope.newUser});
                        $http.post('/new_user', data).then(function successCallback(response) {
                            var data = response.data;
                            if (data === '1') {
                                users.allUsers();
                                $scope.closeDialog();
                            }
                            else if (response.data === '0') {
                                //    todo tutaj zmienic zmienna w formularzu na 'haslo sie nie zgadza'
                            }
                            else {
                                //    todo nie powiodlo sie
                            }
                        });

                    } else {
                        $scope.passwordNotConfirm = true;
                    }
                }

            };

            $scope.editUser = function(form) {

                if (form) {

                    if (users.editUser.password === users.editUser.password_confirm) {

                        $scope.passwordNotConfirm = false;
                        var data = JSON.stringify({'user': users.editUser});
                        $http.post('/edit_user', data).then(function successCallback(response) {
                            var data = response.data;
                            console.log(data === '1');
                            if (data === '1') {
                                users.allUsers();
                                users.closeDialog();
                            }
                            else if (response.data === '0') {
                                // todo tutaj zmienic zmienna w formularzu na 'haslo sie nie zgadza'
                            }
                            else {
                                // todo nie powiodlo sie
                            }
                        });

                    } else {
                        $scope.passwordNotConfirm = true;
                    }
                }

            };



        }]);