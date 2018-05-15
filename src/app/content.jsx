/*
@AUTHOR Yuan Chang
*/

import $ from 'jquery';


var long = null;
var lati = null;

function installFakeGeolocationCode() {
	console.log("long",long,"lati",lati);
	if(long!=null&&lati!=null){
		console.log("start changing");
	navigator.geolocation.getCurrentPosition = function(success, failure,option) { 
    success({ coords: { 
        latitude: long, 
        longitude: lati,
        accuracy: 10,
		altitude: null,
		altitudeAccuracy: null,
		heading: null,
		speed: null
    }, timestamp: new Date().getTime()}); }
} 
}

if (document.documentElement.tagName.toLowerCase() == 'html') {  // Skip non-html pages.
	chrome.runtime.sendMessage({message:"askForData"},
		function(res){
			console.log(res);
			long = res.long;
			var script = document.createElement('script');
			script.appendChild(document.createTextNode('var long = '+res.data.long+', lati = '+res.data.lati+';'));
			script.appendChild(document.createTextNode('('+ installFakeGeolocationCode +')();'));
			var parent = (document.head || document.body || document.documentElement);
			var firstChild = (parent.childNodes && (parent.childNodes.length > 0)) ? parent.childNodes[0] : null;
			if (firstChild) {
			  parent.insertBefore(script, firstChild);
			} else {
			  parent.appendChild(script);
			}
		});
	
}