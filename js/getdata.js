$(document).on('pageinit', '#home', function() {
	var url = 'http://mci.stribog.com.br/api/incidents/';

	$.ajax({
		url : url,
		dataType : "json",
		async : true,
		success : function(result) {

			ajax.parseJSON(result);
		},
		error : function(request, error) {
			alert('Network error has occurred please try again!');
		}
	});
});

$(document).on('pagebeforeshow', '#headline', function() {
	$('#incident-data').empty();
	$.ajax({
		url : "http://mci.stribog.com.br/api/incidents/" + incident.id + "/victims/",
		dataType : "json",
		async : true,
		success : function(result) {
			ajax.populaListaVitimas(result);
		},
		error : function(request, error) {
			alert('Network error has occurred please try again!');
		}
	});
});

$(document).on('vclick', '#incident-list li a', function() {
	incident.id = $(this).attr('data-id');
	$.mobile.changePage("#headline", {
		transition : "slide",
		changeHash : false
	});
});

var incident = {
	id : null,
	result : null
};

var ajax = {
	parseJSON : function(result) {
		$.each(result, function(i, row) {
			console.log(JSON.stringify(row));
			$('#incident-list').append('<li><a href="" data-id="' + row.id + '"><h3>' + row.incident_name + '</h3></a></li>');
		});
		$('#incident-list').listview('refresh');
	},
	populaListaVitimas : function(result) {
		$('#victim-data').empty();
		$.each(result, function(i, row) {
			$('#victim-data').append('<li>Nome: ' + row.personal_data.victim_name + '</li>');
		});
	}
};
