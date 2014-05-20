$(document).on('pagebeforeshow', '#victim_detail_trauma', function() {
	console.log("#victim_detail_trauma.pagebeforeshow");
	console.log(document.victim);

	$('#vd_trauma_span_tagid').empty();
	$('#vd_trauma_span_tagid').append(document.victim.tag_id);

	$('#vd_trauma_li_listview').empty();
	
	$.each(document.victim.traumas, function(i, trauma) {
		$('#vd_trauma_li_listview').append('<li><a href="#"> <p> <strong> Type:</strong> ' + trauma.trauma_type + ' | <strong>Region:</strong> ' + trauma.bodypart + '| <strong>Date:</strong> ' + trauma.timestamp + '</p><p>' + trauma.description + '</p></a>' + '<a href="#vd_trauma_li_edit" data-id="' + i + '" data-rel="popup" data-position-to="window" data-transition="pop">More</a>');
	});
	$('#vd_trauma_li_listview').listview('refresh');

});

function refreshTraumaListview(){
	$('#vd_trauma_li_listview').empty();

	$.each(document.victim.traumas, function(i, trauma) {
		$('#vd_trauma_li_listview').append('<li><a href="#"> <p> <strong> Type:</strong> ' + trauma.trauma_type + ' | <strong>Region:</strong> ' + trauma.bodypart + '| <strong>Date:</strong> ' + trauma.timestamp + '</p><p>' + trauma.description + '</p></a>' + '<a href="#vd_trauma_li_edit" data-id="' + i + '" data-rel="popup" data-position-to="window" data-transition="pop">More</a>');
	});
	$('#vd_trauma_li_listview').listview('refresh');
} 

document.trauma_data_id = -1;

$(document).on('vclick', '#vd_trauma_li_listview li a', function() {
	console.log($(this).attr('data-id'));

	if ($(this).attr('data-id') != undefined) {
		//$("#vd_trauma_li_edit").attr("selected_trauma",$(this).attr('data-id'));
		i = parseInt($(this).attr('data-id'));
		$("#vd_trauma_type_select").val(document.victim.traumas[i].trauma_type).change();
		$("#vd_trauma_bodypart_select").val(document.victim.traumas[i].bodypart).change();
		$("#vd_trauma_comments_textarea").val(document.victim.traumas[i].description);
		document.trauma_data_id = i;
	}
});
//Btn SAVE Trauma
$(document).on('vclick', '#vd_trauma_select_save_btn', function() {
	console.log('vd_trauma_select_save_btn');
	console.log('i: ' + i);
	console.log('trauma_data_id: ' + document.trauma_data_id);
	var trauma_type = $("#vd_trauma_type_select").val();
	var bodypart = $("#vd_trauma_bodypart_select").val();
	var description = $("#vd_trauma_comments_textarea").val();
	var j=document.trauma_data_id;
	
	if (j == document.victim.traumas.length) {
		document.victim.traumas[j]=[];
	}
	if (document.trauma_data_id >= 0) {
		console.log('trauma_type: ' + trauma_type + " , " +document.victim.traumas[j].trauma_type);
		console.log('trauma_type: ' + bodypart + " , " +document.victim.traumas[j].bodypart);
		console.log('trauma_type: ' + description + " , " +document.victim.traumas[j].description	);
		
		if (trauma_type != document.victim.traumas[j].trauma_type) {
			console.log('trauma type changed');
			document.victim.traumas[j].trauma_type = trauma_type;
		};
		if (bodypart != document.victim.traumas[j].bodypart) {
			console.log('body part changed');
			document.victim.traumas[j].bodypart = bodypart;
		};
		if (description != document.victim.traumas[j].description) {
			console.log('description changed');
			document.victim.traumas[j].description = description;
		};
	}
	refreshTraumaListview();
});

//Btn ADD Trauma
$(document).on('vclick', '#vdtrauma_btn_addtrauma', function() {
	console.log('vdtrauma_btn_addtrauma');
	console.log('old trauma_data_id: ' + document.trauma_data_id);	
	$("#vd_trauma_type_select").val("").change();
	$("#vd_trauma_bodypart_select").val("").change();
	$("#vd_trauma_comments_textarea").val("").change();
	document.trauma_data_id = document.victim.traumas.length;	
	//TODO Criar uma nova entrada no document.victim.traumas
	console.log('trauma_data_id: ' + document.trauma_data_id);	
});

$(document).on('pageinit', '#victim_detail_trauma', function() {
	console.log("#victim_detail_trauma.pageinit");
	console.log(document.victim);

	var result = $.ajax({
		url : 'http://mci.stribog.com.br/api/list_trauma_metadata/',
		type : 'GET',
		dataType : 'json',
		crossDomain : true,
		async : false,
		cache : false,
		beforeSend : function(xhr) {
			xhr.setRequestHeader("Authorization", document.login_info.auth_token);
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
	}).responseText;
	trauma_metadata = JSON.parse(result);

	$.each(trauma_metadata.bodyparts, function(i, bodypart) {
		$('#vd_trauma_bodypart_select').append('<option value="' + bodypart + '">' + bodypart + '</option>');
	});

	$.each(trauma_metadata.trauma_types, function(i, trauma_type) {
		$('#vd_trauma_type_select').append('<option value="' + trauma_type + '">' + trauma_type + '</option>');

	});

});
