var app = angular.module('QuizApp', ['ngRoute','ngAnimate']);

app.config(function($routeProvider) {
    $routeProvider
        .when('/', {
            controller: 'homeCtrl',
            templateUrl:'views/home.html'
        })
        .when('/contact', {
            controller: 'contactCtrl',
            templateUrl:'views/contact.html'
        })
        .when('/about', {
            controller: 'aboutCtrl',
            templateUrl:'views/about.html'
        })
        .when('/map', {
            controller: 'mapCtrl',
            templateUrl:'views/map.html'
        })
        .when('/quizes', {
            controller: 'quizeCtrl',
            templateUrl:'views/quizes.html'
        })
        .when('/edit', {
            templateUrl:'views/edit.html'
        })
        .when('/new', {
            templateUrl:'views/new.html',
        })
        .otherwise({
            redirectTo:'/'
        });
});

app.run(function($rootScope, $location){
  $rootScope.menuActive = function(url, exactMatch){
    if (exactMatch) {
        return ($location.path() == url)?'active':'';
    } else {
        return ($location.path().indexOf(url) == 0)?'active':'';
    }
  }
});

app.controller('homeCtrl', function($scope){
});

app.controller('contactCtrl', function($scope){
});

app.controller('mapCtrl', function($scope){
});

app.controller('aboutCtrl', function($scope){
});

app.controller('quizeCtrl', function($scope){
});


app.directive('myMap', function() {
    // directive link function
    var link = function(scope, element, attrs) {
        var map,markers=[],bounds;         
        function setMapMarker(map,position,title,content){
            var marker,infoWindow;        
            var markerOptions = {position:position,map:map};
            var mapMarkerImage = new google.maps.MarkerImage('images/dot.png',new google.maps.Size(24,24),new google.maps.Point(0,0),new google.maps.Point(12,12)); 
            markerOptions.icon = mapMarkerImage;
            if(title){
                markerOptions.title = title;                                
                markerOptions.labelContent = title;
                markerOptions.labelAnchor = new google.maps.Point(20, -15);
                markerOptions.labelClass = "markerLabel";
                markerOptions.labelStyle = {opacity:1};
            } 
            marker = new MarkerWithLabel(markerOptions);
            markers.push(marker);        
            if(content){
                google.maps.event.addListener(marker, 'click', function(){
                    if (infoWindow !== void 0){infoWindow.close();}
                    var infoWindowOptions = {content: content};
                    infoWindow = new google.maps.InfoWindow(infoWindowOptions);
                    infoWindow.open(map,marker);
                });
            }
            bounds.extend(marker.position);
            return marker;
        }        
        function createMap(target,dest1,dest2) {                       
            var startPoint = new google.maps.LatLng(dest1.lat,dest1.lng);
            var endPoint = new google.maps.LatLng(dest2.lat,dest2.lng);
            var customMapType = new google.maps.StyledMapType(
                [
                    {featureType:'all',stylers:[{visibility: 'off'}]},
                    {featureType:'landscape',elementType:'geometry.fill',stylers:[{visibility:'on'},{color:'#c1e2f4'}]},
                    {featureType:'administrative.country',elementType:'geometry.stroke',stylers:[{visibility:'on'},{color:'#00b0dd'},{weight:.7},{lightness:-15}]},
                    {featureType:'water',stylers:[{visibility:'on'},{color:'#00b0dd'}]}
                ], 
                {name:'zbor.md'}
            );
            var customMapTypeId = 'zbormd_style';      
            var mapOptions = {center:startPoint,zoom:2,mapTypeId:google.maps.MapTypeId.ROADMAP,scrollwheel:false,mapTypeControlOptions:{mapTypeIds:[google.maps.MapTypeId.ROADMAP,customMapTypeId]}};            
            map = new google.maps.Map(target, mapOptions);
            map.mapTypes.set(customMapTypeId, customMapType);
            map.setMapTypeId(customMapTypeId);                   
            bounds = new google.maps.LatLngBounds(); 
            var planeImg = {
                path:'m15.51546,-1.53623c-0.01863,-0.02964 -0.91712,-1.78028 -1.99666,-3.89033c-1.07953,-2.11005 -1.97956,-3.85376 -2.00007,-3.87491c-0.02394,-0.0247 -0.59527,0.52725 -1.59643,1.5423c-1.46259,1.48288 -1.55911,1.58936 -1.55855,1.71939c0.00033,0.07624 0.06044,0.63696 0.13358,1.24604l0.13298,1.10743l-0.63202,0.64375l-0.63202,0.64375l-0.73344,-1.41589l-0.73344,-1.4159l-1.38031,-0.7308c-0.75917,-0.40194 -1.3807,-0.73991 -1.38117,-0.75104c-0.00047,-0.01113 0.27827,-0.30289 0.61943,-0.64836l0.62029,-0.62811l1.21672,0.14976l1.21672,0.14976l1.57597,-1.59761c1.22897,-1.24585 1.56397,-1.60632 1.52148,-1.63716c-0.02997,-0.02175 -1.78521,-0.96497 -3.90054,-2.09603l-3.84605,-2.05648l0.79426,-0.80547l0.79427,-0.80547l4.74741,1.27587l4.74741,1.27587l2.17078,-2.19703c1.52155,-1.53994 2.22328,-2.22372 2.34629,-2.28629c0.11329,-0.05762 0.27283,-0.09571 0.45008,-0.10745c0.34871,-0.0231 0.60821,0.08026 0.83903,0.3342c0.21449,0.23597 0.284,0.41398 0.28304,0.72482c-0.00147,0.48012 0.0253,0.44764 -2.41243,2.92677l-2.19731,2.23463l0.94913,3.71779c0.52202,2.04478 1.06289,4.16512 1.20192,4.71186l0.25279,0.99407l-0.78963,0.80006c-0.5867,0.59445 -0.79834,0.78621 -0.8235,0.74617z',
                scale:1,strokeColor:'#5283c3',fillColor:'#5283c3',fillOpacity:1,rotation:315
            };
            var flightPathOptions = {path:[startPoint,endPoint],geodesic:true,radius:1500,strokeColor:"#ffffff",strokeOpacity:1.0,strokeWeight:3,icons:[{icon:planeImg,offset:'0%'}],map:map};
            var flightPath = new google.maps.Polyline(flightPathOptions);  
            setMapMarker(map,startPoint,dest1.tite);
            setMapMarker(map,endPoint,dest2.title);  
            map.fitBounds(bounds);            
            var count = 0;
            offsetId = window.setInterval(function() {                
                var icons = flightPath.get('icons');count = (count + 0.25); icons[0].offset = count + '%';flightPath.set('icons', icons);if(count == 90) count = 0;
            }, 20);
        }

        function initialize(){
            var from = {
                code: 'STN',
                title: 'London',
                lat:51.508515,
                lng: -0.125487
            };    
            var to = {
                code: 'AMS',
                title: 'Amsterdam',
                lat:52.370216,
                lng:4.895168
            };
            createMap(element[0],from,to)
        }
        
        google.maps.event.addDomListener(window, 'load', initialize);
    };
    
    return {
        restrict: 'A',
        template: '<div id="gmaps"></div>',
        replace: true,
        link: link
    };
});