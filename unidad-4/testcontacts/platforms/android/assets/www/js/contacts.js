$(document).on('pageinit' ,'#contacts' , function(event){
	console.log('pageinit contacts events')
	
	$('#saveContact').on('click', function(){

		console.log('click on saveContacts');

		function onSuccess(contact) {
    		console.log("Save Success");
	 	}; 

		function onError(contactError) {
    		console.log("Error = " + contactError.code);
		}; 

		var contact = navigator.contacts.create();

		contact.displayName = $('#firstName').val();
		contact.nickName = $('#firstName').val();

		var name = new ContactName();
		name.givenName = $('#firstName').val();
		name.familyName = $('#lastName').val();

		contact.name = name;

		email = $('#email').val();
		var emails = new ContactField('personal',email , true);

		contact.emails = emails;

		mobile = $('#phoneNumber').val();
		var phoneNumbers = new ContactField('mobile',mobile , true);

		contact.phoneNumbers = phoneNumbers;
		
		console.log(contact);
		// save to device
		contact.save(onSuccess,onError);

	});
});