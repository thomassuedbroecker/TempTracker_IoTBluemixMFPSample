# "TempTracker" a IoT Bluemix and MobileFirstPlatform sample

For more details please visit WIKIs:

* [Basic Documentation](https://github.com/thomassuedbroecker/TempTracker_IoTBluemixMFPSample/wiki/Basic-Documentation-TempTracker--Sample)

* [Source folder content description](https://github.com/thomassuedbroecker/TempTracker_IoTBluemixMFPSample/wiki/Source-Folder-content-description)

* [Code to be changed in the sample](https://github.com/thomassuedbroecker/TempTracker_IoTBluemixMFPSample/wiki/Code-to-be-changed)

***
## 1. The objective of the "TempTracker" sample

The objective is to help to understand how the integration technical works between:

  1. Sensor
  2. IoT Cloud
  3. Bluemix
  4. Bluemix Services
  5. Bluemix Container
  6. MobileFirstPlatform

***
## 2. The "TempTracker" sample on YouTube

On YouTube: IoT Cloud, Bluemix and MobileFirst ... trying to understand
https://www.youtube.com/playlist?list=PLUte4WEyMEjU83oQIjqOKIPm35q9I1eZd

## 3. Environment Prerequisites to use the full TempTracker sample

Here are the prerequisites you need to setup the environment, to run the full "TempTracker" sample.

***

### 3.1 Bluemix App related

   1. Get the TI Sensor and connect to IoT Cloud ( https://developer.ibm.com/recipes/tutorials/connect-a-cc2650-sensortag-to-the-iot-foundations-quickstart/ )
   2. Get a Bluemix Account (https://console.ng.bluemix.net)
   3. Instantiate IoT Foundation Starter + add Text2Speech service (https://console.ng.bluemix.net/catalog/starters/internet-of-things-foundation-starter/)
   (https://console.ng.bluemix.net/catalog/services/speech-to-text/)

***
### 3.2 Mobile App related
   1. Get a Google Maps JavaScript API Key (https://www.google.com/work/mapsearth/)
   2. Instantiate "ibm-mobilefirst-starter Container – Small 1 GB" (https://www.ng.bluemix.net/docs/images/mobilefirst/index.html)
   3. Install MobileFirstPlatform CLI on your machine (https://developer.ibm.com/mobilefirstplatform/install/
)
   4. Install Android SDK(http://developer.android.com/sdk/installing/index.html)
   5. Install a Editor or IDE on your machine (https://atom.io)
   6. Install Google Chrome browser to take the advantage of the developer tools (https://developer.chrome.com/devtools)

## 4. Concrete Steps to Setup TempTracker
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
    3. Copy the ClipboardNodeRed-containsAllNodes.txt content into the Clipboard
    Either you have it cloned with git or you can get it from git.hub here: http://bit.ly/1QC39ld
    4. Import from Clipboard
    5. Make changes in yours in the lines marked with CHANGE as comment in code
    6. Change the Text2Speech node to match your Text2Speech service (https://github.com/thomassuedbroecker/TempTracker_IoTBluemixMFPSample/wiki/Code-to-be-changed)
    7. Change the url in http response for audio, map and cloudant nodes to match your nodeRed http address
    (https://github.com/thomassuedbroecker/TempTracker_IoTBluemixMFPSample/wiki/Code-to-be-changed)
***
#### 4.1.3 CloudantDB setup

    1. In your Bluemix Appliction, click the Cloudant service from your application
    2. Open the dashboard of your Cloudant service by clicking LAUNCH
    3. Click Create Database
    4. Create a new database named “my_demo_iot_db” This will simplify your usage of the provided code
    5. Create new Search Index  - use the documentation in ..\TempTracker_IoTBluemixMFPSample-master\tempTrackCloudantConfiguration or (http://bit.ly/1TnfJFv)

***
#### 4.1.4 Connect the sensor and check the data with your Bluemix application

    1. Get the Sensor and connect to IoT Cloud ( https://developer.ibm.com/recipes/tutorials/connect-a-cc2650-sensortag-to-the-iot-foundations-quickstart/)
    2. Configure the IoT-Node in Node-RED using the given DeviceID
    3. Check the display of the sensor data on http://YOUR_BLUEMIX_APP_URL/map and in CloudantDB
