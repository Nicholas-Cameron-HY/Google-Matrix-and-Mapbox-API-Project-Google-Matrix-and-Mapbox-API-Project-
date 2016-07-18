var app = {};

/////////////////////////////////////////////////////SETING THE VIEW ON MAP


L.mapbox.accessToken = 'pk.eyJ1Ijoibm1oY2FtZXJvbiIsImEiOiJjaW9kYXJrZzcwMDBsdWxtM2RrdWl0d2k4In0.24L8AH1kWSq7qpuOwG5XTg';

var map = app.map = L.mapbox.map('map', 'mapbox.dark')
    .setView([41.9264, 30.1033], 5);


//////////////////////////////////////////////////////////// TRIPDISTANCE 

var tripDistance = 0; 



//////////////////////////////////////////////////////// MEDIA QUERIES AND INIT

app.init = function() {

    $('.wrapper').hide() 
   
    app.getData(Daraa);
    $('.moveForwards').addClass('Daraa')

    app.displayInfo();



    $(window).on('resize', function() {
        if(($(window).width() > 580) && ($('.townName').text() === "Mützenich, Germany")) {
        $('#story').show();
        }
    });
};


app.apiURL = 'https://maps.googleapis.com/maps/api/distancematrix/json'

// var key = AIzaSyCYftS0F8KQC27SruOQeshBFUab_UwnNXY
// var key = AIzaSyB_dQOEGHO7x_wEiSG-VbPJTVTbWysvZNA


////////////////////////////////////////////// TEMPLATE FOR TARGETING LOCATION

app.getData = function(data) {
    $.ajax({
        url: 'http://proxy.hackeryou.com',
               data: {
                   reqUrl: app.apiURL,
                   params: {
                       origins: data.origin,
                       destinations: data.destination,
                       units: 'metric',
                       key: 'AIzaSyB_dQOEGHO7x_wEiSG-VbPJTVTbWysvZNA'
                   }
               },
               method: 'GET',
               dataType: 'json'
           })
        .then(function(result){
            console.log(result);
            var trip = result.rows[0].elements[0].distance.value;
            trip = (Math.round(trip / 1000));
            tripDistance = trip + tripDistance;
            console.log(tripDistance);

            var origin = data.origin.split(",");
            var destination = data.destination.split(",");

            origin[0] = Number(origin[0]);
            origin[1] = Number(origin[1]);
            destination[0] = Number(destination[0]);
            destination[1] = Number(destination[1]);

            console.log(origin[0] + " " + origin[1]);
            console.log(destination[0] + " " + destination[1]);

            var polyLine = L.polyline([
                L.latLng(origin[0],origin[1]),
                L.latLng(destination[0],destination[1])
            ]).addTo(map);

            $('h3.townName').text(data.townName + ", " + data.countryName);
            $('h4.travelledDistance').text("Distance travelled: " + tripDistance + "km");
            $('.bodytext').html(data.description);
            $('.moveForwards').removeClass(data.townName);
            $('.moveForwards').addClass(data.nextPlace);
            
        });

        L.mapbox.featureLayer({
                type: 'Feature',

                geometry: {
                    type: 'Point',
                    coordinates: data.markerPoint,
                },
                properties: {
                    title: data.townName,
                    'marker-size': 'large',
                    'marker-color': '#AF4034',
                }


            }).addTo(map);

        $('.moveForwards').removeClass(data.townName)
        $('.moveForwards').addClass(data.nextPlace)
    
            map.setView(data.viewPoint, data.scope);                                        
};


// SPECIFICATIONS FOR LOCATION  

var Daraa = {
    origin: '32.9249,36.1763',
    destination: '32.9249,36.1764',
    townName: 'Daraa',
    description: "<p> While the deliberation time often lasts months, and sometimes years, migrants spend about three weeks preparing for their departure. </p><p> This time is mostly occupied by making soft inquiries to neighbours, cousins, and friends about how to plan their journey, such as arranging the numbers of smugglers. The planning must be done in the utmost secrecy, due to security concerns from the Asaad regime, ISIL, or both.</p><p> Many tell their families and friends that they are traveling, and only reveal the truth once they have arrived in Europe.</p>",
    nextPlace: 'Nizip',
    markerPoint: [36.1033,32.6264],
    viewPoint: [32.9249,36.1764],
    countryName: 'Syria',
    scope: 7
}

