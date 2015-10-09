document.addEventListener("deviceready", init, false);
var store ;
function init() {

store = cordova.file.externalRootDirectory;


}


function downloadResume(url){
 alert("inside downloadResume");
var fileTransfer = new FileTransfer();
var uri = encodeURI("http://bluesys.in/dev/recruitmentbackend/gulpfile.js");
var pathArray = uri.split( '/' );
filename = pathArray[pathArray.length-1];
var fileURL = store ;
/*fileTransfer.download(
    uri,
	filePath,
   // fileURL+"/"+ filename,
    function(entry) {
       alert("download complete: " + entry.toURL());
		//navigator.notification.confirm("Downloaded Successfully",null, "Alert", "Ok");
									
    },
    function(error) {
       alert("download error source " + error.source);
      alert("download error target " + error.target);
       alert("upload error code" + error.code);
    },
    false,
    {
        headers: {
            "Authorization": "Basic dGVzdHVzZXJuYW1lOnRlc3RwYXNzd29yZA=="
        }
    }
);*/
fileTransfer.download(
    uri,
    filePath,
    function(entry) {
       alert("download complete: " + entry.fullPath);
    },
    function(error) {
      alert("download error source " + error.source);
      alert("download error target " + error.target);
      alert("upload error code" + error.code);
    },
    false,
    {
        headers: {
            "Authorization": "Basic dGVzdHVzZXJuYW1lOnRlc3RwYXNzd29yZA=="
        }
    }
);


}