// *************************************************-->
// Created or modivied by Thomas Südbröcker         -->
// All usage is on your own risk no guarantee       -->
// *************************************************-->
// *************************************************-->
// Objective: Handle the Auth with MFP MFP adapter Auth -->
// Comments:                                        -->
// *************************************************-->
angular.module('app.ctrl-login', ['ngCordova'])

.controller('LoginCtrl',function($scope, $state, ExchangeData){

  // Only works with the local server and with the MFP starter does not allow customer security
  $scope.doLogin = function(username, password) {
    if ( username == undefined) {
       username = "NO VALUE";
    }
    if ( password == undefined) {
       password = "NO VALUE";
    }

    ExchangeData.securityOn.username = username;
    ExchangeData.securityOn.password = password;
    ExchangeData.securityOn.fake = false;
    $scope.displayError = false;
    $scope.displayErrorMessage = '';

    var AuthRealmChallengeHandler = WL.Client.createChallengeHandler("AuthRealm");
    console.log('AuthRealmChallengeHandler : ', AuthRealmChallengeHandler);

    // Extract AuthAdapter Information
    AuthRealmChallengeHandler.isCustomResponse = function(response) {
    	if (!response || !response.responseJSON	|| response.responseText === null) {
    		return false;
    	}
    	if (typeof(response.responseJSON.authStatus) !== 'undefined'){
    		return true;
    	} else {
    		return false;
    	}
    };

    AuthRealmChallengeHandler.handleChallenge = function(response){
    	var authStatus = response.responseJSON.authStatus;

    	if (authStatus == "credentialsRequired"){
    		console.log('authStatus "credentialsRequired" : ', authStatus);
    		if (response.responseJSON.errorMessage) {
            console.log('authStatus "credentialsRequired" errorMessage: ', response.responseJSON.errorMessage);
            $scope.displayError = true;
            $scope.displayErrorMessage = response.responseJSON.errorMessage;
            ExchangeData.securityOn.state = false;
            ExchangeData.securityOn.displayError = true;
            ExchangeData.securityOn.errorMessage = response.responseJSON.errorMessage;
            $scope.$apply();
        }

    	} else if (authStatus == "complete"){
        console.log('authStatus "complete" : ', authStatus);
    		AuthRealmChallengeHandler.submitSuccess();
        $scope.displayError = false;
        ExchangeData.securityOn.displayError = false;
        $scope.$apply();
        $state.go('intro');
    	}
    }

    // Call AuthAdapter
    var invocationData = {
      adapter : "tempTrackerAuthAdapter",
      procedure : "submitAuthentication",
      parameters : [ username, password ]
    }

    AuthRealmChallengeHandler.submitAdapterAuthentication(invocationData, {});
  };

  // Enable fake
  $scope.doLoginFake = function() {
    ExchangeData.securityOn.fake = true;
    $state.go('intro');
  }
})
