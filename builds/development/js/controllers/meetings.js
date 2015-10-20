appControllers.controller('MeetingsController', ['$scope', '$rootScope', 'FIREBASE_URL', '$firebaseObject', '$firebaseArray', '$firebaseAuth', function ($scope, $rootScope, FIREBASE_URL, $firebaseObject, $firebaseArray, $firebaseAuth) {
    'use strict';

    var ref = new Firebase(FIREBASE_URL),
        authObj = $firebaseAuth(ref),
        authUser = authObj.$getAuth(); //get authenticated user

    if (authUser) {

        var meetingsref = new Firebase(FIREBASE_URL + 'users/' + authUser.uid + '/meetings'),
            meetingsObj = $firebaseObject(meetingsref),
            meetingsArray = $firebaseArray(meetingsref);

        meetingsObj.$loaded().then(function (data) {
            $scope.meetings = meetingsObj;
        }); //Meetings Object loaded

        meetingsArray.$loaded().then(function (data) {
            $rootScope.howManyMeetings = meetingsArray.length;
        }); //Meetings Array loaded

        meetingsArray.$watch(function (event) {
            $rootScope.howManyMeetings = meetingsArray.length;
        }); //Meetings Array watched

        $scope.addMeeting = function () {
            meetingsref.push({
                name: $scope.meetingname,
                date: Firebase.ServerValue.TIMESTAMP
            }, function () {
                $scope.meetingname = '';
            });
        }; //addMeeting

        $scope.deleteMeeting = function (key) {

            var meetingRef = new Firebase(FIREBASE_URL + '/users/' + authUser.uid + '/meetings/' + key);

                /*meetingData = $firebaseObject(meetingRef);
                meetingData.$remove();*/

            meetingRef.remove();

        }; //deleteMeeting
    } //user exists

}]);//MeetingsController
