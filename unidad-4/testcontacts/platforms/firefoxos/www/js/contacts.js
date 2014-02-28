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

		var contact = navigator.contacts.create({"displayName" : $('#firstName').val() });

		contact.nickName = $('#firstName').val();

		var name = new ContactName();
		name.givenName = $('#firstName').val();
		name.familyName = $('#lastName').val();

		contact.name = name;

		var emails = new ContactField('Personal', $('#email').val(), true);

		contact.emails = emails;

		var phoneNumbers = new ContactField('Mobile', $('#phoneNumber').val(), true);

		contact.phoneNumbers = phoneNumbers;
		
		console.log(contact);
		// save to device
		contact.save(onSuccess,onError);

	});
});