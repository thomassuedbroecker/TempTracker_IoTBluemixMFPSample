if ( msg !== null)
{ // if msg !0 null begin
// Create data object
data = new Object();

// *****************
// Get Data and time
var currentdate = new Date();
var the_minutes     = "00";
var the_seconds     = "00";

if ((currentdate.getMinutes() < 10)){
    the_minutes = "0"+currentdate.getMinutes();
} else {
    the_minutes = currentdate.getMinutes();
}

if ((currentdate.getSeconds() < 10)){
    the_seconds = "0"+currentdate.getSeconds();
} else {
    the_seconds = currentdate.getSeconds();
}

data.date   = currentdate.getDate() + "." + (currentdate.getMonth()+1)  + "." + currentdate.getFullYear();
data.time   = currentdate.getHours() + ":"  + currentdate.getMinutes() + ":" + currentdate.getSeconds();
data.image  = "undefined";
data.imageLocalURI = "undefined";

// *****************
// Concrete Senor data
data.temp     = msg.payload.d.AmbTemp;
data.irtemp   = msg.payload.d.IRTemp;
data.optical  = msg.payload.d.optical;
data.deviceId = msg.deviceId;

// *****************
// Addtional Senor data
data.sensorImage = "img/sensor-detail.png";
data.comment = "Currently on comment";
data.sensorType = "Simplelink SensorTag - TI.com";

data.image    = "undefined";
data.imageLocalURI = "undefined";

// *****************
// Define Device Type
// (iPad:94128ececff1) (iPhone:08b5cbcfa326) (Samsung:c4be84722b07)
// http://www.w3schools.com/jsref/jsref_localecompare.asp
var ipad = "94128ececff1";
var iphone = "1247823ebf04"; // "08b5cbcfa326";
var samsung = "c4be84722b07";

if(data.deviceId.localeCompare("94128ececff1") == 0){
   data.deviceType="iPad";
   data.deviceImageURI="img/ipad.png";
}

if(data.deviceId.localeCompare("08b5cbcfa326") == 0){
   data.deviceType="iPhone";
   data.deviceImageURI="img/iphone.png";
}

if(data.deviceId.localeCompare("c4be84722b07") == 0){
   data.deviceType="Samsung";
   data.deviceImageURI="img/samsung.png";
} else {
   data.deviceType="Container";
   data.deviceImageURI="img/container.png";
}

// *****************
// Ehningen 48.65891, 8.940540000000055
// http://www.viewphotos.org/germany/coordinates-of-Ehningen-5390.html
data.gtfs_latitude  = "48.6589";
data.gtfs_longitude = "8.940540000000055";

// Check Temperature
if ( data.temp < 25 )
{
   data.message= data.date + "/" + data.time + " (" + data.temp + ") within safe limits";
   data.status ="SAVE";
} else {
   data.message= data.date + "/" + data.time + " (" + data.temp + ") is in critial limits";
   data.status ="CRITICAL";
}

// *****************
// Create root object
sensorroot = new Object();
sensorroot.sensordatavalue = data;

// *****************
// Set payload
msg.payload = sensorroot;
} else {
    msg.payload = "No IoT Data Input";
}// if else msg != null end

return msg;
