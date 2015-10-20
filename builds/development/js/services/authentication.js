myApp.factory('Authentication', ['$rootScope', '$firebaseAuth', '$firebaseObject', 'FIREBASE_URL', '$location', function ($rootScope, $firebaseAuth, $firebaseObject, FIREBASE_URL, $location) {

    'use strict';

    var ref = new Firebase(FIREBASE_URL),
        authObj = $firebaseAuth(ref),
        factoryObject = {

            register: function (user) {
                return ref.createUser({
                    email: user.email,
                    password: user.password
                }, function (error, userData) {
                    if (error) {
                        $rootScope.registerMsg = error.toString();
                    } else {
                        var ref = new Firebase(FIREBASE_URL + 'users'),
                            userInfo = {
                                date: Firebase.ServerValue.TIMESTAMP,
                                regUser: userData.uid,
                                firstname: user.firstname,
                                lastname: user.lastname,
                                email: user.email
                            };

                        ref.child(userData.uid).set(userInfo);

                        factoryObject.login(user); //authenticate / login user
                    }
                });
            }, //register

            login: function (user) {
                return ref.authWithPassword({
                    email: user.email,
                    password: user.password
                }, function (error, authData) {
                    if (error) {
                        $rootScope.loginMsg = error.toString();
                    } else {
                        $location.path('/meetings');
                    }
                });
            },//login

            logout: function (user) {
                authObj.$unauth();
                $rootScope.currentUser = null;
            }//logout

        }; //factoryObject

    authObj.$onAuth(function (authUser) {

        if (authUser) {

            var ref = new Firebase(FIREBASE_URL + 'users/' + authUser.uid),
                user = $firebaseObject(ref);

            $rootScope.currentUser = user;

        } else {
            $rootScope.currentUser = null;
        }

    }); //$onAuth

    $rootScope.signedIn = function () {
        return $rootScope.currentUser;
    };

    return factoryObject;
}]);
