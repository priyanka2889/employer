document.addEventListener("deviceready", init, false);
var store ;
function init() {

store = cordova.file.externalRootDirectory;


}


function downloadResume(url){

var fileTransfer = new FileTransfer();
var uri = encodeURI(url);
var pathArray = uri.split( '/' );
filename = pathArray[pathArray.length-1];
var fileURL = store ;
fileTransfer.download(
    uri,
    fileURL+"/"+ filename,
    function(entry) {
        console.log("download complete: " + entry.toURL());
		navigator.notification.confirm("Downloaded Successfully",null, "Alert", "Ok");
									
    },
    function(error) {
        console.log("download error source " + error.source);
        console.log("download error target " + error.target);
        console.log("upload error code" + error.code);
    },
    false,
    {
        headers: {
            "Authorization": "Basic dGVzdHVzZXJuYW1lOnRlc3RwYXNzd29yZA=="
        }
    }
);

}