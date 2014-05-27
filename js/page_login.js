login_info = {
	auth_token : ""
};

$(document).on('pageinit', '#auth', function() {
	$("#auth_btn_signin").bind("click", function(event) {
		login_info.username = $('#auth_txt_user').val();
		local_password = $('#auth_txt_password').val();

		login_info.auth_token = "Basic " + btoa(login_info.username + ':' + local_password);

		$.ajax({
			url : 'http://mci.stribog.com.br/api/authenticate/',
			type : 'GET',
			dataType : 'json',
			crossDomain : true,
			async : false,
			cache : false,
			beforeSend : function(xhr) {
				xhr.setRequestHeader("Authorization", login_info.auth_token);
			},
			success : function(result) {
				document.login_info = {
					logged : true,
					username : result.user_info.username,
					auth_token : login_info.auth_token,
					first_name : result.user_info.first_name,
					last_name : result.user_info.last_name,
					email : result.user_info.email,
					userid : parseInt(result.user_info.id)
				};
				//alert(JSON.stringify(result));
				//document.login_info = login_info;
				console.log(document.login_info);
			},
			error : function(result) {
				info = null;
				if (result.responseText == undefined) {
					info = result.statusText;
				} else {
					parsedData = JSON.parse(result.responseText);
					info = parsedData.info;
				}
				alert('error: ' + info);
			}	
		});

		if (document.login_info.logged) {

			document.updateServer = function(url, method, data) {
				var local_url = url;
				var local_method = method;
				var local_data = data;
				
				console.log('updateServer param_url: ' + local_url);
				console.log('updateServer param method: ' + local_method);
				console.log('updateServer param data:' + JSON.stringify(local_data));
				result = $.ajax({
					url : local_url,
					type : local_method,
					dataType : 'json',
					crossDomain : true,
					async : false,
					cache : false,
					data : JSON.stringify(local_data),
					contentType : "application/json",
					beforeSend : function(xhr) {
						xhr.setRequestHeader("Authorization", document.login_info.auth_token);
					},
					success : function(result) {
						console.log("success for " + local_method + "in URL " + local_url);
					},
					error : function(result) {
						console.log("error for " + local_method + "in URL " + local_url);
						console.log(JSON.stringify(data));
						console.log(result);
					}
				}).responseText;
				console.log('updateServer responseText:' + result);
				return_data = JSON.parse(result);
				return return_data;
			};

			$.mobile.changePage("#home", {
				transition : "slide",
				changeHash : false
			});
		}
	});
}); 