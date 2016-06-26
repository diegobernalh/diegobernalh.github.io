/*
window.onload = addListeners();


function addListeners() {
    document.getElementById('dragemail').addEventListener('mousedown', mouseDown, false);


    window.addEventListener('mouseup', mouseUp, false);
}

function divMove(e) {
    var div = document.getElementById('dragemail');
    div.style.top = e.clientY - (div.offsetHeight / 2) + 'px';
    div.style.left = e.clientX - (div.offsetWidth / 2) + 'px';

    console.log(e.srcElement)
}


function mouseDown(e) {
    window.addEventListener('mousemove', divMove, true);
}

function mouseUp() {
    window.removeEventListener('mousemove', divMove, true);
}
*/

$(function () {
    $("#dragemail").draggable();
    $("#draginstagram").draggable();
    $("#dragbehance").draggable();
    $("#dragpepepino").draggable();
    $("#dragticket").draggable();
    $("#dragastro").draggable();
    $("#yo").draggable();
});






//--------------------------------------

//------------ABOUT---------------

$(document).ready(function () {
    var about = false;
    $("#bio").click(function () {

        if (about == false) {
            $(".content").addClass("content-none");
            about = true;
        } else {
            $(".content").removeClass("content-none");
            about = false;
        }


    });

    //------------WORK---------------

    var work = false;
    $("#projects").click(function () {

        if (work == false) {
            $(".projectwrap").addClass("projectwrap-none");
            work = true;
        } else {
            $(".projectwrap").removeClass("projectwrap-none");
            work = false;
        }


    });

    //------------CONTACT---------------

    var contact = false;
    $("#email").click(function () {

        if (contact == false) {
            $(".contact").addClass("contact-none");
            contact = true;
        } else {
            $(".contact").removeClass("contact-none");
            contact = false;
        }


    });


    //------------BG---------------

    var bg = false;
    $("#background").click(function () {

        if (bg == false) {
            $("body").addClass("bg");
            bg = true;
        } else {
            $("body").removeClass("bg");
            bg = false;
        }


    });




});