document.addEventListener('deviceready', function() {
    $('#aboveNav').fadeOut();
    let firsTry = window.sessionStorage.getItem("page")
    // alert(String(firsTry))
        // Home Screens
        var center = 'center';
        let screen_width = document.documentElement.clientWidth;
        $('#home_screen, #left_screen, #right_screen').css({'width':screen_width+'px'});
        $('#home_divs').css({'width':(screen_width*3)+'px'});
        $('#home_divs').css({'right':(-screen_width)+'px'});
        $('#home_divs').css({'left':(-screen_width)+'px'});
        //Preview divs
        $('.art_preview div').css({'width':((screen_width-50)/3),'height':((screen_width-50)/3) });
        
        // Splash screen
        function firstStart(){
            $('#loader').hide();
            $('#splash').show()
            $('#home_banner_img').show()
            createDB();
            setTimeout(function(){ 
                $("#splash").fadeOut()
            }, 1500);
        }
        
        //Menu
        document.addEventListener("backbutton", function (e) {
            if (center == 'right'){
                center = swipeLeft()

            }
            if (center == 'left'){
                center = swipeRight()
            }
        })

        $(document).on('click','#luxbar-brand', function(){
            if (center == 'right'){
                center = swipeLeft()

            }
            if (center == 'left'){
                center = swipeRight()
            }
        });

        // Check network connection        
        var networkState = navigator.connection.type;  
        if (networkState == "none"){
            $('.app').prepend('<div id ="disclaimer_popup" style="z-index:100; margin-top:10px; text-alignt:center; display: block !important;">You are currently offline. Some features might not be available</div>')
            
            $('#disclaimer_popup').on('click',function(){
                $('#disclaimer_popup').fadeOut()
            })
            $('.sched_online').hide()
        }
        

        if (networkState != "none"){

        //Firebase Auth
        firebase.auth().setPersistence(firebase.auth.Auth.Persistence.LOCAL)
        .then(function() {
            // Existing and future Auth states are now persisted in the current
            // session only. Closing the window would clear any existing state even
            // if a user forgets to sign out.
            // ...
            // New sign-in will be persisted with session persistence.
            return firebase.auth().signInAnonymously().catch(function(error) {
            // Handle Errors here.
            var errorCode = error.code;
            var errorMessage = error.message;
            console.log('Error: '+String(errorMessage)+" "+String(errorCode))
        });
        })
        .catch(function(error) {
            // Handle Errors here.
            var errorCode = error.code;
            var errorMessage = error.message;
            console.log("ERROR: "+String(errorCode)+" "+String(errorMessage))
        });

        //Check Login Auth
        firebase.auth().onAuthStateChanged(function(user) {
            if (user) {
                var isAnonymous = user.isAnonymous;
                var uid = user.uid;
                if (firsTry == null){
                    firstStart()
                }
                else{
                        $('#splash').hide()
                        $('#loader').show();
                        $('#bars').show()

                        setTimeout(function(){
                            $('#loader').fadeOut();
                        },500)
                        getPictureDB()
                    }
            } else {
                // User is signed out.
            }
        });
    };
       
        window.sessionStorage.setItem("floor","ground"); 
        var previouspage = window.sessionStorage.getItem("page");
        if (previouspage == 'artworks.html' || previouspage == 'artwork.html' ||previouspage == 'floorplan.html'){
            center = swipeLeft()
            
        }
        if (previouspage == 'schedule.html' || previouspage=='happeningnow.html'){
            center = swipeRight()          
        }

        $('#homebutton_ArtTrack').on('click', function(){
            
            center = swipeLeft()
            
        })
        $('#homebutton_Program').on('click', function(){
            center = swipeRight()
        })

        $('.floors').on("click", function(){
            let floor = (this.id)
            // console.log("ID: ", this.id[1])
            window.sessionStorage.setItem("floor",floor); 
            location.href='floorplan.html'
        })
        
        $('.app').swipe( {
            
            //Generic swipe handler for all directions
            swipe:function(event, direction, distance, duration, fingerCount, fingerData) {
                
                if (direction == 'left'){
                    center = swipeLeft()

                }
                if (direction == 'right'){
                    center = swipeRight()
                    
                }
                
            }
        });

        // Swipes
        function swipeLeft(){

            let currentLeft = $('#home_divs').css('left');
            let currentRight = $('#home_divs').css('right');
            if (center == 'right'){
                $('#home_divs').css({'overflow':'hidden'});
                $('#home_divs').css({'right':(-screen_width)+'px'});
                $('#home_divs').css({'left':(-screen_width)+'px'});
                $('.luxbar').fadeOut();
                $('#aboveNav').fadeOut();
                $('.program_arttrack_banner').fadeOut();
                $('.subcontent').fadeOut();
                $('#home_banner').fadeIn();
                $('#homebutton_Program').css({'right': '0'});

                return 'center';
            }
            if (center == 'center') {
                $('#home_divs').css({'left': 'calc('+currentRight+' - '+screen_width+'px)'});
                $('#home_divs').css({'right': 'calc('+currentRight+' + '+screen_width+'px)'});
                $('.luxbar').fadeIn();
                $('#aboveNav').fadeIn();
                $('.program_arttrack_banner').fadeIn();
                $('.subcontent').fadeIn();
                $('#homebutton_ArtTrack').css({'left': screen_width+'px'});
                $('#home_banner').fadeOut();
                $('.luxbar-brand').html('<i class="fas fa-chevron-left"></i>');

                return 'left';
            }
            if (center == 'left')
            {
                return 'left'
            }
        }
        function swipeRight(){
            let currentLeft = $('#home_divs').css('left');
            let currentRight = $('#home_divs').css('right');

            if (center == 'left'){
                $('#home_divs').css({'right':(-screen_width)+'px'});
                $('#home_divs').css({'left':(-screen_width)+'px'});
                $('.luxbar').fadeOut();
                $('#aboveNav').fadeOut();
                $('.program_arttrack_banner').fadeOut();
                $('.subcontent').fadeOut();
                $('#home_banner').fadeIn();
                $('#homebutton_ArtTrack').css({'left': '0'});
                return 'center';
            }
            if (center == 'center') {
                $('#home_divs').css({'overflow':'scroll'});
                $('#home_divs').css({'right': 'calc('+currentRight+' - '+screen_width+'px)'});
                $('#home_divs').css({'left': 'calc('+currentRight+' + '+screen_width+'px)'});
                $('.luxbar').fadeIn();
                $('#aboveNav').fadeIn();
                $('.program_arttrack_banner').fadeIn();
                $('.subcontent').fadeIn();
                $('#homebutton_Program').css({'right': screen_width+'px'});
                $('#home_banner').fadeOut();
                $('.luxbar-brand').html('<i class="fas fa-chevron-right"></i>');

                return 'right';
            }             
            if (center == 'right'){
                return 'right';
            }
                    
        }
 

        // DB
        function createDB() {
            // alert('createDB')
            if (networkState == "none"){
                getPictureDB()
            }
            else {


            var dbFire = firebase.firestore();
            var DBRef = dbFire.collection("works");
            var firstCheck = true;
            var pictureList = []
            DBRef.get().then(function(querySnapshot) {
                // alert('DBRef'+String(querySnapshot.length))
                querySnapshot.forEach(function(doc) {
                    let record = (doc.data())
                    firstCheck = toSQLDB(record, firstCheck);
                    pictureList.push([record.image,record.id])
                    if (pictureList.length==10){
                        // alert("picturelist ", String(pictureList))
                        getPicture(pictureList, "Firebase")
                    }

                });
            });
            }
        }

        function toSQLDB(record, firstCheck) {
            var db  = window.openDatabase('ArtTestNew4.2', '4.2', 'Test_Art_Test_New4.2', 1000000);
            var record = record;
            db.transaction(populateDB, errorCB, successCB);

            function populateDB(tx){ 
                let id = String(record.id);
                let artist = String(record.artist);                
                let artwork = String(record.artwork);
                var type = String(record.type);
                if (type == null || type == "" || type == undefined){
                    type = 'N/A'
                }
                var type_description = String(record.type_description);
                if (type_description == null || type_description == "" || type_description == undefined){
                    type_description = 'N/A'
                }
                var description = String(record.description);
                if (description == null || description == "" || description == undefined){
                    description = 'N/A'
                }
                let floor = String(record.floor);
                let x_coordinate = String(record.x_coordinate);
                let y_coordinate = String(record.y_coordinate);
                var image = String(record.image);
                if (image == null || image == "" || image ==" " || image == undefined ||image == 'undefined'){
                    image = 'temp.png'
                }
                if (firstCheck == true ){
                    tx.executeSql('DROP TABLE IF EXISTS ART');
                }
                tx.executeSql('CREATE TABLE IF NOT EXISTS ART (id unique, artist, artwork, type, type_description, description, floor, x_coordinate, y_coordinate, image)');
                let sql = 'INSERT INTO ART (id, artist, artwork, type, type_description, description, floor, x_coordinate, y_coordinate, image) VALUES ("'+ id + '", "'+ artist + '", "'+ artwork + '", "'+ type + '", "'+ type_description + '", "'+ description + '", "'+ floor + '", "'+ x_coordinate + '", "'+ y_coordinate + '", "'+ image + '")';
                tx.executeSql(sql);                
            }
            return false; 
        }

    function errorCB(tx, err) {
        alert("Error Processing Database - Please Restart App");
    }

    // Transaction success callback

    function successCB() {
        // getPictures()
    }
    
    //The pictures
    function getPictureDB(){
        // alert('getPictureDB')
        var db  = window.openDatabase('ArtTestNew4.2', '4.2', 'Test_Art_Test_New4.2', 1000000);
        db.transaction(GetInfo);

        function GetInfo(tx) {
            let sqlQuery = 'SELECT * FROM ART'; 
            $('#artwork_description').text(sqlQuery);
            tx.executeSql(sqlQuery, [], querySuccess, errorCB);
        }

        function querySuccess(tx, results) {
            // alert("SUCCESS getPictureDB")
            getPicture(results.rows, "SQL")
        }
        function errorCB(err) {
            alert("Error Processing Database - Please Restart App");
        }
    }
    
    function getPicture(recordlist, source){
        // alert("getPicture")
            // Select 3 random
            var random1 = 0
            var random2 = 0
            var random3 = 0
            
            for(var i = 0; i< 3; i++){
                // alert("FOR "+i)
                if (i == 0){
                    // alert("FOO")
                    random1 = Math.floor(Math.random()*recordlist.length);
                    var randomnow = random1
                    // alert("BAR"+String(randomnow))
                }
                else if (i== 1){
                    do{
                        random2 = Math.floor(Math.random()*recordlist.length);
                    }
                    while (random2 == random1)
                    var randomnow = random2
                }
                else if (i == 2){
                    do{
                        random3 = Math.floor(Math.random()*recordlist.length);
                    }
                    while (random3 == random1 || random3 == random2)
                    var randomnow = random3
                }
                let picId = ""
                let picPath = ""
                if (source == "Firebase"){
                    let item = recordlist[randomnow];
                    picId = item[1]
                    picPath = item[0]
                }
                else {
                    let item = recordlist.item(randomnow);
                    picId = item.id
                    picPath = item.image

                }
                // alert("PICS"+randomnow+" "+"id "+"#arttile"+i)
                $('#arttile'+i).css({"background-image":"url('img/artworks/"+String(picPath)+"')"},{"background-color":"red"})
                console.log("EXECUTED")
                $('#arttile'+i).on('click', function(){
                    window.sessionStorage.setItem("page","artworks.html"); 
                    sessionStorage.param1 = String(picId);
                    window.sessionStorage.setItem("artwork_map", "all");
                    window.location.replace("artwork.html");
                        
                    
                })
            }
            
    }



    // Session trackers 
    let currentPage = 'index.html';
    window.sessionStorage.setItem("page",currentPage); 
    window.sessionStorage.setItem("artwork_map", "all");


})