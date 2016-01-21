angular.module('app.ctrl-store-device-location', ['uiGmapgoogle-maps','ngCordova'])

// ***********************************************
//                Location sample
// http://www.joshmorony.com/integrating-google-maps-with-an-ionic-application/
// How to send a request
// https://github.com/MobileFirst-Platform-Developer-Center/CloudantAdapter/blob/release71/apps/CloudantSampleApp/common/js/CloudantJS.js
// 0) Get actual Data-Record in the App
// 1) Get the actual position from the device
// 2) Define the MAP Option how to display the map
// 3) Define a Marker to add additional information into the map
// 4) Load the map
// 5) Position the marker
// 6) Get the actual full Data-Record from the cloudant DB
// 7) Change the values for the location
// 8) Update the full Data-Record in the cloudant DB
// ***********************************************
.controller('MapStoreCtrl', function($scope, $state, $cordovaGeolocation, $cordovaSpinnerDialog, ExchangeData) {
   var options = {timeout: 10000, enableHighAccuracy: true};
   console.log('MapCtrl ExchangeData.cloudant: ', ExchangeData.cloudant);
   // Make data available
   var data = ExchangeData.cloudant;
   var database = '/my_demo_iot_db';
   console.log('MapCtrl Controller Data: ', data);

   // LOADING CURRENT LOCATION
   $cordovaGeolocation.getCurrentPosition(options).then(function(position){
     var latLng = new google.maps.LatLng(position.coords.latitude, position.coords.longitude);
     data.doc.sensordatavalue.gtfs_latitude = ""+position.coords.latitude+"";
     data.doc.sensordatavalue.gtfs_longitude = ""+position.coords.longitude+"";
     var sensorposition ="New Postion - Device: (" + data.doc.sensordatavalue.deviceId + ") Status: (" + data.doc.sensordatavalue.status +") Date: ("+ data.doc.sensordatavalue.date + ") Time: (" + data.doc.sensordatavalue.time +")";
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

     //************************************************************
     //   GET DATA
     //************************************************************

     // Build JSON sturcture
     var doc = new Object();
     var sensordata = new Object();
     doc.sensordatavalue = sensordata;

     var cloudantGetRequest = new WLResourceRequest(
       "/adapters/CloudantAdapter/getDoc",
       WLResourceRequest.GET
     );

     console.log('Request doc with ID:', data.doc._id);
     cloudantGetRequest.setQueryParameter("params", [database,
                                                     data.doc._id]);

     cloudantGetRequest.send().then(
       getCloudantSuccess,
       getCloudantFailure
     );

     function getCloudantSuccess (result){
        console.log('Success, we got a result.responseJSON: ', result.responseJSON);
        //console.log('Success, we got a cloudant list', result.responseJSON.results);
        // Create clean data record!
        doc._id  = result.responseJSON._id;
        doc._rev = result.responseJSON._rev;
        doc.sensordatavalue.message = result.responseJSON.sensordatavalue.message;
        doc.sensordatavalue.temp    = result.responseJSON.sensordatavalue.temp;
        doc.sensordatavalue.irtemp   = result.responseJSON.sensordatavalue.irtemp;
        doc.sensordatavalue.date    = result.responseJSON.sensordatavalue.date;
        doc.sensordatavalue.time    = result.responseJSON.sensordatavalue.time;
        doc.sensordatavalue.optical = result.responseJSON.sensordatavalue.optical;
        doc.sensordatavalue.status  = result.responseJSON.sensordatavalue.status;
        doc.sensordatavalue.deviceId = result.responseJSON.sensordatavalue.deviceId;
        doc.sensordatavalue.deviceType = result.responseJSON.sensordatavalue.deviceType;
        doc.sensordatavalue.deviceImageURI = result.responseJSON.sensordatavalue.deviceImageURI;
        doc.sensordatavalue.image = result.responseJSON.sensordatavalue.image;
        doc.sensordatavalue.imageLocalURI = result.responseJSON.sensordatavalue.imageLocalURI;
        doc.sensordatavalue.sensorType = result.responseJSON.sensordatavalue.sensorType;
        doc.sensordatavalue.sensorImage = result.responseJSON.sensordatavalue.sensorImage;
        doc.sensordatavalue.comment  = result.responseJSON.sensordatavalue.comment;

        // +++++++++++++++++  Changed Data +++++++++++++++++++++++++
        doc.sensordatavalue.gtfs_latitude = ""+position.coords.latitude+"";
        doc.sensordatavalue.gtfs_longitude = ""+position.coords.longitude+"";

        console.log('New Doc format: ', doc);
        console.log('doc._id: ', doc._id);
        console.log('doc._rev: ', doc._rev);

        //************************************************************
        //   UPDATE DATA
        // https://docs.cloudant.com/document.html#read
        // To update (or create) a document, make a PUT request with the updated JSON content and the latest _rev value (not needed for creating new documents) to https://$USERNAME.cloudant.com/$DATABASE/$DOCUMENT_ID.
        //************************************************************
        var cloudantUpdateRequest = new WLResourceRequest(
          "/adapters/CloudantAdapter/updateDoc",
          WLResourceRequest.POST
        );
        cloudantUpdateRequest.setQueryParameter("params", [database,
                                                           doc._id,
                                                           doc._rev,
                                                           doc] );
        cloudantUpdateRequest.send().then(
          updateSuccess,
          updateFailure
        );

        function updateSuccess (result){
           console.log('Success, data is updated', result);
           WL.SimpleDialog.show(
              "Geo Location Updated", "You can continue using the application",
              [{text: "OK, thanks", handler: function() {WL.Logger.debug("Picture is updated"); }
              }]
           );
        };

        function updateFailure (result){
           console.log('Failure, data is NOT updated ', result);
           WL.SimpleDialog.show(
              "Geo Location can not be Updated", "Try it again later.",
              [{text: "OK, thanks", handler: function() {WL.Logger.debug("Picture is not updated"); }
              }]
           );
        }
     };

     function getCloudantFailure (result){
        console.log('Failure getting a doc', result);
        WL.SimpleDialog.show(
           "Geo Location can not be Updated", "Try it again later.",
           [{text: "OK, thanks", handler: function() {WL.Logger.debug("Picture is not updated"); }
           }]
        );
      }
   }, function(error){
     console.log("Could not get location");
     WL.SimpleDialog.show(
        "Can not Get the Geo Location of your Device", "Please, Check your Setting for Geo Location.",
        [{text: "OK, thanks", handler: function() {WL.Logger.debug("Can not get Geo Location on Device"); }
        }]
     );
   });
})
