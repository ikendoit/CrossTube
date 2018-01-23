
//***************YOUTUBE**********************
//wait 2 secs for everything to load
setTimeout(()=> { 
	//grab video element
	let player = document.evaluate('//*[@id="player-container"]', document, null, XPathResult.FIRST_ORDERED_NODE_TYPE, null).singleNodeValue || null;
    //get data from storage local
    //chrome.storage.local.get("size", function(result){
    //    let size = result.size;
    //    if (size == null){
    //        chrome.storage.local.set({"size":"Large"});
    //        size="Large";
    //    }
    //    configure(player,size);
    //});

    //listen to changes from storage local
    chrome.storage.onChanged.addListener(function(changes, namespace){
        if (changes.hasOwnProperty("size")){
            configure(player,changes.size.newValue);
			configure(document.getElementById("YOUTUBE_CONFIG_ID"),size.newValue);
        }
		if (changes.hasOwnProperty("play")){
			//inject iframe into page
			if (changes.play.newValue){
				chrome.storage.local.get("link", function(result){
					console.log(JSON.stringify(result));
					console.log("adding video to DOM");
					inject(result.link);
				});
			} else {
				document.getElementById("YOUTUBE_CONFIG_ID").innerHTML="";
				document.getElementById("YOUTUBE_CONFIG_ID").setAttribute("style","display:none");
			}
		}
    });

}, 2000);

let move = function(x) {
	x.addEventListener("dragend", (event)=> {
		let style = window.getComputedStyle(x, null); 
		x.style.left = event.clientX+"px";
		x.style.top = event.clientY+"px";
	}, false);
}

let inject = function(url){
	var div = document.createElement("div");
	var newIframe = document.createElement("iframe");
	div.setAttribute("id","YOUTUBE_CONFIG_ID");
	div.setAttribute("draggable","true");
	div.setAttribute("style","position:fixed; top:3; bottom:0; z-index:999; overflow: hidden; padding:5px; background-color:orange; height : 150px; width:330px;");
	let link = url.split("watch?v=")[1];
	if (link.includes("&list")){
		link = link.split("&")[0];
	}
	newIframe.setAttribute("src","https://www.youtube.com/embed/"+link);

	div.appendChild(newIframe);
	
	move(div);
	document.body.appendChild(div);
	console.log("added elements");
}

//configure player in youtube
let configure = function(player, size) {
	if (player == null) return;
    let height = 0;
    let zoom = 0;
    let width = 0;
    switch (size){
        case "Large": 
            console.log("setting large");
            height = 110;
            width = 110;
            zoom = -10;
            break; 
        case "Medium": 
            console.log("setting medium");
            height = 70;
            width = 65;
            zoom = 60;
            break;            
        default : 
            console.log("setting default: large");
            height = 110;
            width = 110;
            zoom = -10;
            break;
    }

    //set the video style
    player.setAttribute("style","position:fixed; top: 2; clear: both; z-index:18; height : "+(2*height)/3+"%; width : "+(3*width)/5+"%;zoom : "+zoom+"%;");
    player.setAttribute("draggable","true");

    //add drag listener function to video container
    move(player);

    //set video-container parent element style
    player.parentNode.setAttribute("style", "position:relative; padding-bottom: 56.25%; padding-top: 30px; overflow: hidden; height : "+height/10+"%; width : "+width/10+"%;");
    player.parentNode.setAttribute("draggable","true");
}
