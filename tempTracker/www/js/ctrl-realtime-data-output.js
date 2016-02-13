// *************************************************-->
// Created or modified by Thomas Südbröcker         -->
// All usage is on your own risk no guarantee       -->
// *************************************************-->
// *************************************************-->
// Objective:  Create a socket connection to Bluemix -->
//             Using getting the realtime IoT output -->
// Comments:                                        -->
// *************************************************-->
//   *************************************************
//   Define socket
//   Open Socket
//   Use Socket
//
//   *************************************************

angular.module('app.ctrl-reatime-output', ['ngCordova'])
.controller('RealtimeOutputCtrl', function($scope, $state, $cordovaMedia, $cordovaNativeAudio, ExchangeData) {
    $scope.currentCloudant = "";
    $scope.messageCount = 0;
    $scope.connectionStatus = "Not Connected";
    $scope.connected = false;
    messageCount = 0;

    // YOUR_BLUEMIX_URL
    var socketaddy = "ws://YOUR_BLUEMIX_URL/ws/realtime";
    var socket = new WebSocket(socketaddy);

    socket.onopen = function(){
        console.log("Connected to realtime websocket");
        $scope.connectionStatus = "Connected Waiting for Sensor Data";
        $scope.connected = false;
        //alert('Connected to Websocket');
    };
    socket.onerror = function(){
        console.log("Websocket error");
        $scope.connectionStatus = "Error in connection";
        $scope.connected = false;
        //alert('Websocket Error');
    };

    socket.onclose = function () {
        console.log('Not connected. Refresh the page?');
        $scope.connectionStatus = "Reopen window to reconnect";
        $scope.connected = false;
        //alert('Not connected. Refresh the page?');
    };

    socket.onmessage = function(msg){
        var sensorData = JSON.parse(msg.data);
        messageCount = messageCount + 1;
        $scope.connectionStatus = "Connected pending Sensor Data";

        if (sensorData !== undefined){
           $scope.currentCloudant = sensorData;
           $scope.messageCount = messageCount;
           $scope.connected = true;
           $scope.connectionStatus = "Connected getting Sensor Data";
        } else {
           $scope.messageCount = 0;
           $scope.connected = false;
           $scope.connectionStatus = "Connected no valid Sensor Data";
        }
    };
})
