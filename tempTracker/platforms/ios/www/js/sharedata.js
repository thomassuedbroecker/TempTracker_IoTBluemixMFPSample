angular.module('app.factories', [])
// Exchange Data between Modules
// Usage in Controller:
//  SOURCE OF DATA       .controller('MainCtrl',function($scope, $state, ExchangeData)
//                       " ... $scope.goto = function(comrade)  ...."
//  DESTINATINO OF DATA  .controller('DetailsCtrl',function($scope, ExchangeData)
//  Usage in html
//   <ion-item style="" class="item-thumbnail-left" ng-repeat="comrade in comrades| filter:searchText" ng-click="goto(comrade)">
.factory('ExchangeData', function(){
  return {
    comrade: {},
    cloudant: {},
    cloudants: {},
    photo_image: {},
    photo_source: {},
    securityOn: {}
  };
})

// Definition of a own camera function
.factory('Camera', ['$q', function($q){

  return {
    getPicture: function() {
      var q = $q.defer();
      console.log('getPicture :',q)
      navigator.camera.getPicture(function(result) {
        // Do any magic you need
        console.log('Result (get.Picture) : ',result);
        q.resolve(result);
      }, function(err) {
        console.log('Error (q.reject) : ',err);
        q.reject(err);
      },{
        quality: 75,
        targetWidth: 320,
        targetHeight: 320,
        saveToPhotoAlbum: false,
        encodingType: 0
      });
      return q.promise;
    }
  }
}])
