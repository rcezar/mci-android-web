
function runtimePopup(message,header, fun_ok,showcancel,css) {
	$('#mydivpopup-popup').remove(); //remove popup if it's already
	$('#mydivpopup-screen').remove(); //remove popup if it's already
	$.mobile.activePage.find().remove('#mydivpopup');
	//create a div for the popup
	var odiv = ($('#mydivpopup').length) ? $('#mydivpopup') : $("<div id='mydivpopup' data-role='popup'></div>");
	var $popUp = odiv.popup({
		dismissible : false,
		transition : "pop",
		overlyaTheme : "a",
		history:false
	}).on("popupafterclose", function() {
		//remove the popup when closing
		$(this).remove();
		$('#mydivpopup-screen').remove();
		$('#mydivpopup-popup').remove();
	});

	if(css)
		$('#mydivpopup-popup').css(css);
	else	
		$('#mydivpopup-popup').css("max-width","300px");

	//create a title for the popup
	var $divHeder = $("<div/>", {"class":"ui-header ui-bar-b"});
	$("<p class='popupHeader'>" + header + "</p>").appendTo($divHeder);
	$divHeder.appendTo($popUp);

	//create content
	var $divContent = $("<div class='ui-content'>" + message + "</div>");
	$divContent.appendTo($popUp);

	//create a back button
	$("<a>", {
		id: "mydivpopup-close",
		text : "Cancel",
		"data-jqm-rel" : "back"
	}).buttonMarkup({
		inline : true
	}).on("click", function() {
		$popUp.detach();
		$popUp.popup("close");
	}).appendTo($popUp);

	if(!showcancel) {
		$popUp.find('#mydivpopup-close').hide();
	}

	fun_ok = (fun_ok) ? fun_ok : function(){}; 

	//Create a submit button
	$("<a>", {
		text : "OK",
		"data-jqm-rel" : "back"
	}).buttonMarkup({
		inline : true
	}).on("click", function() {
		//close
		$('#mydivpopup-close').trigger("click");
		setTimeout(function(){fun_ok();},100);
	}).appendTo($popUp);

	$popUp.trigger("create");
	$popUp.popup("open");

	//Set PopUp to window center
	if($('#mydivpopup-popup').is('.ui-popup-hidden')) {
		$('#mydivpopup-popup').removeClass('ui-popup-hidden');
		$('#mydivpopup-popup').addClass('pop');
		$('#mydivpopup-popup').addClass('in');
		$('#mydivpopup-popup').addClass('ui-popup-active');
		$('#mydivpopup-popup').addClass('ui-popup-container');
	}
	if($('#mydivpopup-screen').is('.ui-screen-hidden')) {
		$('#mydivpopup-screen').removeClass('ui-screen-hidden');
		$('#mydivpopup-screen').addClass('in');
		$('#mydivpopup-screen').addClass('ui-popup-screen');
	}
	if(!$('#mydivpopup').is('.ui-body-c'))
		$('#mydivpopup').addClass('ui-body-c');

	var popHeight = $('#mydivpopup').height();
	var popWidth = $('#mydivpopup').width();
	var viewportHeight = jQuery(window).height();
	var viewportWidth = jQuery(window).width();
	var top  = (viewportHeight/2) - (popHeight/2);
	var left = (viewportWidth/2) - (popWidth/2);
	if(top > 0) {
		$('#mydivpopup-popup').css("top",top+"px");
	}
	if(left > 0) {
		$('#mydivpopup-popup').css("left",left+"px");
	}
}
















