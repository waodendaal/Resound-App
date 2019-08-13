document.addEventListener('deviceready', function() {
    // $('#nav_home').addClass('active');
    $("#blue_bottom").hide()

    var screen_width = document.documentElement.clientWidth;
    let screen_height = document.documentElement.clientHeight;

    // setBlueBottom();

    
    function setBlueBottom(){
        $("#blue_bottom").show()
        let toppos = $('#blue_bottom').offset().top;
        let height = screen_height-toppos;
        // alert('Screenheight: ' + String(screen_height))
        // alert(' Top: ' + String(toppos))
        // alert(' Height: ' + String(height))

        $('#blue_bottom').css({'height':String(height)+'px'});
    }

    // DB
    var db  = window.openDatabase('ArtTestNew4.2', '4.2', 'Test_Art_Test_New4.2', 1000000);
    db.transaction(GetInfo);

    //Search
    $('#search_form').on('submit', function(e) { //use on if jQuery 1.7+
        e.preventDefault();  //prevent form from submitting
        db.transaction(GetSearch);

    });

    // Order By
    $('#orderbyartwork').on('click',function(){
        $('#orderbyartist').removeClass('btn-gray_active')
        $(this).addClass('btn-gray_active')
        db.transaction(GetSearch);
    })
    $('#orderbyartist').on('click',function(){
        $('#orderbyartwork').removeClass('btn-gray_active')
        $(this).addClass('btn-gray_active')
        db.transaction(GetSearch);
    })

    function GetSearch(tx){
        $('#artwork_list').removeClass('background_blue')
        $('#artwork_table').empty();
        $('#blue_bottom').hide()

        let orderBy = ""
        
        if ($('#orderbyartwork').hasClass('btn-gray_active')){
            orderBy ="artwork"
        }
        if ($('#orderbyartist').hasClass('btn-gray_active')){
            orderBy = "artist"
        }

        var searchval = $("#search_input").val();
        if (searchval== ""){
            var query = "SELECT * FROM ART ORDER BY "+orderBy+ " COLLATE NOCASE ASC";
            tx.executeSql(query, [], querySuccess, errorCB);
        }
        else {
            var query = "SELECT * FROM ART WHERE artist LIKE '%"+ searchval +"%' OR artwork LIKE '%"+ searchval +"%'";
            tx.executeSql(query, [], querySuccess, errorCB);
        }
        // Fill blue bottom
        // let screen_height = document.documentElement.clientHeight;
        // let offsetTop = $('#artwork_list').offset().top;
        // alert('OffsetTop: ', String(offsetTop))
        // $('#blue_bottom').css({'height':(offsetTop)})
    }

function GetInfo(tx) {
let query = 'SELECT * FROM ART ORDER BY artwork COLLATE NOCASE ASC'
// alert(String(query))
tx.executeSql(query, [], querySuccess, errorCB);


}

function querySuccess(tx, results) {

$('#no_results').css({'display':'none'})
$('#blue_bottom').show()
// Create DOM 
let shellDOM = $('#artwork_table');
// $('#program_arttrack_banner h1').text(String(results.rows.length));
for (var i = 0; i < results.rows.length; i++){
    let item = results.rows.item(i);

    let floor = ""
    let item_floor = item.floor.split('_')
    if (item_floor[1] == 'M'){
        floor = "Musikken Hus"
    }
    else if (item_floor[1] == 'C') {
        floor = "CREATE"
    }
    else if (item_floor[1]=='O'){
        floor = "Outside"
    }

    if (item_floor[0]=='0'){
        floor = floor + ' - Groundfloor'
    }
    else if (item_floor[0]=='-1'){
        floor = floor + ' - Basement'
    }
    else {
        floor = floor + ' - Level ' + item_floor[0]
    }

//      Order By 
    // alert('Has case: '+ String($('#orderbyartwork').hasClass('btn-gray_active')))
    $('#artwork_list').addClass('background_blue')

    if ($('#orderbyartwork').hasClass('btn-gray_active')){
        
        let itemDOM = $('<tr id="'+ String(item.id) +'_arttable" class="artwork_list_item" onclick="clickWork(\''+ item.id+'\')">\
        <td valign="top">\
            <div class="artwork_thumbnail">\
            </div>\
        </td>\
        <td class="table_description" valign="top" style="display:flex; flex-direction:column; justify-content: space-between;">\
            <div><h2>' + item.artwork + '</h2>\
            <p>' + item.artist + '</p></div>\
            <div>\
            <p style="background-color: black; text-align: right; margin-bottom:0px !important; width:max-content; float: right !important; font-size: 80%; padding:3px 10px 3px 10px;">'+ floor + '</p>\
            </div>\
            </td>\
    </tr>').appendTo(shellDOM);
    // <td class="last_item">\
    //                     <div><img class="arrow_img" src="img/arrow_right.png"></div>\
    //     </td>\
    $('.table_description').css({'width':((screen_width-50)*(2/3)),'height':((screen_width-50)/3)})
    $('.artwork_thumbnail').css({'width':((screen_width-50)/3),'height':((screen_width-50)/3) });
    $('#'+item.id+'_arttable .artwork_thumbnail').css({'background-image':'url("img/artworks/'+item.image+'"', 'background-size':'cover'});
    let H2height = $('.table_description').height();
    $('.table_description').next().css({'height':H2height});

    }
    if ($('#orderbyartist').hasClass('btn-gray_active')){
        let itemDOM = $('<tr id="'+ String(item.id) +'_arttable" class="artwork_list_item" onclick="clickWork(\''+ item.id+'\')">\
        <td valign="top">\
            <div class="artwork_thumbnail">\
            </div>\
        </td>\
        <td class="table_description" valign="top" style="display:flex; flex-direction:column; justify-content: space-between;">\
            <div><h2>' + item.artist + '</h2>\
                    <p>' +  item.artwork + '</p>\</div>\
                    <div>\
            <p style="background-color: black; text-align: right; margin-bottom:0px !important; width:max-content; float: right !important; font-size: 80%; padding:3px 10px 3px 10px;">'+ floor + '</p>\
            </div>\
            </td>\
    </tr>').appendTo(shellDOM);
    // <td class="last_item">\
    //                     <div><img class="arrow_img" src="img/arrow_right.png"></div>\
    //     </td>\
    $('.table_description').css({'width':((screen_width-50)*(2/3)),'height':((screen_width-50)/3)})
    $('.artwork_thumbnail').css({'width':((screen_width-50)/3),'height':((screen_width-50)/3) });
    $('#'+item.id+'_arttable .artwork_thumbnail').css({'background-image':'url("img/artworks/'+item.image+'"', 'background-size':'cover'});
    let H2height = $('.table_description').height();
    $('.table_description').next().css({'height':H2height});
        // let itemDOM = $('<tr id="'+ String(item.id) +'_arttable" class="artwork_list_item" onclick="clickWork('+ item.id+')">\
        // <td valign="top">\
        //     <div class="artwork_thumbnail">\
        //     </div>\
        // </td>\
        // <td class="table_description" valign="top">\
        //     <h2>' + item.artist + '</h2>\
        //     <p>' +  item.artwork + '</p>\
        // </td>\
        // <td class="last_item">\
        //                 <div><img class="arrow_img" src="img/arrow_right.png"></div>\
        //     <p style="background-color: black; padding:5px;">'+ floor + '</p>\
        // </td>\
        // </tr>').appendTo(shellDOM);

        // $('.artwork_thumbnail').css({'width':((screen_width-50)/3),'height':((screen_width-50)/3) });
        // $('#'+item.id+'_arttable .artwork_thumbnail').css({'background-image':'url("img/artworks/'+item.image+'"', 'background-size':'cover'});
        // $('.last_item').css({'width':((screen_width-50)/3),'height':((screen_width-50)/3) });
        // let H2height = $('.table_description').height();
        // $('.table_description').next().css({'height':H2height});
    }

}
if (results.rows.length == 0){
    $('#no_results').show()
    $('#blue_bottom').css({'display':'none'})
}
else {
    setBlueBottom()
}
setTimeout(function(){ 
        $('#loader').fadeOut();
    }, 500);    


// this will be true since it was a select statement and so rowsAffected was 0
if (!results.rowsAffected) {
    console.log('No rows affected!');
    return false;
}


}

function errorCB(err) {
    // alert("Error processing SQL1: "+err.code);
    alert("Error Processing Database - Please Restart App");
}



// Navigation
$(window).swipe( {    
    //Generic swipe handler for all directions
    swipe:function(event, direction, distance, duration, fingerCount, fingerData) {     
        if (direction == 'right'){
            backPage()
        }
        
    }
});

var previouspage = window.sessionStorage.getItem("page");
window.sessionStorage.setItem("artTrack","yes");



var previouspage = window.sessionStorage.getItem("page");
document.addEventListener("backbutton", function (e) {
    backPage()
})

$(document).on('click','#luxbar-brand', function(){
    backPage()
});
$(document).on('click','.luxbar-brand', function(){
    backPage()
});
function backPage(){
    window.location.replace('index.html')
}

let currentPage = 'artworks.html';
window.sessionStorage.setItem("page",currentPage); 

})