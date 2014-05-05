

var login_info = {
	logged : false,    
	username : null,
	auth_token : null,
	first_name : null,
	last_name : null,
	email : null
};


$(document).on('pageinit', '#auth', function() {
	$("#auth_btn_signin").bind("click", function(event) {
		login_info.username = $('#auth_txt_user').val();
		local_password = $('#auth_txt_password').val();
		
		login_info.auth_token = "Basic " + btoa(login_info.username + ':' + local_password);
		
		$.ajax({
		    url: 'http://mci.stribog.com.br/api/authenticate/',
		    type: 'GET',
		    dataType: 'json',
		    crossDomain: true,
		    async : false,
		    cache : false,
		    beforeSend: function(xhr){
		        xhr.setRequestHeader("Authorization", login_info.auth_token);
		    },
		    success: function(result) {
		        login_info.first_name = result.first_name;
		        login_info.last_name = result.last_name;
		        login_info.email = result.email;
		        login_info.logged = true;
		        //alert(JSON.stringify(result));
		        document.login_info = login_info;
		    },
		    error: function (result) {
		    	info = null
		    	if (result.responseText == undefined) {
		    		info = result.statusText
		    	} else {
		    		parsedData = JSON.parse(result.responseText);
		    		info = parsedData.info;
		    	}
		    	alert('error: ' + info);
		    } 
		});		
		


		if (login_info.logged) {
			$.mobile.changePage("#home", {
				transition : "slide",
				changeHash : false
			});
		}
	});
});