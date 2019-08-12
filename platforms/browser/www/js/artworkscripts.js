document.addEventListener('deviceready', function() {
    // alert("artworksscript")
    setTimeout(function(){ 
        $('#loader').fadeOut();
    }, 500);
    // $('#nav_home').addClass('active');
    
    // Auth
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
        console.log('Error: ', errorMessage+" "+errorCode)
    });
    })
    .catch(function(error) {
        // Handle Errors here.
        var errorCode = error.code;
        var errorMessage = error.message;
    });

    var workId = sessionStorage.param1;

    // DB
    var db  = window.openDatabase('ArtTestNew4.2', '4.2', 'Test_Art_Test_New4.2', 1000000);
    db.transaction(GetInfo);

    function GetInfo(tx) {
        let sqlQuery = 'SELECT * FROM ART WHERE id="' + workId +'"'; 
        $('#artwork_description').text(sqlQuery);
        tx.executeSql(sqlQuery, [], querySuccess, errorCB);
    }

    function querySuccess(tx, results) {

        let item = results.rows.item(0);

        $('#artist_name').text(item.artist);
        window.sessionStorage.setItem('floor', item.floor)
        $('#artwork_name').text(item.artwork);
        $('#artwork_name_archive').text(item.artwork);
        $('#artwork_name').val(item.id);
        $('#artwork_typedescription').text(item.type + ' ('+ item.type_description+')')
        $('#artwork_description').text(item.description);
        $('#artwork_image').css({'background-image':'url("img/artworks/'+item.image+'"', 'background-size':'cover'});
            //Store for map info
        window.sessionStorage.setItem('artwork_map', item.id)
    }
    function errorCB(err) {
        console.log("Error processing SQL1: "+err.code);
    }

// function GetInfo(tx) {
//     let info = tx.executeSql('SELECT * FROM DEMO');
//     window.alert('Foo');
//     
//     windows.alert ('DEMO: ', String(info));
//     console.log (info);
// }

//Keep Track
// readDBArchived()
// function readDBArchived(){
//     var db  = window.openDatabase('ThisUser1.2', '1.2', 'ThisUser1.2', 1000000);
//     db.transaction(populateDB, errorCB, successCB);
//     tx.executeSql(readDB);
//     function populateDB(tx){   
//         tx.executeSql('CREATE TABLE IF NOT EXISTS ARCHIVE (id unique, artwork, archived_audio, archived_photo');
//         let sqlQuery = 'INSERT INTO ARCHIVE (id, artwork, archived_audio, archived_photo) VALUES ("'+workId+'", "'+artwork+'", "false", "false") WHERE NOT EXISTS (SELECT * FROM ARCHIVE WHERE id="'+archive_id+'")'
//         alert(String(sqlQuery))
//         tx.executeSql(sqlQuery)

//     function readDB(){
//         let sqlQuery2 = 'SELECT * FROM ARCHIVE WHERE id="'+archive_id+'"'
//         tx.executeSql(sqlQuery2, [], querySuccess, errorCB)
//     }

//     // Transaction success callback
//     function successCB() {
//         alert("DB SUCCESS")
//         let item = results.rows.item(0);
//         alert(String(item.archive_id))
//     }
//     function querySuccess(tx, results) {
//         alert("querySUCCESS")
    
//     }
//     function errorCB(tx, err) {
//         alert("Error processing SQL2.3: "+err);
//     }

// }
// function writeDBArchived(archiveAction){
//     var db  = window.openDatabase('ThisUser1.2', '1.2', 'ThisUser1.2', 1000000);
//     db.transaction(populateDB, errorCB, successCB);
//     function populateDB(tx){   
//         if (archiveAction == 'archived_audio'){
//             let sqlQuery = ' UPDATE  ARCHIVE SET archived_audio = "true" WHERE id = "'+workId+'"'
//         }
//         else {
//             let sqlQuery = ' UPDATE  ARCHIVE SET archive_photo = "true" WHERE id = "'+workId+'"'
//         }

//         alert(String(sqlQuery))
//         tx.executeSql(sqlQuery);

//     function errorCB(tx, err) {
//         alert("Error processing SQL2.3: "+err);
//     }

//     // Transaction success callback

//     function successCB() {
//         alert("DB SUCCESS")
//     }}

// }

