// *************************************************-->
// Created or modivied by Thomas Südbröcker         -->
// All usage is on your own risk no guarantee       -->
// *************************************************-->
// *************************************************-->
// Objective: App combines all needed controllers of the app   -->
//            and provides the states of the app.              -->
//            This is the overall naviation inside the app.    -->
//            Calling the right module (business logic) and the right ->>
//            presentation (template) based on the state -->
// Comments:                                        -->
// *************************************************-->

angular.module('app', ['ionic',
                       'ngCordova',
                       'uiGmapgoogle-maps',
                       'chart.js',
                       'app.controllers',
                       'app.factories',
                       'app.ctrl-login',
                       'app.ctrl-logout',
                       'app.ctrl-cloudant-details',
                       'app.ctrl-drivers',
                       'app.ctrl-chart',
                       'app.ctrl-intro',
                       'app.ctrl-find',
                       'app.ctrl-map',
                       'app.ctrl-photo',
                       'app.ctrl-store-device-location',
                       'app.ctrl-watson-output'])

.config(function($stateProvider, $urlRouterProvider) {
  console.log("Config Started successfully");
  // Ionic uses AngularUI Router which uses the concept of states
  // Learn more here: https://github.com/angular-ui/ui-router
  // Set up the various states which the app can be in.
  // Each state's controller can be found in controllers.js
  $stateProvider

  // **********************************
  //      Security
  // **********************************
    .state('login', {
      url: '/login',
      cache: false,
      controller: 'LoginCtrl',
      templateUrl: 'templates/login.html'
    })

    .state('logout', {
      url: '/logout',
      cache: false,
      controller: 'LogoutCtrl',
      templateUrl: 'templates/logout.html'
    })

    // **********************************
    //       Welcome
    // **********************************
    .state('intro', {
      url: '/intro',
      cache: false,
      controller: 'IntroCtrl',
      templateUrl: 'templates/intro.html'
    })

    // **********************************
    //       DRIVERS DATA
    // **********************************
    .state('drivers', {
      url: '/drivers',
      cache: false,
      controller: 'DriversCtrl',
      templateUrl: 'templates/all_drivers.html'
    })

    .state('details', {
      url: '/details',
      cache: false,
      controller: 'DetailsCtrl',
      templateUrl: 'details.html'
    })

    // **********************************
    //       CLOUNDANT DATA
    // **********************************
    .state('maincloudant', {
      url: '/maincloudant',
      cache: false,
      controller: 'CloudantCtrl',
      templateUrl: 'maincloudant.html'
    })

    .state('find', {
      url: '/find',
      cache: false,
      controller: 'FindCtrl',
      templateUrl: 'templates/find.html'
    })

    .state('chart', {
      url: '/chart',
      cache: false,
      controller: 'ChartCtrl',
      templateUrl: 'templates/chart.html'
    })

    .state('detailscloudant', {
      url: '/detailscloudant',
      cache: false,
      controller: 'DetailsCloundantCtrl',
      templateUrl: 'templates/detailscloudant.html'
    })

    .state('takephoto', {
      url: '/takephoto',
      cache: false,
      controller: 'TakePhotoCtrl',
      templateUrl: 'templates/takephoto.html'
    })

    // Sample Code : http://www.joshmorony.com/integrating-google-maps-with-an-ionic-application/
    .state('map', {
      url: '/map',
      templateUrl: 'templates/map.html',
      controller: 'MapCtrl'
    })

    // Sample Code : http://www.joshmorony.com/integrating-google-maps-with-an-ionic-application/
    .state('mapStore', {
      url: '/mapStore',
      templateUrl: 'templates/mapStore.html',
      controller: 'MapStoreCtrl'
    })

    .state('watsonOutput', {
      url: '/watsonOutput',
      templateUrl: 'templates/watsonoutput.html',
      controller: 'WatsonOutputCtrl'
    })

    .state('watsonBrowserOutput', {
      url: '/watsonBrowserOutput',
      templateUrl: 'templates/watsonbrowseroutput.html'
    })
    ;


  // if none of the above states are matched, use this as the fallback
  $urlRouterProvider.otherwise('/login');
})

// *****++++++++++++++******
// ***** GOOGLE MAPS *******
// *****++++++++++++++******

.config(function(uiGmapGoogleMapApiProvider) {
    uiGmapGoogleMapApiProvider.configure({
        // key: AIzaSyBu5M0d9ufdWX6xBZyIyilNkVSiR9iCGTQ, // key: 'your api key',
        v: '3.20', //defaults to latest 3.X anyhow
        libraries: 'weather,geometry,visualization'
    });
})


// *****++++++++++++++******
// ***** PHOTO       *******
// *****++++++++++++++******
.config(function($compileProvider){
  $compileProvider.imgSrcSanitizationWhitelist(/^\s*(https?|ftp|mailto|file|tel):/);
})
;
