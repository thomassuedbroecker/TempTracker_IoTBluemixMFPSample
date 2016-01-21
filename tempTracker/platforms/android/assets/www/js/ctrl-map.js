angular.module('app.ctrl-map', ['uiGmapgoogle-maps','ngCordova'])
// ***********************************************
//                Location sample
// http://www.joshmorony.com/integrating-google-maps-with-an-ionic-application/
// 0) Get actual Data-Record in the App
// 1) Define Position by Given Data from the Senor Data-Record
// 2) Define the MAP Option how to display the map
// 3) Define a Marker to add additional information into the map
// 4) Load the map
// 5) Position the marker
// ***********************************************
.controller('MapCtrl', function($scope, $state, $cordovaGeolocation, ExchangeData) {
   var options = {timeout: 10000, enableHighAccuracy: true};
   console.log('MapCtrl ExchangeData.cloudant: ', ExchangeData.cloudant);
   // Make data available
   var data = ExchangeData.cloudant;
   $scope.cloundant = ExchangeData.cloudant;
   
   console.log('MapCtrl Controller Data: ', data);
   // LOADING CURRENT LOCATION
     // DEFINE OWN LOCATION and Information
     var latLng = new google.maps.LatLng(data.doc.sensordatavalue.gtfs_latitude, data.doc.sensordatavalue.gtfs_longitude);
     var sensorposition ="Device: (" + data.doc.sensordatavalue.deviceId + ") Status: (" + data.doc.sensordatavalue.status +") Date: ("+ data.doc.sensordatavalue.date + ") Time: (" + data.doc.sensordatavalue.time +")";
     //var sensorposition-html = "<P>" + sensorposition + " "
     console.log('Title Marker: ', sensorposition);

     var mapOptions = {
       center: latLng,
       zoom: 15,
       mapTypeId: google.maps.MapTypeId.ROADMAP
     };

     // Define Map
     $scope.map = new google.maps.Map(document.getElementById("map"), mapOptions);

     // The marker must exist!
     var marker = '';
     var infowindow = new google.maps.InfoWindow({
          content: sensorposition
     });

     //Wait until the map is loaded
     google.maps.event.addListenerOnce($scope.map, 'idle', function(){
       marker = new google.maps.Marker({
           map: $scope.map,
           animation: google.maps.Animation.DROP,
           position: latLng,
           title: sensorposition
       });

       // Add show information into map
       marker.addListener('click', function() {
         infowindow.open(marker.get('map'), marker);
       });

     });
})