//Populate Selector 
popSelector('archive_select_meta2','meta2')
popSelector('archive_select_meta3','meta3')
function popSelector(selectorID, metaNumber){
let showOptions = false 
var uploadedKeys = []
var dbFire = firebase.firestore();
dbFire.collection("works/"+workId+"/uploads")
.get()
.then(function(querySnapshot) {
    // alert('querySnapshot'+String(querySnapshot.length))
    querySnapshot.forEach(function(doc) {
        var rawValues =""
        if (metaNumber == "meta2"){
            rawValues = doc.data().meta2
        }else if (metaNumber=="meta3"){
            rawValues = doc.data().meta3
        }
        if (rawValues.length > 0){
            showOptions = true 
        }
        let commaSeperated = rawValues.split(',')
        for (var i =0; i< commaSeperated.length; i++){
            commaSeperated[i] = commaSeperated[i].trim()
        }
        commaSeperated.sort()
        for (var i =0; i< commaSeperated.length; i++){
            let newItem = commaSeperated[i]
            // alert(String(newItem))
            if (uploadedKeys.indexOf(newItem.toLowerCase()) < 0 && newItem != ""){
                $('#'+selectorID).append('<option>'+newItem+'</option>')
                uploadedKeys.push(newItem.toLowerCase())
            }

       }

    });
    if (showOptions == false ){
    $('#'+selectorID).hide()
}
})
.catch(function(error) {
    $('#'+selectorID).hide()
    return;
});

}
$('.meta_textfield').on('click', function(){
$('#disclaimer_popup2').hide()
})
// Selectors
$('.archive_select').on('change', function(){
let newValue = ($(this).find('option:selected').text())
let currentValue = $(".meta_textfield").prop("value")
if (currentValue !=""){
    currentValue = currentValue+", "
}
$(this).next(".meta_textfield").prop("value",currentValue+newValue)
$(this).find('#select_placeholder').prop('selected',true)
})

// Navigation
$(window).swipe( {    
    
    //Generic swipe handler for all directions
    swipe:function(event, direction, distance, duration, fingerCount, fingerData) {     
        if ($('.archive_popup').css('display') == "none"){
            // alert('Swipe')
            if (direction == 'right'){
                backPage()
            }
        }else {
            // closepopup()
        }

        
    }
});

var previouspage = window.sessionStorage.getItem("page");
document.addEventListener("backbutton", function (e) {
    backPage()
})

$(document).on('click','.luxbar-brand', function(){
    backPage()
});
function backPage(){
    if (previouspage == 'floorplan.html'){
        window.location.replace('floorplan.html');
    }
    else {
        window.location.replace('artworks.html');
    }
    // if comes from map...
}
let currentPage = 'artwork.html';
window.sessionStorage.setItem("page",currentPage); 
// alert(currentPage)


// File Selector - SECOND DRAFT?
// $('#myFile').on('change',function(){
//     alert('Storage')
//     var fileList = this.files
//     console.log('Filelist ', fileList[0])
//     var file = fileList[0]
//     var reader = new FileReader();
//     $('.archive_popup').css({'display':'block'})
//     $('#image_archive').show()
//     $('#audio_archive').hide()

//     reader.onload = function(event) {
//         alert("EVENT"+String(event.target.result))
//         $('#image_archive').src = event.target.result;
//     };

//     reader.readAsDataURL(file);
// })

