let text = document.getElementById("texts");
let adder = document.getElementById("add");
let ext = document.getElementById("extract");

//***Adding data to chrome storage***
let sizes = document.getElementById("YT_HACK_SIZE");
sizes.addEventListener("click", (event)=> {
    text.innerHTML = "changed";
    chrome.storage.local.set({"size":sizes.value});
});

//add link to chrome local storage
function add(){
    chrome.tabs.query({"active":true, "currentWindow":true},(tab)=>{
        text.innerHTML="added video";
        if (tab[0].url.includes("youtube.com")){
            chrome.storage.local.set({"link": ""+tab[0].url});
        } 
		chrome.storage.local.set({"play":false});
        
    });
}

//generate iframe from locally stored link
function extract(){
    text.innerHTML="adding video";
    chrome.storage.local.set({"play":true});
}

//Adding listeners
adder.addEventListener("click", (event)=>{
    add();
});
ext.addEventListener("click", (event)=>{
    extract();
});


