$(document).on('pagebeforeshow', '#home', function() {
		$('#home_lv_incidents').empty();	
		$.ajax({
		    url: 'http://mci.stribog.com.br/api/incidents/',
		    type: 'GET',
		    dataType: 'json',
		    crossDomain: true,
		    async : false,
		    cache : false,
		    beforeSend: function(xhr){
		        xhr.setRequestHeader("Authorization", document.login_info.auth_token);
		    },
		    success: function(result) {
		        //alert(JSON.stringify(result));
		        $('#home_lv_incidents').append('<li data-role="list-divider" role="heading">Incident list</li>');		        
		        
		        $.each(result, function(i, row) {
					$('#home_lv_incidents').append(
							'<li><a href="" data-id="' + row.id + '" data-transition="slide">' + 
							row.incident_name + '</a></li>'
							);
					});
				
		        $('#home_lv_incidents').listview('refresh');
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
});



$(document).on('vclick', '#home_lv_incidents li a', function() {
	document.incident = {
			id: $(this).attr('data-id'),
			name: $(this).text()
	};
	//alert(JSON.stringify(document.incident));
	$.mobile.changePage("#victim_locator", {
		transition : "slide",
		changeHash : false
	});
});