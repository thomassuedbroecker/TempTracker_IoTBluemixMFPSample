// *************************************************-->
// Created or modivied by Thomas Südbröcker         -->
// All usage is on your own risk no guarantee       -->
// *************************************************-->
// *************************************************-->
// Objective:  MobileFirstServer Connection Init     -->
//                                                  -->
// Comments:                                        -->
// *************************************************-->
var Messages = {
    // Add here your messages for the default language.
    // Generate a similar file with a language suffix containing the translated messages.
    // key1 : message1,
};

var wlInitOptions = {
    // Options to initialize with the WL.Client object.
    // For initialization options please refer to IBM MobileFirst Platform Foundation Knowledge Center.

};

// Called automatically after MFP framework initialization by WL.Client.init(wlInitOptions).
function wlCommonInit(){

	// Common initialization code goes here REMOVED
  WL.Client.connect({
    onSuccess: function() {
      console.log('Connected to the MFP Server');
    },
    onFailure: function() {
      console.log('NOT connected to the MFP Server');
    }
  });
}
