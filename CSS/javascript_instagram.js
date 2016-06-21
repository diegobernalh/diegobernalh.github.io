window.onload = addListeners();

function addListeners() {
    document.getElementById('draginstagram').addEventListener('mousedown', mouseDown, false);
    window.addEventListener('mouseup', mouseUp, false);

}

function mouseUp() {
    window.removeEventListener('mousemove', divMove, true);
}

function mouseDown(e) {
    window.addEventListener('mousemove', divMove, true);
}

function divMove(e) {
    var div = document.getElementById('draginstagram');
    div.style.position = 'absolute';
    div.style.top = e.clientY + 'px';
    div.style.left = e.clientX + 'px';
}

window.onload = addListeners();

var button1 = document.getElementById('dragemail');


function addListeners() {
    document.getElementById('dragemail').addEventListener('mousedown', mouseDown, false);
    window.addEventListener('mouseup', mouseUp, false);

}

function mouseUp() {
    window.removeEventListener('mousemove', divMove, true);
}

function mouseDown(e) {
    window.addEventListener('mousemove', divMove, true);
}

function divMove(e, div) {
    
    var div = document.getElementById('dragemail');
    
   // div.style.position = 'absolute';
    
    
    var x = e.clientX;     // Get the horizontal coordinate
    var y = e.clientY;     // Get the vertical coordinate
    
    var coor = "X coords: " + x + ", Y coords: " + y;
    
    console.log(div.offsetHeight);
    
    
    
    div.style.top = e.clientY - (div.offsetHeight/2) + 'px';
    div.style.left = e.clientX - (div.offsetWidth/2) + 'px';

}















//--------------------------------------



$(document).ready(function(){
    var about = false;
    $("#bio").click(function(){
             
                    if(about == false){
                        $(".content").addClass("content-none");
                        about = true;
                    }
                    else{
                        $(".content").removeClass("content-none");
                        about = false;
                    }
                    
                    
                });
    
    
    
    var work = false;
    $("#projects").click(function(){
             
                    if(work == false){
                        $(".projectwrap").addClass("projectwrap-none");
                        work = true;
                    }
                    else{
                        $(".projectwrap").removeClass("projectwrap-none");
                        work = false;
                    }
                    
                    
                });
    
    

                
                
            });



