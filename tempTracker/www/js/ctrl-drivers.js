// *************************************************-->
// Created or modified by Thomas Südbröcker         -->
// All usage is on your own risk no guarantee       -->
// *************************************************-->
// *************************************************-->
// Objective: Get date from an external datasource using -->
//            MFP Adapter                                -->
// Comments:                                        -->
// *************************************************-->
angular.module('app.ctrl-drivers', ['ngCordova'])

.controller('DriversCtrl',function($scope, $state, $cordovaSpinnerDialog, ExchangeData){
  $scope.comrades = [];
  console.log('Info: "ExchangeData.securityOn.fake" : ', ExchangeData.securityOn.fake);

  if (ExchangeData.securityOn.fake == false) {
      $scope.displayError = ExchangeData.securityOn.state;
      console.log('Info: "$scope.displayError" : ', $scope.displayError);
      $scope.displayErrorMessage = ExchangeData.securityOn.errorMessage;
      console.log('Info: "$scope.displayErrorErrorMessage" : ', $scope.displayErrorErrorMessage);
  }

  var comradesRequest = new WLResourceRequest(
    "/adapters/comradeAdapter/getComrades",
    WLResourceRequest.GET
  );

  comradesRequest.setQueryParameter("params", "[]");

  $cordovaSpinnerDialog.show("Getting Data","Waiting for data", true);

  comradesRequest.send().then(
    getComradesSuccess,
    getComradesFailure
  );

  function getComradesSuccess (result){
     console.log('Success, we got a comrades list results', result.responseJSON.results);
     $scope.comrades = result.responseJSON.results;
     $cordovaSpinnerDialog.hide();
     $scope.$apply();
  };

  function getComradesFailure (result){
     console.log('Failure getting a comrades list', result);
     $cordovaSpinnerDialog.hide();
  }

  $scope.goto = function(comrade) {
    console.log('Current comrade source', comrade);
    ExchangeData.comrade = comrade;
    console.log('Current comrade destination',ExchangeData.comrade);
    $state.go('details');
  }

  $scope.gotoLogout = function(comrade) {
     //  $state.go('logout');
     console.log('Logout',ExchangeData);
     if (ExchangeData.securityOn.fake == false){
        WL.Client.logout('AuthRealm');
        ExchangeData.securityOn.state = false;
        ExchangeData.securityOn.errorMessage = '';
        ExchangeData.securityOn.username = '';
        ExchangeData.securityOn.password = '';
        ExchangeData.securityOn.fake = undefined;
     }
     $state.go('login');
  }
})
