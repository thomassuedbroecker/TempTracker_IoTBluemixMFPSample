// *************************************************-->
// Created or modified by Thomas Südbröcker         -->
// All usage is on your own risk no guarantee       -->
// *************************************************-->
// *************************************************-->
// Objective: Provide the main Navigation           -->
// Comments:                                        -->
// *************************************************-->

angular.module('app.ctrl-intro', ['ngCordova'])

.controller('IntroCtrl',function($scope, $state, ExchangeData){

  $scope.gotoDrivers = function() {
    $state.go('drivers');
  }

  $scope.gotoSensors = function() {
    $state.go('maincloudant');
  }

  $scope.gotoCritialSensors = function() {
    $state.go('find');
  }
})
