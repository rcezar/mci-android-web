
$(document).on('pagebeforeshow', '#victim_locator', function() {
		$('#vl_title').empty();
		$('#vl_title').append(document.incident.name);
		
		
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
		    	info = null
		    	if (result.responseText == undefined) {
		    		info = result.statusText
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
	 
	 return null
}

$(document).on('pageinit', '#victim_locator', function() {
	
	document.victim = {
		tag_id : null
	};
	
	$( "#vl_searchinput" ).cleaned = false;
	
	$( "#vl_searchinput" ).focus(function() {
		if (!this.cleaned){
			this.value = '';
			this.cleaned=true;
		}
	});
	
	$("#vl_btn_go").bind("click", function(event) {
		console.log("chamou");
		document.victim.tag_id = $("#vl_searchinput").val();
		
		victim = search_tag_id(document.victim.tag_id);
		
		// TODO: present dialog boxes
		if (victim == null) {
			console.log("victim does not exist, next page will add a new one with tag id " + document.victim.tag_id);
		} else {
			console.log("victim found for tag_id " + document.victim.tag_id + ", opening next page for edition ");
			document.victim = victim;
		}
		
		
		$.mobile.changePage("#victim_detail", {
			transition : "slide",
			changeHash : false
		});
	});
	
});