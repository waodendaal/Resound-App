document.addEventListener('deviceready', function() {
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
                        <li id="nav_home" class="luxbar-item"><a href="index.html">Home</a></li>\
                        <li id="nav_sched" class="luxbar-item"><a href="schedule.html">Schedule</a></li>\
                        <li class="luxbar-item"><a href="floorplan.html">Floorplan</a></li>\
                        <li class="luxbar-item"><a href="artworks.html">Artworks</a></li>\
                        </ul>\
                    </div>\
                </div>').appendTo(container);
    if ($('body').prop('id') == 'index_page'){
        $('.luxbar').hide();
    }
});


//DB First Time