/*



function runtimePopup(message,header, fun_ok,showcancel,css) {
	$('#mydivpopup-popup').remove(); //remove popup if it's already
	$('#mydivpopup-screen').remove(); //remove popup if it's already
	$.mobile.activePage.find().remove('#mydivpopup');
	//create a div for the popup
	var odiv = ($('#mydivpopup').length) ? $('#mydivpopup') : $("<div id='mydivpopup' data-role='popup'></div>");
	var $popUp = odiv.popup({
		dismissible : false,
		transition : "pop",
		overlyaTheme : "a",
		history:false
	}).on("popupafterclose", function() {
		//remove the popup when closing
		$(this).remove();
		$('#mydivpopup-screen').remove();
		$('#mydivpopup-popup').remove();
	});

	if(css)
		$('#mydivpopup-popup').css(css);
	else	
		$('#mydivpopup-popup').css("max-width","300px");

	//create a title for the popup
	var $divHeder = $("<div/>", {"class":"ui-header ui-bar-b"});
	$("<p class='popupHeader'>" + header + "</p>").appendTo($divHeder);
	$divHeder.appendTo($popUp);

	//create content
	var $divContent = $("<div class='ui-content'>" + message + "</div>");
	$divContent.appendTo($popUp);

	//create a back button
	$("<a>", {
		id: "mydivpopup-close",
		text : "Cancel",
		"data-jqm-rel" : "back"
	}).buttonMarkup({
		inline : true
	}).on("click", function() {
		$popUp.detach();
		$popUp.popup("close");
	}).appendTo($popUp);

	if(!showcancel) {
		$popUp.find('#mydivpopup-close').hide();
	}

	fun_ok = (fun_ok) ? fun_ok : function(){}; 

	//Create a submit button
	$("<a>", {
		text : "OK",
		"data-jqm-rel" : "back"
	}).buttonMarkup({
		inline : true
	}).on("click", function() {
		//close
		$('#mydivpopup-close').trigger("click");
		setTimeout(function(){fun_ok();},100);
	}).appendTo($popUp);

	$popUp.trigger("create");
	$popUp.popup("open");

	//Set PopUp to window center
	if($('#mydivpopup-popup').is('.ui-popup-hidden')) {
		$('#mydivpopup-popup').removeClass('ui-popup-hidden');
		$('#mydivpopup-popup').addClass('pop');
		$('#mydivpopup-popup').addClass('in');
		$('#mydivpopup-popup').addClass('ui-popup-active');
		$('#mydivpopup-popup').addClass('ui-popup-container');
	}
	if($('#mydivpopup-screen').is('.ui-screen-hidden')) {
		$('#mydivpopup-screen').removeClass('ui-screen-hidden');
		$('#mydivpopup-screen').addClass('in');
		$('#mydivpopup-screen').addClass('ui-popup-screen');
	}
	if(!$('#mydivpopup').is('.ui-body-c'))
		$('#mydivpopup').addClass('ui-body-c');

	var popHeight = $('#mydivpopup').height();
	var popWidth = $('#mydivpopup').width();
	var viewportHeight = jQuery(window).height();
	var viewportWidth = jQuery(window).width();
	var top  = (viewportHeight/2) - (popHeight/2);
	var left = (viewportWidth/2) - (popWidth/2);
	if(top > 0) {
		$('#mydivpopup-popup').css("top",top+"px");
	}
	if(left > 0) {
		$('#mydivpopup-popup').css("left",left+"px");
	}
}

		function runtimePopup(message,header, fun_ok,showcancel,css) {
			$('#mydivpopup-popup').remove(); //remove popup if it's already
			$('#mydivpopup-screen').remove(); //remove popup if it's already
			$.mobile.activePage.find().remove('#mydivpopup');
			//create a div for the popup
			var odiv = ($('#mydivpopup').length) ? $('#mydivpopup') : $("<div id='mydivpopup' data-role='popup'></div>");
			var $popUp = odiv.popup({
				dismissible : false,
				transition : "pop",
				overlyaTheme : "a",
				history:false
			}).on("popupafterclose", function() {
				//remove the popup when closing
				$(this).remove();
				$('#mydivpopup-screen').remove();
				$('#mydivpopup-popup').remove();
			});

			if(css)
				$('#mydivpopup-popup').css(css);
			else	
				$('#mydivpopup-popup').css("max-width","300px");

			//create a title for the popup
			var $divHeder = $("<div/>", {"class":"ui-header ui-bar-b"});
			$("<p class='popupHeader'>" + header + "</p>").appendTo($divHeder);
			$divHeder.appendTo($popUp);

			//create content
			var $divContent = $("<div class='ui-content'>" + message + "</div>");
			$divContent.appendTo($popUp);

			//create a back button
			$("<a>", {
				id: "mydivpopup-close",
				text : "Cancel",
				"data-jqm-rel" : "back"
			}).buttonMarkup({
				inline : true
			}).on("click", function() {
				$popUp.detach();
				$popUp.popup("close");
			}).appendTo($popUp);

			if(!showcancel) {
				$popUp.find('#mydivpopup-close').hide();
			}

			fun_ok = (fun_ok) ? fun_ok : function(){}; 

			//Create a submit button
			$("<a>", {
				text : "OK",
				"data-jqm-rel" : "back"
			}).buttonMarkup({
				inline : true
			}).on("click", function() {
				//close
				$('#mydivpopup-close').trigger("click");
				setTimeout(function(){fun_ok();},100);
			}).appendTo($popUp);

			$popUp.trigger("create");
			$popUp.popup("open");

			//Set PopUp to window center
			if($('#mydivpopup-popup').is('.ui-popup-hidden')) {
				$('#mydivpopup-popup').removeClass('ui-popup-hidden');
				$('#mydivpopup-popup').addClass('pop');
				$('#mydivpopup-popup').addClass('in');
				$('#mydivpopup-popup').addClass('ui-popup-active');
				$('#mydivpopup-popup').addClass('ui-popup-container');
			}
			if($('#mydivpopup-screen').is('.ui-screen-hidden')) {
				$('#mydivpopup-screen').removeClass('ui-screen-hidden');
				$('#mydivpopup-screen').addClass('in');
				$('#mydivpopup-screen').addClass('ui-popup-screen');
			}
			if(!$('#mydivpopup').is('.ui-body-c'))
				$('#mydivpopup').addClass('ui-body-c');

			var popHeight = $('#mydivpopup').height();
			var popWidth = $('#mydivpopup').width();
			var viewportHeight = jQuery(window).height();
			var viewportWidth = jQuery(window).width();
			var top  = (viewportHeight/2) - (popHeight/2);
			var left = (viewportWidth/2) - (popWidth/2);
			if(top > 0) {
				$('#mydivpopup-popup').css("top",top+"px");
			}
			if(left > 0) {
				$('#mydivpopup-popup').css("left",left+"px");
			}
		}

*/
document.runtimePopup = runtimePopup;