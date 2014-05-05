

login_info = {
	auth_token : ""
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
		        document.login_info = {
		        		logged : true,    
		        		username : result.user_info.username,
		        		auth_token : login_info.auth_token,
		        		first_name : result.user_info.first_name,
		        		last_name : result.user_info.last_name,
		        		email : result.user_info.email,
		        		userid : parseInt(result.user_info.id)   		
		        }
		        //alert(JSON.stringify(result));
		        //document.login_info = login_info;
		        console.log(document.login_info);
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
		


		if (document.login_info.logged) {
			$.mobile.changePage("#home", {
				transition : "slide",
				changeHash : false
			});
		}
	});
});