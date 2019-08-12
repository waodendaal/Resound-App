document.addEventListener('deviceready', function() {

setTimeout(function(){ 
    $('#loader').fadeOut();
}, 1000);

$('#nav_home').addClass('active');

// Navigation
$(window).swipe( {    
    //Generic swipe handler for all directions
    swipe:function(event, direction, distance, duration, fingerCount, fingerData) {     
        if (direction == 'right'){
            window.location.replace('index.html')

            // $.mobile.back();
        }
        
    }
});

var previouspage = window.sessionStorage.getItem("page");
window.sessionStorage.setItem("artTrack","yes_p");


document.addEventListener("backbutton", function (e) {
window.location.replace('index.html')
})

$(document).on('click','#luxbar-brand', function(){
// window.location.replace(previouspage);
window.location.replace('index.html')
});

let currentPage = 'happeningnow.html';
window.sessionStorage.setItem("page",currentPage); 

})