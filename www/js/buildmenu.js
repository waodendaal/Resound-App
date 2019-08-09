document.addEventListener('deviceready', function() {
    alert("MENU BUILDING")
    // https://www.cssscript.com/responsive-css-header-navigation-luxbar/
    let container = $('#navbar');
    let navbar = $('<div class="luxbar luxbar-static">\
                    <input type="checkbox" id="luxbar-checkbox" class="luxbar-checkbox" value="on">\
                    <div class="luxbar-menu luxbar-menu-material-bluegrey">\
                        <ul class="luxbar-navigation">\
                        <li class="luxbar-header">\
                            <a class="luxbar-brand" href="#"><i class="fas fa-chevron-left"></i></a>\
                            <label class="luxbar-hamburger luxbar-hamburger-doublespin" for="luxbar-checkbox">\
                                <span></span>\
                            </label>\
                        </li>\
                        <li id="nav_home" class="luxbar-item"><a href="index.html">HOME</a></li>\
                        <li class="luxbar-item"><a href="happeningnow.html">WHAT\'S ON NEXT</a></li>\
                        <li id="nav_sched" class="luxbar-item"><a href="schedule.html">PROGRAM</a></li>\
                        <li class="luxbar-item"><a href="artworks.html">ARTWORKS</a></li>\
                        <li class="luxbar-item"><a href="floorplan.html">MAP</a></li>\
                        </ul>\
                    </div>\
                </div>').appendTo(container);
                // <li class="luxbar-item"><a href="fileTest.html">TEST</a></li>\


    $(document).on('click','.luxbar-brand', function(){
        if ($('body').prop('id') != 'index_page'){
            window.history.back();

            // alert("BACK")
            window.history.back();
            $.mobile.back();
            // window.location.replace(previouspage);
            // window.location.replace('index.html')
        }

    });
     
    // Page dependend changes
    if ($('body').prop('id') == 'index_page') {
        alert("MENU luxbar hide")
        // alert(String(window.sessionStorage.getItem("artTrack")))
        if (window.sessionStorage.getItem("artTrack") == "no" || window.sessionStorage.getItem("artTrack") == null){
            $('.luxbar').hide();
        }
    }
    if (window.sessionStorage.getItem("artTrack") == 'yes_p' && $('body').prop('id') == 'index_page' ){
        $('.luxbar-brand').html('<i class="fas fa-chevron-right"></i>');
    }

    if (window.sessionStorage.getItem('page') == 'schedule.html'){
        $('.luxbar-brand').attr('data-rel', 'back')
    } 
    $('#nav_home').on('click', function(){
        window.sessionStorage.setItem("artTrack","no"); 
    })
    $('#nav_home').on('click', function(){
        alert("NAVEHOME")
        window.sessionStorage.setItem("page","index.html")
        window.sessionStorage.setItem("artTrack","no"); 
    })

        // Check Connection
    
        var networkState = navigator.connection.type;
        if (networkState == "none"){
            
    //          You are offline
            $('.luxbar-brand').after('<span>You are currently offline</span>')
        }

});


//DB First Time


