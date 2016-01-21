angular.module('app.ctrl-find', ['ngCordova'])

// ***********************************************
//                Cloudant Data
//                =============
// 1) Get Data from cloudants using searchIndex
// 2) Able go to Details
// ***********************************************
.controller('FindCtrl',function($scope, $state, $cordovaSpinnerDialog, ExchangeData){
  $scope.cloudants = [];
  $scope.showRowCount = false;
  $scope.rowCountFooter = "Rows: 0";
  $scope.chartHeadline = "Default Chart Title";
  var database = '/my_demo_iot_db';
  var designDocName = '_d_search';
  var searchIndex = '_inx_all'; // viewName
  var query = 'theStatus:C*';
  var message = '';
  $cordovaSpinnerDialog.hide();

  $scope.selectUpdated = function (optionValueSelected, searchValue){
     console.log('optionValueSelected', optionValueSelected);
     $cordovaSpinnerDialog.hide();

     if ( optionValueSelected == "DeviceID") {
        if (searchValue == undefined){
          searchValue = '08*'
        }
        query = 'theDeviceId:' + searchValue;
        message = 'NO item found for DeviceID, with searchValue:' + searchValue;
        ExchangeData.cloudants.chartHeadline="DeviceID";
     }
     if ( optionValueSelected == "Status") {
       if (searchValue == undefined){
         searchValue = 'C*'
       }
       query = 'theStatus:' + searchValue;
       message = "NO item found for Status, with searchValue:" + searchValue;
       ExchangeData.cloudants.chartHeadline="Status";
     }
     if ( optionValueSelected == "Temp") {
       if (searchValue == undefined){
         searchValue = '20.1*'
       }
       query = 'theTemp:' + searchValue;
       message = 'NO item found for Temp, with searchValue:' + searchValue;
       ExchangeData.cloudants.chartHeadline="Temp";
     }
     if ( optionValueSelected == "Date") {
       if (searchValue == undefined){
         searchValue = '20*'
       }
       query = 'theDate:' + searchValue;
       message = 'NO item found for Date, with searchValue:' + searchValue;
       ExchangeData.cloudants.chartHeadline="Status";
     }

     console.log('query: ', query);

     var cloudantRequest = new WLResourceRequest(
         "/adapters/CloudantAdapter/find",
         WLResourceRequest.GET
     );
     // (name, designDocName, searchIndex, query)
     cloudantRequest.setQueryParameter("params", [database,
                                                  designDocName,
                                                  searchIndex,
                                                  query]);

     cloudantRequest.send().then(
          getFindSuccess,
          getFindFailure
     );

     function getFindSuccess (result){
          console.log('Success, we got a cloundant list step 1) responseJSON', result.responseJSON);
          console.log('Success, we got a cloundant list step 2) responseJSON.rows', result.responseJSON.rows);

          if (result.responseJSON.total_rows == 0){
            WL.SimpleDialog.show(
               " " + message + " ", "Try it again later.",
               [{text: "OK, thanks", handler: function() {WL.Logger.debug(message); }
               }]
            );
          }

          $scope.cloudants = result.responseJSON.rows;
          $scope.rowCountFooter = "Rows: " + result.responseJSON.total_rows;
          $scope.showRowCount = true;
          $cordovaSpinnerDialog.hide();
          $scope.$apply();
     };

     function getFindFailure (result){
        console.log('Failure getting a seach cloudant list : ', result);
        $cordovaSpinnerDialog.hide();
        WL.SimpleDialog.show(
           message , "Try it again later.",
           [{text: "OK, thanks", handler: function() {WL.Logger.debug(message); }
           }]
        );
     };
  }

  $scope.searchUpdated = function (optionValueSelected, searchValue){
     console.log('optionValueSelected', optionValueSelected);

     $cordovaSpinnerDialog.show("Getting Data","Waiting for data", true);

     if ( optionValueSelected == "DeviceID") {
        if (searchValue == undefined){
          searchValue = '08*'
        }
        query = 'theDeviceId:' + searchValue;
        message = 'NO item found for DeviceID, with searchValue:' + searchValue;
        $scope.chartHeadline="DeviceID";
     }
     if ( optionValueSelected == "Status") {
       if (searchValue == undefined){
         searchValue = 'C*'
       }
       query = 'theStatus:' + searchValue;
       message = "NO item found for Status, with searchValue:" + searchValue;
       $scope.chartHeadline="Status";
     }
     if ( optionValueSelected == "Temp") {
       if (searchValue == undefined){
         searchValue = '20.1*'
       }
       query = 'theTemp:' + searchValue;
       message = 'NO item found for Temp, with searchValue:' + searchValue;
       $scope.chartHeadline="Temp";
     }
     if ( optionValueSelected == "Date") {
       if (searchValue == undefined){
         searchValue = '*2016'
       }
       query = 'theDate:' + searchValue;
       message = 'NO item found for Date, with searchValue:' + searchValue;
       $scope.chartHeadline="Date";
     }

     if ( optionValueSelected == undefined) {
       if (searchValue == undefined){
         searchValue = 'C*'
       }
       query = 'theStatus:' + searchValue;
       message = "NO item found for Status (Default Search), with searchValue:" + searchValue;
       $scope.chartHeadline="Status";
     }

     console.log('query: ', query);

     var cloudantRequest = new WLResourceRequest(
         "/adapters/CloudantAdapter/find",
         WLResourceRequest.GET
     );
     // (name, designDocName, searchIndex, query)
     cloudantRequest.setQueryParameter("params", [database,
                                                  designDocName,
                                                  searchIndex,
                                                  query]);

     cloudantRequest.send().then(
          getFindSuccess,
          getFindFailure
     );

     function getFindSuccess (result){
          console.log('Success, we got a cloundant list step 1) responseJSON', result.responseJSON);
          console.log('Success, we got a cloundant list step 2) responseJSON.rows', result.responseJSON.rows);

          if (result.responseJSON.total_rows == 0){
                WL.Logger.debug(message);
          }

          $scope.cloudants = result.responseJSON.rows;
          ExchangeData.cloudants = result.responseJSON.rows;
          ExchangeData.cloudants.total_rows = result.responseJSON.total_rows;
          ExchangeData.cloudants.chartHeadline = $scope.chartHeadline;
          $scope.rowCountFooter = "Rows: " + result.responseJSON.total_rows;
          $scope.showRowCount = true;
          $cordovaSpinnerDialog.hide();
          $scope.$apply();
     };

     function getFindFailure (result){
        $cordovaSpinnerDialog.hide();
        console.log('Failure getting a seach cloudant list : ', result);
        WL.Logger.debug(result);
     };
  }

  $scope.gotoLogout = function(cloudant) {
     //  $state.go('logout');
     $cordovaSpinnerDialog.hide();
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

  $scope.gotoChart = function(cloudants) {
     //  $state.go('logout');
     console.log('ExchangeData.cloundants: ', ExchangeData.cloudants );
     $cordovaSpinnerDialog.hide();
     if( $scope.showRowCount == false ) {
       WL.SimpleDialog.show(
         "Not Data for a chart!" , "Get chart data first.",
         [{text: "OK, thanks", handler: function() {WL.Logger.debug("Not Data for a chart!"); }
         }]
       );
     } else {
       $state.go('chart');
     }
  }

  $scope.gotoDetail = function(cloudant) {
    //************************************************************
    //   GET DATA (Seach get doc data based on doc.ID)
    //************************************************************
    var database = '/my_demo_iot_db';
    // Build JSON sturcture
    var object = new Object();
    var doc = new Object();
    var sensordata = new Object();
    object.doc = doc;
    object.doc.sensordatavalue = sensordata;

    console.log('Current cloudant source:', cloudant);
    console.log('Request doc with ID:', cloudant.id );

    var cloudantGetRequest = new WLResourceRequest(
      "/adapters/CloudantAdapter/getDoc",
      WLResourceRequest.GET
    );

    cloudantGetRequest.setQueryParameter("params", [database,
                                                    cloudant.id]);

    cloudantGetRequest.send().then(
      getCloudantSuccess,
      getCloudantFailure
    );

    function getCloudantSuccess (result){
       console.log('Success, we got a result.responseJSON: ', result.responseJSON);
       //console.log('Success, we got a cloudant list', result.responseJSON.results);
       // Create clean data record!
       object.doc._id  = result.responseJSON._id;
       object.doc._rev = result.responseJSON._rev;
       object.doc.sensordatavalue.message = result.responseJSON.sensordatavalue.message;
       object.doc.sensordatavalue.temp    = result.responseJSON.sensordatavalue.temp;
       object.doc.sensordatavalue.irtemp  = result.responseJSON.sensordatavalue.irtemp;
       object.doc.sensordatavalue.date    = result.responseJSON.sensordatavalue.date;
       object.doc.sensordatavalue.time    = result.responseJSON.sensordatavalue.time;
       object.doc.sensordatavalue.optical = result.responseJSON.sensordatavalue.optical;
       object.doc.sensordatavalue.status  = result.responseJSON.sensordatavalue.status;
       object.doc.sensordatavalue.deviceId       = result.responseJSON.sensordatavalue.deviceId;
       object.doc.sensordatavalue.deviceType     = result.responseJSON.sensordatavalue.deviceType;
       object.doc.sensordatavalue.deviceImageURI = result.responseJSON.sensordatavalue.deviceImageURI;
       object.doc.sensordatavalue.image          = result.responseJSON.sensordatavalue.image;
       object.doc.sensordatavalue.imageLocalURI  = result.responseJSON.sensordatavalue.imageLocalURI;
       object.doc.sensordatavalue.sensorType     = result.responseJSON.sensordatavalue.sensorType;
       object.doc.sensordatavalue.sensorImage    = result.responseJSON.sensordatavalue.sensorImage;
       object.doc.sensordatavalue.comment        = result.responseJSON.sensordatavalue.comment;
       object.doc.sensordatavalue.gtfs_latitude  = result.responseJSON.sensordatavalue.gtfs_latitude;
       object.doc.sensordatavalue.gtfs_longitude = result.responseJSON.sensordatavalue.gtfs_longitude;

       console.log('New object format: ', object);
       console.log('object.doc._id: ', object.doc._id);
       console.log('object.doc._rev: ', object.doc._rev);

       ExchangeData.cloudant = object;

       console.log('Current cloudant destination',ExchangeData.cloudant);
       $state.go('detailscloudant');
    }

    function getCloudantFailure (result){
        console.log('Failure getting a doc', result);
        WL.SimpleDialog.show(
           "Details can not be loaded", "Try it again later.",
           [{text: "OK, thanks", handler: function() {WL.Logger.debug("Details can not be loaded"); }
           }]
        );
        $state.go('maincloudant');
    }
  };
})
