function peoplecallback(){
    alert("PEOPLE Button Pressed");
}
function newcallback(){
    alert("NEW Button Pressed");
}
function allcallback(){
    alert("ALL Button Pressed");
}
function listencallback(){
    alert("LISTEN Button Pressed");
}
function recordcallback(){
    alert("RECORD Button Pressed");
}
function stopcallback(){
    alert("STOP Button Pressed");
}
function sendcallback(){
    alert("SEND Button Pressed");
}

var doc= document;
var dial=doc.getElementById("dial");
var peoplebutton=doc.getElementById("peoplebutton");
//alert(peoplebutton.textContent);
var newbutton=doc.getElementById("newbutton");
//alert(newbutton.textContent);
var allbutton=doc.getElementById("allbutton");
//alert(allbutton.textContent);
var listenbutton=doc.getElementById("listenbutton");
//alert(listenbutton.textContent);
var recordbutton=doc.getElementById("recordbutton");
//alert(recordbutton.textContent);
var stopbutton=doc.getElementById("stopbutton");
//alert(stopbutton.textContent);
var sendbutton=doc.getElementById("sendbutton");
//alert(sendbutton.textContent);
var uparrow=doc.getElementById("uparrow");
var downarrow=doc.getElementById("downarrow");
var screen=doc.getElementById("screen");

peoplebutton.addEventListener("click",()=>peoplecallback());
newbutton.addEventListener("click",()=>newcallback());
allbutton.addEventListener("click",()=>allcallback());
listenbutton.addEventListener("click",()=>listencallback());
recordbutton.addEventListener("click",()=>recordcallback());
stopbutton.addEventListener("click",()=>stopcallback());
sendbutton.addEventListener("click",()=>sendcallback());