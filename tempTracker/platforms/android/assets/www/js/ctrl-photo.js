angular.module('app.ctrl-photo', ['ngCordova'])

// ***********************************************
//                Get Image
//    $scope.getPhoto = function(currentCloudant) {
//    0) Get actual Data-Record in the App
//    1) Get Photo
//    2) Get Right Image Path
//    3) Build JSON Structure
//    4) Load FULL DATA-RECOURD from existing Cloudant DB
//    5) Replace changed values
//    6) Update data in Cloudant
//
//    $scope.storeComment
//    0) Get actual Data-Record in the App
// ***********************************************
.controller('TakePhotoCtrl', function($scope, $state, $cordovaFile, Camera, ExchangeData) {
  $scope.currentCloudant = ExchangeData.cloudant;
  $scope.problem = [];

  console.log('$scope.currentCloudant: ', $scope.currentCloudant);

  $scope.storeComment = function(currentCloudant, problem) {
    //************************************************************
    //   GET DATA
    //************************************************************
    //$scope.problem = {comment:''};

    // Build JSON sturcture
    var doc = new Object();
    if(currentCloudant!=undefined)
    {
        ExchangeData.cloudant = currentCloudant;
    }  
    var data = ExchangeData.cloudant;
    var sensordata = new Object();
    doc.sensordatavalue = sensordata;
    var database = '/my_demo_iot_db';
    //$scope.problem = {comment:  "This is my scope comment" };

    console.log('storeComment-currentCloudant: ', currentCloudant);
    console.log('storeComment-problem: ', problem);
    console.log('storeComment-comment: ', ExchangeData.cloudant.doc.sensordatavalue.comment);

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
    // ******************************
    // On Success Prepare all data for saving
    // ******************************
    function getCloudantSuccess (result) {
        console.log('Success, we got a result.responseJSON: ', result.responseJSON);
        //console.log('Success, we got a cloudant list', result.responseJSON.results);
        // Create clean data record!
        doc._id  = result.responseJSON._id;
        doc._rev = result.responseJSON._rev;
        doc.sensordatavalue.message = result.responseJSON.sensordatavalue.message;
        doc.sensordatavalue.temp    = result.responseJSON.sensordatavalue.temp;
        doc.sensordatavalue.irtemp  = result.responseJSON.sensordatavalue.irtemp;
        doc.sensordatavalue.date    = result.responseJSON.sensordatavalue.date;
        doc.sensordatavalue.time    = result.responseJSON.sensordatavalue.time;
        doc.sensordatavalue.optical = result.responseJSON.sensordatavalue.optical;
        doc.sensordatavalue.status  = result.responseJSON.sensordatavalue.status;
        doc.sensordatavalue.deviceId = result.responseJSON.sensordatavalue.deviceId;
        doc.sensordatavalue.deviceType = result.responseJSON.sensordatavalue.deviceType;
        doc.sensordatavalue.deviceImageURI = result.responseJSON.sensordatavalue.deviceImageURI;
        doc.sensordatavalue.gtfs_latitude = result.responseJSON.sensordatavalue.gtfs_latitude;
        doc.sensordatavalue.gtfs_longitude = result.responseJSON.sensordatavalue.gtfs_longitude;
        doc.sensordatavalue.sensorType = result.responseJSON.sensordatavalue.sensorType;
        doc.sensordatavalue.sensorImage = result.responseJSON.sensordatavalue.sensorImage;
        doc.sensordatavalue.image = result.responseJSON.sensordatavalue.image;
        doc.sensordatavalue.imageLocalURI = result.responseJSON.sensordatavalue.imageLocalURI ;

        // +++++++++++++++++  Changed Data +++++++++++++++++++++++++
        // set comment
        if ( problem != undefined) {
           doc.sensordatavalue.comment = problem.comment;
        } else {
           doc.sensordatavalue.comment = result.responseJSON.sensordatavalue.comment ;
        }

        console.log('New Doc format: ', doc);
        console.log('doc._id: ', doc._id);
        console.log('doc._rev: ', doc._rev);
        console.log('$scope.comment: ', $scope.problem.comment);

        ExchangeData.cloudant = doc;
        $scope.currentCloudant = ExchangeData.cloudant;
        console.log('$scope.currentCloudant: ', $scope.currentCloudant);

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
              "Comment was added", "Now back to Sensor Data List",
              [{text: "OK, thanks", handler: function() {WL.Logger.debug("Comment is updated"); }
              }]
           );
           $state.go('maincloudant');
           $scope.currentCloudant = ExchangeData.cloudant;
        };

        function updateFailure (result){
           console.log('Failure, data is NOT updated ', result);
           WL.SimpleDialog.show(
              "Comment was not added", "Please, try again later.",
              [{text: "OK, thanks", handler: function() {WL.Logger.debug("Comment is updated"); }
              }]
           );
        }
        //*********************************************************
    }

    function getCloudantFailure (error){
      console.log('Error: ', error);
      WL.SimpleDialog.show(
         "Can not Update Data", "Please, try again later.",
         [{text: "OK, thanks", handler: function() {WL.Logger.debug("Can not update"); }
         }]
      );

    }
  }

  $scope.getPhoto = function(currentCloudant) {
     var options = { quality: 50,
                     destinationType: navigator.camera.DestinationType.DATA_URL,
                     quality: 75,
                     targetWidth: 320,
                     targetHeight: 320,
                     saveToPhotoAlbum: false,
                     encodingType: 0
                   };
    //ExchangeData.cloudant = $scope.currentCloudant;
    Camera.getPicture(options).then(successGetPicture,failGetPicture,options);

    function successGetPicture (imageURI) {
        //var theFilename = imageURI.replace("file:///storage/emulated/0/Android/data/com.ibm.comrade/cache/", "");
        var theFilename = imageURI.replace(cordova.file.externalCacheDirectory, "");
        var theImageURI = imageURI;
        var data = ExchangeData.cloudant;
        var database = '/my_demo_iot_db';
        console.log('theFilename: ', theFilename);
        console.log('theImageURI: ', theImageURI);
        $scope.image = imageURI;

        // Read the file as DataURL
        //$cordovaFile.readAsDataURL(cordova.file.externalRootDirectory + "/Android/data/com.ibm.comrade/cache/",
        $cordovaFile.readAsDataURL(cordova.file.externalCacheDirectory,
                                   theFilename).then( successReadData , failReadData);

        function successReadData (success) {
            // success the dataURL is available
            console.log('Success: ', success);
            console.log('cordova.file.applicationDirectory',cordova.file.applicationDirectory);
            console.log('cordova.file.dataDirectory',cordova.file.dataDirectory);
            console.log('cordova.file.applicationStorageDirectory',cordova.file.applicationStorageDirectory);
            console.log('cordova.file.externalRootDirectory',cordova.file.externalRootDirectory);
            console.log('cordova.file.externalCacheDirectory',cordova.file.externalCacheDirectory);
            console.log('cordova.file.tempDirectory',cordova.file.tempDirectory);
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
            // ******************************
            // On Success Prepare all data for saving
            // ******************************
            function getCloudantSuccess (result) {
                console.log('Success, we got a result.responseJSON: ', result.responseJSON);
                //console.log('Success, we got a cloudant list', result.responseJSON.results);
                // Create clean data record!
                doc._id  = result.responseJSON._id;
                doc._rev = result.responseJSON._rev;
                doc.sensordatavalue.message = result.responseJSON.sensordatavalue.message;
                doc.sensordatavalue.temp    = result.responseJSON.sensordatavalue.temp;
                doc.sensordatavalue.irtemp  = result.responseJSON.sensordatavalue.irtemp;
                doc.sensordatavalue.date    = result.responseJSON.sensordatavalue.date;
                doc.sensordatavalue.time    = result.responseJSON.sensordatavalue.time;
                doc.sensordatavalue.optical = result.responseJSON.sensordatavalue.optical;
                doc.sensordatavalue.status  = result.responseJSON.sensordatavalue.status;
                doc.sensordatavalue.deviceId = result.responseJSON.sensordatavalue.deviceId;
                doc.sensordatavalue.deviceType = result.responseJSON.sensordatavalue.deviceType;
                doc.sensordatavalue.deviceImageURI = result.responseJSON.sensordatavalue.deviceImageURI;
                doc.sensordatavalue.gtfs_latitude = result.responseJSON.sensordatavalue.gtfs_latitude;
                doc.sensordatavalue.gtfs_longitude = result.responseJSON.sensordatavalue.gtfs_longitude;
                doc.sensordatavalue.sensorType = result.responseJSON.sensordatavalue.sensorType;
                doc.sensordatavalue.sensorImage = result.responseJSON.sensordatavalue.sensorImage;
                doc.sensordatavalue.comment  = result.responseJSON.sensordatavalue.comment;

                // +++++++++++++++++  Changed Data +++++++++++++++++++++++++
                // set Picture Data
                doc.sensordatavalue.image = success;
                // set temp image device location
                doc.sensordatavalue.imageLocalURI = $scope.image;
                console.log('theImageURI: ', $scope.image);
                console.log('New Doc format: ', doc);
                console.log('doc._id: ', doc._id);
                console.log('doc._rev: ', doc._rev);

                //$scope.cloudant = data;
                ExchangeData.cloudant = doc;
                $scope.currentCloudant = ExchangeData.cloudant;
                console.log('$scope.currentCloudant: ', $scope.currentCloudant);

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
                      "Picture was added", "Please at a comment",
                      [{text: "OK, thanks", handler: function() {WL.Logger.debug("Picture is updated"); }
                      }]
                   );
                };

                function updateFailure (result){
                   console.log('Failure, data is NOT updated ', result);
                   WL.SimpleDialog.show(
                      "Picture was not added", "Please, try again later.",
                      [{text: "OK, thanks", handler: function() {WL.Logger.debug("Picture was not updated"); }
                      }]
                   );
                }
                //*********************************************************
            }
            function getCloudantFailure (error){
              console.log('Error: ', error);
              WL.SimpleDialog.show(
                 "Picture was not added", "Please, try again later.",
                 [{text: "OK, thanks", handler: function() {WL.Logger.debug("Picture was not updated"); }
                 }]
              );
            }
        } // Get Camera

        function failReadData (error) {
           // error
           console.log('Error: ', error);
           WL.SimpleDialog.show(
              "Picture was not added", "Please, try again later.",
              [{text: "OK, thanks", handler: function() {WL.Logger.debug("Picture was not updated"); }
              }]
           );
        }
    }

    function failGetPicture (error){
        console.log('Error: ', error);
        WL.SimpleDialog.show(
           "Picture was not added", "Please, try again later.",
           [{text: "OK, thanks", handler: function() {WL.Logger.debug("Picture was not updated"); }
           }]
        );
    }
  }
}) // Controller End