// Archive
// alert('ARCHIVE')
$(document).on('click', '.cirlce_popup', function(){
    // alert("circlePopup")
    $('#app').css('overflow','hidden')
    
    let id = this.id
    $('#keep_button').show()
    $('#keep_label').show()
    // if (id == 'upload_button'){
    //     $('#myFile').click();
    // }
    if (id =="text_archive"){
        $('#audio_archive').hide()
        $('#image_archive').hide()
        $('#keep_button').hide()
        $('#keep_label').hide()
        $('.archive_popup').css({'display':'block'})

        $('#content_archive').val("text")
        $('#submit_button').on('click',function(){
            // Checks
            var meta1 = $('[name = "meta1"]').prop('value')
            var meta2 = $('[name = "meta2"]').prop('value')
            var meta3 = $('[name = "meta3"]').prop('value')

            if ($('#disclaimer_button').prop('checked')==false){
                $('#disclaimer_popup').css({'display':'block'});
            }else if (meta1=='' && meta2=='' && meta2=='' ) {
                $('#disclaimer_popup2').css({'display':'block'});
            }
            else {
                uploadingPopup()
                submitFile('text', "text")
                // $("form")[0].submit();

            }
                
        });

    }
    if (id == 'mic_archive'){
        // capture callback
        let captureSuccess = function(mediaFiles) {
            $('.archive_popup').css({'display':'block'})

            var i, path, len;
            for (i = 0, len = mediaFiles.length; i < len; i += 1) {
                path = mediaFiles[i].fullPath;
                $('#content_archive').val(path)
                // playMedia(path)
                // var start = true
                // $('#audio_archive').on('click', function(){
                //     $(this).html(($(this).html()  == '<div>||</div>') ? '<i class="fas fa-play"></i>' : '<div>||</div>')
                    
                //     if (start){
                //         player.start()
                //     }else{
                //         player.pause()
                //     }
                //     start = ((start == true) ? false : true)
                    
                // })
                $('#submit_button').on('click',function(){
                    var meta1 = $('[name = "meta1"]').prop('value')
                    var meta2 = $('[name = "meta2"]').prop('value')
                    var meta3 = $('[name = "meta3"]').prop('value')
                    // Checks
                    if ($('#disclaimer_button').prop('checked')==false){
                        $('#disclaimer_popup').css({'display':'block'});
                    }else if (meta1=='' && meta2=='' && meta2=='' ) {
                        $('#disclaimer_popup2').css({'display':'block'});
                    }
                    else {
                        uploadingPopup()
                        submitFile('audio', path)
                        // $("form")[0].submit();

                    }
                        
                });

            }
        };

        // capture error callback
        let captureError = function(error) {
            consol('Error code: ' + error.code, null, 'Capture Error');
        };
        var options = { limit: 1 };
        // start audio capture
        navigator.device.capture.captureAudio(captureSuccess, captureError, options);

        $('#audio_archive').show()
        $('#image_archive').hide()

    }
    if (id == "camera_archive") {
        $('#image_archive').show()
        $('#audio_archive').hide()
        // Capture Image
        let captureSuccess = function(mediaFiles) {
            $('.archive_popup').css({'display':'block'})
            var i, path, len;
            for (i = 0, len = mediaFiles.length; i < len; i += 1) {
                path = mediaFiles[i].fullPath;
                // alert('PATH: '+String(path))
                
                $('#image_archive').css({'background-image':'url("'+path+'"', 'background-size':'cover'});
                $('#content_archive').val(path)
            }
            // $("form").submit(function(e){
            //     e.preventDefault();
            $('#submit_button').on('click',function(){
                var meta1 = $('[name = "meta1"]').prop('value')
                var meta2 = $('[name = "meta2"]').prop('value')
                var meta3 = $('[name = "meta3"]').prop('value')
                // Checks
                if ($('#disclaimer_button').prop('checked')==false){
                    $('#disclaimer_popup').css({'display':'block'});
                }else if (meta1=='' && meta2=='' && meta2=='' ) {
                    $('#disclaimer_popup2').css({'display':'block'});
                }
                else {
                    uploadingPopup()
                    submitFile('images', path)
                    // $("form")[0].submit();

                }
                    
            });
        
        }
        // capture error callback
        let captureError = function(error) {
            console.log('Error code: ' + error.code, null, 'Capture Error');
        };

        var options = { limit: 1 };
        navigator.device.capture.captureImage(captureSuccess, captureError, options);  
    }
    
});

$("#close_button").on("click", function(){
            closepopup()
        })

$('#disclaimer_label').on('click', function(){
$('#disclaimer_popup').hide()
$('#disclaimer_button').prop('checked', ($('#disclaimer_button').prop('checked')== true ? false : true))

})
$('#keep_label').on('click', function(){

$('#keep_button').prop('checked', ($('#keep_button').prop('checked')== true ? false : true))

})

$('#disclaimer_button').on('change', function(){
$('#disclaimer_popup').css({'display':'none'});
})
// Handle back button
document.addEventListener("backbutton", function (e) {
    if ($('.archive_popup').css('display') != "none"){
        closepopup()
        e.preventDefault();
    }else{

        window.history.back();

    }
}, false );
// Offline
var networkState = navigator.connection.type;  
if (networkState == "none"){
    //HIDE Sched
    $('#archive_actions').hide()
}

function closepopup(){
    $('#app').css({'overflow':'scroll'})
    // Delete file
    let file_path = $('#content_archive').val()
    removefile(file_path)
    $('.archive_popup').css({'display':'none'})
}

function removefile(filepath){
    // Revert Changes
    $('#upload_success').css({'display':'none'})
    $('#content_archive').css({'display':'flex'})
    $('#archive_metaDIV').css({'display':'block'})
    $('#submit_button').css({'display':'block'})
    $('#close_button').text("Cancel")
    $('#upload_success').html('<div id="bars" style="top:auto;margin:0px 0 0 -20px;">\
        <div class="bar"></div>\
        <div class="bar"></div>\
        <div class="bar"></div>\
        <div class="bar"></div>\
        <div class="bar"></div>\
        <div class="bar"></div>\
        <p class="pulsate">Uploading</p>\
    </div>');
    $('#close_button').show();

    
    

    if ($('#keep_button').prop('checked') == true || filepath=="text"){
        return
    }
    else {
        // alert("REMOVE NOW")
        let lastindex = filepath.lastIndexOf('/')
        let path = filepath.substr(0, lastindex)
        let filename = filepath.substr(lastindex+1);
        // alert(String(filepath))
        // alert(String(path))
        // alert(String(filename))
        window.resolveLocalFileSystemURL(path, function(dir) {
        dir.getFile(filename, {create:false}, function(fileEntry) {
                    // alert("REMOVING...")
                    fileEntry.remove(function(){
                        // alert("File has been Removed")
                        // The file has been removed succesfully
                    },function(error){
                        // Error deleting the file
                        // alert(String(error))
                    },function(){
                        // The file doesn't exist
                        // alert("File Doesn't Exist")
                    });
            });
        });
    }


}




