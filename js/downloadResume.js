document.addEventListener("deviceready", init, false);
var store ;
function init() {

window.requestFileSystem(LocalFileSystem.PERSISTENT, 0, onRequestFileSystemSuccess, null); 

function onRequestFileSystemSuccess(fileSystem) { 
        var entry=fileSystem.root; 
        entry.getDirectory("recruitment", {create: true, exclusive: false}, onGetDirectorySuccess, onGetDirectoryFail); 
} 

function onGetDirectorySuccess(dir) { 
     // alert("Created dir "+dir.name);
store = cordova.file.externalRootDirectory+"/recruitment/";	  
} 

function onGetDirectoryFail(error) { 
    // alert("Error creating directory "+JSON.stringify(error)); 
	 store = cordova.file.externalRootDirectory;
} 
}


function downloadResume(url,name){
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
                                            store+ "name.pdf",
                                           function(theFile) {
											navigator.notification.alert(
											'Resume Downloaded Successfully \n'+store,  // message
											null,         // callback
											'Success:',            // title
											'OK'                  // buttonName
											);
                                          // showLink(theFile.toURI());
                                           },
                                           function(error) {
                                            navigator.notification.alert(
											JSON.stringify(error),  // message
											null,         // callback
											'Success:',            // title
											'OK'                  // buttonName
											);
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
 
 
    function fail(evt) 
	{
		navigator.notification.alert(
		JSON.stringify(evt),  // message
		null,         // callback
		'Success:',            // title
		'OK'                  // buttonName
		);
    }
