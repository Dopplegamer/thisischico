//this is the main JavaScript source for ThisIsChico
var photos = [];
 
loadAllPhotos();
hideAllViews();
 
displayAllPhotos();
$('#showall').show();

function displayAllPhotos(){
	for (var i=0, i<photos.length; i++){
		$('#showall ul").append("<li>" + photos[i]["imagepath"] + "</li>");
	}
}
 
 function loadAllPhotos(){
	if(localStorage["photos"] != null){
		photos = JSON.parse(localStorage["photos"]);
	}
 }
 
 function makePhotoEntry(){
	//var imageData = $('#camera-photo').attr('src').replace("data:image/jpeg;base64,", "");
	var imageData = $('#camera-photo').attr('src');
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
	$('#showall ul').children().remove();
	displayAllPhotos();
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
		populateEditView();
		$('#edit').show();
	}
 });
 
 function populateEditView(){
	var photoToEdit = photos[WHICH_PHOTO_???];
	
	$('#camera-photo-edit').attr('src', photoToEdit['imageData']);
	$('#image-path-dit').html(photoToEdit['imagepath']);
	$('#longitude-edit').html(photoToEdit['longitude']);
	$('#latitude-edit').html(photoToEdit['latitude']);
	$('#description-edit').val(photoToEdit['description']);
 }
 
 $('#save-edit').click(function(){
	var imageData = $('#camera-photo-edit').attr('src');
	var imagepath = $('#image-path-edit').html();
	var longitude = $('#longitude-edit').html();
	var latitude = $('#latitude-edit').html();
	var description = $('#description-edit').val();
	
	photos[WHICH_PHOTO_???]['imageData'] = imageData;
	photos[WHICH_PHOTO_???]['imagepath'] = imagepath;
	photos[WHICH_PHOTO_???]['longitude'] = longitude;
	photos[WHICH_PHOTO_???]['latitude'] = latitude;
	photos[WHICH_PHOTO_???]['description'] = description;
	
	saveAllPhotos();
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
 
 function getPhoto(imageURI) {
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