function playMedia(fileName){
    // Play the audio file at url
    // Play the audio file at url
    var my_media = new Media(fileName,
                    // success callback
                    function () { playMedia(fileName) },
                    // error callback
                    function (err) { console.log("playAudio():Audio Error: " + err); }
                );

            // Play audio

    var start = true
    $('#audio_archive').on('click', function(){            
        if (start){
            my_media.play()
        }else{
            my_media.pause()
        }
        start = ((start == true) ? false : true)  
    })
}
// Submit
function submitFile(type, path){
    if (type == "text"){
        updateDB("", "text","text")
    }
    else {

    let uidnumber="Q"
    uidnumber = uidGenerate()

    // Download from URL
    // Get file name from url.
    var filename = path.substring(path.lastIndexOf("/") + 1).split("?")[0];
    var xhr = new XMLHttpRequest();
    xhr.responseType = 'blob';
    xhr.onload = function() {      
        let file = xhr.response
        
        // Firebase

        let filename = uidGenerate()+"_"+$('#artwork_name').text()
        
        // Create a storage reference from our storage service
        var storageRef = firebase.storage().ref();
        var imageRef = storageRef.child(type+'/'+filename);
        imageRef.put(file).then(function(snapshot) {
            
            snapshot.ref.getDownloadURL().then(function(downloadURL) {
                // Update DB
                updateDB(filename, downloadURL,type)
            });
        });
    };
    xhr.open('GET', path);
    xhr.send();
    }

}
// Firebase DB
// const firebase = require("firebase");
// // Required for side-effects
// require("firebase/firestore");
var dbFire = firebase.firestore();


function updateDB(filename, downloadURL, type){
    let workname = $('#artwork_name').text()
    let workid = $('#artwork_name').val()
    var meta1 = $('[name = "meta1"]').prop('value');
    var meta2 = $('[name = "meta2"]').prop('value');
    var meta3 = $('[name = "meta3"]').prop('value');
    let date = new Date()
    // alert(String(workname)+" "+String(workid)+" "+meta1+" "+meta2+" "+filename+" "+downloadURL+" "+type)
    if (filename ==""){
        dbFire.collection("works/"+workId+"/uploads").add({
        meta1:meta1,
        meta2:meta2,
        meta3:meta3,
        workid:workid,
        workname:workname,
        uid:filename,
        file_path:downloadURL,
        type:type,
        date:date
        })
        .then(function(docRef) {
            successPopup()
            console.log("Document written with ID: ", docRef.id);
        })
        .catch(function(error) {
            console.error("Error adding document: ", error);
        });


    }
    else {
        dbFire.collection("works/"+workId+"/uploads").doc(filename).set({
        meta1:meta1,
        meta2:meta2,
        meta3:meta3,
        workid:workid,
        workname:workname,
        uid:filename,
        file_path:downloadURL,
        type:type,
        date:date
        })
        .then(function(docRef) {
            successPopup()
            console.log("Document written with ID: ", docRef.id);
        })
        .catch(function(error) {
            console.error("Error adding document: ", error);
        });

    }


}
$('#archive_actions').on('click', function(){
    alert('HI')
})

function uploadingPopup(){
    $('#content_archive').css({'display':'none'})
    $('#archive_metaDIV').css({'display':'none'})
    $('#upload_success').css({'display':'block'})
    $('#close_button').text('Cancel')
    $('#submit_button').css({'display':'none'})
}
function successPopup(){
    $('#success_icon').css({'display':'block'})
    $('#close_button').text('Close')
    $('#upload_success').html("<div id='success_icon'><i class='fas fa-check-circle'></i></div>Thank you for taking part of the RE:SOUND 2019 collaborative archive")
}

function uidGenerate() {
            return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function(c) {
            var r = Math.random() * 16 | 0, v = c == 'x' ? r : (r & 0x3 | 0x8);
            return v.toString(16);
            });
}
})