var Nizip = { 
    origin: '32.9249,36.1764', 
    destination: '37.0099,37.7969',
    townName: 'Nizip',
    description: "<p> An estimated half of Syria's pre-war population — more than 11 million people — have been killed or forced to flee their homes, with around 6.6 million citizens internally displaced.</p>    <p> In 2015, regional advancements by ISIL further pushed refugees north into neighbouring Turkey, where more than two and half million Syrians are currently attempting to resettle.</p><p> In the fall of 2015, Nizip, a border town, hosted a size-able portion of the  200,000 Syrian refugees staying in camps along the border.</p>",
    nextPlace: 'Izmir',
    markerPoint: [37.7969,37.0099],
    viewPoint: [37.0099,37.7969],
    countryName: 'Turkey',
    scope: 7

}

var Izmir = { 
    origin: '37.0099,37.7969', 
    destination: '38.4237,27.1428',
    townName: 'Izmir',
    description: "<p>Izmir is a port city on the the southwestern Turkish coast, which became a logical pivot point for migrants preparing to pass over sea to Greece.</p><p> Along the Turkish coast, thousands of refugees stayed in hostels and tents in the days leading up to their crossing.</p><p>In response to the growing presence of the migrants, small businesses like fruit markets and barber-shops began to sell life-jackets in their window-displays</p>. ",
    nextPlace: 'Mitilini',
    markerPoint: [27.1428,38.4237],
    viewPoint: [38.4237,27.1428],
    countryName: 'Turkey',
    scope: 7


}

var Mitilini = { 
    origin: '38.4237,27.1428', 
    destination: '39.0725,26.5492',
    townName: 'Mitilini',
    description: "<p> The water passage from Turkey into Greece represents the most dangerous passage which a migrant must take.</p> <p> With smugglers simply providing escort to the Turkish shore, as well as a spot an inflatable raft, the migrants are then charged with driving themselves across to the other side. </p> <p> Supposedly, the smugglers would ask who knew how to drive a motorcycle, and then assign that person the role of captain. Many did not make it across.</p>",
    nextPlace: 'Athens',
    markerPoint: [26.5492,39.0725],
    viewPoint: [39.0725,26.5492],
    countryName: 'Greece',
    scope: 7
}
var Athens = {
    origin: '39.0725,26.5492', 
    destination: '37.9839,23.7294',
    townName: 'Athens', 
    description: "<p> Arriving on islands like Mitilini often proves to be the ultimate point of emotional exhaustion for refugees, particularly after the trying sea voyage.</p> <p> For much of the fall, a lack of formal aid and organization meant that refugees were often driven to extreme states of distress, due to exhaustion, hunger, and fatigue.</p><p> Once arriving in Athens, many felt calmer, though they still looked ahead to one of the most physically intense stretches of their trip.</p>",
    nextPlace: 'Gevgelija',
    markerPoint: [23.7294,37.9839],
    viewPoint: [37.9839,23.7294],
    countryName: 'Greece',
    scope: 7
}



var Gevgelija = {
    origin: '37.9839,23.7294', 
    destination: '41.1452,22.4997',
    townName: 'Gevgelija',
    description: "<p>From Athens, migrants moved upwards towards Macedonia, predominately on foot. With the journey stretching over one hundred and seventy-five kilometers, this takes upwards to five days to complete, and can be among the most physically exhaustive stretch of the trip.</p><p> At many points, unnamed camps sprang up on the border, as refugees waited to be registered before boarding trains to northern Macedonia.</p> <p> It was not uncommon for the number of migrants waiting to pass along the border to swell beyond 4,000.</p>",
    nextPlace: 'Tabanovce',
    markerPoint: [22.4997,41.1452],
    viewPoint: [41.1452,22.4997],
    countryName: 'Macedonia',
    scope: 7
}

var Tabanovce = {
    origin: '41.1452,22.499', 
    destination: '42.2130,21.7108',
    townName: 'Tabanovce',
    description: "<p> Refugees generally move across Macedonia by train, a journey which takes about five hours from Gevgelija, but can vary in travel time due to crowds.</p><p> After the journey, they reach Tabanovce in the northern part of the country, where they disembark on foot for the Serbian border.</p><p> In September 2015, at one of the peaks of traffic, one Human Rights Watch researcher estimated that 24,000 people were arriving during a single day. </p>",
    nextPlace: 'Röske',
    markerPoint: [21.7108,42.2130],
    viewPoint: [42.2130,21.7108],
    countryName: 'Macedonia',
    scope: 7


}

