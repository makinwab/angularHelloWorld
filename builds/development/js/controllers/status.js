appControllers.controller('StatusController', ['$scope', '$location', 'Authentication', function ($scope, $location, Authentication) {
    'use strict';
    $scope.logout = function () {
        Authentication.logout();
        $location.path('/login');
    };
}]);
