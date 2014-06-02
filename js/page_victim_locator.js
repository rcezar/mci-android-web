
$(document).on('pagebeforeshow', '#victim_locator', function() {
		$('#vl_title').empty();
		$('#vl_title').append(document.incident.name);
		document.victim = {
			tag_id : null
		};
		console.log('victim = null');
		
		
		/* will be used to autocomplete field
		 $.ajax({
		    url: 'http://mci.stribog.com.br/api/incidents/'+document.incident.id+'/victims/',
		    type: 'GET',
		    dataType: 'json',
		    crossDomain: true,
		    async : false,
		    cache : false,
		    beforeSend: function(xhr){
		        xhr.setRequestHeader("Authorization", document.login_info.auth_token);
		    },
		    success: function(result) {
		        alert(JSON.stringify(result));
		        var tag_id_arr = [];
		        
		        $.each(result, function(i, row) {
		        	tag_id_arr.push(row.tag_id);		        	
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
		* 
		 */
		
});		

function search_tag_id(tag_id) {		
	 var result = $.ajax({
		    url: 'http://mci.stribog.com.br/api/incidents/'+document.incident.id+'/victims/?tag_id=' + tag_id ,
		    type: 'GET',
		    dataType: 'json',
		    crossDomain: true,
		    async : false,
		    cache : false,
		    beforeSend: function(xhr){
		        xhr.setRequestHeader("Authorization", document.login_info.auth_token);
		    },
		    error: function (result) {
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
	 data = JSON.parse(result);
	 
	 if (data.length > 0) 
		 return data[0];
	 
	 return null;
}


function retrieve_victim_trauma(victim_id) {		
	 var result = $.ajax({
		    url: 'http://mci.stribog.com.br/api/victims/'+victim_id+'/traumas/',
		    type: 'GET',
		    dataType: 'json',
		    crossDomain: true,
		    async : false,
		    cache : false,
		    beforeSend: function(xhr){
		        xhr.setRequestHeader("Authorization", document.login_info.auth_token);
		    },
		    error: function (result) {
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
	 data = JSON.parse(result);
	 console.log("traumas: "+JSON.stringify(data));
	 return data;
}


$(document).on('pageinit', '#victim_locator', function() {
	
	document.victim = {
		tag_id : null
	};
	
	$( "#vl_searchinput" ).context.cleaned = false;
	
	$( "#vl_searchinput" ).focus(function() {
		if (!($( "#vl_searchinput" ).context.cleaned)){
			$(this).val('');
			$(this).mask('99999');
			$( "#vl_searchinput" ).context.cleaned=true;
		}
	});
	
	$("#vl_btn_go").bind("click", function(event) {
		console.log("chamou");
		document.victim.tag_id = $("#vl_searchinput").val();
		
		
		victim = search_tag_id(document.victim.tag_id);
		
		// TODO: present dialog boxes
		if (victim == null) {
			alert("Victim does not exist, next page will add a new one with tag id " + document.victim.tag_id);
			document.victim.traumas = new Array();
			document.victim.vitalsigns = new Array();
		} else {
			document.victim = victim;
			document.victim.traumas = retrieve_victim_trauma(victim.id);
			document.victim.vitalsigns = new Array();
		}
		
		
		$.mobile.changePage("#victim_detail", {
			transition : "slide",
			changeHash : false
		});
	});
	
});