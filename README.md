# "TempTracker" a IoT Cloud, Bluemix and MobileFirstPlatform sample
For more details you can visit these TempTracker "GitHub WIKI Sites":

* [Basic Documentation](https://github.com/thomassuedbroecker/TempTracker_IoTBluemixMFPSample/wiki/Basic-Documentation-TempTracker--Sample)
* [Source folder content description](https://github.com/thomassuedbroecker/TempTracker_IoTBluemixMFPSample/wiki/Source-Folder-content-description)
* [Code to be changed in the sample](https://github.com/thomassuedbroecker/TempTracker_IoTBluemixMFPSample/wiki/Code-to-be-changed)
* [Setup steps for the full TempTracker Sample](https://github.com/thomassuedbroecker/TempTracker_IoTBluemixMFPSample/wiki/Setup-steps-for-the-full-TempTracker-Sample)

***
**Table of content of the readme.md**

  0. [Introduction for possible UseCase the Topics for the integrated usage of IoT, Bluemix and Mobile](https://github.com/thomassuedbroecker/TempTracker_IoTBluemixMFPSample#0-introduction-for-possible-usecases-of-the-topics-for-an-integrated-usage-of-iot-bluemix-and-mobile)
  1. [The objective of the "TempTracker" sample](https://github.com/thomassuedbroecker/TempTracker_IoTBluemixMFPSample#1-the-objective-of-the-temptracker-sample)
  2. [The "TempTracker" sample on YouTube](https://github.com/thomassuedbroecker/TempTracker_IoTBluemixMFPSample#2-the-temptracker-sample-on-youtube)
  3. [Environment Prerequisites to use the full TempTracker sample](https://github.com/thomassuedbroecker/TempTracker_IoTBluemixMFPSample#3-environment-prerequisites-to-use-the-full-temptracker-sample)
  4. [Concrete Steps to Setup the full TempTracker Sample](https://github.com/thomassuedbroecker/TempTracker_IoTBluemixMFPSample#4-concrete-steps-to-setup-the-full-temptracker-sample)
  5. Known limitations

***

A alternative Introduction can be found here: [A IoT Cloud, Bluemix and MobileFirst Sample – What makes you happy?](https://mfp.help/2016/02/03/iot/)

***
## 0. Introduction for possible UseCases of the topics for an integrated usage of IoT, Bluemix and Mobile

Monitor sensible ware (goods, food, electronics, etc. ) temperature – ware which is stored in special containers that have sensors for location and temperature control.

* **Questions:**
  - Is the Temperature in critical condition?
  - How can I notify the closest service operator or the driver in case of emergency?

* **Objective:**
Monitor the state of the container and notify on emergency
Report a problem if needed with Picture / Comment
Get a list of currently available drivers to check the situation

* **Solution:**
The temperature sensors can be connected and managed over the Bluemix IoT cloud service
monitored over a mobile application having the backend running on Bluemix.
The mobile application allows feedback (comments and picture)
Notifications can be sent via SMS, Twitter, email, voice, etc.

***
## 1. The objective of the "TempTracker" sample

The objective is to help to understand how the integration technical works between:

  1. Sensor
  2. IoT Cloud
  3. Bluemix
  4. Bluemix Services
  5. Bluemix Container
  6. MobileFirstPlatform

The setup is divided in **two main steps**:

   1. Setting up the **Bluemix application in Chapter 4.1**. The Bluemix application is the important part to get and store the sensor data inside the cloudant database and to integrate the services.

   2. Setting up the **Mobile application based on MobileFirst in Chapter 4.2**. This part is important to have a Mobile application and to use the given data from the sensor on a mobile device, report a problem, take picture ....

Note: Just take a look at the sample UseCases defined in **Chapter 0.**
Feel free to use the parts separately.

***
## 2. The "TempTracker" sample on YouTube

On YouTube: IoT Cloud, Bluemix and MobileFirst ... trying to understand
https://www.youtube.com/playlist?list=PLUte4WEyMEjU83oQIjqOKIPm35q9I1eZd

***
## 3. Environment Prerequisites to use the full TempTracker sample

Here are the prerequisites you need to setup the environment, to run the full "TempTracker" sample.

This is just an **overview** for your basic installation tasks.
The concrete configuration steps you will find in **4. Concrete Steps to Setup the full TempTracker Sample**.

***
### 3.1 Bluemix App related

   1. Get the TI Sensor and connect to IoT Cloud ( https://developer.ibm.com/recipes/tutorials/connect-a-cc2650-sensortag-to-the-iot-foundations-quickstart/ )
   2. In case you don't have a real Sensor you can use alternative : https://quickstart.internetofthings.ibmcloud.com/iotsensor/ in the upper left corner is the DeviceID you later must use inside Node-RED for the IoT-Node.
   3. Get a Bluemix Account (https://console.ng.bluemix.net)
   4. Instantiate IoT Foundation Starter + add Text2Speech service (https://console.ng.bluemix.net/catalog/starters/internet-of-things-foundation-starter/)
   (https://console.ng.bluemix.net/catalog/services/speech-to-text/)

***
### 3.2 Mobile App related

   1. Get a Google Maps JavaScript API Key (https://www.google.com/work/mapsearth/)
   2. Instantiate "ibm-mobilefirst-starter Container – Small 1 GB" (https://www.ng.bluemix.net/docs/images/mobilefirst/index.html)
   3. Install MobileFirstPlatform CLI on your machine (https://developer.ibm.com/mobilefirstplatform/install/
)
   4. Install Android SDK(http://developer.android.com/sdk/installing/index.html)
   5. Create a Virtual Android Device using the **avd command** ( https://developer.android.com/studio/run/managing-avds.html)
   6. Install a Editor or IDE on your machine (https://atom.io)
   7. Install Google Chrome browser to take the advantage of the developer tools (https://developer.chrome.com/devtools)

***
## 4. Concrete Steps to Setup the full TempTracker Sample

***
### 4.1 Concrete Steps to Setup TempTracker – (all Bluemix tasks)

***
#### 4.1.1 Create the Bluemix application

  1. Get yourself a Bluemix Account – register at bluemix.net
  2. Instantiate IoT Foundation Starter (https://www.ng.bluemix.net/docs/starters/IoT/iot500.html)
  3. Give it a name <<your app name>>
  4. After your application is running – click ADD A SERVICE OR API
  5. Select Text to Speech from the Catalog
  6. Search for entering “Text to “ in the Search field and click the icon
  7. Create your Text To Speech service instance
  8. Click CREATE
  9. Restage the application
  10. Instantiate ibm-mobilefirst-starter Container (https://www.ng.bluemix.net/docs/images/mobilefirst/index.html)

***
#### 4.1.2 Node-RED Configuration

  1. On Bluemix, go to your application and click on the url to open your Node-RED
  2. Delete the content of the default created sheet by selecting all and DEL
  3. Copy the ClipboardNodeRed-containsAllNodes.txt content into the Clipboard Either you have it cloned with git or you can get it from git.hub here:(http://bit.ly/1QC39ld)
  4. Import from Clipboard
  5. Make changes in yours in the lines marked with CHANGE as comment in code.
  _NOTE:_ *Please use the WIKI link for the detailed instructions: under Node-RED*
  (https://github.com/thomassuedbroecker/TempTracker_IoTBluemixMFPSample/wiki/Code-to-be-changed)
  6. Change the Text2Speech node to match your Text2Speech service (https://github.com/thomassuedbroecker/TempTracker_IoTBluemixMFPSample/wiki/Code-to-be-changed)
  7. Change the url in http response for audio, map and cloudant nodes to match your nodeRed http address (https://github.com/thomassuedbroecker/TempTracker_IoTBluemixMFPSample/wiki/Code-to-be-changed)

  _NOTE:_ Maybe you have to change the device ID in the Node **Check Temperature and create JSON Data** of the flow. Because you will use other devices.

  And maybe by updates of the TI App the JSON data structure will change.
  In that case you have to configure your code like this:

      if (msg.payload.d.ambient_temp !== undefined) {
         temp     = msg.payload.d.ambient_temp;  // Typical Android datastructure
      }



***
#### 4.1.3 CloudantDB setup

  1. In your Bluemix Appliction, click the Cloudant service from your application
  2. Open the dashboard of your Cloudant service by clicking LAUNCH
  3. Click Create Database
  4. Create a new database named “my_demo_iot_db” This will simplify your usage of the provided code
  5. Create new Search Index  - use the documentation in ..\TempTracker_IoTBluemixMFPSample-master\tempTrackCloudantConfiguration or (http://bit.ly/1TnfJFv) to do that

***
#### 4.1.4 Connect the sensor to the IoT Cloud and check the data with your Bluemix application

  1. Get the Sensor and connect to IoT Cloud (https://developer.ibm.com/recipes/tutorials/connect-a-cc2650-sensortag-to-the-iot-foundations-quickstart/)
  2. In case you don't have a real Sensor you can use alternative : https://quickstart.internetofthings.ibmcloud.com/iotsensor/ in the upper left corner is the DeviceID you later must use inside Node-RED for the IoT-Node.
  2. Configure the IoT-Node in Node-RED using the given DeviceID
  3. Check the display of the sensor data on http://YOUR_BLUEMIX_APP_URL/map and in CloudantDB

  * **.. /cloudant**

    ![Template All Data Page](https://github.com/thomassuedbroecker/TempTracker_IoTBluemixMFPSample/blob/master/tempTrackerImages/template-all-data.jpg)

  * **.. /map**

    ![Template GeoLocation Page](https://github.com/thomassuedbroecker/TempTracker_IoTBluemixMFPSample/blob/master/tempTrackerImages/template-map-data.jpg)

   * **.. /audio**

      ![Template Audio Page](https://github.com/thomassuedbroecker/TempTracker_IoTBluemixMFPSample/blob/master/tempTrackerImages/template-audio-data.jpg)

***
### 4.2 Concrete Steps to Setup TempTracker – (all MobileFirst tasks)

More details about the used Frameworks? Take a look [here](https://github.com/thomassuedbroecker/TempTracker_IoTBluemixMFPSample/wiki/Basic-Documentation-TempTracker--Sample#6-frameworks-and-tool-versions-used-for-the-mobile-application)

***
#### 4.2.1 Development Environment – MobileFirst locally

   1. Locally install MobileFirst CLI installer  –if you have troubles running the installation directly, here a command line example: **install_windows.exe LAX_VM "C:\Program Files\Java\jdk1.8.0_60\jre\bin\java.exe“**
   2. Install an IDE locally – for example Android Studio 1.4 or **Atom**
   3. Make sure you have **Java JDK**, **Ant** and **Android SDK** installed and working
   4. On a Windows System set environment variables: **JAVA_HOME**
   5. Set **ANDROID_HOME** to the installation directory of the **Android sdk**
   6. Set Path : add **ANDROID_HOME/platform-tools** and **ANDROID_HOME/tools** to your path
   7. Set **ANT_HOME** to the installation directory of your **ant**

***
#### 4.2.2 Configuration for Front End – MobileFirst locally

  1. If you want, you can create a new workspace folder for your MobileFirst projects
  2. Clone the git repository into a local folder, by entering the following commandline: **git clone https://github.com/thomassuedbroecker/TempTracker_IoTBluemixMFPSample.git**
  3. Note: you can also download the sources as zip from here:
  (https://github.com/thomassuedbroecker/TempTracker_IoTBluemixMFPSample)

***
#### 4.2.3 Start the MobileFirst server locally

  1. Open a command line window in the tempTrackerServer folder and run *mfp start* command
  2. In a Browser, check if the server is running: url: localhost:10080/worklightconsole
  User/password: admin/admin

***
####  4.2.4 Use an editor to add your credentials

  1. In Atom (or another editor) import the projects
  2. Navigate to ./tempTrackerServer/adapters/ and open **CloudantAdapter.xml**
  3. Enter your Cloudant credentials in the marked lines (https://github.com/thomassuedbroecker/TempTracker_IoTBluemixMFPSample/wiki/Code-to-be-changed)
  4. Save your changes

***
####  4.2.5  Redeploy the adapters on the local MobileFirst server

  1. Open command line to the ./tempTrackerServer folder
  2. enter: **mfp push local**

***
####  4.2.6  Add the adapters to the MobileFirst Server on the Bluemix container

  1. In Bluemix go to your MFP Container
  2. Open MobileFirstConsole to Manage the MobileFirstServer (http://YOUR_CONTAINER_IP:9080/)
  3. Click **Open Console** under the Manage on the webpage
  4. Click *Add new Applications or Adapters* in the left upper corner in the console
  5. Add and upload the adapters from folder ../tempTrackerServer/bin  - filename.adapter

***
####  4.2.7  Make the MobileFirst Server from Bluemix known locally

  1. Using command line, cd to ../tempTracker directory
  2. enter: **mfp server add**
  3. Enter a name: **BluemixServer**
  4. Enter the url of your server (the ip address of the Docker container in Bluemix)
  5. Enter the login and password
  6. You will have to register first and choose a password
  7. Save the password Y
  8. Context root: **worklightadmin**

***
####  4.2.8  Change the client code in the TempTracker MobileApp

  1. Note: follow the instructions in code to be changed: (https://github.com/thomassuedbroecker/TempTracker_IoTBluemixMFPSample/wiki/Code-to-be-changed)
  2. In .. **config.xml** – change the ip to match your mfp docker
  3. In … **www/template/watsonbrowseroutput.xml** – change the url and ip
  4. In … **index.html** - change the google api key // you will need to generate a google browser key
  5. In … **www/js/ctrl-realtime-data-output.js** – change the url
  6. Save your changes

***
####  4.2.9  Push the MobileFirst client to the MobileFirst Server on Bluemix

  1. Open a command line window and cd to the ../tempTracker folder (after changes)
  2. enter: **mfp push BluemixServer**
  3. This will push the changes to the MobileFirst Server in the container on Bluemix

  _NOTE:_ You can verify the Server Configuration in the **config.xml** in
  **./tempTracker/config.xml**

  The content will be for BluemixServer or the Local MFP Server.

    `<preference name="mfpServerUrl" value="http://YOUR_CONTAINER_IP:YOUR_CONTAINER_PORT" />
    <preference name="mfpServerRuntime" value="MobileFirstStarter" />
    <preference name="displayName" value="temptracker" />
    <preference name="mfpManualInit" value="false" />`

    or

    `<preference name="mfpServerUrl" value="YOUR_LOCAL_IP:10080" />
    <preference name="mfpServerRuntime" value="tempTrackerServer" />
    <preference name="displayName" value="temptracker" />
    <preference name="mfpManualInit" value="false" />`


***
####  4.2.10  Run the App on the emulator or your MobileFirst preview LOCAL
  1. In the Android sdk installation directory  / start “ADV manager.exe” over command line
  2. Create new **Android Virtual Device** and check the emulator is running on your machine.
  3. Run the emulator using the commandline in the **./tempTracker** directory: mfp cordova emulate
  4. Run as preview in the "Chrome Browser" using the command line in the ./tempTracker directory: **mfp cordova preview**

  _NOTE:_  **mfp cordova preview** only works with the local server.

***
#### 4.2.11 **Optional:** Add MQA to Bluemix Application and configure MobileApp

Add the MobileQualityAssurance (_MQA Bluemix service_) to your Bluemix application following the steps in this [Guide on Bluemix](https://www.ng.bluemix.net/docs/services/MobileQualityAssurance/index.html?s_tact=C43202QW)

Based on the feedback in [StackOverflow](http://stackoverflow.com/questions/34175784/app-start-breaks-when-mobile-quality-assurance-cordova-plugin) you only have to do following steps.

1. Download the latest cordova sdk : http://www-01.ibm.com/support/docview.wss?uid=swg27044490
2. In the app directory, MQA plugin: **"mfp cordova plugin add [/your_path/to_the/MQA/sdk]"**
3. Add follosing code in the **/tempTracker/www/js/index.js** file,  add following  MQA code in the **wlCommonInit()** function:

    `MQA.startNewSession({
             reportOnShakeEnabled: true,
             mode: 'QA',
                 ios: {
                         appKey: "YOU_IOS_KEY",
                         screenShotsFromGallery: true,
                       },
                 android: {
                         appKey: "YOU_ANDROID_KEY",
                         screenShotsFromGallery: true,
                 }
            },{
               success: function () {console.log("MQA Session Started successfully");},
               error: function (string) { console.log("MQA Session error" + string);}
    });`


***
  **Sample usage:**

  * update geo data

  ![Mobile Update Geo Data](https://github.com/thomassuedbroecker/TempTracker_IoTBluemixMFPSample/blob/master/tempTrackerImages/mobile-update-geo-data.jpg)

  * search data

  ![Mobile Update Geo Data](https://github.com/thomassuedbroecker/TempTracker_IoTBluemixMFPSample/blob/master/tempTrackerImages/mobile-search-data.jpg)

  * get live data

  ![Mobile Get Live Data](https://github.com/thomassuedbroecker/TempTracker_IoTBluemixMFPSample/blob/master/tempTrackerImages/mobile-getlive-data.jpg)

***
## 5 Known limitations

***
1. How to run the App on real iOS device?

  If you want to run the app on a real iOS device, you must follow this steps:
  * a) Disable BitCode
  * b) Disable Security take a look here: [reason]( http://stackoverflow.com/questions/30731785/how-do-i-load-an-http-url-with-app-transport-security-enabled-in-ios-9)
  * c) Edit the **TempTracker-Info.plist** under **tempTracker/platforms/ios/TempTracker** in a editor and add this code:

       `<key>NSAppTransportSecurity</key>
    	   <dict>
    	    <key>NSAllowsArbitraryLoads</key>
    	   <true/>
    	  </dict>``

2. Photo limitation on iOS

  If the photos should be also taken on a iOS device, the module **ctrl-photo.js**
  must be enhanced to do that.
  In this sample **Photo is only working for Android.**

3. Live Message does not work with Safari or the default browser of Android

  To get the life messages on the iOS/android devices.
  The chrome or firefox browser must be installed and defined as the default browser on the android devices.
  On iOS it will not work, because no other default browser can be configured.

4. A Chart does show only maximum 25 data entries

  Paging for the Cloudant database is not implemented.

5. A Search does show only maximum 25 data entries

  Paging for the Cloudant database is not implemented.

6. Get sensor data show only 10 entries

  Limit is set to 10 for the Cloudant database.
