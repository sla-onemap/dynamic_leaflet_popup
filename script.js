function populateMarkers(){
	//Creating artificial markers object. To simulate data from json return. 
	var staticData = {"ReturnCode":"0","Cases":[{"MobileCaseID":"W160831-001504","Subject":"Animals - Dead Animal","MobileCategory":"Animals","MobileSubCategory":"Dead Animal","CreatedDateTime":"2016-08-31T16:59:10","IncidentXCoordinate":23206.5018,"IncidentYCoordinate":40567.0393,"IncidentBlockNo":null,"IncidentStreetName":null,"IncidentPostalCode":null,"HasAttachment":false},{"MobileCaseID":"W160831-001503","Subject":"Animals - Dead Animal","MobileCategory":"Animals","MobileSubCategory":"Dead Animal","CreatedDateTime":"2016-08-31T16:58:34","IncidentXCoordinate":23626.6825,"IncidentYCoordinate":34320.0879,"IncidentBlockNo":null,"IncidentStreetName":"UNNAMED ROAD","IncidentPostalCode":null,"HasAttachment":false},{"MobileCaseID":"W160831-001502","Subject":"Animals - Dead Animal","MobileCategory":"Animals","MobileSubCategory":"Dead Animal","CreatedDateTime":"2016-08-31T16:46:15","IncidentXCoordinate":23875.0365,"IncidentYCoordinate":34301.1077,"IncidentBlockNo":"11","IncidentStreetName":"NAMLY CRESCENT","IncidentPostalCode":"267528","HasAttachment":false},{"MobileCaseID":"M160831-001496","Subject":"Animals - Other Animal Issues - Dog","MobileCategory":"Animals","MobileSubCategory":"Other Animal Issues","CreatedDateTime":"2016-08-31T12:30:44","IncidentXCoordinate":19548.8045,"IncidentYCoordinate":43386.5172,"IncidentBlockNo":null,"IncidentStreetName":null,"IncidentPostalCode":null,"HasAttachment":true}]};

	for(i=0;i<staticData.Cases.length;i++){

		var eachIncident = staticData.Cases[i];
		
		$.ajax({
		  url: "https://developers.onemap.sg/commonapi/convert/3414to4326?X="+eachIncident.IncidentXCoordinate+"&Y="+eachIncident.IncidentYCoordinate,
		  success: function( result ) {

		  	//Inject data into individual marker
		    var sampleMarker = new L.Marker([result.latitude, result.longitude],{MobileCaseID:eachIncident.MobileCaseID , Subject:eachIncident.Subject});
		    //Add to map (Evoking the function with data in it)
		    sampleMarker.on('click', onMarkerClick);
		    
		    sampleMarker.addTo(map);
		  }
		});
	}

}

//To dynamically change the data, text and images accordingly (So you load or call image on the fly)
function onMarkerClick(e) {

	//Get particular marker being clicked
	var tempMarker = this;

	//Simulate the calling of image using ajax
	$.ajax({
		  url: "https://developers.onemap.sg/commonapi/search?searchVal=revenue&returnGeom=Y&getAddrDetails=Y&pageNum=1",
		  success: function( result ) {

		  	alert("You have called an endpoint!")

		  	//Bind popup with information required(On the Fly)
			tempMarker.bindPopup("Mobile Case ID:" + e.target.options.MobileCaseID+"<br>"+"Subject:"+e.target.options.Subject);
		  	
		  	//Open the popup
			tempMarker.openPopup(); 
		  }
	});

}