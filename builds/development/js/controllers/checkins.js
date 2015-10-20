appControllers.controller('CheckInsController', [ '$scope', '$rootScope', '$location', '$firebaseObject', '$firebaseArray', '$routeParams', 'FIREBASE_URL', function ($scope, $rootScope, $location, $firebaseObject, $firebaseArray, $routeParams, FIREBASE_URL) {
    'use strict';
    $scope.whichmeeting = $routeParams.mId;
    $scope.whichuser = $routeParams.uId;
    $scope.order = "firstname";
    $scope.direction = "";

    var ref = new Firebase(FIREBASE_URL + '/users/' + $scope.whichuser + '/meetings/' + $scope.whichmeeting + '/checkins'),
        checkinsList = $firebaseArray(ref);
    $scope.checkins = checkinsList;

    $scope.addCheckin = function () {
        var checkinObj = $firebaseObject(ref),

            checkinData = {
                firstname: $scope.user.firstname,
                lastname: $scope.user.lastname,
                email: $scope.user.email,
                date: Firebase.ServerValue.TIMESTAMP
            };

        ref.push(checkinData, function () {
            $location.path('/checkins/' + $scope.whichuser + '/' + $scope.whichmeeting + '/checkinsList');
        });
    }; //addCheckin

    $scope.deleteCheckin = function (id) {
        var record = new Firebase(FIREBASE_URL + '/users/' + $scope.whichuser + '/meetings/' + $scope.whichmeeting + '/checkins/' + id),

            recordObj = $firebaseObject(record);

        recordObj.$remove(id);

    }; //deleteCheckin

    $scope.pickRandom = function () {
        var whichRecord = Math.round(Math.random() * (checkinsList.length - 1));

        $scope.recordId = checkinsList.$keyAt(whichRecord);
    }; //pickRandom

    $scope.showLove = function (myItem) {
        myItem.show = !myItem.show;

        if (myItem.userState === "expanded") {
            myItem.userState = '';
        } else {
            myItem.userState = 'expanded';
        }
    }; //showlove

    $scope.giveLove = function (myItem, myGift) {
        var refLove = new Firebase(FIREBASE_URL + '/users/' + $scope.whichuser + '/meetings/' +
                                   $scope.whichmeeting + '/checkins/' + myItem.$id + '/awards'),
            giftObj = $firebaseArray(refLove),
            data = {
                name: myGift,
                date: Firebase.ServerValue.TIMESTAMP
            };
        giftObj.$add(data);
    }; //givelove

    $scope.deleteLove = function (checkinId, award) {
        var refLove = new Firebase(FIREBASE_URL + '/users/' + $scope.whichuser + '/meetings/' +
                                   $scope.whichmeeting + '/checkins/' + checkinId + '/awards/' + award),
            record = $firebaseObject(refLove);

        record.$remove(award);
    }; //deletelove

}]);//CheckInsController
