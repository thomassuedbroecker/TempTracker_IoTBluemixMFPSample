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
