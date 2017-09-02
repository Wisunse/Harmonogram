'use strict';

angular.module('Harmonogram')

    .factory('users', ['$rootScope', '$http', '$state', '$mdDialog',
        function($rootScope, $http, $state, $mdDialog) {

            var factory = {};
            factory.editUser = {};

            factory.allUsers = function() {
                console.log('asd');
                $http.get('/all_users').then(function successCallback(response) {
                    var data = response.data;
                    factory.users = data.all_users;
                    console.log(factory.users)
                });

            };

            factory.deleteUser = function(user) {

                var data = JSON.stringify({'user': user});
                $http.post('/delete_user', data).then(function successCallback() {
                    factory.allUsers();
                });
            };

            factory.closeDialog = function() {
                $mdDialog.hide();
            };

            factory.showAddNewUser = function(ev) {

                $mdDialog.show({
                    controller: 'UsersController',
                    templateUrl: 'views/dialog/add_new_user',
                    parent: angular.element(document.body),
                    targetEvent: ev,
                    clickOutsideToClose:true,
                    fullscreen: true
                }).then(function(answer) {

                }, function() {

                });

            };

            factory.showEditUser = function(user, ev) {

                factory.editUser = user;

                $mdDialog.show({
                    controller: 'UsersController',
                    templateUrl: 'views/dialog/edit_user',
                    parent: angular.element(document.body),
                    targetEvent: ev,
                    clickOutsideToClose:true,
                    fullscreen: true
                }).then(function(answer) {

                }, function() {

                });

            };

            factory.showDeleteUser = function(user, ev) {

                var confirm = $mdDialog.confirm()
                    .title()
                    .textContent('Czy na pewno chcesz usunąć to konto?')
                    .ariaLabel('Czy na pewno chcesz usunąć to konto?')
                    .targetEvent(ev)
                    .ok('TAK')
                    .cancel('ANULUJ');

                $mdDialog.show(confirm).then(function() {
                    factory.deleteUser(user);
                }, function() {

                });
            };

            return factory;

        }]);

