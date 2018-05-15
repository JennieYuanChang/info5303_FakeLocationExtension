/*
@author: Yuan Chang
*/

// POPUP page is to display info - ask background page for info
// background checks with chrome if the background page has previously stored info there 



import React from 'react';
import {render} from 'react-dom';
import $ from 'jquery';


//show a message for 5 seconds
function showMessageBox(parent,message,color){
    $(parent + ' .msgbox').html(message);
    $(parent + ' .msgbox').addClass("success").css("color", color).fadeIn();
    $(parent + ' .msgbox').addClass("success").css("font-size", "15px");  
    setTimeout(function(){
        $(parent + ' .msgbox').html('');
    },5000)
}


//////////////////////////////////////////////////////////////////////////////////////////////////
// Main Interface
//////////////////////////////////////////////////////////////////////////////////////////////////
class PopUp extends React.Component {
	constructor(props) {
	  super(props);
	  this.state = {
		long:null,
		lati:null,
	  };  
	  this.userinput = this.userinput.bind(this);
	}
	 
	userinput(){
		console.log("sending:",this.state.long," ",this.state.lati);
		chrome.runtime.sendMessage({message:"userinput",long:this.state.long, lati:this.state.lati},{});
	}
	updateLong(evt){
		this.setState({long:evt.target.value});
	}
	updateLati(evt){
		this.setState({lati:evt.target.value});
	}
	render(){
		return <div>
				<table>
                <tr>
                  <th> longitude </th>
                  <th><input type="text" value={this.state.long} onChange={evt =>this.updateLong(evt)}/></th> 
                </tr>
                <tr>
                  <th> latitude </th>
                  <th><input type="text" value={this.state.lati} onChange={evt =>this.updateLati(evt)}/></th> 
                </tr>
             </table>
             <button onClick={this.userinput}> ok </button>
             </div>
	}
}


// render the image
render(<PopUp />,document.getElementById('app'));
	


