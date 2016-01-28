// *************************************************-->
// Created or modified by Thomas Südbröcker         -->
// All usage is on your own risk no guarantee       -->
// *************************************************-->
// *************************************************-->
// Objective: Handle the Logout for MFP Auth        -->
// Comments:                                        -->
// *************************************************-->
angular.module('app.ctrl-logout', ['ngCordova'])

.controller('LogoutCtrl',function($scope, $state, ExchangeData){
  console.log('Info: "ExchangeData" : ', ExchangeData);

  $scope.gotoRelogin() = function() {
    console.log('Info: "ExchangeData" : ', ExchangeData);
    /*
    if (ExchangeData.securityOn.fake == false) {
        WL.Client.logout('AuthRealm');
        ExchangeData.securityOn.state = false;
        ExchangeData.securityOn.errorMessage = '';
        ExchangeData.securityOn.username = '';
        ExchangeData.securityOn.password = '';
        ExchangeData.securityOn.fake = undefined;
        $state.go('login');
    } else {
      ExchangeData.securityOn.state = false;
      ExchangeData.securityOn.errorMessage = '';
      ExchangeData.securityOn.username = '';
      ExchangeData.securityOn.password = '';
      ExchangeData.securityOn.fake = undefined;
      $state.go('login');
    }
    */
  };
})
