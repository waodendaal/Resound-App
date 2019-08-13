document.addEventListener('deviceready', function() {

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
window.sessionStorage.setItem("artwork_map", "all");
$(document).on('click','#luxbar-brand', function(){
    // NOT FOR ANDROID
    window.location.replace('index.html')
    // window.history.back();
    // $.mobile.back();

    
});
$(document).on('click','.luxbar-brand', function(){
    // NOT FOR ANDROID
    window.location.replace('index.html')
    // window.history.back();
    // $.mobile.back();

    
});
var networkState = navigator.connection.type;
    if (networkState == "none"){
        
//          You are offline
        window.location.replace('index.html')

        
}

let currentPage = 'schedule.html';
window.sessionStorage.setItem("page",currentPage); 
setTimeout(function(){ 
    $('#loader').fadeOut();
}, 1000);

})