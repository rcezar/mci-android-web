$(document).on('pagebeforehide', '#victim_detail', function(){
	
	document.victim = {
		tag_id : null
	};
	console.log('victim = null');

});

$(document).on('pageinit', '#victim_detail', function() {
	console.log("#victim_detail.pageinit");
	console.log(document.victim);
	
	$("#vd_btn_save").bind("click", function(event) {
		var method = null;
		var victim = null;
		var victim_gender = null;
		var api_url = null;
		
		switch (parseInt($("#vd_menu_gender").prop("selectedIndex"))) {
		case 0:
			victim_gender = "MALE";
		case 1:
			victim_gender = "FEMALE";
		default:
			console.log("invalid selected index in #vd_menu_gender: " + $("#vd_menu_gender").prop("selectedIndex"));
		}
 		
		if (document.victim.id == undefined) {
			method = "POST";
			api_url = 'http://mci.stribog.com.br/api/incidents/' + document.incident.id + '/victims/';
			victim = {
					tag_id : document.victim.tag_id,
					creation_time : (new Date()).toISOString(),
					creation_agent : document.login_info.userid,
					incident : document.incident.id,
					personal_data : {
						victim_name : $("#vd_txt_name").val(),
						age : $("#vd_txt_age").val(),
						gender : victim_gender,
						height : parseInt($("#vd_txt_height").val()),
						weight : parseInt($("#vd_txt_weight").val()),
						address : "",
						phone_number : $("#vd_txt_phone").val(),
						religion : $("#vd_txt_religion").val(),
						comments : ""
					}
			};
		} else {
			method = "PUT";
			api_url = 'http://mci.stribog.com.br/api/victims/' + document.victim.id + '/';
			victim = {
					tag_id : document.victim.tag_id,
					incident : document.incident.id,
					creation_time : (new Date()).toISOString(),
					creation_agent : document.login_info.userid,
					personal_data : {
						victim_name : $("#vd_txt_name").val(),
						age : $("#vd_txt_age").val(),
						gender : victim_gender,
						height : parseInt($("#vd_txt_height").val()),
						weight : parseInt($("#vd_txt_weight").val()),
						address : "",
						phone_number : $("#vd_txt_phone").val(),
						religion : $("#vd_txt_religion").val(),
						comments : ""
					}
			};			
		}
		
		$.ajax({
		    url: api_url,
		    type: method,
		    dataType: 'json',
		    crossDomain: true,
		    async : false,
		    cache : false,
		    data : JSON.stringify(victim), 
		    contentType : "application/json",
		    beforeSend: function(xhr){
		        xhr.setRequestHeader("Authorization", document.login_info.auth_token);
		    },
		    success: function(result) {
		    	console.log("success for " + method + "in URL " + api_url);
		    },
		    error: function (result) {
		    	console.log("error for " + method + "in URL " + api_url);
		    	console.log(victim);
		    	console.log(JSON.stringify(victim));
		    	console.log(result);
		    } 
		});		
		
		alert("salvei");

	}); 
});

$(document).on('pagebeforeshow', '#victim_detail', function() {
	console.log("#victim_detail.pagebeforeshow");
	console.log(document.victim);
	
	$('#vd_span_tagid').empty();
	$('#vd_span_tagid').append(document.victim.tag_id);

	$("#vd_txt_age").val("");
	$("#vd_txt_height").val("cm"); // TODO: Event onclick to clean on first focus
	$("#vd_txt_weight").val("kg"); // TODO: Event onclick to clean on first focus
	
	$("#vd_txt_name").val("");
	$("#vd_txt_phone").val("");
	$("#vd_txt_religion").val("");
	$("#vd_txt_allergy").val("");
	
	if (document.victim.id != undefined) {
		console.log("id != undefined");
		$("#vd_txt_age").val( document.victim.personal_data.age);
		$("#vd_txt_height").val( document.victim.personal_data.height);
		$("#vd_txt_weight").val( document.victim.personal_data.weight);
		$("#vd_txt_name").val(document.victim.personal_data.victim_name);
		$("#vd_txt_phone").val( document.victim.personal_data.phone_number);
		$("#vd_txt_religion").val( document.victim.personal_data.religion);
		$("#vd_txt_allergy").val( "unavailable");
		// TODO: add comment field in HTML and here.
		// TODO: 3t checkboxes
		
		
		
		switch (document.victim.personal_data.gender) {
		case "MALE":
			//$("#vd_menu_gender").val("1");
			$("#vd_menu_gender").prop("selectedIndex", 0);
			break;
		case "FEMALE":
			//$("#vd_menu_gender").val("2");
			$("#vd_menu_gender").prop("selectedIndex", 1);
			break;
		default:
			console.log("document.victim.personal_data.gender [" + document.victim.personal_data.gender +"] != MALE, FEMALE");
		}
		
		$("#vd_menu_gender option[value='3']").attr("disabled", true);
		$("#vd_menu_gender").selectmenu("refresh");
	}
});