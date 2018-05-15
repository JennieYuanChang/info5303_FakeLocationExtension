/*
@AUTHOR Yuan Chang
*/

//wrapped function for storing Chrome extension states
function getChromeSync(key){
	return new Promise(function (resolve, reject) {
	    chrome.storage.sync.get(key, function (value) {
	        resolve(value);
	    });
	});
}

function setChromeSync(data){
	return new Promise(function (resolve, reject) {
	    chrome.storage.sync.set(data, function (result) {
	        resolve(result);
	    });
	});
}

export {getChromeSync,setChromeSync}