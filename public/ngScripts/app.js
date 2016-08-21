
  // Initialize Firebase
  var config = {
    apiKey: "AIzaSyAhhAGbmMJqX6SKSGAto6T_AWn_GlddYr4",
    authDomain: "mhv-yellow-pages.firebaseapp.com",
    databaseURL: "https://mhv-yellow-pages.firebaseio.com",
    storageBucket: "mhv-yellow-pages.appspot.com",
  };
  firebase.initializeApp(config);
    
var app=angular.module("app",['ngRoute','firebase']);

// for ngRoute
app.run(["$rootScope", "$location", function($rootScope, $location) {
  $rootScope.$on("$routeChangeError", function(event, next, previous, error) {
    // We can catch the error thrown when the $requireSignIn promise is rejected
    // and redirect the user back to the home page
    if (error === "AUTH_REQUIRED") {
      $location.path("/home");
    }
  });
}]);

app.config(["$routeProvider", function($routeProvider) {
  $routeProvider.when("/home", {
    // the rest is the same for ui-router and ngRoute...
    controller: "HomeCtrl",
    templateUrl: "views/home.html",
    resolve: {
      // controller will not be loaded until $waitForSignIn resolves
      // Auth refers to our $firebaseAuth wrapper in the factory below
      "currentAuth": ["Auth", function(Auth) {
        // $waitForSignIn returns a promise so the resolve waits for it to complete
        return Auth.$waitForSignIn();
      }]
    }
  }).when("/account", {
    // the rest is the same for ui-router and ngRoute...
    controller: "AccountCtrl",
    templateUrl: "views/account.html",
    resolve: {
      // controller will not be loaded until $requireSignIn resolves
      // Auth refers to our $firebaseAuth wrapper in the factory below
      "currentAuth": ["Auth", function(Auth) {
        // $requireSignIn returns a promise so the resolve waits for it to complete
        // If the promise is rejected, it will throw a $stateChangeError (see above)
        return Auth.$requireSignIn();
      }]
    }
  }).otherwise({redirectTo:'/home'});
}]);

app.controller("HomeCtrl", ["currentAuth","$log", "Auth",function(currentAuth,$log,Auth) {
  // currentAuth (provided by resolve) will contain the
  // authenticated user or null if not signed in
  $log.log(currentAuth);
  if(currentAuth===null){
    var provider = new firebase.auth.FacebookAuthProvider();
			provider.addScope('public_profile');
			provider.addScope('email');
      provider.addScope('user_birthday');
    Auth.$signInWithPopup("facebook").then(function(authData) {
    console.log("Logged in as:", authData.uid);
  }).catch(function(error) {
    console.log("Authentication failed:", error);
  });
  }
}]);

app.controller("AccountCtrl", ["currentAuth", function(currentAuth) {
  // currentAuth (provided by resolve) will contain the
  // authenticated user or null if not signed in
}]);

app.factory("Auth", ["$firebaseAuth",
  function($firebaseAuth) {
    return $firebaseAuth();
  }
]);