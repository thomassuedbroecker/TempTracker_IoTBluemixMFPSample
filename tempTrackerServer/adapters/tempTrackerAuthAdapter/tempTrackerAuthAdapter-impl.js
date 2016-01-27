/* *************************************************-->
 <!-- Created or modified by Thomas Südbröcker         -->
 <!-- All usage is on your own risk no guarantee       -->
 <!-- ************************************************* */
 
function onAuthRequired(headers, errorMessage){
	errorMessage = errorMessage ? errorMessage : null;

	return {
		authStatus: "credentialsRequired",
		errorMessage: errorMessage
	};
}

function submitAuthentication(username, password){
	if (username==="user" && password === "password"){

		var userIdentity = {
				userId: username,
				displayName: username,
				attributes: {
					foo: "bar"
				}
		};

		WL.Server.setActiveUser("AuthRealm", userIdentity);

		return {
			authStatus: "complete"
		};
	}

	return onAuthRequired(null, "Invalid login credentials");
}

function onLogout(){
	WL.Logger.debug("Logged out");
}
