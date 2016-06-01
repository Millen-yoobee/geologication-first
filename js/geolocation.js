var mainMap;
var allMarkers = [];

function initMap () {
	// alert ("google maps ready");   //for debugging purposes

	 // get a reference to the map container (div)
	var mapContainer = document.querySelector("#map-container");

	 // set some map options
	var options = {
		center: {
			lat: -41.297005,
			lng: 174.774478
		 },
		zoom: 15 // 20 closest to the street
	 };

	 // create a new google map
	mainMap = new google.maps.Map (mapContainer, options);

		// now we're ready to show the store markers
	placeStoreMarkers ();		
}

function placeStoreMarkers () {

	 // connect to the database and get the locations
	 var locations = [
	 	{
	 		title: "Hataitai Shop",
	 		lat: -41.304199,
	 		lng: 174.794832
	 	 },
	 	{
	 		title: "Petone Store",
	 		lat: -41.225400,
	 		lng: 174.877412
	 	 },
		{
	 		title: "Newtown Branch",
	 		lat: -41.313986,
	 		lng: 174.785800
	 	 }
	  ]; 

	   // loop over each location
	for ( var i = 0; i < locations.length; i++ ) {
		 // create a new marker
		var marker = new google.maps.Marker ( {
			position: {
				lat: locations [i].lat,
				lng: locations [i].lng								
			 },
			map: mainMap,
			title: locations [i].title,
			icon: "http://placehold.it/50x50",
			// or icon: "img/yourimage.png"
			id: i
		 });	

		 // Store this marker in the collection	 
		 allMarkers.push (marker);

	 }

	  // Show the contents of the allMarkers array
	console.log(allMarkers);

	 //Populate the store picker
	populateStorePicker ( locations );

}

function populateStorePicker ( locations) {
	// console.log ( locations );  //for debugging

	 // Find the store picker element
	var storePickerElement = document.querySelector ( "#store-picker");

	 // Create a "Please select..." option
	var optionElement = document.createElement ("option");
	optionElement.innerHTML = "Please select a store...";
	storePickerElement.appendChild ( optionElement );

	 // Create all the location options
	for ( var i = 0; i < locations.length; i++ )  {

		// Create a new option element
		var optionElement = document.createElement ("option");

		// Put the name of this store in the option element
		optionElement.innerHTML = locations [i].title;

		// Put this new option element in the select
		storePickerElement.appendChild ( optionElement );

	}

	// Listen for changes in the select element
	storePickerElement.onchange = showChosenLocation; //do not put ()
		// after function showChosenLocationso that it doesnt run immediately
}

function showChosenLocation () {
	
	// Get the element that triggered this function
	var selectElement = this;

	// Get the index of the option that was chosen
	var selectedOptionIndex = selectElement.selectedIndex;
	
	// Get the option that was selected
	var optionElement = selectElement [ selectedOptionIndex ];

	// Get the text that is inside this option
	var optionText = optionElement.value;

	//this [ this.selectedIndex].value,  above statements insted of this

	// Find the marker that matches the chosen option
	var theChosenMarker;
	for ( var i = 0; i < allMarkers.length; i++ ) {

		// Is this the marker?
		if ( optionText == allMarkers [i].title ) {
			// Found!
			theChosenMarker = allMarkers [i];
			// Make sure the loop finishes
			i = allMarkers.length;
		}

	 }
	 // alert ( theChosenMarker ); for debugging

	 // Only if we found a marker
	if ( theChosenMarker != undefined ) {

		 // Make Google Maps focus on the marker position
		// mainMap.panTo ( {   //use panTo instead of setCenter to animate
		mainMap.setCenter ( {
			lat: theChosenMarker.getPosition ().lat (),
			lng: theChosenMarker.getPosition ().lng ()
		} );
	}

}





