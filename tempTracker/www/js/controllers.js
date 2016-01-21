// *************************************************-->
// Created or modified by Thomas Südbröcker         -->
// All usage is on your own risk no guarantee       -->
// *************************************************-->
// *************************************************-->
// Objective: Provide the detailed information of a selcted data  -->
//            Get data from cloudant -->
// Comments:  'DetailsCtrl','CloudantCtrl'                                      -->
// *************************************************-->
angular.module('app.controllers', ['uiGmapgoogle-maps','ngCordova'])

// Exchange Data Factory
.controller('DetailsCtrl',function($scope, ExchangeData){
    $scope.currentComrade = ExchangeData.comrade;
    console.log('Greatings from DetailsCtrl Getting the ExchangeData.comrade', ExchangeData.comrade);
    console.log('Greatings from DetailsCtrl the $scope.currentComarde', $scope.currentComrade);
})

// ***********************************************
//                Cloudant Data
//                =============
// 1) Get Data from cloudants
// 2) Able go to Details
// 3) Able go to watsonOutput
// ***********************************************
.controller('CloudantCtrl',function($scope, $state, ExchangeData){
  $scope.cloudants = [];

  var cloudantRequest = new WLResourceRequest(
    "/adapters/CloudantAdapter/getAllDocs",
    WLResourceRequest.GET
  );

  cloudantRequest.setQueryParameter("params", "[]");

  cloudantRequest.send().then(
    getCloudantSuccess,
    getCloudantFailure
  );

  function getCloudantSuccess (result){
     console.log('Success, we got a cloundant list step 1) responseJSON', result.responseJSON);
     console.log('Success, we got a cloundant list step 2) responseJSON.rows', result.responseJSON.rows);
     $scope.cloudants = result.responseJSON.rows;
     $scope.$apply();
  };

  function getCloudantFailure (result){
     console.log('Failure getting a cloudant list', result);
  };

  $scope.gotoDetail = function(cloudant) {
    console.log('Current cloudant source', cloudant);
    ExchangeData.cloudant = cloudant;
    console.log('Current cloudant destination',ExchangeData.cloudant);
    $state.go('detailscloudant');
  };

  $scope.gotoWatsonOutput = function() {
    //$state.go('watsonOutput');
    $state.go('watsonBrowserOutput');
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
