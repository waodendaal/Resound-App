/*
 * Licensed to the Apache Software Foundation (ASF) under one
 * or more contributor license agreements.  See the NOTICE file
 * distributed with this work for additional information
 * regarding copyright ownership.  The ASF licenses this file
 * to you under the Apache License, Version 2.0 (the
 * "License"); you may not use this file except in compliance
 * with the License.  You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing,
 * software distributed under the License is distributed on an
 * "AS IS" BASIS, WITHOUT WARRANTIES OR CONDITIONS OF ANY
 * KIND, either express or implied.  See the License for the
 * specific language governing permissions and limitations
 * under the License.
 */
var app = {
    // Application Constructor
    initialize: function() {
        this.bindEvents();
    },
    // Bind Event Listeners
    //
    // Bind any events that are required on startup. Common events are:
    // 'load', 'deviceready', 'offline', and 'online'.
    bindEvents: function() {
        document.addEventListener('deviceready', this.onDeviceReady, false);
    },
    // deviceready Event Handler
    //
    // The scope of 'this' is the event. In order to call the 'receivedEvent'
    // function, we must explicitly call 'app.receivedEvent(...);'
    onDeviceReady: function() {
        app.receivedEvent('deviceready');
    },
    // Update DOM on a Received Event
    receivedEvent: function(id) {
        var parentElement = document.getElementById(id);
        var listeningElement = parentElement.querySelector('.listening');
        var receivedElement = parentElement.querySelector('.received');

        listeningElement.setAttribute('style', 'display:none;');
        receivedElement.setAttribute('style', 'display:block;');

        console.log('Received Event: ' + id);
    }
};

// Ripple

//MAPS
document.addEventListener('deviceready', function() {
    
    let screen_height = document.documentElement.clientHeight;
    console.log ('Screen Height: ', screen_height);
    $('.plan_div').css({'height':screen_height});

    //Map 1st plan
    let getImageWidth = $('.plan_div').find('img').width();
    let getImageHeight = $('.plan_div').find('img').height();
    console.log('Sizes: ', getImageHeight, ' ', getImageWidth);

    //Basement
    let cordinateLX =Math.floor((getImageWidth/100)*54);
    let cordinateRX =Math.floor((getImageWidth/100)*81);
    let cordinateTY =Math.floor((getImageHeight/100)*69);
    let cordinateBY =Math.floor((getImageHeight/100)*88);

    // Top left: cordinateLX by cordinateTY pixels
    // Top right: cordinateRX by cordinateTY pixels
    // Bottom right: cordinateRX by cordinateBY pixels
    // Bottom left: cordinateLX by cordinateBY pixels

    $('#basement_map').prop('coords', ''+cordinateLX+','+ cordinateTY+', ' + cordinateRX+','+ cordinateBY+'');

});

$('#basement_map').on('click', function(){
    window.alert('Basement!');
})


//DB





