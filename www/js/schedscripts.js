document.addEventListener('deviceready', function() {

    


$('#program_arttrack_banner').on("click", function(){
    alert("HI")
})

$('#nav_home').addClass('active');


// Navigation
$(window).swipe( {    
    //Generic swipe handler for all directions
    swipe:function(event, direction, distance, duration, fingerCount, fingerData) {     
        if (direction == 'right'){
            alert("SWIPE")
            $.mobile.back();
        }
        
    }
});

var previouspage = window.sessionStorage.getItem("page");
window.sessionStorage.setItem("artTrack","yes_p");
window.sessionStorage.setItem("artwork_map", "all");
$(document).on('click','.luxbar-brand', function(){
    // NOT FOR ANDROID
    window.location.replace('index.html')
    window.history.back();
    alert("BACK")
    $.mobile.back();
    // window.location.replace(previouspage);
    // window.location.replace('index.html')
});

var networkState = navigator.connection.type;
    if (networkState == "none"){
        
//          You are offline
        window.location.replace('index.html')

        
}

let currentPage = 'schedule.html';
window.sessionStorage.setItem("page",currentPage); 
setTimeout(function(){ 
    alert('LOADER FADE')
    $('#loader').fadeOut();
}, 1000);

})