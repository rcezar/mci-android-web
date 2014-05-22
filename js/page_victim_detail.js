$(document).on('pageinit', '#victim_detail', function() {
	console.log("#victim_detail.pageinit");
	console.log(document.victim);

	$("#vd_btn_save").bind("click", function(event) {
		var method = null;
		var victim = null;
		var victim_gender = null;
		var api_url = null;

		victim_name = $("#vd_txt_name").val();
		age = $("#vd_txt_age").val();
		height = parseInt($("#vd_txt_height").val());
		weight = parseInt($("#vd_txt_weight").val());
		phone_number = $("#vd_txt_phone").val();
		religion = $("#vd_txt_religion").val();
		victim_gender = $("#vd_menu_gender").val();

		if (document.victim.id == undefined) {
			method = "POST";
			api_url = 'http://mci.stribog.com.br/api/incidents/' + document.incident.id + '/victims/';
			victim = {
				tag_id : document.victim.tag_id,
				creation_time : (new Date()).toISOString(),
				creation_agent : document.login_info.userid,
				incident : document.incident.id,
				personal_data : {
					victim_name : victim_name,
					age : age,
					gender : victim_gender,
					height : height,
					weight : weight,
					address : "",
					phone_number : phone_number,
					religion : religion,
					comments : ""
				},
				traumas : {}
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
					victim_name : victim_name,
					age : age,
					gender : victim_gender,
					height : height,
					weight : weight,
					address : "",
					phone_number : phone_number,
					religion : religion,
					comments : ""
				},
				traumas : document.victim.traumas
			};
		}

		result = $.ajax({
			url : api_url,
			type : method,
			dataType : 'json',
			crossDomain : true,
			async : false,
			cache : false,
			data : JSON.stringify(victim),
			contentType : "application/json",
			beforeSend : function(xhr) {
				xhr.setRequestHeader("Authorization", document.login_info.auth_token);
			},
			success : function(result) {
				console.log("success for " + method + "in URL " + api_url);
			},
			error : function(result) {
				console.log("error for " + method + "in URL " + api_url);
				console.log(victim);
				console.log(JSON.stringify(victim));
				console.log(result);
			}
		}).responseText;
		data = JSON.parse(result);
		document.victim = victim;
		if (document.victim.id == undefined) {
			document.victim.id = data.id;
		}
		alert("salvei");

	});
});

$(document).on('pagebeforeshow', '#victim_detail', function() {
	console.log("#victim_detail.pagebeforeshow");
	console.log(document.victim);

	$('#vd_span_tagid').empty();
	$('#vd_span_tagid').append(document.victim.tag_id);

	$("#vd_txt_age").val("");
	$("#vd_txt_height").val("cm");
	// TODO: Event onclick to clean on first focus
	$("#vd_txt_weight").val("kg");
	// TODO: Event onclick to clean on first focus

	$("#vd_txt_name").val("");
	$("#vd_txt_phone").val("");
	$("#vd_txt_religion").val("");
	$("#vd_txt_allergy").val("");

	if (document.victim.id != undefined) {
		console.log("id != undefined");
		$("#vd_txt_age").val(document.victim.personal_data.age);
		$("#vd_txt_height").val(document.victim.personal_data.height);
		$("#vd_txt_weight").val(document.victim.personal_data.weight);
		$("#vd_txt_name").val(document.victim.personal_data.victim_name);
		$("#vd_txt_phone").val(document.victim.personal_data.phone_number);
		$("#vd_txt_religion").val(document.victim.personal_data.religion);
		$("#vd_txt_allergy").val("unavailable");
		$("#vd_menu_gender").val(document.victim.personal_data.gender);
		$("#vd_menu_gender").selectmenu("refresh");
		// TODO: add comment field in HTML and here.
		// TODO: 3t checkboxes		
	}
});
