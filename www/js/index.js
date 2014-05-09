//this is the main JavaScript source for ThisIsChico

$('button.camera-control').click(function(){
	// navigator is PhoneGap access to hardware
	
	if(navigator.camera){
		
		var options = {
		
			quality: 60,
			destinationType: Camera.DestinationType.DATA_URL,
			sourceType: 1,
			encodingType: 0
		
		};
		
		navigator.camera.getPicture(getPhoto, null, options);
	}
});

function getPhoto(data) {
	
	$('#camera-photo').attr('src', "data:image/jpeg;base64," + data);
	
}