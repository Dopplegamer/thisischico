<<<<<<< HEAD
//this is the main JavaScript source for ThisIsChico
//adding a random comment

$('button.camera-control').click(function(){
	// navigator is PhoneGap access to hardware
	
	if(navigator.camera){
		
		var options = {
		
			quality: 60,
			destinationType: Camera.DestinationType.DATA_URL,
			sourceType: 1,
			encodingType: 0
		
		};
		
=======
//This is the main JavaScript source for This Is Chico

$('button.camera-control').click(function(){
	//navigator is Phonegap access to hardware
	if(navigator.camera){
		var options = {
			quality: 60,
			destinationType: Camera.DestinationType.DATA_URL,
			sourceType: 1, 
			encodingType: 0
		};
>>>>>>> e0942a9f93a0df4eacf9c6aeecf3f4d9508e4ad6
		navigator.camera.getPicture(getPhoto, null, options);
	}
});

<<<<<<< HEAD
function getPhoto(data) {
	
	$('#camera-photo').attr('src', "data:image/jpeg;base64," + data);
	
=======
function getPhoto(data){
	$('#camera-photo').attr('src', "data:image/jpeg;base64," + data);
>>>>>>> e0942a9f93a0df4eacf9c6aeecf3f4d9508e4ad6
}