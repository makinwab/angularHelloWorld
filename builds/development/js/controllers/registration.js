appControllers.controller('RegistrationController', ['$scope', 'Authentication', function ($scope, Authentication) {
    'use strict';

    $scope.login = function () {
        Authentication.login($scope.user);
    };//login

    $scope.register = function () {
        Authentication.register($scope.user);
    };//register


}]); //RegistrationController

 /*$scope.$on('$viewContentLoaded', function () {
        //console.log($scope.myform);
    });*/
