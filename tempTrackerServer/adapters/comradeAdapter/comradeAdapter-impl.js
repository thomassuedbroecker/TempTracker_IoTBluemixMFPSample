function getComrades() {
	path = '?results=20';

	var input = {
	    method : 'get',
	    returnedContentType : 'json',
	    path : path
	};


	return WL.Server.invokeHttp(input);
}
