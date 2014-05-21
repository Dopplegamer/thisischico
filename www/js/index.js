//this is the main JavaScript source for ThisIsChico
var photos = [];
 
loadAllPhotos();
hideAllViews();
 
displayAllPhotos();
$('#showall').show();

function displayAllPhotos(){
	//start here on tuesday may 20
}
 
 function loadAllPhotos(){
	if(localStorage["photos"] != null){
		photos = JSON.parse(localStorage["photos"]);
	}
 }
 
 function makePhotoEntry(){
	//var imageData = $('#camera-photo').attr('src').replace("data:image/jpeg;base64,", "");
	var imagepath = $('#image-path').html();
	var longitude = $('#longitude').html().replace('Long: ', '');
	var latitude = $('#latitude').html().replace('Long: ', '');
	var description = $('#description').val();
	
	var photoEntry = {
		"image" : imageData,
		"imagepath": imagepath,
		"longitude" : longitude,
		"latitude" : latitude,
		"description" : description
	};
	
	photos.push(photoEntry);
 }
 
 function saveAllPhotos(){
	localStorage.clear();
	localStorage["photos"] = JSON.stringify(photos);
	if (navigator.notification){
		navigator.notification.alert("Photo has been saved", null, "Success!", "OK");
	}
 }
 
 $('button.save').click(function(){
	makePhotoEntry();
	saveAllPhotos();
 });
 
 function hideAllViews() {
	$('#showall').hide();
	$('#camera').hide();
	$('#edit').hide();
 }
 
 $('li.viewlink').click(function(){
	hideAllViews();
	if ($(this).html() == "Home"){
		$('#showall').show();
	} else if ($(this).html() == "Capture"){
		$('#camera').show();
	} else {
		$('#edit').show();
	}
 });
 
 $('button.camera-control').click(function(){
 // navigator is PhoneGap access to hardware
 	if(navigator.camera){
 		var options = {
 			quality: 60,
 			//destinationType: Camera.DestinationType.DATA_URL,
 			destinationType: Camera.DestinationType.FILE_URI,
			sourceType: 1,
 			encodingType: 0
 		};
 		navigator.camera.getPicture(getPhoto, null, options);
		navigator.geolocation.getCurrentPosition(getPosition, null, {enableHighAccuracy: true});
 	}
 });
 
 function getPhoto(data) {
 	$('#camera-photo').attr('src', imageURI);
	window.resolveLocalFileSystemURI(imageURI, resolveOnSuccess, resolveOnError);
 }
 
 function resolveOnError(error){
	//do nothing for now
 }
 
 function resolveOnSuccess(entry){
	var now = new Date();
	var timestamp = now.getTime();
	var photoName = timestamp + ".jpg";
	var photoFolder = "chico_photos";
	
	window.requestFileSystem(LocalFileSystem.PERSISTENT, 0,
		function(fileSystem) {
			fileSystem.root.getDirectory(photoFolder, {create:true, exclusive: false},
				function(directory){
					entry.moveTo(directory, photoName, successMove, resolveOnError);
				},
				resolveOnError);
		},
		resolveOnError);
 }
 
 function successMove(entry){
	$('#image-path').html(entry.fullPath);
 }
 
 function getPosition(position){
	var longitude = position.coords.longitude;
	var latitude =position.coords.latitude;
	
	$('#longitude').html('Long: ' + longitude); 
	$('#latitude').html('Lat: ' + latitude); 
 }


