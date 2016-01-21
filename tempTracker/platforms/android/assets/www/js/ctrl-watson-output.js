//   *************************************************
//   Define socket
//
//   *************************************************

angular.module('app.ctrl-watson-output', ['ngCordova'])
.controller('WatsonOutputCtrl', function($scope, $state, $cordovaMedia, $cordovaNativeAudio, ExchangeData) {
    $scope.output = document.getElementById('output');
    function onLoad() {
        document.addEventListener("deviceready", onDeviceReady, false);
        console.log('In onload function');
    };
    var socketaddy = "ws://mytempiotdemo01.mybluemix.net/ws/audio";
    var socket = new WebSocket(socketaddy);

    socket.onopen = function(){
        console.log("Connected websocket");
        alert('Connected to Websocket');
    };
    socket.onerror = function(){
        console.log("Websocket error");
        alert('Websocket Error');
    };

    socket.onclose = function () {
        console.log('Not connected. Refresh the page?');
        alert('Not connected. Refresh the page?');
    };

    socket.onmessage = function(evt){
        /***************************************************/
        /*******    WORKING IN MFP PREVIEW  BEGIN     ******/
        /***************************************************/
        /*
        console.log("Websocket message", evt.data);
        $scope.output.src = window.URL.createObjectURL(evt.data);
        console.log("Source URL", $scope.output.src );
        $scope.output.play();
        */
        /***************************************************/
        /*******    WORKING IN MFP PREVIEW  END       ******/
        /***************************************************/

        var myBlob = new Blob([evt.data], {type: 'audio/wav'});
        console.log("New created Blob : ", myBlob);
        var urlSourceMyBlob = window.URL.createObjectURL(myBlob);
        console.log("New created Blob (URL SOURCE) : ", urlSourceMyBlob);
        var urlSource = window.URL.createObjectURL(evt.data);
        console.log("Source Blob (URL SOURCE) : ", urlSource);
        var check2 = "";

        //if ((alert(urlSource.indexOf("file") > -1)) == -1){
        var n = urlSourceMyBlob.search("file");
        if (n == -1 ){
          check2 = urlSourceMyBlob;
          console.log("String 'file' not found");
          $scope.output.src = check2;
          console.log("Source URL", $scope.output.src );
          $scope.output.play();
        } else {
          check2 = urlSourceMyBlob.replace("file%3A///","file:///");
          console.log("String 'file' found");
          //check2 = urlSource.replace("file%3A///","file:///") + ".wav";
          var myaudio2 = new Audio(check2);
          myaudio2.play();

          console.log("Create Media");
          check2 = urlSource.replace("blob:file%3A///","file:///");
          console.log("Check2:",check2);
          var my_media = $cordovaMedia.newMedia(check2);
          my_media.play();
          console.log("Play Audio done");
        }




    };
})
