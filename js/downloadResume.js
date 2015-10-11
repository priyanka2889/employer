document.addEventListener("deviceready", init, false);
var store ;
function init() {

window.requestFileSystem(LocalFileSystem.PERSISTENT, 0, onRequestFileSystemSuccess, null); 

function onRequestFileSystemSuccess(fileSystem) { 
        var entry=fileSystem.root; 
        entry.getDirectory("recruitment", {create: true, exclusive: false}, onGetDirectorySuccess, onGetDirectoryFail); 
} 

function onGetDirectorySuccess(dir) { 
      alert("Created dir "+dir.name);
store = cordova.file.externalRootDirectory+"/recruitment/";	  
} 

function onGetDirectoryFail(error) { 
     alert("Error creating directory "+JSON.stringify(error)); 
	 store = cordova.file.externalRootDirectory;
} 
}


function downloadResume(url){
 alert("store:"+store);
        window.requestFileSystem(
                     LocalFileSystem.PERSISTENT, 0, 
                     function onFileSystemSuccess(fileSystem) {
                     fileSystem.root.getFile(
                                 "dummy.html", {create: true, exclusive: false}, 
                                 function gotFileEntry(fileEntry){
                                 var sPath = fileEntry.fullPath.replace("dummy.html","");
                                 var fileTransfer = new FileTransfer();
                                 fileEntry.remove();
 
                                 fileTransfer.download(
                                           url,
                                            store+ "theFile.pdf",
                                           function(theFile) {
                                           alert("download complete: " + theFile.toURI());
                                           showLink(theFile.toURI());
                                           },
                                           function(error) {
                                           alert("download error source " + error.source);
                                           alert("download error target " + error.target);
                                           alert("upload error code: " + error.code);
                                           }
                                           );
                                 }, 
                                 fail);
                     }, 
                     fail);
 
    }
 
    function showLink(url){
        alert(url);
        var divEl = document.getElementById("ready");
		 alert(JSON.stringify(evt));
        var aElem = document.createElement("a");
        aElem.setAttribute("target", "_blank");
        aElem.setAttribute("href", url);
        aElem.appendChild(document.createTextNode("Ready! Click To Open."))
        divEl.appendChild(aElem);
 
    }
 
 
    function fail(evt) {
           alert(JSON.stringify(evt));
    }
/*
var fileName = "http://bluesys.in/dev/recruitmentbackend/gulpfile.js";

function init() {
	
	$status = document.querySelector("#status");

	alert( "Checking for data file.")

	store = cordova.file.dataDirectory;
alert(store);
	//Check for the file. 
	window.resolveLocalFileSystemURL(store + fileName, appStart, downloadAsset);

}

function downloadAsset() {
	var fileTransfer = new FileTransfer();
	alert("About to start transfer");
	fileTransfer.download(assetURL, store + fileName, 
		function(entry) {
			alert("Success!");
			appStart();
		}, 
		function(err) {
			alert("Error");
			alert(err);
		});
}

//I'm only called when the file exists or has been downloaded.
function appStart() {
alert ( "App ready!");
}*/