var Röske = {
    origin: '42.2130,21.7108', 
    destination: '46.1874,20.0375',
    townName: 'Röske',
    description: "<p> Serbian officials announced that migrants would be granted safe passage through the country, forgoing any fears among refugees that they may fall under the Dublin Rule. </p> <p> The EU law states, in effect, that the country the applicant first arrives in is responsible for processing their asylum request. The motivation here is that applicants would not be able to apply in multiple countries, but effectively left refugees terrified to register themselves in either Serbia or Hungary.</p><p> This legal complication inevitably drove many further into dependence on smugglers. </p>",
    nextPlace: 'Budapest',
    markerPoint: [20.0375,46.1874],
    viewPoint: [46.1874,20.0375],
    countryName: 'Serbia',
    scope: 7


}

var Budapest = {
    origin: '46.1874,20.0375', 
    destination: '47.4979, 19.0402',
    townName: 'Budapest',
    description: "<p> The majority of migrants heading into Budapest's Keleti station made the trek by foot, arriving between midnight and dawn.</p> <p> Noor Mohammad Shirzad, 18 from Kunduz, Afghanistan, made the trip with his two cousins. </p><p> “To the morning, six o’clock morning to nine o’clock night. Walking. No money, no food. Walking,” he said, adding that border patrols refused to take him to Budapest because he could not pay them. “Police coming just give me one water … So hungry. No food, no bread, no biscuit. Just water, they give.”<p>",
    nextPlace: 'Hegyeshalom',
    markerPoint: [19.0402,47.4979],
    viewPoint: [47.4979, 19.0402],
    countryName: 'Hungary',
    scope: 7
}


var Hegyeshalom = {
    origin: '47.4979, 19.0402', 
    destination: '47.9117, 17.1561',
    townName: 'Hegyeshalom',
    description: "<p> In Budapest, refugees boarded the train believing themselves to be bound for either Vienna or Munich.</p<p> Instead, they were only able to travel as far as the Austrian border, at which point they must walk for two or three miles and take an Austrian or German-sent bus for another six miles before they can continue on.</p><p>After waiting for between two to three days in camps, they were allowed passaged onwards.</p><p> At this point, they have been traveling for at least three weeks.</p>",
    nextPlace: 'Vienna',
    markerPoint: [17.1561,47.9117],
    viewPoint: [47.9117, 17.1561],
    countryName: 'Hungary',
    scope: 7
}


var Vienna = {
    origin: '47.9117, 17.1561', 
    destination: '48.2082,16.3738',
    townName: 'Vienna',
    description: "<p> Vienna provided a sense of relief for migrants, having finally arrived in a country which was strongly desired for quality-of-life and safety standards.</p> <p> While some chose to register internally, and forgo the trip onwards, many others decided to push onwards to Germany, and other Scandanavian countries.</p> <p> Though some had specific plans and a country in mind for where they wanted to resettle, a size-able number were ambivalent about where they ended up, simply wanting security.</p>",
    nextPlace: 'Munich',
    markerPoint: [16.3738,48.2082],
    viewPoint: [48.2082,16.3738],
    countryName: 'Austria',
    scope: 7


}

var Munich = {
    origin: '48.2082,16.3738', 
    destination: '48.1351,11.5820',
    townName: 'Munich',
    description: "<p> German Chancellor Angela Merkel's calls of welcome to refugees were greeted, and expedited their travel plans in order to arrive in the country. </p><p> In Munich, long before nationalist and anti-Islamic fears gripped the country, and broader continent, refugees were welcomed in the city's central train station with food, applause, and celebration.</p><p>Here, refugees rested and waited to formally register with German officials. </p>",
    nextPlace: 'Mützenich',
    markerPoint: [11.5820,48.1351],
    viewPoint: [48.1351,11.5820],
    countryName: 'Germany',
    scope: 7
}


