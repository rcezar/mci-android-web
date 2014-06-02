$(document).on('pagebeforeshow', '#victim_detail_vital_sign', function() {

	console.log("#victim_detail_vital_sign.pagebeforeshow");
	console.log(document.victim.vitalsigns);

	$('#vd_vitalsign_span_tagid').empty();
	$('#vd_vitalsign_span_tagid').append(document.victim.tag_id);

	document.victim.vitalsigns.push({
		timestamp : newDate(0),
		bp : "80/60",
		pulse : "80",
		respiration : "16"
	});

	document.victim.vitalsigns.push({
		timestamp : newDate(10),
		bp : "120/80",
		pulse : "80",
		respiration : "16"
	});

	document.victim.vitalsigns.push({
		timestamp : newDate(20),
		bp : "100/80",
		pulse : "80",
		respiration : "16"
	});

	$('#vd_vitalsign_history_table_tbody').empty();

	$.each(document.victim.vitalsigns, function(i, vitalsign) {
		console.log("each.vitalsign -> " + i + " vitalsign" + JSON.stringify(vitalsign));

		$('#vd_vitalsign_history_table').append('<tr><th>' + getTime(vitalsign.timestamp) + '</th><td>' + vitalsign.bp + '</td><td>' + vitalsign.pulse + '</td><td>' + vitalsign.respiration + '</td></tr>');
	});
	last = document.victim.vitalsigns[document.victim.vitalsigns.length - 1];
	$('#vd_vital_sign_current_content_pulse').empty();
	$('#vd_vital_sign_current_content_respiration').empty();
	$('#vd_vital_sign_current_content_bp').empty();
	$('#vd_vital_sign_current_content_time').empty();

	$('#vd_vital_sign_current_content_pulse').append(last.pulse);
	$('#vd_vital_sign_current_content_respiration').append(last.respiration);
	$('#vd_vital_sign_current_content_bp').append(last.bp);
	$('#vd_vital_sign_current_content_time').append(last.timestamp);

});

function newDate(delta) {
	var b = new Date();
	b.setMinutes(b.getMinutes() + delta);
	return b;
}

function getTime(b) {
	var vitalsigntime = b.getHours();
	vitalsigntime += ':' + b.getMinutes();
	vitalsigntime += ':' + b.getSeconds();
	return vitalsigntime;
}

function refreshVitalSignsHistory() {
	$("#vd_vitalsign_history_table_tbody").empty();

	$.each(document.victim.vitalsigns, function(i, vitalsign) {
		$('#vd_vitalsign_history_table').append('<tr><th>' + getTime(vitalsign.timestamp) + '</th><td>' + vitalsign.bp + '</td><td>' + vitalsign.pulse + '</td><td>' + vitalsign.respiration + '</td></tr>');
	});
}

function refreshCurrentVitalSign(){
	last = document.victim.vitalsigns[document.victim.vitalsigns.length - 1];
	$('#vd_vital_sign_current_content_pulse').empty();
	$('#vd_vital_sign_current_content_respiration').empty();
	$('#vd_vital_sign_current_content_bp').empty();
	$('#vd_vital_sign_current_content_time').empty();

	$('#vd_vital_sign_current_content_pulse').append(last.pulse);
	$('#vd_vital_sign_current_content_respiration').append(last.respiration);
	$('#vd_vital_sign_current_content_bp').append(last.bp);
	$('#vd_vital_sign_current_content_time').append(last.timestamp);
}

//Btn SAVE Trauma
$(document).on('vclick', '#vd_vitalsign_add_form_save_btn', function() {
	console.log('vd_vitalsign_add_form_save_btn');

	document.victim.vitalsigns.push({
		timestamp : (new Date()).toISOString(),
		agent : document.login_info.userid,
		timestamp : newDate(0),
		bp : $("#vd_vitalsign_bp_add").val(),
		pulse : $("#vd_vitalsign_pulse_add").val(),
		respiration : $("#vd_vitalsign_respiration_add").val()
	});

	refreshVitalSignsHistory();
	refreshCurrentVitalSign();
});
