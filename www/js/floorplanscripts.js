document.addEventListener('deviceready', function() {
    alert("floorplanScripts")
    $('#nav_sched').addClass('active');
        
    // Level selector
    var floor = window.sessionStorage.getItem("floor")
    floor = floor.split('_')
    levelSelector(floor)

    function levelSelector(floor){
        alert(String(floor))
        if (floor[0] == "-1"){
            $('.level').removeClass('btn-gray_active')
            $('#-1_M').addClass('btn-gray_active')
            Promise.resolve(createMap('img/maps/Map_Basement.svg')).then(function(map){
                    createDB('-1', map)
                }
            )
        }
        else if (floor[0] == "1"){
            $('.level').removeClass('btn-gray_active')
            $('#1_M').addClass('btn-gray_active')
            Promise.resolve(createMap('img/maps/Map_1.svg')).then(function(map){
                    createDB('1', map)
                }
            )
        }
        else if (floor[0] == "2"){
            $('.level').removeClass('btn-gray_active')
            $('#2_M').addClass('btn-gray_active')
            createDB('2')
            Promise.resolve(createMap('img/maps/Map_2.svg')).then(function(map){
                    createDB('2', map)
                }
            )
        }
        else {
            alert('Ground level')
            $('.level').removeClass('btn-gray_active')
            $('#0_M').addClass('btn-gray_active')
            Promise.resolve(createMap('img/maps/Map_Groundfloor.svg')).then(function(map){
                    createDB('0', map)
                }
            )
        }

    }

    function createMap(imageFile){
        // MAP
        var map = L.map('mapid', {
                crs: L.CRS.Simple,
                bounceAtZoomLimits: false,
                maxBoundsViscosity: 1.0
            });
        
        var bounds = [[0,0], [1800,1600]];
        var image = L.imageOverlay(imageFile, bounds).addTo(map);
        map.fitBounds(bounds);
        map.setMaxBounds(bounds);
        map.setMaxZoom(2);
        map.setMinZoom(-1);
        map.setZoom(-1);
        // map.bounceAtZoomLimits = false
        alert('Map Created')
        
        return map
    }

    function clickWork(id){
        let elementId = id;
        sessionStorage.param1 = elementId;
        window.location.replace("artwork.html");
    }

    function createDB(DBfloor, map){
        // DB
        alert('createDB '+ String(DBfloor))
        var db  = window.openDatabase('ArtTestNew4.2', '4.2', 'Test_Art_Test_New4.2', 1000000);
        db.transaction(GetInfo);

        function GetInfo(tx) {
            let query = 'SELECT * FROM ART WHERE floor LIKE "%'+ DBfloor+'%"'
            // let  query = 'SELECT * FROM ART'
            alert(String(query))
            tx.executeSql(query, [], querySuccess, errorCB);  
            // Last item
            var artworkLast = window.sessionStorage.getItem("artwork_map");
            window.sessionStorage.setItem("artwork_map", "all");
            // From artwork.html page
            if (artworkLast != null && artworkLast !='all'){
                let sqlQuery = 'SELECT * FROM ART WHERE id="' + artworkLast +'"'; 
                tx.executeSql(sqlQuery, [], querySuccess, errorCB);  
            }         
        }

        function querySuccess(tx, results) {
            alert("querySuccess")
            alert(String(results.rows.length))
            for (var i = 0; i < results.rows.length; i++){
                let record = results.rows[i];
                let marker = L.marker([(1800-Number(record.y_coordinate)), Number(record.x_coordinate)]).addTo(map);
                marker.bindPopup("<b>"+record.artwork+"</b><br><em>"+record.artist+"</em><div onclick='clickWork(\""+ record.id+"\")' style='width:100%; height:100px; background-size:cover; background-image: url(\"img/artworks/"+record.image+"\");'></div><div style='background-color:black; width:100%; color:white; text-align:center;' onclick='clickWork("+ record.id+")'>View</div>").openPopup();
            }


            // this will be true since it was a select statement and so rowsAffected was 0
            if (!results.rowsAffected) {
                alert('No rows affected!');
                return false;
            }
        }

        function errorCB(err) {
            alert("Error Processing Database - Please Restart App");
        }

    }

    // Buttons
    $('.level').on('click', function(){
        $('.level').removeClass('btn-gray_active')
        $(this).addClass('btn-gray_active')
        $("#map_container").html('<div id="mapid" style="height: 500px; width: 500px;"></div>')
        let levelSelected = $(this).attr('id')
        alert(String(levelSelected)) 
        let  floor = levelSelected.split('_')
        alert('click: '+String(floor))
        levelSelector(floor)
    })

    // Navigation
    var previouspage = window.sessionStorage.getItem("page");

var previouspage = window.sessionStorage.getItem("page");
document.addEventListener("backbutton", function (e) {
    backPage()
})

$(document).on('click','.luxbar-brand', function(){
    backPage()
});
// $(window).swipe( {    
//     //Generic swipe handler for all directions
//     swipe:function(event, direction, distance, duration, fingerCount, fingerData) {     
//         if (direction == 'right'){
//             backPage()
//         }
        
//     }
// });
function backPage(){
    if (previouspage == 'index.html'){
            window.location.replace('index.html')
        }else if (previouspage == 'artwork.html') {
            window.location.replace(previouspage);                
        }
}


    let currentPage = 'floorplan.html';
    window.sessionStorage.setItem("page",currentPage); 
    window.sessionStorage.setItem("floor", "0_M")
    setTimeout(function(){ 
        $('#loader').fadeOut();
    }, 500);
})