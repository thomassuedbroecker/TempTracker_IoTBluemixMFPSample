/* *************************************************-->
 <!-- Created or modified by Thomas Südbröcker         -->
 <!-- All usage is on your own risk no guarantee       -->
 <!-- ************************************************* */
 
function getComrades() {
	path = '?results=20';

	var input = {
	    method : 'get',
	    returnedContentType : 'json',
	    path : path
	};


	return WL.Server.invokeHttp(input);
}
