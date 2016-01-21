angular.module('app.ctrl-cloudant-details', [])

// Exchange Data Factory
// Show get data
// Navigation to Map and Photo
.controller('DetailsCloundantCtrl',function($scope, $state, ExchangeData){
    $scope.currentCloudant = ExchangeData.cloudant;

    console.log('Greatings from DetailsCloundantCtrl Getting the ExchangeData.cloudant', ExchangeData.cloudant);
    console.log('Greatings from DetailsCloundantCtrl the $scope.currentCloudant', $scope.currentCloudant);

    $scope.gotoPhoto = function(cloudant) {
      console.log('gotoPhoto: Current cloudant source - ', cloudant);
      ExchangeData.cloudant = cloudant;
      console.log('gotoPhoto: Current cloudant destination -',ExchangeData.cloudant);
      $state.go('takephoto');
    }

    $scope.gotoLocation = function(cloudant) {
      console.log('gotoLocation: Current cloudant source - ', cloudant);
      ExchangeData.cloudant = cloudant;
      console.log('gotoLocation: Current cloudant destination -',ExchangeData.cloudant);
      $state.go('map');
    }

    $scope.gotoNewLocation = function(cloudant) {
      console.log('gotoNewLocation: Current cloudant source - ', cloudant);
      ExchangeData.cloudant = cloudant;
      console.log('gotoNewLocation: Current cloudant destination -',ExchangeData.cloudant);
      $state.go('mapStore');
    }
})
