


import $ from 'jquery'; 
import {getChromeSync,setChromeSync} from './storage.js';



/* BACKGROUND page captures the messages that are being sent */
/*---------------------------------------------------------------------------------------------------------------------*/



// This is the main router that handles requests from the popup and content scripts, sends the appropriate
// returns data if appropriate
chrome.runtime.onMessage.addListener( // chrome message api, add listener tells the background.jsx to attach a listener
  function(request, sender, sendResponse){ 

  	if(request.message == "userinput"){
  		console.log("save input",request);
  		setChromeSync({"data":{"long":request.long,"lati":request.lati}});
  		return true;
  	}
	if(request.message == "askForData"){
		console.log("receive ask for data");
		getChromeSync("data")
		.then((data)=>{
			sendResponse(data);
		});
		return true;
	}
  }
);

chrome.runtime.onMessageExternal.addListener(
  function(request, sender, sendResponse) {
    if (request.message == "askForData"){
    	console.log("rrrrr");
    	return true;
    }
  });

export {updateLogHeader}



