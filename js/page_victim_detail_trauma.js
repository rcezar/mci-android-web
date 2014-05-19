$(document).on('pagebeforeshow', '#victim_detail_trauma', function() {
	console.log("#victim_detail_trauma.pagebeforeshow");
	console.log(document.victim);

	$('#vd_trauma_span_tagid').empty();
	$('#vd_trauma_span_tagid').append(document.victim.tag_id);

	$('#vd_trauma_li_listview').empty();

	$.each(document.victim.traumas, function(i, trauma) {
		$('#vd_trauma_li_listview').append('<li><a href="#"> <p> <strong> Type:</strong> ' + trauma.trauma_type + 
			' | <strong>Region:</strong> ' + trauma.bodypart + '| <strong>Date:</strong> ' + trauma.timestamp + 
			'</p><p>' + trauma.description + '</p></a>' + 
			'<a href="#vd_trauma_li_edit" data-id="'+i+'" data-rel="popup" data-position-to="window" data-transition="pop">More</a>');
	});
	$('#vd_trauma_li_listview').listview('refresh');

});

$(document).on('vclick', '#vd_trauma_li_listview li a', function() {
			console.log($(this).attr('data-id'));
			
			if ($(this).attr('data-id') != undefined){
				//$("#vd_trauma_li_edit").attr("selected_trauma",$(this).attr('data-id'));
				i=parseInt($(this).attr('data-id'));
				$("#vd_trauma_type_select").val(document.victim.traumas[i].trauma_type).change();
				$("#vd_trauma_bodypart_select").val(document.victim.traumas[i].bodypart).change();
				$("#vd_trauma_comments_textarea").val(document.victim.traumas[i].description);
			}
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