if (($(window).width()) < 580) {
    var Mützenich = {
        origin: '48.1351,11.5820', 
        destination: '50.2533,6.2608',
        townName: 'Mützenich',
        description: "<p> After documenting their names and information with German administrators in Munich, many migrants do not stay there.Instead, they are relocated to more remote parts of the German countryside, where housing and living facilities have been set up to accommodate them.</p> <p> While almost all unilaterally praise the support they are receiving, it is not uncommon for feelings of restlessness to creep in, particularly as the weeks and months can drag on without their ability to line up accommodation outside of the camp. Still, many welcome the opportunity to begin a new life with their families.</p>",
        markerPoint: [6.2608,50.2533],
        nextPlace: 'None',
        viewPoint: [42.9264, 22.1033],
        countryName: 'Germany',
        scope: 4
    }
}



else if(($(window).width()) < 890) {
    var Mützenich = {
        origin: '48.1351,11.5820', 
        destination: '50.2533,6.2608',
        townName: 'Mützenich',
        description: "<p> After documenting their names and information with German administrators in Munich, many migrants do not stay there. Instead, they are relocated to more remote parts of the German countryside, where housing and living facilities have been set up to accommodate them.</p><p> While almost all unilaterally praise the support they are receiving, it is not uncommon for feelings of restlessness to creep in, particularly as the weeks and months can drag on without their ability to line up accommodation outside of the camp. </p>",
        markerPoint: [6.2608,50.2533],
        nextPlace: 'None',
        viewPoint: [42.9264, 24.5033],
        countryName: 'Germany',
        scope: 4
    }
}   



else if(($(window).width()) < 1180) {
    var Mützenich = {
        origin: '48.1351,11.5820', 
        destination: '50.2533,6.2608',
        townName: 'Mützenich',
        description: "<p> After documenting their names and information with German administrators in Munich, many migrants do not stay there. Instead, they are relocated to more remote parts of the German countryside, where housing and living facilities have been set up to temporarily accommodate them.</p><p> Here, it is not uncommon for feelings of restlessness to creep in, particularly as the weeks and months can drag on without their ability to line up accommodation outside of the camp.</p>",
        markerPoint: [6.2608,50.2533],
        nextPlace: 'None',
        viewPoint: [42.9264, 20.5033],
        countryName: 'Germany',
        scope: 4
    }
}   


else {  
    var Mützenich = {
        origin: '48.1351,11.5820', 
        destination: '50.2533,6.2608',
        townName: 'Mützenich',
        description: "<p> After documenting their names and information with German administrators in Munich, many migrants do not stay there. Instead, they are relocated to more remote parts of the German countryside, where housing and living facilities have been set up to accommodate them.</p><p> While almost all unilaterally praise the support they are receiving, it is not uncommon for feelings of restlessness to creep in, particularly as the weeks and months can drag on without their ability to line up accommodation outside of the camp. Still, many welcome the opportunity to begin a new life with their families.</p>",
        markerPoint: [6.2608,50.2533],
        nextPlace: 'None',
        viewPoint: [42.9264, 22.1033],
        countryName: 'Germany',
        scope: 5

    }
}


$('.moveForwards').on('click', function(){
    var mobileMap = $('.townName').text();
if((($(window).width()) <= 580) && (mobileMap === "Mützenich, Germany")) {
        $('#story').hide();
        $('#map').css('visibility','visible');
    };
});





/////////////////////////////////////////////////////////// GETDATA CALLS


// $(document).on('click', '.Daraa',function(){
//     app.getData(Nizip);
// });


$(document).on('click', '.Nizip',function(){
    app.getData(Nizip);
});

$(document).on('click', '.Izmir',function(){
    app.getData(Izmir);
});


$(document).on('click', '.Mitilini',function(){
    app.getData(Mitilini)
    
});

 $(document).on('click', '.Athens',function(){
    app.getData(Athens)

});

$(document).on('click', '.Gevgelija',function(){
    app.getData(Gevgelija)
});

$(document).on('click','.Tabanovce',function(){
    app.getData(Tabanovce)
});

$(document).on('click','.Röske',function(){
    app.getData(Röske)
});

$(document).on('click','.Budapest',function(){
    app.getData(Budapest)
});

$(document).on('click','.Hegyeshalom',function(){
    app.getData(Hegyeshalom)
});


$(document).on('click','.Vienna',function(){
    app.getData(Vienna)
});


$(document).on('click','.Munich',function(){
    app.getData(Munich)
});

$(document).on('click','.Mützenich',function(){
    app.getData(Mützenich)

});



$('button').on('click', function(){
    $('.overlay').hide();
    $('.wrapper').show();
});


////////////////////////////////////////////////////

app.displayInfo = function() {

};


$(function() {
    app.init();
});












