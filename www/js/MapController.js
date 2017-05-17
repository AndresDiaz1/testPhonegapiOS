//MAPA

var map;
var markerGeo;
var infowindow = new google.maps.InfoWindow();
var anima = 500;
var strictBounds = new google.maps.LatLngBounds(
    new google.maps.LatLng(-6.4113973,-86.835912),
    new google.maps.LatLng(13.573363,-62.0507562)
);

//** Variables para el servicio de ubicación **//
var markerini;
var markerLatLngIni = null;
var dir = '';
var marcasMarkerini = [];
var infoPlaceini = new google.maps.InfoWindow();
var markersSitiosini = [];
var radioini = 50000;
var markerClusterOf = null;
var markerClusterNOf = null;
var posicionini;
var infoMarker;

var posicionSedeActual = "";
//** Variables para la busqueda de sitios **//
var markersSitios = [];
var direccionCaja = "";
var direccionCaja = "";
var auxiliarCategoria = 2;
var auxiliarJornadas = 0;
var enCalcularSitios = false;
var CodsedeActiva = "";
var banderaZoom = true; 
var numeroPrefere = 0;


//** Variables Sicole **//
var colegiosfound = [];
var colegiosordfound = [];
var distanfound = [];
var isMobile = false;
var radioarea = 500;
var radio_est1 = 0;
var radio_est2 = 100;
var radio_tot = 6668;
var estadoini = 1;
var estadoOrigen = 0;
var estadoDestino = 0;
var estadoRuta = 0;
var origen;
var destino;
var markerOrigen;
var markerDestino;

var nivel = [];
var donaNiveles = [];
var totalCalidad = 0.743;
var valorCalidad = false;

var jorna = [];
var prima = [];
var prees = [];
var secun = [];
var media = [];
var total = [];
var anima = 500;
var jor = [];
var desercionjor = [];
var reprobacionjor = [];
var aprobacionjor = [];
var transferenciajor = [];
var totdoc = [];
var pordoc = [];
var numestdoc = [];
var autocomplete="";

var cercaHabilitado = false;
var circulo;
var radio;
var servicioPlaces;
var infoPlace = new google.maps.InfoWindow();
var posicionSitios;
var markersSitios = [];
var modoIsocrona = "BIKE";
//** Variables Sesion **\\

var datossesion = [];
var datossedesession;
var sedeActiva = [];
var urlregistro;
var urlsesion;
var fotoarriba = 0;
var opacidad = 1;
var clasePerfil = 0;

//**  Donas Info Colegio**//
var bandera = false;
var bandera1 = false;
var bandera2 = false;
var color1Dona = ["#2C519F", "#5FBEEC", "#139064", "#6351A7", "#A4FF5F"];
var color2Dona = ["#E95D16", "#FCD200", "#E4191D", "#71150A", "#E86F00"];
var arrayCercaSitios = ["hospital", "library", "church", "storage", "bus_station", "local_government_office", "bank", "park"]
var arrayJornadas = ["Completa", "Manana", "Tarde", "Noche", "Sabado"];
var contadorFiltro = false;
var entransporte = false;
var enFiltro = false;

//** Variables Regresar**\\

var sesionactiva = "a";

//** Variables Generales **\\

var pos = 0;
var activar = false;
var nombreTitulo = "Instituciones cercanas";
/*var traveltime = new walkscore.TravelTime({
   map    : map,
  mode   : walkscore.TravelTime.Mode.BIKE
});*/
//** Variables para la posición inicial **\\

var latInicial = 4.598056000000001;
var lngInicial = -74.07583299999999;
var zoomInicial = 0; // 17
var centroInicial = new google.maps.LatLng(latInicial, lngInicial);
//***********  Variables como llegar school  ***************
var destinlat;
var destinlon;

if(obtenerQueryVariable("lng") && obtenerQueryVariable("lng") != ""){
	lngInicial = obtenerQueryVariable("lng");
}

if(obtenerQueryVariable("lat") && obtenerQueryVariable("lat") != ""){
	latInicial = obtenerQueryVariable("lat");
}
 
if(obtenerQueryVariable("zoom") && obtenerQueryVariable("zoom") != ""){
	zoomInicial = obtenerQueryVariable("zoom");
	zoomInicial = parseInt(zoomInicial);
} 

var markersArrayRuta = [];
var directionsDisplay;
var maps = [];
var centrolocal = [["1",-74.0333,	4.7],["2", -74.062,	4.656],["3",-74.072083,	4.583478],["4",-74.087912,	4.554747],["5",-74.110219,	4.515807],["6",-74.135989,	4.574841],["7",-74.19162,	4.618586],["8",-74.152044,	4.627494],["9",-74.137813,	4.677564],["10",-74.111893,	4.700079],["11",-74.0749,	4.742331],["12",-74.073552,	4.669567],["13",-74.085769,	4.641174],["14",-74.087948,	4.607156],["15",-74.102842,	4.588771],["16",-74.11158,	4.616245],["17",-74.072071,	4.596605],["18",-74.113363,	4.566477],["19",-74.149861,	4.552642],["20",-74.256979,	4.036569]];

var directions;
var renderer;
var transitLayer;




///////////////////////////////////////SICOLE////////////////////////////////////

//* Creando el Mapa Mapcontroller*//
var MapOperative = {
    init:function(){
        directions = new google.maps.DirectionsService();
		renderer = new google.maps.DirectionsRenderer();
    },
    loadMap:function(el, panorama){

        if($('#'+el).length == 0){
            console.log('-- '+el+' doesnt exist, loadMap Aborted');
            return;
        }

		var mapOptions = {
			zoom: zoomInicial,
			center: centroInicial,
			panControl: false,
			zoomControl: false, //true
			zoomControlOptions: {
				position: google.maps.ControlPosition.TOP_LEFT,
				style: google.maps.ZoomControlStyle.SMALL
			},
			streetViewControl: false,
			scaleControl: false, //true
			mapTypeControl: false, //true
			mapTypeControlOptions: {
				mapTypeIds: ['SICOLE', google.maps.MapTypeId.ROADMAP, google.maps.MapTypeId.SATELLITE, google.maps.MapTypeId.HYBRID],
				//style: google.maps.MapTypeControlStyle.HORIZONTAL_BAR,
				style: google.maps.MapTypeControlStyle.DROPDOWN_MENU,
				//position: google.maps.ControlPosition.TOP_CENTER
				position: google.maps.ControlPosition[isMobile?'TOP_RIGHT':'TOP_CENTER']
			}
		};	
	
		if(panorama){
			mapOptions.streetView = panorama;
		}
		
        var map = new google.maps.Map(document.getElementById(el), mapOptions);
				
		/*
		var masControlDiv = document.createElement('div');
		var masControl = new MasControl(masControlDiv, map);
		
		masControlDiv.index = 1000;
		map.controls[google.maps.ControlPosition.RIGHT_CENTER].push(masControlDiv);
		
		var slideControlDiv = document.createElement('div');
		var slideControl = new SliderControl(slideControlDiv, map);
	
		slideControlDiv.index = 1000;
		map.controls[google.maps.ControlPosition.RIGHT_CENTER].push(slideControlDiv);
				
		var menosControlDiv = document.createElement('div');
		var menosControl = new MenosControl(menosControlDiv, map);
		
		menosControlDiv.index = 1000;
		map.controls[google.maps.ControlPosition.RIGHT_CENTER].push(menosControlDiv);
		*/
		
		/************************************/
		/************************************/
		/************************************/
					 
		/*$( "#sliderzoom" ).slider({ 
		  orientation: "vertical",
		  value: 500,
		  min: 100,
		  max: 1000,
		  step: 50,
		  slide: function( event, ui ) {
			//$( "#area" ).html( "Área de Influencia - " + ui.value + " m" );
			//radioarea = ui.value;
		  }
		});*/
		
		
		/*map.addListener('click', function() {
			if(estadoini == 0){
				ocultarPaneles();
				estadoini = 1;
			}
			else{}
				estadoini = 0;
			}
		});*/
		
        map.addListener('mousedown', function() {
            ocultarPaneles();
            $("#busquedaPopup").hide();
            $("#ventanaCategoriasDer").hide();
        });
        
		map.addListener('click', function(e) {
			posicionSedeActual = "";
			CodsedeActiva = "";
			if(estadoOrigen == 0 && estadoDestino == 0 && estadoRuta == 0){
				inputSeleccionado.val("");
				mostrarPaneles();
				$("#barraSesion").hide(anima);
				coloresSecciones("#01B4ED", "#CDEAFB");
				cerrarInfocole();
				$(".autocomplete-jquery-results").css("display","none");
				$("#inputBusqueda").val("");
				direccionCaja="";
				$("#ventanaTipoBusqueda").hide(anima);
				$("#busquedaPopup").css("z-index","100");
				$("#ui-id-1").hide(anima);  
				markerini.setPosition(map.getCenter());
				
			}else{
				if(entransporte == true){
					setGeoTransporte(e.latLng);
				}else{
					setGeocode(e.latLng);
				}
				
				
			}	
			
			
			if(cercaHabilitado == true){
				if(circulo != null){
					circulo.setMap(null);
				}			
				for (var i = 0; i < markersSitios.length; i++){
					markersSitios[i].setMap(null);
				}
				markersSitios = [];
				$("#seleccioneSede").show(anima)
				$("#barraCercaAtuSede").hide();
				$("#flechaDespliegue").hide();
			}
		});	
		
			

        this.addMapsTypes(map, el);
        //directionsDisplay.setMap(map);

        var inputDesde = document.getElementById('desde_distancia');
        var autocompleteFrom = new google.maps.places.Autocomplete(inputDesde);
        autocompleteFrom.bindTo('bounds', map);
		autocompleteFrom.addListener('place_changed', function() {
			var place = autocompleteFrom.getPlace();
			origen = place.geometry.location;
		});

        var inputHasta = document.getElementById('hasta_distancia');
        var autocompleteTo = new google.maps.places.Autocomplete(inputHasta);
        autocompleteTo.bindTo('bounds', map);		
		autocompleteTo.addListener('place_changed', function() {
			var place = autocompleteTo.getPlace();
			destino = place.geometry.location;
		});
		
		
        this.addMapListeners(map);

		
		google.maps.event.addDomListener(window, "resize", function() {
			var anch = $(window).width();
			var dispositivo = navigator.userAgent.toLowerCase();
			if( dispositivo.search(/iphone|ipod|ipad|android/) > -1 ){
				isMobile = true;	
			}
			else{
				isMobile = false;
			}
			
			var mapOps = {
				mapTypeControlOptions: {
					mapTypeIds: ['SICOLE', google.maps.MapTypeId.ROADMAP, google.maps.MapTypeId.SATELLITE, google.maps.MapTypeId.HYBRID],
					//style: google.maps.MapTypeControlStyle.HORIZONTAL_BAR,
					style: google.maps.MapTypeControlStyle.DROPDOWN_MENU,
					//position: google.maps.ControlPosition.TOP_CENTER
					position: google.maps.ControlPosition[isMobile?'TOP_RIGHT':'TOP_CENTER']
				}
			};
			var center = map.getCenter();
			google.maps.event.trigger(map, "resize");
			map.setCenter(center); 
			map.setOptions(mapOps);
		});
		
		//zoomTo();
		
		var pinColor = "01B4ED";
		var pinImage = new google.maps.MarkerImage("http://chart.apis.google.com/chart?chst=d_map_pin_letter&chld=%E2%80%A2|" + pinColor,
        new google.maps.Size(21, 34),
        new google.maps.Point(0,0),
        new google.maps.Point(10, 34));
		var pinShadow = new google.maps.MarkerImage("http://chart.apis.google.com/chart?chst=d_map_pin_shadow",
        new google.maps.Size(25, 37),
        new google.maps.Point(0, 0),
        new google.maps.Point(12, 35));
		
		markerOrigen = new google.maps.Marker({
			map: map,
			draggable: true,
			icon: pinImage,
			shadow: pinShadow,
			animation: google.maps.Animation.DROP

		});
		
		
		
		markerOrigen.addListener('dragend', function() {
			estadoOrigen =1;
			
			if(entransporte == true){
				setGeoTransporte(markerOrigen.getPosition());
				$("#barraSesion").show(anima);
			}
			else{	
				setGeocode(markerOrigen.getPosition());
			}	
		});
	
	  
		pinColor = "8FBE2B";
		pinImage = new google.maps.MarkerImage("http://chart.apis.google.com/chart?chst=d_map_pin_letter&chld=%E2%80%A2|" + pinColor,
        new google.maps.Size(21, 34),
        new google.maps.Point(0,0),
        new google.maps.Point(10, 34));
		pinShadow = new google.maps.MarkerImage("http://chart.apis.google.com/chart?chst=d_map_pin_shadow",
        new google.maps.Size(25, 37),
        new google.maps.Point(0, 0),
        new google.maps.Point(12, 35));
		
		markerDestino = new google.maps.Marker({
			map: map,
			draggable: true,
			icon: pinImage,
			shadow: pinShadow,
			animation: google.maps.Animation.DROP
		});
		
		markerDestino.addListener('dragend', function() {
			estadoDestino =1;
			if(entransporte == true){
				setGeoTransporte(markerDestino.getPosition());
				$("#barraSesion").show(anima);
			}else{
				setGeocode(markerDestino.getPosition());
			}	
		});
		
        return map;
    },
    addMapsTypes:function(map, el){
					
		var mapbox2TypeOptions = {
			getTileUrl: function (coord, zoom) {
			// Y coordinate is flipped in Mapbox, compared to Google
			// Simplistic predictable hashing
			   var y = coord.y;
			   var x = coord.x;
			   var z = zoom;

			return 'https://'
				+ ['a', 'b', 'c', 'd'][(x + y) % 4]
				+ '.tiles.mapbox.com/v4/danemoderno.o2hh5del'
				+ '/' + z
				+ '/' + x
				+ '/' + y + '.png'
				+ '?access_token=pk.eyJ1IjoiZGFuZW1vZGVybm8iLCJhIjoiZkV6WFdXOCJ9.LNzA9X_DLgx5TRfDDgYq5g';
			},
		   tileSize: new google.maps.Size(256, 256),
		   opacity: 1,
		   name: 'SICOLE',
		   alt: 'SICOLE',
		   maxZoom: 19
		};
		var mapBox2MapType = new google.maps.ImageMapType(mapbox2TypeOptions);		
		map.mapTypes.set('SICOLE', mapBox2MapType);		
				
				
		map.setMapTypeId(google.maps.MapTypeId.ROADMAP);
    },
    addMapListeners:function(map){
        google.maps.event.addListener(map, 'center_changed', function() {
            if(maps.length == 1){
                return;
            }
            //map1.setCenter(map.getCenter());
            //alert("center");
            //console.log(map.getCenter());

            for(var i = 0; i<maps.length;i++){
                if(maps[i].getDiv() != map.getDiv()){
                    if(map.getCenter() != maps[i].getCenter())
                    maps[i].setCenter(map.getCenter())
                }
            }
            
           
            
        });
        google.maps.event.addListener(map, 'zoom_changed', function() {
            banderaZoom = true;
			for(var i = 0; i<maps.length;i++){
                if(maps[i].getDiv() != map.getDiv()){
                    if(map.getZoom() != maps[i].getZoom())
                    maps[i].setZoom(map.getZoom())
                }
            }
        });
		
       google.maps.event.addListener(map, 'dragend', function() {
			markerini.setPosition(map.getCenter());
			if(enFiltro == true){
				cargarMapa();
			}else{	
				recargarCercanas();
			}
        });
    }
}

function recargarCercanas(){

	markerLatLngIni = markerini.getPosition();
	var uricol = "http://geoportal.dane.gov.co/wssicole/colegio1.php?latitud="+markerLatLngIni.lat()+"&longitud="+markerLatLngIni.lng()+"&distancia=4000&tipo=reducido";
	
	d3.json(uricol, function(error, data) {
		colegiosfound = [];
		distanfound = [];
		for (var i = 0; i < data.length; i++) {
			var sitioini = data[i];
			mostrarCercania(sitioini);	
		}	
		sitiosCercanos();
	});
}

function cargarMapa(){
			$("#preaload").show();
			if(activar == true){
						var tiempo = parseFloat($("#minutos").val());
						 $("#preaload").show();
					   // traveltime.setOrigin(map.getCenter()); 
					}
					var c = map.getCenter(),
						x = c.lng(),
						y = c.lat(),
						maxX = strictBounds.getNorthEast().lng(),
						maxY = strictBounds.getNorthEast().lat(),
						minX = strictBounds.getSouthWest().lng(),
						minY = strictBounds.getSouthWest().lat();

					if (x < minX) x = minX;
					if (x > maxX) x = maxX;
					if (y < minY) y = minY;
					if (y > maxY) y = maxY;
					nombreTitulo = "Instituciones Cercanas";
					map.setCenter(new google.maps.LatLng(y, x));
				   $("#preaload").show();
				  sitiosCercanos();
				  openInfoWindowUbicacionIni(markerini);
				  markerLatLngIni = markerini.getPosition();
				  uricolegios = "http://geoportal.dane.gov.co/wssicole/colegio1.php?latitud="+markerLatLngIni.lat()+"&longitud="+markerLatLngIni.lng()+"&distancia="+radioini+ "&tipo=reducido";
					d3.json(uricolegios, function(error, data) {
					colegiosfound = [];
					distanfound = [];
					
					if(enFiltro == false){
						for (var i = 0; i < data.length; i++) {
							var sitioini = data[i];
							mostrarCercania(sitioini);	
						}	
					}
				//sitiosCercanos();	
			});
					
					
					$("#busquedaPopup").show();
					mostrarPaneles();


		}

		
function mostrarCercania(sitioini){
	var lati = parseFloat(sitioini.LATITUD.replace(",","."));
	var longi = parseFloat(sitioini.LONGITUD.replace(",","."));
	var myLatlng = new google.maps.LatLng(lati,longi);
	var x1 = new google.maps.LatLng(markerLatLngIni.lat(),markerLatLngIni.lng());	
	var x2 = new google.maps.LatLng( myLatlng.lat(),myLatlng.lng());
	var distancia = Math.round(google.maps.geometry.spherical.computeDistanceBetween(x1, x2));			
	colegiosfound.push([distancia,sitioini.COD_COL,sitioini.NOM_COL, sitioini.DIR_COL, sitioini.COD_LOCAL, sitioini.SCANOMBRE, sitioini.SECTOR, sitioini.GENERO]);
	distanfound.push(distancia);
}



function sitiosCerca(posicion){
	console.log("popsicion " + cercaHabilitado);
	if(cercaHabilitado == true){
		$("#slider_cerca").slider("enable");
		$("#infocolecercatipo").prop("disabled", false);
		posicionSitios = posicion;
		
		if(circulo != null){
			circulo.setMap(null);
		}
		
		var circuloOpciones = {
		  strokeColor: "#A91D4A",
		  strokeOpacity: 1,
		  strokeWeight: 2,
		  fillOpacity: 0,
		  clickable: false,
		  map: map,
		  center: posicionSitios,
		};
		
		circulo = new google.maps.Circle(circuloOpciones);
		
		radio = 100;
		
		//$("#slider_cerca").slider("value");
		circulo.setRadius(radio);
		
		map.fitBounds(circulo.getBounds());
		calcularSitios();
	}
}

function calcularSitios(){
    
	
	for (var i = 0; i < markersSitios.length; i++){
		markersSitios[i].setMap(null);

	}
	markersSitios = [];
	radio = parseFloat($("#sliderCerca").val());
	var tipoSitio = [];
	
	tipoSitio = arrayCercaSitios;
	
	circulo.setRadius(radio);
	map.fitBounds(circulo.getBounds());
	
			
	if(tipoSitio.length == 0){
		tipoSitio.push("atm ");
	}
	var request = {
		location: posicionSitios,
		radius: radio,
		types:  tipoSitio
	};
	//console.log(request.types);
	servicioPlaces = new google.maps.places.PlacesService(map);
	servicioPlaces.search(request, callbackSitio);
}

function convertirSitios(tipo){
	var noEsta = true;
	var arrayAux = [];
	for(i =0; i<arrayCercaSitios.length; i++){
		if(tipo == arrayCercaSitios[i]){
			noEsta = false;
			arrayCercaSitios.splice(i,1);
			$("#" + tipo + "Imagen").css("opacity", "0.3");
		}
	}
	if(noEsta == true){
		arrayCercaSitios.push(tipo);
		$("#" + tipo + "Imagen").css("opacity", "1");
	}
	calcularSitios();
}

function cambiarRadio(){
	calcularSitios();
}

function callbackSitio(results, status, pagination) {

	if (status == google.maps.places.PlacesServiceStatus.OK) {
  
		for (var i = 0; i < results.length; i++) {
			var sitio = results[i];
			mostrarSitio(sitio);	  
		}
		
		/*if (pagination.hasNextPage) {
			pagination.nextPage();
		}*/
	
	}
}

function mostrarSitio(sitio){

	var i = 0;
	var urlicono = sitio.types[0];
	//["hospital", "library", , "storage", "bus_station", "local_government_office", ]
	if(urlicono == "bank"||urlicono == "hospital"||urlicono == "church"||urlicono == "library"||urlicono == "storage"||urlicono == "bus_station"||urlicono =="local_government_office"|| urlicono =="park"){
		urlicono = "imagenes/iconosplaces/" + urlicono + ".png"
		//urlicono = "https://geoportal.dane.gov.co/tilesdirect/iconos_sitios/" + urlicono + ".png";
	}else{
		urlicono = "imagenes/iconosplaces/otros.png"
	}
	var icono = {url: urlicono};
	var markerPlace = new google.maps.Marker({
		icon: icono, 
		position: sitio.geometry.location,
		map: map
	});

	markerPlace.setTitle(sitio.name);
	markersSitios.push(markerPlace);
	
	google.maps.event.addListener(markerPlace, "click", function(){
		if(infoPlace != null){
			infoPlace.close();
		}
		var html = "<div style='width:100%;height:100%'><strong>" + sitio.name + "</strong></br>";
		html += sitio.vicinity + "</br>";
		html += "</div>";
		infoPlace.setContent(html);
		infoPlace.open(map, markerPlace);
	});
	/*
	var latitud = parseFloat(map.getCenter().lat());
	var longitud = parseFloat(map.getCenter().lng());
	latitud =latitud-0.0023;
	ubicacion = { lat: latitud, lng: longitud};
	map.setCenter(ubicacion);*/

}


var panorama;
var panorama0;

function initializeMap() {
    geocoder = new google.maps.Geocoder();
    var panoramaOptions = {
        enableCloseButton: true,
        visible: false,
        pov: {
        	heading: 34,
        	pitch: 0
        }
    };
    panorama = new google.maps.StreetViewPanorama(document.getElementById("pano"), panoramaOptions);
 	MapOperative.init();
	map = MapOperative.loadMap('map_canvas', panorama);
	zoomTo();
	maps.push(map);
	initializeMap2();
}

function initializeMap2(){
	
	streetViewMapType = new google.maps.StreetViewCoverageLayer();
	trafficLayerMapType = new google.maps.TrafficLayer(); 	
	streetViewMapType.setMap(null);
	trafficLayerMapType.setMap(null);
    
	var input = /** @type {HTMLInputElement} */(document.getElementById('searchTextField'));
	var boundsAutocomplete = new google.maps.LatLngBounds( new google.maps.LatLng(4.469449196301327, -74.22391302490234), new              google.maps.LatLng(4.824121074757427, -74.0216895751953) );
	var opcionesAutocomplete = {
		bounds: boundsAutocomplete,
		types: ['establishment'],
		componentRestrictions: {country: 'co'}
	};
    autocomplete = new google.maps.places.Autocomplete(input, opcionesAutocomplete);
	/*codigo para google places */
   

	if (infoMarker != null) {
		infoMarker.close();
	}
 
    infoMarker = new google.maps.InfoWindow();
	
    google.maps.event.addListener(autocomplete, 'place_changed', function () {
        infoMarker.close();
        markerGeo.setVisible(false);
        //input.className = '';
        var place = autocomplete.getPlace();
        if (!place.geometry) {
            // Inform the user that the place was not found and return.
            //input.className = 'notfound';
            return;
        }

        // If the place has a geometry, then present it on a map.
        if (place.geometry.viewport) {
            map.fitBounds(place.geometry.viewport);
        } else {
            map.setCenter(place.geometry.location);
            map.setZoom(17);  // Why 17? Because it looks good.
        }
        markerGeo.setPosition(place.geometry.location);
        

        //markerGeo.setVisible(true);
		
        var address = '';
        if (place.address_components) {
            address = [
              (place.address_components[0] && place.address_components[0].short_name || ''),
              (place.address_components[1] && place.address_components[1].short_name || ''),
              (place.address_components[2] && place.address_components[2].short_name || '')
            ].join(' ');
        }
        $("#preaload").show();
		markerini.setPosition(place.geometry.location);
		$("#infocolepar").show();
		//$("#busquedaPopup").hide();
		openInfoWindowUbicacionIni(markerini);

    });
	
	markerGeo = new google.maps.Marker({
        map: map,
		draggable: false
    });
	
    //** Eventos para la función de obtener el centro geográfico **//
	google.maps.event.addListenerOnce(map, "idle", obtenerUbicacionActual);

}



var MapUtil = {
     DDtoDMS:function(decimales, tipo) {
        // Convierte formato decimal a GMS
        var cardinal = "";

        if(decimales < 0){
            if(tipo == "lat"){
                cardinal = "S";
            }else if(tipo == "lng"){
                cardinal = "O";
            }
        } else {
            if(tipo == "lat"){
                cardinal = "N";
            }else if(tipo == "lng"){
                cardinal = "E";
            }
        }

        var grados = Math.floor(Math.abs(decimales));
        var tempma = Math.abs(decimales) - Math.abs(grados);

        tempma = tempma * 3600;
        var minutos = Math.floor(tempma / 60);
        var segundos = (tempma - (minutos * 60)).toFixed(2);

        return grados + "° " +  minutos + "' " + segundos + "'' " + cardinal;

    },
    addMark:function(lt,lg,title){
        if(typeof lt == 'string'){
            lt = lt.replace(',','.');
            lt = parseFloat(lt);
        }
        if(typeof lg == 'string'){
            lg = lg.replace(',','.');
            lg = parseFloat(lg);
        }
        var myLatlng = new google.maps.LatLng(lt,lg);
        var marker = new google.maps.Marker({
            position: myLatlng,
            map: map,
            title: title
        });
    },
     drawPolygon:function(points) {
        var paths = MapUtil.createGooglePath(points);

        var shape = new google.maps.Polygon({
            paths: paths,
            strokeColor: '#ff0000',
            strokeOpacity: 0.8,
            strokeWeight: 2,
            fillColor: '#ff0000',
            fillOpacity: 0.35
        });

        shape.setMap(map);
         map.setCenter(paths[0])
         if(maps.length > 1){

         }
    },

     createGooglePath:function(src) {
        var path = []
        for (var i = 0; i < src.length; i++) {
            path[i] = new google.maps.LatLng(src[i].x, src[i].y)

        }
        return path;
    },
    drawKML:function(url){
        var ctaLayer = new google.maps.KmlLayer({
            url: url
        });
        ctaLayer.setMap(map);
    }
}

window.onload = initializeMap;

function inicializarSitios(){

	if(circulo != null){
		circulo.setMap(null);
	}
	
	for (var i = 0; i < markersSitios.length; i++){
		markersSitios[i].setMap(null);
	}
	markersSitios = [];

}


function showError(error) {
   /* switch(error.code) {

        case error.PERMISSION_DENIED:

            

            break;

        case error.POSITION_UNAVAILABLE:

            alert("Location information is unavailable.");

            break;

        case error.TIMEOUT:

            alert("The request to get user location timed out.");

            break;

        case error.UNKNOWN_ERROR:

            alert("An unknown error occurred.");

            break;
		

    }*/
	centroInicial = new google.maps.LatLng(4.598168, -74.076065);
	//centroInicial = new google.maps.LatLng(10.985192, -74.845874);
	//console.log(centroInicial);
	enbogota(centroInicial);
	setTimeout(function (){
		markersArrayRuta[0] = centroInicial;
		ubicarPosicionInicial();
	},100);
	
}
//Función para obtener Ubicación Actual

function obtenerUbicacionActual(){
	/* Determina si el navegador soporta Geolocalización */
	if (navigator.geolocation && (!obtenerQueryVariable("lng") || !obtenerQueryVariable("lat") || !obtenerQueryVariable("zoom")) ) {
	  navigator.geolocation.getCurrentPosition(posicionActual, showError);    
	  
	} else {
	  console.log("Geolocalización no soportada");
	  centroInicial = new google.maps.LatLng(4.598168, -74.076065);
	 // centroInicial = new google.maps.LatLng(10.985192, -74.845874);
	  enbogota(centroInicial);
	  setTimeout(function (){
			markersArrayRuta[0] = centroInicial;
			ubicarPosicionInicial();
		},100);
	}
}



//Función para ajustar el visor en la geolocalización del navegador
function posicionActual(position){
	if(activar == false){
		centroInicial = new google.maps.LatLng(position.coords.latitude, position.coords.longitude);
		//centroInicial = new google.maps.LatLng(10.985192, -74.845874);
	}
	else{
		activar=false;
	}
	enbogota(centroInicial);
	setTimeout(function (){
		markersArrayRuta[0] = centroInicial;
		ubicarPosicionInicial();
	},100);		
}

function ubicarPosicionInicial(){   
		map.setCenter(centroInicial);
		for (p in marcasMarkerini) {
			marcasMarkerini[p].setMap(null);
		}
		addMarkerIni();
}
function enbogota(latlng){
	
	geocoder.geocode({"latLng": latlng}, function(results, status) {
		if (status == google.maps.GeocoderStatus.OK) {
			if (results[0]){
				var dir = results[0].formatted_address;
				var direccion2 = dir.split(", ");
				if(direccion2[1]== "Bogotá"||direccion2[1]== "Soacha" ){
				}else{
					centroInicial = new google.maps.LatLng(4.598168, -74.076065);
				}
			}
		}
	});	
}


//Función para obtener variables URL
function obtenerQueryVariable(variable)
{
       var query = window.location.search.substring(1);
       var vars = query.split("&");
       for (var i=0;i<vars.length;i++) {
               var pair = vars[i].split("=");
               if(pair[0] == variable){return pair[1];}
       }
       return(false);
}



//**********SERVICIO DE UBICACION*******//

var markerini;	
function addMarkerIni() {
	$("#preaload").show();
	markerini = new google.maps.Marker({
		icon: iconoPanoRojo,
		position: centroInicial,
		draggable: false,
		map: panorama
	});

	markerini = new google.maps.Marker({
		icon: 'imagenes/sige/neogeografia/iconos-geoportal/gps-local.png',
		position: centroInicial,
		draggable: false,
		map: map
	});
	
	var iconoPanoRojo = {url: 'imagenes/sige/neogeografia/iconos-geoportal/gps-local.png',
		size: new google.maps.Size(150, 150),
		scaledSize: new google.maps.Size(150, 150)
	};
	marcasMarkerini.push(markerini);

    infoWindow = new google.maps.InfoWindow();

	google.maps.event.addListener(markerini, 'dragend', function() {
		//$("#preaload").show();
		//inicializarSitiosIni();
		//openInfoWindowUbicacionIni(markerini);
        map.setCenter(markerini.getPosition());
	});

	google.maps.event.addListener(markerini, 'click', function() {
		openInfoWindowUbicacionIni(markerini);
	});
	openInfoWindowUbicacionIni(markerini);
    
}



function openInfoWindowUbicacionIni(markerini) {
	geocoder = new google.maps.Geocoder();
    markerLatLngIni = markerini.getPosition();	
	//traveltime.setOrigin(markerLatLngIni);
	markersArrayRuta[0] = markerini.getPosition();
    lugaresCercanos();
	geocoder.geocode({"latLng": markerLatLngIni}, function(results, status) {
		if (status == google.maps.GeocoderStatus.OK) {
			if (results[0])
			{
			}
			else
			{
				dir = "No se ha podido obtener ninguna dirección en esas coordenadas.";
				alert(dir);
			}
		}
		else
		{
			dir = "El Servicio de Codificación Geográfica ha fallado con el siguiente error: " + status + ".";
			alert(dir);
		}
	});
}

function openInfoWindowUbicacionIni2(markerini) {
	geocoder = new google.maps.Geocoder();
    markerLatLngIni = markerini.getPosition();	
	markersArrayRuta[0] = markerini.getPosition();
	geocoder.geocode({"latLng": markerLatLngIni}, function(results, status) {
		if (status == google.maps.GeocoderStatus.OK) {
			if (results[0])
			{
			}
			else
			{
				dir = "No se ha podido obtener ninguna dirección en esas coordenadas.";
				alert(dir);
			}
		}
		else
		{
			dir = "El Servicio de Codificación Geográfica ha fallado con el siguiente error: " + status + ".";
			alert(dir);
		}
	});
}

function lugaresCercanos(){
	banderaZoom = false;
	if(banderaZoom == false || bandera == false){
		inicializarSitiosIni();
		posicionini = markerLatLngIni;
		calcularSitiosIni();
		banderaZoom = false;
	}else{
		$("#preaload").hide(anima);
		banderaZoom = false;
	}
	
}

function inicializarSitiosIni(){
	for (var i = 0; i < markersSitiosini.length; i++){
		markersSitiosini[i].setMap(null);
	}
	
	
	if(bandera!=false){
		for (var i =0; i<markerClusterOf.markers_.length; i++)
		{
			markerClusterOf.markers_[i].setMap(null);
		}
		markerClusterOf.markers_ =[];
		markerClusterOf.clearMarkers();
		for (var i =0; i<markerClusterNOf.markers_.length; i++)
		{
			markerClusterNOf.markers_[i].setMap(null);
		}
		markerClusterNOf.markers_ =[];
		markerClusterNOf.clearMarkers();

	}
	
	bandera = true;
	markersSitiosini = [];
}

function calcularSitiosIni(){

	 $("#preaload").show();
	colegiosfound = [];
	distanfound = [];
    var primaria=[];
	var filtroTasas = []
	$( "#infocole" ).empty();
	
	var tipoSitioini = ["school"];
	if(enFiltro==true){
			radioini = $("#filtroDistanciaR").val();
	}else{
			radioini = 50000;
	}
		
	uricolegios = "http://geoportal.dane.gov.co/wssicole/colegio1.php?latitud="+markerLatLngIni.lat()+"&longitud="+markerLatLngIni.lng()+"&distancia="+radioini;
	if(enFiltro == false){
		uricolegios+= "&tipo=reducido";
	}
	console.log(uricolegios);
	d3.json(uricolegios, function(error, data) {
		if(activar == false){
			$("#preaload").hide();
            
		}
		markerClusterOf = new MarkerClusterer(map, {imagePath: "imagenes/oficial"});
		
		var	mcOptions = {styles: [{
			url: "/imagenes/no-oficial.png"
		}]};
		markerClusterNOf = new MarkerClusterer(map, {imagePath: "imagenes/no-oficial"});
		if(bandera == false){
				numeroColegios = datalength;
		}
		
		numeroColegios = data.length;
		for(j=0; j<vectorTasas.length; j++){
				
			for(k=0; k<tasasNiveles.length; k++){
				var mayuscula = vectorTasas[j].charAt(0).toUpperCase() + vectorTasas[j].slice(1);
				mayuscula= mayuscula.replace("ó", "o");
				var mayuscula1 = tasasNiveles[k].charAt(0).toUpperCase() + tasasNiveles[k].slice(1);
				var desliz = $("#" + mayuscula + mayuscula1 + "").val();
				if(desliz!=1){
					//filtroTasas.push([""])
					filtroTasas.push({ "nombre": mayuscula, "nivel": mayuscula1 , "valor": desliz})
				}	
			}
		}
		contadorFiltro = false;
		colegiosfound = [];
		for (var k = 0; k < data.length; k++) {
			var sitioini = data[k];
			
			if(enFiltro == false){
				todosLossitios(sitioini);
			}else{
				
				mostrarSitioIni2(sitioini,filtroTasas, data.length-1, k);	
			}
			
		}
		 $("#preaload").hide(anima);
		
	});
}

function procesarJornada(variable){
	var jornadaValor = false;
	for(j=0;j<variable.length;j++){
		var posicion = parseInt(variable[j])-1;
		if($("#filtro" + arrayJornadas[posicion] + "").is(':checked')){
			jornadaValor = true;
		}
	}
	//console.log(jornadaValor);
	return jornadaValor;
}

function procesarCalendario (calendario){
	switch (calendario){
		case 'A':
			return $("#calendarioA").is(':checked');
			break;
		case 'B':
			return $("#calendarioB").is(':checked');
			break;	
		default:
			return $("#calendarioOtros").is(':checked');
			break;
	} 
	
}

function procesarGenero(genero){
		switch(genero){
			case '1':
				return 	false;
				break;
			case '2':
				return 	$("#masculino").is(':checked');
				break;
			case '3':
				return 	$("#femenino").is(':checked');
				break;	
			case '4':
				return 	$("#mixto").is(':checked');
				break;	
			default: 
				return false;
				break
		}
		
}

function procesarNivel(nivel){
	var niveles = nivel.split(",");
	var valores = 0
	for(i =0; i<niveles.length; i++){
		valores+= niveles[i]; 
	}
	
	if(valores == 0){
		return false;
	}else{
		return true;
	}
	
}

function procesarTasas (filtroTasas, codigo){
	var contadorTasas = 0;  	
}
           
           
function todosLossitios(sitioini){
	if($("#botonTodos").css("background-color")=="rgb(1, 180, 237)"){
		var id = "botonTodos";
	}else if(sitioini.SECTOR ==	"1"){
		var id = "botonOficiales";
	}else if(sitioini.SECTOR ==	"2"){
		var id = "botonNoOficiales";
	}else{
		var id = "";
	}
	
	
	
	if(id != "" && $("#" + id + "").css("background-color")=="rgb(1, 180, 237)"){
	if(sitioini.SECTOR == "1"){
		icon = "imagenes/oficial.png";
	}else if(sitioini.SECTOR == "2"){
		icon = "imagenes/no-oficial.png";
	}
	
	if(sitioini.COD_COL == CodsedeActiva)
	{
		icon = "imagenes/seleccionado.png";  
	}
	
	var icono = {url: icon};
						
	var iconoiniPano = {url: icon,
		scaledSize: new google.maps.Size(200, 200),
		point: new google.maps.Point(0,0),
		point: new google.maps.Point(0, 0)
	};
						
	var lati = parseFloat(sitioini.LATITUD.replace(",","."));
	var longi = parseFloat(sitioini.LONGITUD.replace(",","."));					
	var myLatlng = new google.maps.LatLng(lati,longi);

	var markerPlaceini = new google.maps.Marker({
		icon: icono, 
		position: myLatlng,
		map: map,
		sector: sitioini.SECTOR,
		codigo: sitioini.COD_COL
	});
		
			
	markerPlaceini.setIcon(icon);					
	markerPlaceini.setTitle(sitioini.NOM_COL);
	markersSitiosini.push(markerPlaceini);
	
	
	if(sitioini.SECTOR == "1"){
		markerClusterOf.addMarker(markerPlaceini);
	}else if(sitioini.SECTOR == "2"){
		markerClusterNOf.addMarker(markerPlaceini);
	}
	
	google.maps.event.addListener(markerPlaceini, "click", function(){
		escogerSede(sitioini);
	});				
	
	var x1 = new google.maps.LatLng(markerLatLngIni.lat(),markerLatLngIni.lng());	
	var x2 = new google.maps.LatLng( myLatlng.lat(),myLatlng.lng());
	var distancia = Math.round(google.maps.geometry.spherical.computeDistanceBetween(x1, x2));				
	colegiosfound.push([distancia,sitioini.COD_COL,sitioini.NOM_COL, sitioini.DIR_COL, sitioini.COD_LOCAL, sitioini.SCANOMBRE, sitioini.SECTOR, sitioini.GENERO]);
	distanfound.push(distancia);
	}
}

function escogerSede(sitioini){
	if(infoPlaceini != null){
		infoPlaceini.close();
	}
	favorito = false; 
	jActiva = "";
	codsedeActiva = sitioini.COD_COL;				
	markersArrayRuta[1] = myLatlng;
							
	var lati = parseFloat(sitioini.LATITUD.replace(",","."));
	var longi = parseFloat(sitioini.LONGITUD.replace(",","."));					
	var myLatlng = new google.maps.LatLng(lati,longi);
	destinlat = myLatlng.lat();
	destinlon = myLatlng.lng();				
							
	var x1 = new google.maps.LatLng(markerLatLngIni.lat(),markerLatLngIni.lng());	
	var x2 = new google.maps.LatLng( myLatlng.lat(),myLatlng.lng());	
	var distancia = Math.round(google.maps.geometry.spherical.computeDistanceBetween(x1, x2));
							
	cargarinfo(sitioini.COD_COL);
	posicionSedeActual = myLatlng;
	if(cercaHabilitado == true){
		sitiosCerca(myLatlng);
		$("#barraCercaAtuSede").show(anima)
		$("#seleccioneSede").hide();
		$("#barraCercaAtuSede").show(anima);
		$("#seleccioneSede").hide();
		$("#lugaresCercanos").show(anima);
		$("#auxiliar2").show(anima);
		$("#distanciaCerca").show(anima);
		$("#nombreSedeCerca").show();
		$("#nombreCercaA").hide(anima);
		$("#flechaDespliegue").hide(anima);
	}
	
	if(datossesion != "" && datossesion != undefined){
					$("#colegioFavorito").show();
					var documento = cambiaraNumeroDoc(datossesion.tipodocumento)
					url = "http://geoportal.dane.gov.co/wssicole/favoritos.php?operacion=consultar&tipo_documento=" + documento +"&numero_documento=" + datossesion.cedula  + "&codigo_sede=" + codsedeActiva;
					d3.json(encodeURI(url), function(error, data) {
						if (data.favorito == true){
							$("#estrellaColegioFavorito").css("background-image", "url(imagenes/agregado.png)");
							$("#agregarColegioFavorito").text("Agregado a favoritos");
							favorito = true;  
						}else if (data.favorito == false){
							$("#estrellaColegioFavorito").css("background-image", "url(imagenes/agregar.png)");
							$("#agregarColegioFavorito").text("Agregar a favoritos");
							favorito = false;  
						}						
					});				
				}else{
					$("#colegioFavorito").hide();
					
				}
				

}


function mostrarSitioIni2(sitioini, filtroTasas, todos , posicion){

	var uricalidad2 = "http://geoportal.dane.gov.co/wssicole/serviciocalidad.php?codigosede=" + sitioini.COD_COL;
	var uriaprobacion = "http://geoportal.dane.gov.co/wssicole/servicioeficiencia.php?tipotasa=aprobacion&codigoies=" + sitioini.COD_COL;
	var urireprobacion = "http://geoportal.dane.gov.co/wssicole/servicioeficiencia.php?tipotasa=reprobacion&codigoies=" + sitioini.COD_COL;
	var uridesercion = "http://geoportal.dane.gov.co/wssicole/servicioeficiencia.php?tipotasa=desercion&codigoies=" + sitioini.COD_COL;
	var uritransferencia = "http://geoportal.dane.gov.co/wssicole/servicioeficiencia.php?tipotasa=transferencia&codigoies=" + sitioini.COD_COL;
	
	d3.json(uricalidad2, function(error, data1){
	d3.json(uriaprobacion, function(error, aprobacion){
	d3.json(urireprobacion, function(error, reprobacion){
	d3.json(uridesercion, function(error, desercion){
	d3.json(uritransferencia, function(error, transferencia){


	var porceest = sitioini.EST_DOC,
		mapaJornadas = true,
		calendario = true,
		genero = true,
		filtroPreescolar = false,
		filtroPrimaria = false,
		filtroSecundaria = false,
		filtroMedia = false,
		filtroNivel = false,
		numeroTasas = 0,
		puntaje = data1[0]["PUNTAJE_PROMEDIO_PORSEDE"];
	if(porceest == null){
		porceest = 0;
	}
	
	if(puntaje == ""){
		if($( "#slider-range" ).slider( "values" )[0] == 0 && $( "#slider-range" ).slider( "values" )[1] == 1 ){
			puntaje = 0;
		}else{
			puntaje = -1;
		}	
	}else{
		puntaje = parseFloat(puntaje.replace(",", "."));
	}
	
	
	porceest = parseInt(porceest);	
	// Bandera es true cuando no se está inicializando la aplicación.
	if(bandera!=false){
		mapaJornadas = procesarJornada(sitioini.JORNADA);
		calendario = procesarCalendario (sitioini.ETIQUETA);
		if($("#masculino").is(':checked') && $("#femenino").is(':checked') && $("#mixto").is(':checked')){
				filtroNivel = true;
		}else{
			genero = procesarGenero(sitioini.GENERO);
		}

		if($("#preescolar").is(':checked') && $("#primaria").is(':checked') && $("#secundaria").is(':checked') && $("#media").is(':checked')){
			filtroNivel = true;
		}else{
			
			if($("#preescolar").is(':checked')){
				filtroPreescolar = procesarNivel(sitioini.PREESCOLAR);
			}
			if($("#primaria").is(':checked')){
				filtroPrimaria = procesarNivel(sitioini.PRIMARIA);
				
			}
			if($("#secundaria").is(':checked')){
				filtroSecundaria = procesarNivel(sitioini.SECUNDARIA);
			}
			if($("#media").is(':checked')){
				filtroMedia = procesarNivel(sitioini.MEDIA);
				
			}
			if(filtroPreescolar == true || filtroPrimaria == true || filtroSecundaria == true || filtroMedia == true){
				filtroNivel = true;
			
			}else{
				filtroNivel = false;
			}
		}
		for(i =0;i< filtroTasas.length; i++){
			var nivel = filtroTasas[i].nivel.toUpperCase(),
				tasa = filtroTasas[i].nombre.toUpperCase(),
				valorSlider = $("#" + filtroTasas[i].nombre + filtroTasas[i].nivel).val(),
				variable = 0;
			switch(filtroTasas[i].nombre){
				case "Aprobacion":
					variable = aprobacion;
					break;
				
				case "Reprobacion":
					variable = reprobacion;
					break;
				
				case "Desercion":
					variable = desercion;
					break;
				
				case "Transferencia":
					variable = transferencia;
					break;	
			}
			
			variable = variable[0]["" + tasa + "_" + nivel + ""];
			if(variable == "NO APLICA"){
				variable = 2;
			}else{
				variable = parseFloat(variable.replace(",", "."));
			}
			if(variable<= filtroTasas[i].valor){
				numeroTasas++;
			}
			
		}
		
	}else{
		filtroNivel = true;
	}
	if(porceest <= $("#numeroEstudiantes1").val() ){
		
		if(puntaje >= $( "#slider-range" ).slider( "values" )[0] && puntaje <= $( "#slider-range" ).slider( "values" )[1] && numeroTasas == filtroTasas.length){ 
			if(mapaJornadas == true && calendario == true && genero == true && filtroNivel == true){ 
				
				if($('#Oficial').is(':checked')){ 
					if(sitioini.SECTOR == "1"){
						
						icon = "imagenes/oficial.png";
						if(sitioini.COD_COL == CodsedeActiva)
						{
							icon = "imagenes/seleccionado.png";  
						}
						var iconoofi = {url: icon};
						
						var iconoiniPano = {url: icon,
							scaledSize: new google.maps.Size(200, 200),
							point: new google.maps.Point(0,0),
							point: new google.maps.Point(0, 0)
						};
						
						var lati = parseFloat(sitioini.LATITUD.replace(",","."));
						var longi = parseFloat(sitioini.LONGITUD.replace(",","."));
						
						var myLatlng = new google.maps.LatLng(lati,longi);

						var markerPlaceini = new google.maps.Marker({
							icon: iconoofi, 
							position: myLatlng,
							map: map,
							sector: sitioini.SECTOR,
							codigo: sitioini.COD_COL
						});
						
						markerPlaceini.setIcon('imagenes/oficial.png');					
						markerPlaceini.setTitle(sitioini.NOM_COL);
						markersSitiosini.push(markerPlaceini);
						markerClusterOf.addMarker(markerPlaceini);
						
						google.maps.event.addListener(markerPlaceini, "click", function(){
							escogerSede(sitioini)
						});
						
						var x1 = new google.maps.LatLng(markerLatLngIni.lat(),markerLatLngIni.lng());	
						var x2 = new google.maps.LatLng( myLatlng.lat(),myLatlng.lng());
						var distancia = Math.round(google.maps.geometry.spherical.computeDistanceBetween(x1, x2));
						
						colegiosfound.push([distancia,sitioini.COD_COL,sitioini.NOM_COL, sitioini.DIR_COL, sitioini.COD_LOCAL, sitioini.SCANOMBRE, sitioini.SECTOR, sitioini.GENERO]);
						distanfound.push(distancia);
						
					}
				}
				if($('#NoOficial').is(':checked')){ 
					
					if(sitioini.SECTOR == "2"){
				
						urlicononoofi = "./imagenes/no-oficial.png";
						if(sitioini.COD_COL == CodsedeActiva)
						{
							urlicononoofi = "imagenes/seleccionado.png";  
						}	
						
						
						var iconoofi = {url: urlicononoofi};
						
						var iconoiniPano = {url: urlicononoofi,
							scaledSize: new google.maps.Size(200, 200),
							point: new google.maps.Point(0,0),
							point: new google.maps.Point(0, 0)
						};
					
					
						var lati = parseFloat(sitioini.LATITUD.replace(",","."));
						var longi = parseFloat(sitioini.LONGITUD.replace(",","."));
						
						var myLatlng = new google.maps.LatLng(lati,longi);

						var markerPlaceini = new google.maps.Marker({
							icon: iconoofi, 
							position: myLatlng,
							map: map,
							sector: sitioini.SECTOR,						
							codigo: sitioini.COD_COL
						});
						
						

						markerPlaceini.setIcon('./imagenes/no-oficial.png');					
						markerPlaceini.setTitle(sitioini.NOM_COL);
						markersSitiosini.push(markerPlaceini);
						markerClusterNOf.addMarker(markerPlaceini);
						
			google.maps.event.addListener(markerPlaceini, "click", function(){
				escogerSede(sitioini)				
			});
						
						var x1 = new google.maps.LatLng(markerLatLngIni.lat(),markerLatLngIni.lng());	
						var x2 = new google.maps.LatLng( myLatlng.lat(),myLatlng.lng());
						var distancia = Math.round(google.maps.geometry.spherical.computeDistanceBetween(x1, x2));
						
						colegiosfound.push([distancia,sitioini.COD_COL,sitioini.NOM_COL, sitioini.DIR_COL, sitioini.COD_LOCAL, sitioini.SCANOMBRE, sitioini.SECTOR, sitioini.GENERO]);
						distanfound.push(distancia);				
				}
			
			}
			
			
		}
	
	}
	
}else{
}	
	if(todos == posicion){
		sitiosCercanos();
		
	}
		
	
	});
	});
	});
	});
	});
	
}

function mostrarSitioIni3(sitioini){
	
	var i = 0;
	urliconoofi = "./imagenes/oficial.png";
	urlicononoofi = "./imagenes/no-oficial.png";
	
	var iconoofi = {url: urliconoofi};
	var icononoofi = {url: urlicononoofi};

	var iconoiniPano = {url: urliconoofi,
		scaledSize: new google.maps.Size(200, 200),
		point: new google.maps.Point(0,0),
		point: new google.maps.Point(0, 0)
	};

	var lati = parseFloat(sitioini.LATITUD.replace(",","."));
	var longi = parseFloat(sitioini.LONGITUD.replace(",","."));
	
	var myLatlng = new google.maps.LatLng(lati,longi);

	var bangalore = { 
		lat: lati,
		lng: longi
	};	
	
	var markerPlaceini = new google.maps.Marker({
		icon: iconoofi, 
		position: myLatlng,
		map: map,
		sector: sitioini.SECTOR,		
		codigo: sitioini.CODIGO_SEDE
	});

	if(sitioini.SECTOR == "OFICIAL"){
		markerPlaceini.setIcon('./imagenes/oficial.png');
		markerClusterOf.addMarker(markerPlaceini);
	}
	if(sitioini.SECTOR == "NO OFICIAL"){
		markerPlaceini.setIcon('./imagenes/no-oficial.png');
		markerClusterNOf.addMarker(markerPlaceini);
	}
	
	markerPlaceini.setTitle(sitioini.NOMBRE_SEDE);
	markersSitiosini.push(markerPlaceini);
	
	google.maps.event.addListener(markerPlaceini, "click", function(){
		escogerSede(sitioini);
	});
	
	var x1 = new google.maps.LatLng(markerLatLngIni.lat(),markerLatLngIni.lng());	
	var x2 = new google.maps.LatLng( myLatlng.lat(),myLatlng.lng());
	var distancia = Math.round(google.maps.geometry.spherical.computeDistanceBetween(x1, x2));
	
	colegiosfound.push([distancia,sitioini.CODIGO_SEDE,sitioini.NOMBRE_SEDE, sitioini.DIRECCION, sitioini.LOCALIDAD, sitioini.BARRIO, sitioini.SECTOR, sitioini.GENERO_POBLACION_ATENDIDA]);
	distanfound.push(distancia);
}

function Regresar() {
			historial_navegacion--;
			$("#flechaDespliegue").hide(anima);
			enCalcularSitios = false;
			//$("#busquedaPopup").hide();
			$("#infocolepar").hide();
			$("#infocolepardist").hide();
			$("#isocronas").hide();
			$("#barramenu").hide();		
			$("#barrafiltro").hide();
			$("#abajobotones").show();
			$("#botonmapas").show();
			$("#botonmostrar").show();
			$("#barraSesion").hide(anima);
			mostrarPaneles();
			
			renderer.setMap(null);
			$("#desde_distancia").val("");
			$("#hasta_distancia").val("");
			$("#infocoledistancia").html();
			markerOrigen.setMap(null);
			markerDestino.setMap(null);
			setGeoBuscadores();

			setMiUbicacion();
			
			var ruteodiv = $('#infocoledist .divpresent');
			
			for(i=0; i < ruteodiv.length; i++){
				ruteodiv[i].style.backgroundImage = "-moz-linear-gradient(top, #ffffff, #cbcbcb)";
				ruteodiv[i].style.backgroundImage = "-ms-linear-gradient(top, #ffffff, #cbcbcb)";
				ruteodiv[i].style.backgroundImage = "-o-linear-gradient(top, #ffffff, #cbcbcb)";
				ruteodiv[i].style.backgroundImage = "-webkit-gradient(linear, center top, center bottom, from(#ffffff), to(#cbcbcb))";
				ruteodiv[i].style.backgroundImage = "-webkit-linear-gradient(top, #ffffff, #cbcbcb)";
				ruteodiv[i].style.backgroundImage = "linear-gradient(top, #ffffff, #cbcbcb)";
			}

			for(jr = 0; jr < markersSitiosini.length; jr++){
				if(markersSitiosini[jr].sector == "1" || markersSitiosini[jr].sector == "OFICIAL"){
					markersSitiosini[jr].setIcon('./imagenes/oficial.png');
				}
				if(markersSitiosini[jr].sector == "2" || markersSitiosini[jr].sector == "NO OFICIAL"){
					markersSitiosini[jr].setIcon('./imagenes/no-oficial.png');
				}
			}
			
			//**Reinicia los Sitios Cercanos**//
			$("#infocolecercatitulo").html("Seleccione una sede en el mapa");
            $("#infocolecercatitulo").css("margin-top","35px");
			if(cercaHabilitado == true){
				cerrarCerca();
			}
			if(enFiltro == true){
				cerrarFiltro();
			}
			if(activar == true){
				salirIsocrona();
			}
			if($("#transporteBarra").css("display") == "block"){
			salirTransporte();
		}
}


	
//**  Cargar Info Colegios **//


function sitiosCercanos(){
    
    var contenedorColegios =document.getElementById("contenedorColegiosCercanos");
    var htmlpri = "";
    var imagenSector = "";
    var colorLetras = ""
    htmlpri+= "<div id='tituloColegiosCercanos'>" + nombreTitulo +"</div><div id ='lineaTitulo'></div>";
    if(colegiosfound.length!=0) {
    colegiosfound.sort(function (a,b) {
		if (a[0] > b[0]) return  1;
		if (a[0] < b[0]) return -1;
		return 0;
	});
	
    //$("#tituloColegiosCercanos").text("Instituciones Cercanas");
	
	
	
    for(i=0; i < colegiosfound.length; i++){
        
		
        colegiosfound[i][2] = colegiosfound[i][2].replace("?","Ñ");
        
        if(colegiosfound[i][6]==1 || colegiosfound[i][6]=="OFICIAL"){
            imagenSector = "imagenes/oficial.png";
            colorLetras = "#0A738C";
        }else if (colegiosfound[i][6]==2 || colegiosfound[i][6]=="NO OFICIAL"){
            imagenSector = "imagenes/no-oficial.png"; 
            colorLetras = "#70A12E";
        } 
        
        htmlpri += "<div id = '" + colegiosfound[i][1] + " 'class ='contenedorColegio' onclick='ubicarCentro("+ colegiosfound[i][1] +", "+ colegiosfound[i][0] +")'><div class = 'tipoColegio' style = 'background-image:url(" + imagenSector + ")'></div><div class = 'infoColegio'><h3 style='color:" + colorLetras + "'>" + colegiosfound[i][2] +"</h3><p class ='direccionColegio'>" + colegiosfound[i][3] + "</p><p class = 'distanciaColegio' style='color:" + colorLetras + "'>" + colegiosfound[i][0] +"m</p></div></div>";
    } 
    
    
    contenedorColegios.innerHTML= htmlpri;
    /*setTimeout(function(){
        
        if (contenedorColegios.offsetHeight < contenedorColegios.scrollHeight){
            $("#scrollBajar").show(100);
        } else{
            $("#scrollBajar").hide();
        }
        
    }, 501);*/
	
	} 
    
}

function crearpreview(){
	historial_navegacion = 1;
	for(jr = 0; jr < markersSitiosini.length; jr++){
		if(markersSitiosini[jr].sector == "1" || markersSitiosini[jr].sector == "OFICIAL"){
			markersSitiosini[jr].setIcon('./imagenes/oficial.png');
			}
		if(markersSitiosini[jr].sector == "2" || markersSitiosini[jr].sector == "NO OFICIAL"){
			markersSitiosini[jr].setIcon('./imagenes/no-oficial.png');
		}
	}
	
	$( "#infocolepar" ).empty();
	
	var urlsicole = "https://geoportal.dane.gov.co/v2/images/logo_sicole.png";
	
	var htmlpri = "<div style='height: 150px;width: 100%;'><div id='infocolecab' style='font-family: Arial, Helvetica, sans-serif;font-size: 25px;font-weight: bold;color: #278CA5;text-shadow: 1px 1px 1px rgba(24,63,75,.9);padding-left: 10px;padding-top: 5px;'><strong>Colegios cercanos</strong></div><div id='imgsicole' style='background-color:#E0E0E0;width:90%;height: 100px;background-image:url("+urlsicole+");background-repeat:no-repeat;background-size:50%;'></div></div>";
    
    //<div id='infocole'></div>";
	
	$("#infocolepar").append(htmlpri);
	
	colegiosfound.sort(function (a,b) {
		if (a[0] > b[0]) return  1;
		if (a[0] < b[0]) return -1;
		return 0;
	});
		
	for(i=0; i < colegiosfound.length; i++){
		
		var html = "";		
	
		html += "<div id='"+ colegiosfound[i][1] +"' class='divpresent' style='cursor: pointer; height: 180px; position:relative; overflow: hidden;/* height: 30px; */ padding: 10px; /*-moz-box-shadow: 0px 0px 15px #000000; -webkit-box-shadow: 0px 0px 15px #000000; box-shadow: 0px 0px 15px #000000;*/ background-color: #E0E0E0; /*background-image: -ms-linear-gradient(top, #ffffff, #cbcbcb);background-image: -o-linear-gradient(top, #ffffff, #cbcbcb); background-image: -webkit-gradient(linear, center top, center bottom, from(#ffffff), to(#cbcbcb)); background-image: -webkit-linear-gradient(top, #ffffff, #cbcbcb); background-image: linear-gradient(top, #ffffff, #cbcbcb);*/' onclick='cargarinfo("+ colegiosfound[i][1] +")' >";	
		
		html += "<img src='http://geoportal.dane.gov.co/wssicole/colegio3.php?cod_col="+colegiosfound[i][1]+"' style='height: auto;width: 100%;margin-top: -10px;' onerror='cargarimggene(this)'>";
		
		html += "<div style='bottom: 0px; position: absolute; width: 100%; color: black; padding-top: 5px; background-color: #E0E0E0;'><strong>" + colegiosfound[i][2] + "</strong>";
		
		html += "<div style='margin-top: 2px;'>"+colegiosfound[i][0] + " metros</div>";
		
		html += "</div>";
		
		html += "</div>";
		
		$("#infocole").append(html);
		
		
		var altu = $(window).height() - $("#barrainferior").height(); 
		$("#infocole").css("height", (altu - 150 - 60) + "px"); //"90%"		
		$("#infocole").css("position","static");
		$("#infocole").css("z-index","100");
	}
	
		html = "<div onclick='Regresar()' class='selectoressup' style='cursor:pointer;' >Regresar</div>";
		
		$("#infocolepar").append(html);			
}

//**  Cargar Destino Colegio Específico **//			
function setUbicacionColegio(codcol,dist){
	var ruteodiv = $('#infocoledist .divpresent');
	for(i=0; i < ruteodiv.length; i++){
		ruteodiv[i].style.backgroundImage = "-moz-linear-gradient(top, #ffffff, #cbcbcb)";
		ruteodiv[i].style.backgroundImage = "-ms-linear-gradient(top, #ffffff, #cbcbcb)";
		ruteodiv[i].style.backgroundImage = "-o-linear-gradient(top, #ffffff, #cbcbcb)";
		ruteodiv[i].style.backgroundImage = "-webkit-gradient(linear, center top, center bottom, from(#ffffff), to(#cbcbcb))";
		ruteodiv[i].style.backgroundImage = "-webkit-linear-gradient(top, #ffffff, #cbcbcb)";
		ruteodiv[i].style.backgroundImage = "linear-gradient(top, #ffffff, #cbcbcb)";
	}
	
	for(jr = 0; jr < markersSitiosini.length; jr++){
		if(markersSitiosini[jr].sector == "1" || markersSitiosini[jr].sector == "OFICIAL"){
			markersSitiosini[jr].setIcon('./imagenes/oficial.png');
		}
		if(markersSitiosini[jr].sector == "2" || markersSitiosini[jr].sector == "NO OFICIAL"){
			markersSitiosini[jr].setIcon('./imagenes/no-oficial.png');
		}
	}
	
	uricol = "http://geoportal.dane.gov.co/wssicole/colegio2.php?cod_col="+codcol;
	
	d3.json(uricol, function(error, data) {
		
		
		for(jr = 0; jr < markersSitiosini.length; jr++){
			if(markersSitiosini[jr].codigo == codcol){
				markersSitiosini[jr].setIcon('imagenes/seleccionado.png');
                
			}
		}
		
		var latitud = parseFloat(data[0]["LATITUD"].replace(",", "."));
		var longitud = parseFloat(data[0]["LONGITUD"].replace(",", "."));
		origen = markerini.getPosition();
		destino = new google.maps.LatLng(latitud,longitud);
		
		geocoder.geocode({"latLng": destino}, function(results, status) {
			if (status == google.maps.GeocoderStatus.OK) {
				if (results[0])
				{
					dir = results[0].formatted_address;
					if(estadoOrigen == 1){
						$("#desde_distancia").val(dir);
						markerOrigen.setPosition(destino);
						origen = destino;
					} else {
						$("#hasta_distancia").val(dir);	
						markerDestino.setPosition(destino);
					}
				}
				else
				{
					dir = "<p>No se ha podido obtener ninguna dirección en esas coordenadas.</p>";
					alert(dir);
				}
			}
			else
			{
				dir = "<p>El Servicio de Codificación Geográfica ha fallado con el siguiente error: " + status + ".</p>";
				alert(dir);
			}
			setGeoBuscadores();
		});

	});
	
}

//**  Cargar Origen **//			
function setMiUbicacion(){
	
	geocoder.geocode({"latLng": markerini.getPosition()}, function(results, status) {
		if (status == google.maps.GeocoderStatus.OK) {
			if (results[0])
			{
				dir = results[0].formatted_address;
				if(estadoDestino == 1){
					$("#hasta_distancia").val(dir);
					markerDestino.setPosition(markerini.getPosition());
					origen = markerini.getPosition();
				} else {
					$("#desde_distancia").val(dir);	
					markerOrigen.setPosition(markerini.getPosition());
					destino = markerini.getPosition();
				}
			}
			else
			{
				dir = "<p>No se ha podido obtener ninguna dirección en esas coordenadas.</p>";
				alert(dir);
			}
		}
		else
		{
			dir = "<p>El Servicio de Codificación Geográfica ha fallado con el siguiente error: " + status + ".</p>";
			alert(dir);
		}
		
		setGeoBuscadores();
		
	});

}

function setGeoIsocrona(){
	var latlng = markerini.getPosition();
	geocoder.geocode({"latLng": latlng}, function(results, status) {
		if (results[0])
		{
			dir = results[0].formatted_address;
			$("#ubicacionIsocrona").val(dir);	
		}	
	});
}

function setGeoTransporte(latlng){
	geocoder.geocode({"latLng": latlng}, function(results, status) {
		if (status == google.maps.GeocoderStatus.OK) {
			if (results[0])
			{
				
				dir = results[0].formatted_address;
				
				if(estadoOrigen == 1){
					$("#rutaOrigen").val(dir);
					markerOrigen.setPosition(latlng);
					estadoOrigen = 0;
					origen = latlng;
				} else if(estadoDestino == 1){
					$("#rutaDestino").val(dir);	
					markerDestino.setPosition(latlng);
					estadoDestino = 0;
					destino = latlng;
				}
			}
			else
			{
				dir = "<p>No se ha podido obtener ninguna dirección en esas coordenadas.</p>";
				alert(dir);
			}
		}
		else
		{
			dir = "<p>El Servicio de Codificación Geográfica ha fallado con el siguiente error: " + status + ".</p>";
			alert(dir);
		}
		$(".ubicadorTransporte").css("opacity", "0.5");
		
		if(modoRecorrido != ""&& destino != origen){
			ruta();
		}
	});
	
				
}


function setGeocode(latlng){

	geocoder.geocode({"latLng": latlng}, function(results, status) {
		if (status == google.maps.GeocoderStatus.OK) {
			if (results[0])
			{
				
				dir = results[0].formatted_address;
				if(estadoOrigen == 1){
					$("#desde_distancia").val(dir);
					markerOrigen.setPosition(latlng);
					origen = latlng;
				} else if(estadoDestino == 1){
					$("#hasta_distancia").val(dir);	
					markerDestino.setPosition(latlng);
					destino = latlng;
				}
			}
			else
			{
				dir = "<p>No se ha podido obtener ninguna dirección en esas coordenadas.</p>";
				alert(dir);
			}
		}
		else
		{
			dir = "<p>El Servicio de Codificación Geográfica ha fallado con el siguiente error: " + status + ".</p>";
			alert(dir);
		}
		
		setGeoBuscadores();
		
		if(modoRecorrido != ""&& destino != origen){
			ruta();
		}

	});

}



	
//**  Cargar Info Colegio Específico **//	

function variableTotal(palabra, vector, jornada){
	var mayusculas = palabra.toUpperCase();
	var total = 0; 
	var niveles = ["PREESCOLAR", "PRIMARIA", "SECUNDARIA", "MEDIA"];
	var contadorNumeros = 0,
		total1 =0,
		altoMulticolores = 0;
	for(i =0; i<niveles.length; i++){
		var resultado = cambiarComa(vector[0]["" + mayusculas + "_" + niveles[i]])
		if(isNaN(resultado) == true){
		
		}else{
			total+=resultado;
			contadorNumeros++;			
		}
	}
	if(contadorNumeros == 0){
		contadorNumeros = 1; 
	}
	total = total/contadorNumeros;
	total1 = Math.round(total *100);
	$("#texto" + palabra + jornada).text(total1 + "%");
	altoMulticolores = $("#barraMulticolorTotal").height()*total;
	$("#tasa" + palabra + jornada).height(altoMulticolores + "%");
	return total;
}

function cambiarComa(valor){
	var valor1 = 0
	if(valor == "NO APLICA"){
		valor1 = valor;
	}else{
		valor1 = parseFloat(valor.replace(",", ".")); 
	}

	return valor1
}

function textoinsumo(insumo, total){
	var numero = Math.round(total*insumo);
	var porcentajeInsumo = insumo *100;
	$("#docenteConPosgrado").text(numero + " - " + porcentajeInsumo + "%");
	numero = total - numero;
	porcentajeInsumo = Math.round((numero/total)*100);
	$("#docenteSinPosgrado").text(numero + " - " + porcentajeInsumo + "%");
}		
function cargarinfo(codcol){
	codsedeActiva = codcol;
	$("#errorMulticolor").hide();
	desercionjor = [];
	aprobacionjor = [];
	reprobacionjor = [];
	transferenciajor = [];
	totdoc = [];
	pordoc = [];
	numestdoc = [];
    
	$("#ventanaCategoriasDer").hide(anima);
    $("#preaload").show();
	uricol = "http://geoportal.dane.gov.co/wssicole/colegio2.php?cod_col="+codcol;	
	urisedes = "http://geoportal.dane.gov.co/wssicole/serviciousuario.php?operacion=obtenerSedesHermanas&sededane="+codcol;
	uricali = "http://geoportal.dane.gov.co/wssicole/serviciocalidad.php?codigosede="+codcol;
	console.log(uricol);
	urideser = "http://geoportal.dane.gov.co/wssicole/servicioeficiencia.php?tipotasa=desercion&codigoies="+codcol;
	uriapro = "http://geoportal.dane.gov.co/wssicole/servicioeficiencia.php?tipotasa=aprobacion&codigoies="+codcol;
	urirepro = "http://geoportal.dane.gov.co/wssicole/servicioeficiencia.php?tipotasa=reprobacion&codigoies="+codcol;
	uritrans = "http://geoportal.dane.gov.co/wssicole/servicioeficiencia.php?tipotasa=transferencia&codigoies="+codcol;
	
	uriinsumo = "http://geoportal.dane.gov.co/wssicole/servicioinsumjornadas.php?codigosede="+codcol;
	var uriinsumo1 = "http://geoportal.dane.gov.co/wssicole/servicioinsumos.php?codigosede="+codcol;
	
	uritotal= "http://geoportal.dane.gov.co/wssicole/servicioinsumos.php";
	if(datossesion != "" && datossesion != undefined){
		$("#colegioFavorito").show();
		var documento = cambiaraNumeroDoc(datossesion.tipodocumento)
		url = "http://geoportal.dane.gov.co/wssicole/favoritos.php?operacion=consultar&tipo_documento=" + documento +"&numero_documento=" + datossesion.cedula  + "&codigo_sede=" + codsedeActiva;
								
		d3.json(encodeURI(url), function(error, data) {
			if (data.favorito == true){						
				$("#estrellaColegioFavorito").css("background-image", "url(imagenes/agregado.png)");
				$("#agregarColegioFavorito").text("Agregado a favoritos");
				favorito = true;  
			}else if (data.favorito == false){
				$("#estrellaColegioFavorito").css("background-image", "url(imagenes/agregar.png)");
				$("#agregarColegioFavorito").text("Agregar a favoritos");
				favorito = false;  
			}						
		});				
	}else{
		$("#colegioFavorito").hide();
	}
	
	d3.json(urisedes, function(error, sedestota) { 
	
	d3.json(uricali, function(error, cali) { 
		if(cali[0]["PUNTAJE_PROMEDIO_PORSEDE"] == ""){
			valorCalidad = false;
		}else{
			var valor2 = parseFloat(cali[0]["PUNTAJE_PROMEDIO_PORSEDE"].replace(",", "."));
			if(isNaN(valor2)){
				valor2 = 0;
			}
			var anchoBarra = ((parseFloat(valor2)-0.39)/0.61)*100
			$("#estadoSaber").width(anchoBarra + "%");
			$("#clasificacionSaber").text(cali[0]["CLASIFICACION_SEDE"])
			$("#porcentajePrueba").text(valor2.toFixed(2)); 
			valorCalidad = true;
			
		}
		
	});
	d3.json(urideser, function(error, deser) { 
					
		d3.json(uriapro, function(error, apro) { 
						
			d3.json(urirepro, function(error, repro) { 
						
				d3.json(uritrans, function(error, trans) { 
					
					desercionjor.push(variableTotal("Desercion",deser, ""));
					aprobacionjor.push(variableTotal("Aprobacion",apro, ""));
					reprobacionjor.push(variableTotal("Reprobacion",repro,""));
					transferenciajor.push(variableTotal("Transferencia",trans, ""));	
					if($("#textoDesercion").text() == "0%" && $("#textoReprobacion").text() == "0%" && $("#textoAprobacion").text() == "0%" && $("#textoTransferencia").text() == "0%")
					{
						$("#errorMulticolor").show();
						$(".seccionMulticolor").hide();
					}
					
				});
			});
		});
	});
	d3.json(uriinsumo1, function(error, insumo4) {
		d3.json(uriinsumo, function(error, insumoJornada) {
			var total =	0;
			var insumo1 = parseFloat(insumo4[0]["PORCENTAJE_DOCENTES_POSTGRADO"].replace(",", "."));
			pordoc.push(insumo1);
			numestdoc.push(parseFloat(insumo4[0]["NUMERO_ESTUDIANTES_DOCENTE"].replace(",",".")));
			for(i=0; i<insumoJornada.length; i++){
				total+= parseFloat(insumoJornada[i]["TOTAL_DOCENTES"].replace(",","."));
				pordoc.push(parseFloat(insumoJornada[i]["PORCENTAJE_DOCENTES_POSTGRADO"].replace(",",".")));
				numestdoc.push(parseFloat(insumoJornada[i]["NUMERO_ESTUDIANTES_DOCENTE"].replace(",",".")));
			}
			totdoc.push(total);

			for(i=0; i<insumoJornada.length; i++){
				totdoc.push(parseFloat(insumoJornada[i]["TOTAL_DOCENTES"].replace(",",".")));
			}
			
				llenarDonaRecursos(0,color1Dona);
				numeroEstuPorProfe(0);
			
		})
	});		
										
	d3.json(uricol, function(error, data) {
		if(data.length!=0){
			$("#nombreSedeCerca").html(data[0]["NOM_COL"]);
            lat = data[0]['LATITUD'];
			longi = data[0]['LONGITUD']
			latcor = lat.replace(",",".");
			longcor = longi.replace(",",".");
			var latitud = parseFloat(latcor);
			var longitud = parseFloat(longcor);
			var ubicacion = { lat: latitud, lng: longitud};
			map.setCenter(ubicacion);
			latitud =latitud-0.0023;
			ubicacion = { lat: latitud, lng: longitud};
			map.setCenter(ubicacion);
			for(jr = 0; jr < markersSitiosini.length; jr++){								
                if(markersSitiosini[jr].getTitle() == data[0]["NOM_COL"] ){
					markersSitiosini[jr].setIcon('imagenes/seleccionado.png');
				}
                else{
                    if(markersSitiosini[jr].sector == "1" || markersSitiosini[jr].sector == "OFICIAL"){
						markersSitiosini[jr].setIcon('imagenes/oficial.png');
					}
					if(markersSitiosini[jr].sector == "2" || markersSitiosini[jr].sector == "NO OFICIAL"){
						markersSitiosini[jr].setIcon('imagenes/no-oficial.png');						
					}
                }							
			}
										obtnerjornadasalumnos(data);
										for(i = 0;i < jorna.length; i++){
											jor[i] = invertirjornada(jorna[i]);
										}		
										var contjor = 0;		
										for(i = 0;i < jorna.length; i++){
											var nombre = jorna[i].replace(" ","");
											nombre = nombre.replace(" ", "");
											uriefijorna = "http://geoportal.dane.gov.co/wssicole/servicioeficienjornada.php?tipotasa=todastasas&codigoies="+codcol+"&codigojornada="+jor[i];
											d3.json(uriefijorna, function(error, datajor) {
												
												desercionjor.push(variableTotal("Desercion",datajor, ""));
												aprobacionjor.push(variableTotal("Aprobacion",datajor, ""));
												reprobacionjor.push(variableTotal("Reprobacion",datajor,""));
												transferenciajor.push(variableTotal("Transferencia",datajor, ""));	
												
												contjor++;
												
												if( contjor == jorna.length){
                                                    setTimeout(crearInfoColegio(data, sedestota), 2000);
															
												}	
												
												if($("#infocolecerca").css("display") == "block") {
													$("#infoColeEsp").hide(anima);
												
												}else{
													$("#infoColeEsp").show(anima);
													map.setZoom(16);
												}
                                                
												
											});
										}
										
									}
									});
									
								});	
}
function activarJornadas(){
    
    for(i=0; i < jorna.length; i++){
		switch (jorna[i]){
            case "MAÑANA" : 
                $("#MANANA").css("opacity","1");  
                $("#MANANA .imagenSelectores").css("background-image","url(imagenes/manana.png)");     
            break;  
                
            case "TARDE" : 
                $("#TARDE").css("opacity","1");  
                $("#TARDE .imagenSelectores").css("background-image","url(imagenes/tarde.png)");     
            break;     
            
            case "NOCHE" : 
                $("#NOCHE").css("opacity","1");  
                $("#NOCHE .imagenSelectores").css("background-image","url(imagenes/noche.png)");     
            break;    
                
            case "COMPLETA" : 
                $("#COMPLETA").css("opacity","1");  
                $("#COMPLETA .imagenSelectores").css("background-image","url(imagenes/completa.png)");     
            break;
        
            case "FIN DE SEMANA" : 
                $("#FINDESEMANA").css("opacity","1");  
                $("#FINDESEMANA .imagenSelectores").css("background-image","url(imagenes/sab-fes.png)");     
            break;
                
            default:
            break;    
        
                
        }
    }
    
}
function cerrarInfocole(){
				jActiva = "";
                $("#infoColeEsp").hide();
                $("#popUpFotoCole").hide(anima);
                $(".selectores").removeClass("botonPresionado").css("opacity","0.6");
                $("#manana .imagenSelectores").css("background-image","url(imagenes/mananad.png)");
                $("#tarde .imagenSelectores").css("background-image","url(imagenes/tarded.png)");
                $("#noche .imagenSelectores").css("background-image","url(imagenes/noched.png)");
                $("#completa .imagenSelectores").css("background-image","url(imagenes/completad.png)"); 
                $("#finDeSemana .imagenSelectores").css("background-image","url(imagenes/sab-fesd.png)"); 
                $("#uno img").attr("src","imagenes/1.png");
                $("#dos img").attr("src","imagenes/2.png");
                $("#tres img").attr("src","imagenes/3.png");
                $("#cuatro img").attr("src","imagenes/4.png");
                $("#cinco img").attr("src","imagenes/5.png");
                auxiliarCategoria = 1;
				
                $(".nivelesPorJornada").hide();
				$(".contenidoIdentificacion").hide();
    
                for(jr = 0; jr < markersSitiosini.length; jr++){
                    if(markersSitiosini[jr].sector == "1" || markersSitiosini[jr].sector == "OFICIAL"){
			             markersSitiosini[jr].setIcon('./imagenes/oficial.png');
			         }
		              if(markersSitiosini[jr].sector == "2" || markersSitiosini[jr].sector == "NO OFICIAL"){
			             markersSitiosini[jr].setIcon('./imagenes/no-oficial.png');
		              }
	           }
}

function cargarinfor(categoria){
   coloresSecciones("#318DA6", "#CDEAFB");
    var auxiliarCategoria = categoria;
    var auxiliarJornadas = 0;
    $("#MANANA .imagenSelectores").css("background-image","url(imagenes/mananad.png)");
    $("#TARDE .imagenSelectores").css("background-image","url(imagenes/tarded.png)");
    $("#NOCHE .imagenSelectores").css("background-image","url(imagenes/noched.png)");
    $("#COMPLETA .imagenSelectores").css("background-image","url(imagenes/completad.png)"); 
    $("#FINDESEMANA .imagenSelectores").css("background-image","url(imagenes/sab-fesd.png)"); 
    $(".contenidoIdentificacion").hide();
    $(".selectores").removeClass("botonPresionado").css("opacity","0.6");
    if(categoria!=1 && categoria !=3){
      activarJornadas(); 
	  jornadaActivada();
    }
   $(".campodetextos .nombreBoton").css("border-bottom", "none").css("color", "black");
   $(".contenidoIdentificacion").hide();
	if(auxiliarCategoria != 1 && auxiliarCategoria != 3){
		jornadaActivada();
	}
	switch(auxiliarCategoria){
        case 1: 
            $("#contenidoIdentificacion").show();
            $("#uno .nombreBoton").css("border-bottom", "2px solid rgba(182,19,78,1)").css("color", "rgba(182,19,78,1)");
			$("#tituloIdentificacion").text("Identificación");
            break;
        case 2: 
			$("#contenidoCaracteristicas").show();
			$("#dos .nombreBoton").css("border-bottom", "2px solid rgba(182,19,78,1)").css("color", "rgba(182,19,78,1)");
			$("#tituloIdentificacion").text("Características");
			break;
		case 3:
			$("#tres .nombreBoton").css("border-bottom", "2px solid rgba(182,19,78,1)").css("color", "rgba(182,19,78,1)");
			$("#tituloIdentificacion").text("Calidad");
			if(valorCalidad == true){
				$("#contenidoCalidad").show();
			}else{
				$("#contenidoCalidad").hide();
				$("#contenidoCalidad1").show();
			}	
			break;
		case 4: 
            $("#contenidoEficiencia").show();
            $("#cuatro .nombreBoton").css("border-bottom", "2px solid rgba(182,19,78,1)").css("color", "rgba(182,19,78,1)");
            $("#tituloIdentificacion").text("Eficiencia interna");
			break;
		case 5: 
            $("#contenidoRecursos").show();
            $("#cinco .nombreBoton").css("border-bottom", "2px solid rgba(182,19,78,1)").css("color", "rgba(182,19,78,1)");
            $("#tituloIdentificacion").text("Recursos");
			break;	
        default:
            break;
    }
	
}

function cargarcarac(){
	$("#coleinfo").hide();
	$("#colecara").show();
	$("#colecali").hide();
	$("#coleefici").hide();
	$("#coleinsumos").hide();
	$("#coletama").hide();
	cargarjornadas();
	$("#uno img").attr("src","imagenes/1d.png");
	$("#dos img").attr("src","imagenes/2.png");
	$("#tres img").attr("src","imagenes/3d.png");
	$("#cuatro img").attr("src","./imagenes/4d.png");
	$("#cinco img").attr("src","./imagenes/5d.png");
	$("#seis img").attr("src","./imagenes/6d.png");
	$("#siete img").attr("src","./imagenes/7d.png");
	$("#ocho img").attr("src","./imagenes/8d.png");
	$("#nueve img").attr("src","./imagenes/9d.png");
	$("#diez img").attr("src","./imagenes/10d.png");
   cambiarColor("#FFF","#349EC4");
    aux=$('#completa');
    changerCouleur(aux,"#FFF","#cbcbcb");
    aux=$('#manana');
    changerCouleur(aux,"#FFF","#cbcbcb");
    aux=$('#tarde');
    changerCouleur(aux,"#FFF","#cbcbcb");
    aux=$('#noche');
    changerCouleur(aux,"#FFF","#cbcbcb");
    aux=$('#sab-fes');
    changerCouleur(aux,"#FFF","#cbcbcb");
}

function cambiarColor(color,color1){
    
        $(".titulo5").css("background-color",color)
        $(".titulo5 h1").css("color",color1);
                                                                                                                           
}

function cambiarTipoJornadas(aux,aux1,aux2,aux3,aux4){
    changerCouleur(aux,"#bcbcbc","#969696");
    changerCouleur(aux1,"#FFF","#cbcbcb");
    changerCouleur(aux2,"#FFF","#cbcbcb");
    changerCouleur(aux3,"#FFF","#cbcbcb");
    changerCouleur(aux4,"#FFF","#cbcbcb");
}

function cargarcali(){
	$("#coleinfo").hide();
	$("#colecara").hide();
	$("#colecali").show();
	$("#coleefici").hide();
	$("#coleinsumos").hide();
	$("#coletama").hide();
	$("#uno img").attr("src","./imagenes/1d.png");
	$("#dos img").attr("src","./imagenes/2d.png");
	$("#tres img").attr("src","./imagenes/3.png");
	$("#cuatro img").attr("src","./imagenes/4d.png");
	$("#cinco img").attr("src","./imagenes/5d.png");
	$("#seis img").attr("src","./imagenes/6d.png");
	$("#siete img").attr("src","./imagenes/7d.png");
	$("#ocho img").attr("src","./imagenes/8d.png");
	$("#nueve img").attr("src","./imagenes/9d.png");
	$("#diez img").attr("src","./imagenes/10d.png");
    cambiarColor("#FFF","#349EC4");
    aux=$('#completa');
    changerCouleur(aux,"#FFF","#cbcbcb");
    aux=$('#manana');
    changerCouleur(aux,"#FFF","#cbcbcb");
    aux=$('#tarde');
    changerCouleur(aux,"#FFF","#cbcbcb");
    aux=$('#noche');
    changerCouleur(aux,"#FFF","#cbcbcb");
    aux=$('#sab-fes');
    changerCouleur(aux,"#FFF","#cbcbcb");
}

function cargarefic(){
	$("#coleinfo").hide();
	$("#colecara").hide();
	$("#colecali").hide();
	$("#coleefici").show();
	$("#coleinsumos").hide();
	$("#coletama").hide();
	$("#uno img").attr("src","./imagenes/1d.png");
	$("#dos img").attr("src","./imagenes/2d.png");
	$("#tres img").attr("src","./imagenes/3d.png");
	$("#cuatro img").attr("src","./imagenes/4.png");
	$("#cinco img").attr("src","./imagenes/5d.png");
	$("#seis img").attr("src","./imagenes/6d.png");
	$("#siete img").attr("src","./imagenes/7d.png");
	$("#ocho img").attr("src","./imagenes/8d.png");
	$("#nueve img").attr("src","./imagenes/9d.png");
	$("#diez img").attr("src","./imagenes/10d.png");
    cargareficiencia();
      cambiarColor("#FFF","#349EC4");
      aux=$('#completa');
      changerCouleur(aux,"#FFF","#cbcbcb");
      aux=$('#manana');
      changerCouleur(aux,"#FFF","#cbcbcb");
      aux=$('#tarde');
      changerCouleur(aux,"#FFF","#cbcbcb");
      aux=$('#noche');
      changerCouleur(aux,"#FFF","#cbcbcb");
      aux=$('#sab-fes');
      changerCouleur(aux,"#FFF","#cbcbcb");
}

function cargarinsu(){
	$("#coleinfo").hide();
	$("#colecara").hide();
	$("#colecali").hide();
	$("#coleefici").hide();
	$("#coleinsumos").show();
	$("#coletama").hide();
	$("#uno img").attr("src","./imagenes/1d.png");
	$("#dos img").attr("src","./imagenes/2d.png");
	$("#tres img").attr("src","./imagenes/3d.png");
	$("#cuatro img").attr("src","./imagenes/4d.png");
	$("#cinco img").attr("src","./imagenes/5.png");
	$("#seis img").attr("src","./imagenes/6d.png");
	$("#siete img").attr("src","./imagenes/7d.png");
	$("#ocho img").attr("src","./imagenes/8d.png");
	$("#nueve img").attr("src","./imagenes/9d.png");
	$("#diez img").attr("src","./imagenes/10d.png");
      cambiarColor("#FFF","#349EC4");
      aux=$('#completa');
      changerCouleur(aux,"#FFF","#cbcbcb");
      aux=$('#manana');
      changerCouleur(aux,"#FFF","#cbcbcb");
      aux=$('#tarde');
      changerCouleur(aux,"#FFF","#cbcbcb");
      aux=$('#noche');
      changerCouleur(aux,"#FFF","#cbcbcb");
      aux=$('#sab-fes');
      changerCouleur(aux,"#FFF","#cbcbcb");
    cargarinsumos();
}

function cargartama(){
	$("#coleinfo").hide();
	$("#colecara").hide();
	$("#colecali").hide();
	$("#coleefici").hide();
	$("#coleinsumos").hide();
	$("#coletama").show();
	$("#uno img").attr("src","./imagenes/1d.png");
	$("#dos img").attr("src","./imagenes/2d.png");
	$("#tres img").attr("src","./imagenes/3d.png");
	$("#cuatro img").attr("src","./imagenes/4d.png");
	$("#cinco img").attr("src","./imagenes/5d.png");
	$("#seis img").attr("src","./imagenes/6.png");
	$("#siete img").attr("src","./imagenes/7d.png");
	$("#ocho img").attr("src","./imagenes/8d.png");
	$("#nueve img").attr("src","./imagenes/9d.png");
	$("#diez img").attr("src","./imagenes/10d.png");
      cambiarColor("#FFF","#349EC4");
    aux=$('#completa');
    changerCouleur(aux,"#FFF","#cbcbcb");
    aux=$('#manana');
    changerCouleur(aux,"#FFF","#cbcbcb");
    aux=$('#tarde');
    changerCouleur(aux,"#FFF","#cbcbcb");
    aux=$('#noche');
    changerCouleur(aux,"#FFF","#cbcbcb");
    aux=$('#sab-fes');
    changerCouleur(aux,"#FFF","#cbcbcb");
}

function cargarmasinfo(){
	$("#uno").hide();
	$("#dos").hide();
	$("#tres").hide();
	$("#cuatro").hide();
	$("#cinco").hide();
	$("#info1").hide();
	$("#seis").show();
	$("#siete").show();
	$("#ocho").show();
	$("#nueve").show();
	$("#diez").show();
	$("#info2").show();
}

function cargarmasinfo2(){
	$("#uno").show();
	$("#dos").show();
	$("#tres").show();
	$("#cuatro").show();
	$("#cinco").show();
	$("#info1").show();
	$("#seis").hide();
	$("#siete").hide();
	$("#ocho").hide();
	$("#nueve").hide();
	$("#diez").hide();
	$("#info2").hide();
}

function traerdesercion(jornada, nivel){
	for(h = 0; h < jorna.length; h++){
		if(jorna[h] == jornada){
			return desercionjor[h][nivel];
		}
	}
	return "NO APLICA";
}

function traerreprobacion(jornada, nivel){
	for(h = 0; h < jorna.length; h++){
		if(jorna[h] == jornada){
			return reprobacionjor[h][nivel];
		}
	}
	return "NO APLICA";
}

function traeraprobacion(jornada, nivel){
	for(h = 0; h < jorna.length; h++){
		if(jorna[h] == jornada){
			return aprobacionjor[h][nivel];
		}
	}
	return "NO APLICA";
}

function traertranferencia(jornada, nivel){
	for(h = 0; h < jorna.length; h++){
		if(jorna[h] == jornada){
			return transferenciajor[h][nivel];
		}
	}
	return "NO APLICA";
}

function traertotaldocentes(jornada){
	for(h = 0; h < jorna.length; h++){
		if(jorna[h] == jornada){
			return parseFloat(totdoc[h]);
		}
	}
	return "NO APLICA";
}

function traerporcentaje(jornada){
	for(h = 0; h < jorna.length; h++){
		if(jorna[h] == jornada){
			if(pordoc[h] != undefined){
				return parseFloat(pordoc[h].replace(",",".")) + "%";	
			}
			else{
					return "";
			}			
		}
	}
	return "NO APLICA";
}

function traerestudiantesdocentes(jornada){
	for(h = 0; h < jorna.length; h++){
		if(jorna[h] == jornada){
			return parseFloat(numestdoc[h]);
		}
	}
	return "NO APLICA";
}

function traerpre(entrada){
	var cont = 0;
	for(i = 0; i < entrada.length; i++){
		if(entrada[i] != "0"){
			cont++;
		}		
	}
	if(cont != 0){
		return "<pre style='padding-left: 10px;'>PREESCOLAR</pre>";
	}	
	else{
		return "";
	}
}

function traerpri(entrada){
	var cont = 0;
	for(i = 0; i < entrada.length; i++){
		if(entrada[i] != "0"){
			cont++;
		}		
	}
	if(cont != 0){
		return "<pre style='padding-left: 10px;'>PRIMARIA</pre>";
	}	
	else{
		return "";
	}
}

function traersec(entrada){
	var cont = 0;
	for(i = 0; i < entrada.length; i++){
		if(entrada[i] != "0"){
			cont++;
		}		
	}
	if(cont != 0){
		return "<pre style='padding-left: 10px;'>SECUNDARIA</pre>";
	}	
	else{
		return "";
	}
}

function traermed(entrada){
	var cont = 0;
	for(i = 0; i < entrada.length; i++){
		if(entrada[i] != "0"){
			cont++;
		}		
	}
	if(cont != 0){
		return "<pre style='padding-left: 10px;'>MEDIA</pre>";
	}	
	else{
		return "";
	}
}

function devolverSi(entrada){
	if(entrada == "0" || entrada == 0){
		return "NO";
	}
	if(entrada == "1" || entrada == 1){
		return "SI";
	}
}

function nombrelocalidad(entrada){
	if(entrada == "1" || entrada == 1){
		return "USAQUÉN";
	}
	if(entrada == "2" || entrada == 2){
		return "CHAPINERO";
	}
	if(entrada == "3" || entrada == 3){
		return "SANTA FE";
	}
	if(entrada == "4" || entrada == 4){
		return "SAN CRISTÓBAL";
	}
	if(entrada == "5" || entrada == 5){
		return "USME";
	}
	if(entrada == "6" || entrada == 6){
		return "TUNJUELITO";
	}
	if(entrada == "7" || entrada == 7){
		return "BOSA";
	}
	if(entrada == "8" || entrada == 8){
		return "KENNEDY";
	}
	if(entrada == "9" || entrada == 9){
		return "FONTIBÓN";
	}
	if(entrada == "10" || entrada == 10){
		return "ENGATIVA";
	}
	if(entrada == "11" || entrada == 11){
		return "SUBA";
	}
	if(entrada == "12" || entrada == 12){
		return "BARRIOS UNIDOS";
	}
	if(entrada == "13" || entrada == 13){
		return "TEUSAQUILLO";
	}
	if(entrada == "14" || entrada == 14){
		return "LOS MÁRTIRES";
	}
	if(entrada == "15" || entrada == 15){
		return "ANTONIO NARIÑO";
	}
	if(entrada == "16" || entrada == 16){
		return "PUENTE ARANDA";
	}
	if(entrada == "17" || entrada == 17){
		return "CANDELARIA";
	}
	if(entrada == "18" || entrada == 18){
		return "RAFAEL URIBE";
	}
	if(entrada == "19" || entrada == 19){
		return "CIUDAD BOLÍVAR";
	}
	if(entrada == "20" || entrada == 20){
		return "SUMAPÁZ";
	}
	return "";
}

/* Inicio de Sicole */

function ocultarPaneles(){
	$("#infocolepar").hide();
	$("#barramenu").hide();
    $("#menuDesplegableDer").hide(anima);
    $("#menuDesplegableIzq").hide(anima);
    $("#menuDesplegableAbajo").hide(anima);    
	$("#busquedaPopup").hide(anima);
}

function mostrarPaneles(){
	$("#infocolepar").hide();
	$("#barramenu").hide();
    $("#menuDesplegableDer").show(anima);
    $("#menuDesplegableIzq").show(anima);
    $("#ventanaCategoriasIzq").hide(anima); 
    $("#ventanaCategoriasDer").hide(anima);
    $("#busquedaPopup").show();
    if($("#ventanaCategoriasAbajo").css("display")=="none"){
        $("#menuDesplegableAbajo").show(anima);
    }
    $("#cabezote1").hide();
	
	/*if($("#busqueda").css("display")== "block"){
		$("#contenidoBusqueda").hide(anima);
		$("#busqueda h2").css("text-align", "center").css("margin-bottom", "-1%");
		$("#flechaDespliegue").show(anima)	*/
	//}
	if($("#transporteBarra").css("display") == "block"){
		$("#transporteRanges").hide(anima);
		$("#nombreTransporte").show(anima);
		$("#flechaDespliegue").show(anima);
	}
	
	if(activar == true){
		$("#nombreIsocronas").show(anima);
		$("#isocronasInputs").hide(anima);
		$("#flechaDespliegue").show(anima)
	}
	
	if(cercaHabilitado == true){
		$("#nombreIsocronas").show(anima);
		$("#isocronasInputs").hide(anima);
		$("#flechaDespliegue").show(anima)
	}
}

	
$(document).ready(function () {
    
	//$.mobile.loading("hide"); 
	/*$( document ).on( "mobileinit", function() {
		$.mobile.loader.prototype.options.disabled = true;
	});*/
	
	$( "#slider-range" ).slider({
		range: true,
		min: 0,
		max: 1,
		step: 0.1,
		values: [ 0, 1 ],
		slide: function( event, ui ) {
			ubicarIndicador1(ui.values[0],"profes1Output", ui.values[1])
			ubicarIndicador1(ui.values[1],"profes2Output", ui.values[0])
		 }		
	});
	
	$(".derechosEncuestas").text("*Basada en Ávila Martínez, A.F., Broomberg Zilberstein, P., Pérez Salazar Estupiñan, B. Villamil Peñaranda, M.E., Velásquez Lasprilla, A., & Ortiz Fernánfez, M.J. (2015). Clima escolar y victimización en Bogotá 2013: encuesta de convivencia escolar.")
	totalCalidad= ((totalCalidad-0.39)/0.61)*100;  
	$("#IndicadorTotal").css("margin-left", totalCalidad + "%");
	$("#Oficial").prop( "checked", true);
    $("#NoOficial").prop( "checked", true);
	var anch = $(window).width();
	var altu = $(window).height() - $("#barrasuperior").height() - $("#barrainferior").height();
	//var direc;
	var inicio, fin;
	if(anch <= 700){ 
        ocultarPaneles();
		$("#infocolepar").css("top", (altu - 50) + "px"); //"90%"
		//$("#infocolepar").css("height", (altu) + "px"); 
		$("#infocolepardist").css("height", (altu) + "px"); 
		$("#menuInicial").css("height", (altu - 67) + "px"); 
		isMobile = true;		
		$("#infocolepar").draggable({
			containment: "#moveInHere",
			disabled: false,
			axis: "y",
			start: function( event, ui ) {
				
				inicio = ui.position.top;					
			},
			stop: function(event, ui) {
				fin = ui.position.top;
				if(inicio < fin){
					var altu = $(window).height() - $("#barrasuperior").height() - $("#barrainferior").height();
					$("#infocolepar").css("top", (altu - 50) + "px");
				}
				else{
					$("#infocolepar").css("top","0%");
				}
					
			}
		});	
	}
	else{
		$("#infocolepar").css("top", "0px"); 
		isMobile = false;
		$("#infocolepar").draggable({ disabled: true });
        
        
	}
/*	
	$( "#infocolepar" ).mouseover(function() {
		map.setOptions({draggable: false});	
	});
	$( "#infocolepar" ).mouseout(function() {
		map.setOptions({draggable: true});			
	});
*/	
	$("#infocolepardist").css("height", (altu) + "px"); 
	$("#menuInicial").css("height", (altu - 67) + "px"); 
	$("#infraestructuraVentana").css("height", ($(window).height() - $("#encabezadoInstitucion").height() - 21 - 40 - $("#barrainferior").height()) + "px"); 
	$("#convivenciaEscolar").css("height", ($(window).height() - $("#encabezadoInstitucion").height() - 21 - 40 - $("#barrainferior").height()) + "px");
	$("#asistenciaDocente").css("height", ($(window).height() - $("#encabezadoInstitucion").height() - 21 - 40 - $("#barrainferior").height()) + "px");
	$("#transporteFormulario").css("height", ($(window).height() - $("#encabezadoInstitucion").height() - 21 - 40 - $("#barrainferior").height()) + "px");
	
	
	$("#infocolecab").click(function(){		
		var altu = $(window).height() - $("#barrasuperior").height() - $("#barrainferior").height(); 
		if($("#infocolepar").css("top") == "0px"){
			$("#infocolepar").css("top", (altu - 50) + "px");
		}
		else{
			$("#infocolepar").css("top","0px");
		}
	});
	
	
	$("#RegresarButton").click(function (event) {
		historial_navegacion--;
		//$("#busquedaPopup").hide();
		$("#infocolepar").hide();
		$("#barramenu").hide();
		$("#barrafiltro").hide();
		$("#abajobotones").show();
		$("#botonmapas").show();
		$("#botonmostrar").show();
	});
	
	$("#botonmostrar").click(function (event) {
          if($(window).width()>700){
            estadoini = 1;     
          }
          
		$("#infocolepar").show();
		$("#barramenu").hide();
		$("#abajobotones").hide();
		$("#botonmapas").hide();
		historial_navegacion++;
	});	
	
	$("#botongps").click(function (event) {
		map.setCenter(centroInicial);
		markerini.setPosition(map.getCenter());
	});
	
	
	
	
	
	$("#busquedaSicole").click(function (event) {

		//$("#busquedaPopup").hide();
		$("#busqueda").show();
		$("#contenidoBusqueda").show(anima);
		$("#busqueda h2").css("text-align", "left").css("margin-bottom", "0%");
		$("#flechaDespliegue").hide(anima);
		$("#ventanaCategoriasDer").hide();
        $("#logoBusqueda").css("background-image","url(imagenes/si_ico.png)")
		$("#inputBusqueda").hide();
		$("#inputBusqueda2").show();
		$("#ventanaTipoBusqueda").hide(anima);
		$("#busquedaPopup").css("z-index","1100");
        //uriTipoBusqueda = "http://geoportal.dane.gov.co/wssicole/serviciobusqueda.php?palabrasclave=";
		historial_navegacion++;
		if($("#transporteBarra").css("display") == "block"){
			salirTransporte();
		}
	
		if(activar == true){
			salirIsocrona();
		}
		
		if(cercaHabilitado == true){
			cerrarCerca();
		}
	});

    
    $("#menuHamburguesa").click(function(){
		
        if($("#barraSesion").css("display")=="none"){
			$("#barraSesion").show(anima);
			ocultarPaneles();
			historial_navegacion++;
			$("#cabezote1").show();
			cerrarTodos();
			$("#encabezadoInstitucion").hide(anima);
			$("#movilesFormulario");
			$("#menuInicial").show(anima);
			$("#cambiarmapa").show(anima);
			$("#barraSesion").css("width", "70%");
			$("#divFavoritos").hide();
		} else {
			if($("#movilesFormulario").css("display")!= "block"){
				$("#barraSesion").hide(anima);
				mostrarPaneles();
			}else{
				$("#barraSesion").show(anima);
				ocultarPaneles();
				historial_navegacion++;
				$("#cabezote1").show();
				cerrarTodos();
				$("#encabezadoInstitucion").hide(anima);
				$("#movilesFormulario");
				$("#menuInicial").show(anima);
				$("#cambiarmapa").show(anima);
				$("#barraSesion").css("width", "70%");
			}
			
		}	
    }); 
	
	
	
	
	$("#regresar").click(function (event) {
		mostrarPaneles();
		historial_navegacion--;
	});
	
	/*$("#buttonaceptar").click(function (event) {
        
        
        $("#preaload").show();
        
		lugaresCercanos();
		historial_navegacion--;
        map.setCenter(markerini.getPosition());
        
        estadoini = 1; 
        mostrarPaneles();
	});	*/
	
	$('#buscar').click(function(){
		busquedaavanzada();
		$("#preaload").show();
		$("#busquedaPopup").css("z-index","100");
	});
	
	$('#limpiar').click(function(){
		$("#clave").val("")
		$("#codigo").val("")
		$('#Publico').attr('checked', false);
		$('#Privado').attr('checked', false);
		$('#localidad').val(0);
		$('#barrio').val("")
		$('#Masculino').attr('checked', false);
		$('#Femenino').attr('checked', false);
		$('#Mixto').attr('checked', false);
	});
	
	

	//**********//
	
	$("#cambiarmapa").click(function (event) {
		if($("#textonmapa").html() == "Mapa por Defecto"){
			map.setMapTypeId(google.maps.MapTypeId.ROADMAP);
			$("#imagenmapa").attr("src","./imagenes/satelital.png")
			$("#textonmapa").html("Mapa Satelital")
		}
		else{
			if($("#textonmapa").html() == "Mapa Satelital"){
				map.setMapTypeId(google.maps.MapTypeId.SATELLITE);
				$("#imagenmapa").attr("src","./imagenes/normal.png")
				$("#textonmapa").html("Mapa por Defecto")
			}
		}
		//map.setMapTypeId(google.maps.MapTypeId.ROADMAP);
	});	
	
	$("#cambiartrafico").click(function (event) {
		if($("#textontrafico").html() == "Ocultar Tráfico"){
			trafficLayerMapType.setMap(null);
			if($("#textonmapa").html() == "Mapa por Defecto"){
				map.setMapTypeId(google.maps.MapTypeId.SATELLITE);
			}
			$("#imagentrafico").attr("src","imagenes/satelital.png")
			$("#textontrafico").html("Mostrar Tráfico")
		}
		else{
			if($("#textontrafico").html() == "Mostrar Tráfico"){
				trafficLayerMapType.setMap(map);
				map.setMapTypeId(google.maps.MapTypeId.ROADMAP);
				$("#imagentrafico").attr("src","imagenes/normal.png")
				$("#textontrafico").html("Ocultar Tráfico")
			}
		}
	});
	
	
	
	
	
	
	
	
    $( "#slider" ).slider({ 
      value: 500,
      min: 100,
      max: 1000,
      step: 50,
      slide: function( event, ui ) {
        $( "#area" ).html( "Área de Influencia - " + ui.value + " m" );
		radioarea = ui.value;
		distanciaGuiar = radioarea;  
      }
    });
    $( "#slider_tot" ).slider({ 
      value: 6668,
      min: 0,
      max: 6668,
      step: 10,
      slide: function( event, ui ) {
        $( "#area_tot" ).html( "Total Matriculados 0 - " + ui.value);
		radio_tot = ui.value;
      }
    });  

	$( "#slider_est" ).slider({ 
	  range: true,
      min: 0,
      max: 100,
	  values: [ 0, 100 ],
      slide: function( event, ui ) {
        $( "#area_est" ).html( "Estudiantes por docente " + ui.values[ 0 ] + "- " + ui.values[ 1 ] );
		radio_est1 = ui.values[ 0 ];
		radio_est2 = ui.values[ 1 ];
      }
    });
   
});

$( window ).resize(function () {
	var anch = $(window).width();
	var altu = $(window).height() - $("#barrasuperior").height() - $("#barrainferior").height();
    
    estilosParteInferior();
		
		if(anch <= 700){ 
		$("#menuInicial").css("height", (altu - 67) + "px"); 
		$("#infocolepardist").css("height", (altu) + "px"); 	    
		isMobile = true;				
		$("#infocolepar").draggable({
			containment: "#moveInHere",
			disabled: false,
			axis: "y",
			start: function( event, ui ) {
				
				inicio = ui.position.top;					
			},
			stop: function(event, ui) {
				fin = ui.position.top;
				if(inicio < fin){
					var altu = $(window).height() - $("#barrasuperior").height() - $("#barrainferior").height();
					$("#infocolepar").css("top", (altu - 50) + "px");
				}
				else{
					$("#infocolepar").css("top","0%");
				}
					
			}
		});  
        if($("#busquedaPopup").css("display")=="block"||$("#infocolepar").css("display")=="block"||$("#barramenu").css("display")=="block"||$("#barrafiltro").css("display")=="block"){
            
        }
        else{
            
            //ocultarPaneles();
        }    
	}
	else{
		$("#infocolepar").css("top", "0px"); //"90%"
		isMobile = false;
		$("#infocolepar").draggable({ disabled: true });
		$("#infocolepardist").css("height", (altu) + "px"); 
		$("#menuInicial").css("height", (altu - 67) + "px"); 
        
        if($("#busquedaPopup").css("display")=="block"||$("#infocolepar").css("display")=="block"||$("#barramenu").css("display")=="block"||$("#barrafiltro").css("display")=="block"){
            
        }
        else{
            
            mostrarPaneles();
        }
	}
});

/* Funcion de ordenamiento */

function sortNumber(a,b) {
    return a - b;
}


/* Funcion imagen generica */

function cargarimggene(image){
    image.onerror = "";
    image.src = "imagenes/generica.jpg";
    return true;
}



/* Funcion Zoom */

var zoomFluid, zoomCoords;   //shared variables

function zoomTo(){
    zoomFluid = map.getZoom();            //Updates shared zoom var;
    map.panTo(centroInicial);  
    //console.log(zoomFluid);
    if(zoomFluid >= 15) {
		setTimeout(function(){
			$("#infocolepar").hide();
			$("#busquedaPopup").show();
			$("#barrabotones").show();
			$("#botonmapas").show();
			$("#botonmostrar").show();
			$("#sicoleimagen").fadeOut( "slow" );
			$("#daneimagen").fadeOut( "slow" );
            $("#cabezote").show(anima);
            $("#cabezote").css("display","flex");
            $("#busquedaPopup").show(anima);
            $(".menusDesplegables").show(anima);
			if($(window).height>700){
                mostrarPaneles();
            }
			
		}, 500);
		return 0;
	}
    else {
         zoomFluid = zoomFluid + 3;
         map.setZoom(zoomFluid);
         setTimeout("zoomTo()", 250);
    }
}




function MasControl(controlDiv, map) {

	// Set CSS for the control border.
	var controlUI = document.createElement('div');
	controlUI.id = 'SumaMap';
	controlUI.style.backgroundColor = '#fff';
	controlUI.style.border = '2px solid #fff';
	controlUI.style.borderRadius = '3px';
	controlUI.style.boxShadow = '0 2px 6px rgba(0,0,0,.3)';
	controlUI.style.cursor = 'pointer';
	controlUI.style.marginBottom = '22px';
	controlUI.style.textAlign = 'center';
	controlUI.title = 'Click to Zoom in map';
	controlDiv.appendChild(controlUI);

	// Set CSS for the control interior.
	var controlText = document.createElement('div');
	controlText.style.color = 'rgb(25,25,25)';
	controlText.style.fontFamily = 'Roboto,Arial,sans-serif';
	controlText.style.fontSize = '16px';
	controlText.style.lineHeight = '38px';
	controlText.style.paddingLeft = '5px';
	controlText.style.paddingRight = '5px';
	controlText.innerHTML = '+';
	controlUI.appendChild(controlText);

	// Setup the click event listeners: simply set the map to Chicago.
	controlUI.addEventListener('click', function() {
		map.setZoom((map.getZoom()+1));
	});
}


function MenosControl(controlDiv, map) {

	// Set CSS for the control border.
	var controlUI = document.createElement('div');
	controlUI.id = 'MenosMap';
	controlUI.style.backgroundColor = '#fff';
	controlUI.style.border = '2px solid #fff';
	controlUI.style.borderRadius = '3px';
	controlUI.style.boxShadow = '0 2px 6px rgba(0,0,0,.3)';
	controlUI.style.cursor = 'pointer';
	controlUI.style.marginBottom = '22px';
	controlUI.style.textAlign = 'center';
	controlUI.title = 'Click to Zoom out map';
	controlDiv.appendChild(controlUI);

	// Set CSS for the control interior.
	var controlText = document.createElement('div');
	controlText.style.color = 'rgb(25,25,25)';
	controlText.style.fontFamily = 'Roboto,Arial,sans-serif';
	controlText.style.fontSize = '16px';
	controlText.style.lineHeight = '38px';
	controlText.style.paddingLeft = '5px';
	controlText.style.paddingRight = '5px';
	controlText.innerHTML = '-';
	controlUI.appendChild(controlText);

	// Setup the click event listeners: simply set the map to Chicago.
	controlUI.addEventListener('click', function() {
		map.setZoom((map.getZoom()-1));
	});
}

function SliderControl(controlDiv, map) {

	// Set CSS for the control border.
	var controlUI = document.createElement('div');
	controlUI.id = 'sliderzoom';
	controlUI.style.backgroundColor = '#fff';
	controlUI.style.border = '2px solid #fff';
	controlUI.style.borderRadius = '3px';
	controlUI.style.boxShadow = '0 2px 6px rgba(0,0,0,.3)';
	controlUI.style.cursor = 'pointer';
	controlUI.style.marginBottom = '22px';
	controlUI.style.textAlign = 'center';
	controlUI.title = 'Click to Zoom out map';
	controlDiv.appendChild(controlUI);


	// Setup the click event listeners: simply set the map to Chicago.
	controlUI.addEventListener('click', function() {
		map.setZoom((map.getZoom()-1));
	});
}

function centrar(){   
		/*if (markerLatLngIni != null) {
			centroInicial = markerLatLngIni;		
		}*/
		map.setCenter(centroInicial);
}

function obtnerjornadasalumnos(data){
		
	jorna = [];
	prima = [];
	prees = [];
	secun = [];
	media = [];
	total = [];
	
	jorna = data[0]["JORNADA"].split(",");
	prees = data[0]["PREESCOLAR"].split(",");
	prima = data[0]["PRIMARIA"].split(",");
	secun = data[0]["SECUNDARIA"].split(",");
	media = data[0]["MEDIA"].split(",");
	total = data[0]["TOTAL_MATRICULADOS"].split(",");

	
	for(i=0; i < jorna.length; i++){
		jorna[i] = obtenerjornada(jorna[i]);
		prees[i] = parseFloat(prees[i]);
		prima[i] = parseFloat(prima[i]);
		secun[i] = parseFloat(secun[i]);
		media[i] = parseFloat(media[i]);
		total[i] = parseFloat(total[i]);
	}
}



function promediodoc(insumo){
	var asd = 0;
	for(j = 0; j < insumo.length; j++){
		asd +=  parseFloat(insumo[j]["TOTAL_DOCENTES"]);
	}
	return asd;
}

function promedioporce(insumo){
	var asd = 0;
	for(j = 0; j < insumo.length; j++){
		asd +=  parseFloat(insumo[j]["PORCENTAJE_DOCENTES_POSTGRADO"].replace(",",".")*100);
	}
	if(asd/insumo.length != 0){
		return (asd/insumo.length) + "%";
	}
	else{
		return "0%";
	}
}

function promedionum(insumo){
	var asd = 0;
	for(j = 0; j < insumo.length; j++){
		asd +=  parseFloat(insumo[j]["NUMERO_ESTUDIANTES_DOCENTE"]);
	}
	return Math.round(asd/insumo.length);
}

function convertirtasa(entrada){
	if(entrada != "NO APLICA"){
		asd = entrada.replace(",",".");
		if(parseFloat(Math.round(asd * 100) / 100)*100 != 0){
			return (parseFloat(Math.round(asd * 100) / 100)*100).toFixed(2) + "%";
		}
		else{
			return "0%";
		}		
	}
	else{
		return entrada;
	}
}

function obtenerjornada(entrada){
	if(entrada == "1"){
		return "COMPLETA";
	}
	if(entrada == "2"){
		return "MAÑANA";
	}
	if(entrada == "3"){
		return "TARDE";
	}
	if(entrada == "4"){
		return "NOCTURNA";
	}
	if(entrada == "5"){
		return "FIN DE SEMANA";
	}
}

function invertirjornada(entrada){
	if(entrada == "COMPLETA"){
		return "1";
	}
	if(entrada == "MAÑANA"){
		return "2";
	}
	if(entrada == "TARDE"){
		return "3";
	}
	if(entrada == "NOCTURNA"){
		return "4";
	}
	if(entrada == "FIN DE SEMANA"){
		return "5";
	}
}

function obtenergenero(entrada){
	if(entrada == "1"){
		return "NO INFORMA";
	}
	if(entrada == "2"){
		return "HOMBRES";
	}
	if(entrada == "3"){
		return "MUJERES";
	}
	if(entrada == "4"){
		return "MIXTO";
	}	
	return entrada;
}

function obtenersector(entrada){
	if(entrada == "1"){
		return "OFICIAL";
	}
	if(entrada == "2"){
		return "NO OFICIAL";
	}
	return entrada;
}

function traerestudiantes (entrada){
	var numjor = -1;
	for(i=0; i < jorna.length; i++){
		if (jorna[i] == entrada){
			numjor = i;
            return total[numjor];
		}
	}
	return 0;
}

function verificar(entrada){
	if(entrada == null || entrada == "null"){
		return "";
	}else{
		return entrada;
	}
}

function Cargarmarcador(){
	var aux = $("#marcador").attr("class");
	//aux.substring(1,aux.length);
	cargarinfo(aux.substring(1));	
}

function busquedaavanzada(){
	var url = "http://geoportal.dane.gov.co/wssicole/serviciobusqueda.php?";
	var codigo = $("#codigo").val();
	var clave = $("#inputBusqueda2").val();
	if (clave != ""){
		url += "palabrasclave=" + clave.toUpperCase();
	}
	if(codigo != ""){
		url += "&codigosede=" + codigo;
	}
	
	
	if(codigo != ""){
		url += "&codigosede=" + codigo;
	}
	if($('#Publico').is(':checked') && $('#Privado').is(':checked') ){
		url += "&sector=todos";
	}
	else{
		if($('#Publico').is(':checked')){
			url += "&sector=oficial";
		}
		if($('#Privado').is(':checked')){
			url += "&sector=nooficial";
		}
	}
	var local = $('#localidad').val();
	if(local != "0"){
		url += "&localidad="+local;
		for(i=0;i<centrolocal.length;i++){
			if(centrolocal[i][0] == local){
				centro = new google.maps.LatLng(centrolocal[i][2], centrolocal[i][1]);
				markerini.setPosition(centro);
				map.setCenter(centro);
				openInfoWindowUbicacionIni2(markerini);
			}
		}
	}
	var barrio = $('#barrio').val();
	if(barrio != ""){
		url += "&barrio="+barrio.toUpperCase();
	}	
	if($('#Masculino').is(':checked') && $('#Femenino').is(':checked') && $('#Mixto').is(':checked')){
		url += "&sexo=otros";
	}
	else{
		if($('#Masculino').is(':checked') && $('#Femenino').is(':checked')){
			url += "&sexo=hombresmujeres";
		}
		else{
			if($('#Masculino').is(':checked') && $('#Mixto').is(':checked')){
				url += "&sexo=hombresmixto";
			}
			else{
				if($('#Femenino').is(':checked') && $('#Mixto').is(':checked')){
					url += "&sexo=Femenino";
				}
				else{
					if($('#Masculino').is(':checked')){
						url += "&sexo=hombres";
					}
					else{
						if($('#Femenino').is(':checked')){
							url += "&sexo=mujeres";
						}
						else{
							if($('#Mixto').is(':checked')){
								url += "&sexo=mixto";
							}
						}
					}
				}
			}
		}
	}
	 

	colegiosfound = [];
	distanfound = [];
	inicializarSitiosIni();
	d3.json(url, function(error, data) {
		console.log(data);			
		for (var i = 0; i < data.length; i++) {
			var sitioini = data[i];
			mostrarSitioIni3(sitioini);	  
		}	
		$("#preaload").hide();		
		//crearpreview();	
		//$("#infocolepar").show();
		if(colegiosfound.length == 0) {
			mensaje("¡Error!","No hay resultados para esta búsqueda. Intente de nuevo");
			$("#busqueda").show(anima);
		} else {
			nombreTitulo = "Resultado Búsqueda";
			$("#contenidoBusqueda").hide(anima);
			$("#busqueda h2").css("text-align", "center").css("margin-bottom", "-1%");
			$("#flechaDespliegue").show(anima);
			$("#ventanaTipoBusqueda").hide();
			sitiosCercanos();
			$("#ventanaCategoriasDer").show(anima);
			$("#busqueda").show();
		}
	});
}

function traerestudiantesNivel(entrada){
	var total=0;
    for(i=0;i<entrada.length;i++){
        
        total+=entrada[i];
    }
    return total;
}

function crearInfoColegio (data,sedestota) {
	console.log()
	donaNiveles = [];
    $("#preaload1").hide();
	$("#preaload").hide();
	codigoact = data[0]["COD_COL"];
    var htmlpri = "";
    var localidad= nombrelocalidad(data[0]["COD_LOCAL"]);
	var infoJornadas = [];
	var infoNiveles = [];
	var valorNiveles = 0;
    if(localidad ==""){
        
        localidad = verificar(data[0]["SCANOMBRE"]);
    }
			htmlpri+= '<div class = "subtituloIdenficacion">Nombre de Sede:</div><div id="botonAbrirFoto"><div id="imagenAbrirFoto"></div><div id="textoAbrirFoto"> Abrir Foto</div></div>';
            htmlpri+= "<p style= 'padding-left:0;margin-top: -10px;'>" + data[0]["NOM_COL"].replace("?","Ñ") + "</p><div class = 'subtituloIdenficacion'>Nombre institución educativa:</div><p style= 'padding-left:0'>" + data[0]["NOM_INST"] + "</p><select id='massedes' name='massedes' class='inputAzul' style=' margin-top:6%'><option value='' disabled selected>Más Sedes</option></select><div class ='itemsIdentificacion'><div class = 'subtituloIdenficacion' style='float:left;'>Localidad:&nbsp</div><p>" + localidad + "</p></div><div class ='itemsIdentificacion'><div class = 'subtituloIdenficacion' style='float:left;'>Barrio:&nbsp</div><p>" + verificar(data[0]["SCANOMBRE"]) + "</p></div><div class ='itemsIdentificacion'><div class = 'subtituloIdenficacion' style='float:left;'>Dirección:&nbsp</div><p>" + verificar(data[0]["DIR_COL"]) + "</p></div><div class ='itemsIdentificacion'><div class = 'subtituloIdenficacion' style='float:left;'>Teléfono:&nbsp</div><p>" + verificar(data[0]["TEL_COL"]) +"</p></div><div class ='itemsIdentificacion'><div class = 'subtituloIdenficacion' style='width: 100%; float:left;'>E-mail:&nbsp</div><a href='mailto:" + data[0]["EMAIL"] + "?Subject=Enviar%20correo'target='_top'>" + verificar(data[0]["EMAIL"]) + "</a></div><div class ='itemsIdentificacion'><div class = 'subtituloIdenficacion' style='float:left; padding-bottom: 6%;'>Web:&nbsp</div><a href='http://'" + data[0]["WEB_INST"] + "</a></div>";
            
             $("#contenidoIdentificacion").html(htmlpri).show();
   
            
            //htmlpri= "<div class ='celdaTabla' style= 'margin-top:6%'><p>" + traerestudiantes('MAÑANA') + "</p></div><div class ='celdaTabla'><p>" + traerestudiantes('TARDE') + "</p></div><div class ='celdaTabla'><p>" + traerestudiantes('NOCTURNA') +  "</p></div><div class ='celdaTabla'><p> " + traerestudiantes('COMPLETA') + "</p></div><div class ='celdaTabla' style= 'margin-bottom:2%'><p>" + traerestudiantes('FIN DE SEMANA') +"</p></div>";
    
           // $("#filaIzqJornada").html(htmlpri);
    
			//infoNiveles.push({ "jornada": Preescolar, "population": total[i]});
			
			valorNiveles = traerestudiantesNivel(prees);
			$("#tablaNiveles").html("");
			htmlpri = '<div class = "lineaGraficas"></div><div id = "donaNivel" class= "columnaGraficas"></div><div id = "columnaInfoNiveles" class= "columnaInfo"></div>';
			$("#tablaNiveles").html(htmlpri);
			capturarNiveles(valorNiveles, "Preescolar", "");
			capturarNiveles(traerestudiantesNivel(prima), "Primaria","");
			capturarNiveles(traerestudiantesNivel(secun), "Secundaria","");
			capturarNiveles(traerestudiantesNivel(media), "Media","");
			colorDonut = color1Dona;
			bandera1 = false;
			bandera2 = false;
			if(isNaN(data[0]["TOR_MAT"])){
			}else{
				hacerDona2(donaNiveles, data[0]["TOR_MAT"], "donaNivel");
			}
						
			
		if(data[0]["ETIQUETA"] == "B"|| data[0]["ETIQUETA"] == "A"){
			$("#calendarioColegio").css("font-size", "3.8rem")
		}else{
			$("#calendarioColegio").css("font-size", "1.1rem")
		}
		$("#calendarioColegio").html(data[0]["ETIQUETA"]);
		if(obtenersector(data[0]["SECTOR"])== "OFICIAL"){
			$("#sectorColegio").css("font-size", "1.5rem");
			$("#sectorColegio").html("Oficial");
		}else if(obtenersector(data[0]["SECTOR"])== "NO OFICIAL"){
			$("#sectorColegio").css("font-size", "1.05rem");
			$("#sectorColegio").html("No oficial");
		}
		
		if(obtenergenero(data[0]["GENERO"])=="MIXTO"){
			$("#imagenSexo").css("background-image", "url(imagenes/mixto3.png)")
			$("#imagenSexo1").css("background-image", "url(imagenes/mixto2.png)")
		}else if(obtenergenero(data[0]["GENERO"])=="HOMBRES"){
			$("#imagenSexo").css("background-image", "url(imagenes/hombre1.png)")
			$("#imagenSexo1").css("background-image", "url(imagenes/hombre3.png)")
		}else if(obtenergenero(data[0]["GENERO"])=="MUJERES"){
			$("#imagenSexo").css("background-image", "url(imagenes/mujer1.png)")
			$("#imagenSexo1").css("background-image", "url(imagenes/mujer3.png)")
		}else{
		
		}
        $("#imagenSexo1").hide();
		$("#imagenSexo").show();
        
            
    //$(htmlpri).insertAfter("#tablaNiveles");
	
	
	$("#columnaInfoJornadas").html("");
	donaNiveles = [];
	colorDonut = color2Dona;
	var totalporJornada = data[0]["TOTAL_MATRICULADOS"].split(",");
	for(i=0; i<jorna.length;i++){
        var nombre = jorna[i].replace("Ñ","N");
		var nombre2 = jorna[i].toLowerCase();
		nombre2 = nombre2.charAt(0).toUpperCase() + nombre2.slice(1);
        nombre = nombre.replace(" ","");
		nombre = nombre.replace(" ","");
		//htmlpri = '<div id ="tablaNiveles' + nombre +'" class ="tablacarac"><div class = "lineaGraficas"></div><div id = "donaNivel' + nombre +'" class= "columnaGraficas"></div><div id = "columnaInfoNiveles' + nombre +'" class= "columnaInfo">'
		//$(htmlpri).insertAfter("#tablaNiveles");
		nivelesporJornada(nombre,i);
		htmlpri = '<div id="donaNivel' + nombre+'" class="columnaGraficas" style= "display:none">';
		$(htmlpri).insertAfter("#donaNivel");
		bandera1 = false;
		bandera2 = false;
		if(totalporJornada == 0){
			var error = "<center><p>No se encuetra información</p></center>"
			$("#donaNivel").html(error);
		}else{
			hacerDona2(donaNiveles,totalporJornada[i], "donaNivel"+ nombre);
		
		}
			infoJornadas.push({ "jornada": nombre, "population": total[i]});
		htmlpri = '<div class= "infoDonas">';
		switch(nombre){
			case "MANANA":
				htmlpri+= '<div class = "infoDonasImagen" style = "background-image: url(imagenes/filtromanana.png)"></div>'
				break;
			case "TARDE":
				htmlpri+= '<div class = "infoDonasImagen" style = "background-image: url(imagenes/filtrotarde.png)"></div>'
				break;
			case "NOCHE":
				htmlpri+= '<div class = "infoDonasImagen" style = "background-image: url(imagenes/filtronoche.png)"></div>'
				break;
			case "COMPLETA":
				htmlpri+= '<div class = "infoDonasImagen" style = "background-image: url(imagenes/filtrocontin.png)"></div>'
				nombre2 = "Continua"
				break;
			case "FINDESEMANA":
				htmlpri+= '<div class = "infoDonasImagen" style = "background-image: url(imagenes/filtrosf.png)"></div>'
				nombre2 = "Sábados y festivos"
				break;	
		}
		
		htmlpri+= "<p>" + nombre2 + ": " + total[i] + " est. </p></div>" 
		$("#columnaInfoJornadas").append(htmlpri);
    }
	colorDonut = color1Dona;
	$("#donaJornada").html("");
	bandera1 = false;
	bandera2 = false;
	if(data[0]["TOR_MAT"] != "0"){
		hacerDona(infoJornadas, data[0]["TOR_MAT"]);
	}else{
		var error = "<center><p>No se encuetra información</p></center>"
		$("#donaJornada").html(error);
	}
	cargarinfor(1);
	$("#contenidoIdentificacion").scrollTop( "0" );
        
    
    $("#barraTitulo h1").text(data[0]["NOM_COL"].replace("?","Ñ"));
   
    
    for(i=0; i < sedestota.length; i++){
		$('#massedes').append($('<option>', {
			value: sedestota[i]["CODIGOSEDE"],
			text: sedestota[i]["NOMBRESEDE"]
		}));
	}
    coloresSecciones("#318DA6", "#CDEAFB");
    var urlimg = "http://geoportal.dane.gov.co/wssicole/colegio3.php?cod_col=" + data[0]["COD_COL"];	
    $("#ventanaFotoCole").css("background-image","url(" + urlimg + ")");
    eventosInfo ();
	
	
	$('#massedes').change(function(){
		if($('#massedes').val() != "0" && $('#massedes').val() != codigoact){
			cargarinfo($(this).val());
            var ubicacion = "http://geoportal.dane.gov.co/wssicole/colegio2.php?cod_col=" + $('#massedes').val();
            $("#preaload1").show();
             console.log("Uri ubicacion Mas Sedes:" +ubicacion);
            var ua= navigator.userAgent.toLocaleLowerCase();
            var isAndroid= ua.indexOf("android")>-1
           if(isAndroid){    
                
            }
            else{
                $("#preaload1").show();
		$.getJSON(ubicacion, function(data){
			//*********************************************************************
			//*********************************************************************
			$('#fondo').hide();
			$('#ventana_modal').hide();
			//********************************************************************
			//*********************************************************************
			//datos = data;
			if (data.length > 0)
			{

		    	var lat = "";
		    	var longi = "";
		    	var latcor = "";
		    	var longcor = "";

		    	lat = data[0]['LATITUD'];
		    	longi = data[0]['LONGITUD'];
                latcor = lat.replace(",",".");
		    	longcor = longi.replace(",",".");
                var latitud = parseFloat(latcor);
		    	var longitud = parseFloat(longcor);

		    	var ubicacion = { lat: latitud, lng: longitud};
                infoMarker.close();
                markerGeo.setVisible(false);
               // latitud= latitud-0.0025;
				//ubicacion = { lat: latitud, lng: longitud};
				map.setCenter(ubicacion);
                markerini.setPosition(ubicacion);
                $("#busquedaPopup").hide();
               openInfoWindowUbicacionIni(markerini,cargarinfo(data[pos]['CODIGO_SEDE']));
                
                }else{
                    $("#preaload").hide();
                }
        });
            
            }
            
            
		}
	$("#tablaJornadas").css("display","none");
	$("#tablaNiveles").css("display","none");
	});
	
}

function capturarNiveles(valorNivel, nombre, nivel){
	var htmlpri = ""
	if(valorNivel != 0){
		//htmlN = 
		//$("#columnaInfoNiveles")
		htmlpri = '<div class= "infoDonas">';
		switch(nombre){
			case "Preescolar":
				htmlpri+= '<div class = "infoDonasImagen" style = "background-image: url(imagenes/preescolar.png); border-color: #F39C1F"></div>'
				break;
			case "Primaria":
				htmlpri+= '<div class = "infoDonasImagen" style = "background-image: url(imagenes/primaria.png); border-color: #F39C1F" ></div>'
				break;
			case "Secundaria":
				htmlpri+= '<div class = "infoDonasImagen" style = "background-image: url(imagenes/secundaria.png); border-color: #F39C1F"></div>'
				break;
			case "Media":
				htmlpri+= '<div class = "infoDonasImagen" style = "background-image: url(imagenes/media.png);  border-color: #F39C1F"></div>'
				break;	
		}
		
		htmlpri+= "<p>" + nombre + ": " + valorNivel + " est. </p></div>" 
		$("#columnaInfoNiveles" + nivel + "").append(htmlpri);
		donaNiveles.push({ "jornada": nombre, "population": valorNivel});
	}else{
	
	}
	
}
function nivelesporJornada(nombre, contador){
	donaNiveles = [];
	var htmlpri = '<div class = "columnaInfo" id = "columnaInfoNiveles' + nombre+ '" style = "border-color: rgb(243, 156, 31)">';
	
	$("#columnaInfoNiveles").after(htmlpri);
	capturarNiveles(prees[contador], "Preescolar", nombre);
	capturarNiveles(prima[contador], "Primaria", nombre);
	capturarNiveles(secun[contador], "Secundaria", nombre);
	capturarNiveles(media[contador], "Media", nombre);
}


function validateEmail(email) {
    var re = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return re.test(email);
}

$(document).ready(function () {	
    
	var anch = $(window).width();
	var altu = $(window).height() - $("#barrasuperior").height() - $("#barrainferior").height();
	$("#inputBusqueda").val("");
	
	$("#botonGuardar").click(function (event) {
		urlregistro = "http://geoportal.dane.gov.co/wssicole/serviciousuario.php?operacion=crearusuario";
		clasePerfil = 1;
		if($("#nombres").val() != "" && $("#apellidos").val() != "" && $("#numeroDoc").val() != "" && $('#diaNac').val() != "-" && $('#mesNac').val() != "-" && $('#anoNac').val() != "-" && $("#correo").val() != "" && $("#password").val() != ""){
			if(validateEmail($("#correo").val()) == true && /^[A-Za-z ñÑáÁéÉíÍóÓúÚ]+$/.test($("#nombres").val())==true && /^[A-Za-z ñÑáÁéÉíÍóÓúÚ]+$/.test($("#apellidos").val())==true){
				if($("#password").val() == $("#repassword").val()){
					var uri= "http://geoportal.dane.gov.co/wssicole/serviciousuario.php?operacion=verificarusuario";
					uri+= "&usuario=" + $("#correo").val()
					uri+= "&numero_documento=" + $('#numeroDoc').val(); 	
					d3.json(uri, function(error, data) {
						if(data[1] =="true"){
							var nombres = $("#nombres").val();
							urlregistro += "&nombres=" + nombres;
							var apellidos = $("#apellidos").val();
							urlregistro += "&apellidos=" + apellidos;
							var tipo = $("#tipoDoc").val();
							urlregistro += "&id_tipo="+tipo;
							var numero = $('#numeroDoc').val();
							urlregistro += "&numero_documento="+numero;
							var fecha = $('#diaNac').val() + "-" + $('#mesNac').val() + "-" + $('#anoNac').val();
							urlregistro += "&fecha_nacimiento="+fecha;
							var rol = $('#roles').val();
							urlregistro += "&id_rol="+rol;	
							console.log(rol);
							var usuario = $("#correo").val();				
							urlregistro += "&foto_usuario=" + usuario + ".jpg";
							urlregistro += "&usuario=" + usuario;
							var password = $("#password").val();
							urlregistro += "&clave=" + password;
							$("#nombre").val(usuario);
							cargarformufoto();	
						}else if(data[1]== "false"){
							data[2] = data[2].replace("numero","número");
							data[2] = data[2].replace("nombre de usuario","correo electrónico");
							data[2] = data[2].replace("documento","documento ya");
							mensaje("¡Error!",data[2]);
						}
					});
					
					
				}else{
					mensaje("¡Error!","Los campos contraseña y repetir contraseña deben coincidir");
				
				}
			}else if(validateEmail($("#correo").val()) == false){
				mensaje("¡Error!","Debe ingresar un correo válido");
                //alert("Debe ingresar un correo válido")
                
            }
			else if(/^[A-Za-z ñÑáÁéÉíÍóÓúÚ]+$/.test($("#nombres").val())==false){
				mensaje("¡Error!","Los nombres deben contener sólo letras y espacios en blanco.");
				//alert("Los nombres deben contener sólo letras y espacios en blanco.")
			}
            else if(/^[A-Za-z ñÑáÁéÉíÍóÓúÚ]+$/.test($("#apellidos").val())==false){
				mensaje("¡Error!","Los apellidos deben contener sólo letras y espacios en blanco.");
				//alert("Los apellidos deben contener sólo letras y espacios en blanco.")
			}
		}
		else{
			mensaje("¡Error!","Algún campo está vacío");
			//alert("Algún campo esta vacío");
        }
	 
	});
	
	$("#botonActualizar").click(function (event) {
		urlactualizar = "http://geoportal.dane.gov.co/wssicole/serviciousuario.php?operacion=modificarusuario";
		if($("#formularioActualizar #nombres").val() != "" && $("#formularioActualizar #apellidos").val() != "" && $("#formularioActualizar #numeroDoc").val() != "" && $('#formularioActualizar #diaNac').val() != "-" && $('#formularioActualizar #mesNac').val() != "-" && $('#formularioActualizar #anoNac').val() != "-"){
			if(/^[A-Za-z ñÑáÁéÉíÍóÓúÚ]+$/.test($("#formularioActualizar #nombres").val())==true && /^[A-Za-z ñÑáÁéÉíÍóÓúÚ]+$/.test($("#formularioActualizar #apellidos").val())==true){
				if($("#formularioActualizar #password").val() == $("#formularioActualizar #repassword").val()){
					console.log("Password" + $("#formularioActualizar #password ").val());
					console.log("Password" + $("#formularioActualizar #repassword").val());
					var nombres = $("#formularioActualizar #nombres").val();
					urlactualizar += "&nombres=" + nombres;
					datossesion.nombres = nombres; 
					var apellidos = $("#formularioActualizar #apellidos").val();
					urlactualizar += "&apellidos=" + apellidos;
					datossesion.apellidos = apellidos;
					var tipo = $("#formularioActualizar #tipoDoc").val();
					urlactualizar += "&id_tipo="+tipo;
					datossesion.tipodocumento = tipo;
					var numero = $('#formularioActualizar #numeroDoc').val();
					urlactualizar += "&numero_documento="+numero;
					datossesion.cedula = numero;
					var fecha = $('#formularioActualizar #diaNac').val() + "-" + $('#formularioActualizar #mesNac').val() + "-" + $('#formularioActualizar #anoNac').val();
					urlactualizar += "&fecha_nacimiento="+fecha;
					datossesion.fecha_nacimiento = fecha;
					var rol = $('#formularioActualizar #roles').val();
					datossesion.rolusuario = $('#formularioActualizar #roles :selected').text(); 
					urlactualizar += "&id_rol="+rol;
					var tipoDocumento = cambiarTipo(tipo);
					$("#UsuarioNombre").text(nombres + " " + apellidos);
					$("#rolElegido").text($('#formularioActualizar #roles :selected').text());
					d3.json(encodeURI(urlactualizar), function(error, data) {
						if(data[1] == "true"){
							mensaje("¡Felicitaciones!",data[2]);
							//alert(data[2]);
							
							$("#seccionPerfil #tituloNombre").html(nombres + " " + apellidos);
							$("#seccionPerfil #infoUsuario").empty();
							
							var html = "";
								
							html += "<div id='informacionvisible'>" + $('#formularioActualizar #roles :selected').text() + "<br>";	
							html += datossesion.username + "<br>";
							html += tipoDocumento + "<br>";
							html += $('#formularioActualizar #numeroDoc').val() + "<br>";
							html += $('#formularioActualizar #diaNac').val() + " - " + $('#formularioActualizar #mesNac').val() + " - " + $('#formularioActualizar #anoNac').val() + "<br>";
							html += "</div>";	
							
							
							html += "<div id='actualizarInformacion'>";	
							html += "<img style='position:relative; float:left' src='imagenes/actualizar.png' width='30px'>"
							html += "<h3>Actualizar datos</h3>";
							html += "</div>";

							$("#seccionPerfil #infoUsuario").append(html);	
							
							$("#seccionPerfil").show();
							$("#formularioActualizar").hide();
							$("#botonSalir2").hide();
							
						}
						else{
							mensaje("¡Error!",data[2]);
							//alert(data[2]);
						}
					});
				} else{
					mensaje("¡Error!","Los campos contraseña y repetir contraseña deben coincidir");
				}
			}else if(/^[A-Za-z ñÑáÁéÉíÍóÓúÚ]+$/.test($("#formularioActualizar #nombres").val())==false){
				mensaje("¡Error!","Los nombres deben contener sólo letras y espacios en blanco");
				//alert("Los nombres deben contener sólo letras y espacios en blanco.")
			}else if(/^[A-Za-z ñÑáÁéÉíÍóÓúÚ]+$/.test($("#formularioActualizar #apellidos").val())==false){
				mensaje("¡Error!","Los apellidos deben contener sólo letras y espacios en blanco");
				//alert("Los apellidos deben contener sólo letras y espacios en blanco.")
			}
			
		}
		else{
			mensaje("¡Error!","Algún campo esta vacío");
			//alert("Algún campo esta vacío");
		}
	
	});
    
    
 
	
    
	$("#botonIniciar").click(function (event) {
        
        clicInicial($("#iniciar #usuario").val(), $(" #iniciar #contrasena").val() );
    });
    
	
	
    
function clicInicial(usuario, clave){
		//var url = "http://192.168.0.163/wssicole/serviciousuario.php?operacion=autenticar";
        $(".botonesIniciar").hide();
        $("#preaload").show();
		urlsesion = "http://geoportal.dane.gov.co/wssicole/serviciousuario.php?operacion=autenticar";
		urlsesion += "&login=" + usuario;
		urlsesion += "&clave=" + clave;
		console.log(encodeURI(urlsesion));	
         $(this).prop("disabled",true);
		d3.json(encodeURI(urlsesion), function(error, data) {
			if(data[1] == "true"){
               $("#cambiartrafico").show(anima);
                $("#cambiarmapa").show(anima);
				datossesion = data[3];
				mensaje("¡Felicitaciones!", data[2]);
				$("#menuInicial").show();
				$("#iniciar").hide();
				$("#sesion").hide();
                var nombre = datossesion.nombres.charAt(0).toUpperCase() + datossesion.nombres.slice(1)
                var apellido = datossesion.apellidos.charAt(0).toUpperCase() + datossesion.apellidos.slice(1)
                $("#nombreUsuario").text(nombre + " " + apellido);
                $("#rolElegido").text(datossesion.rolusuario);
                var urlimg = "http://geoportal.dane.gov.co/wssicole/obtenerFotoUsuario.php?documento=" + datossesion.cedula;
		        $('#fotoUsuario').css("background-image", "url("+urlimg+")"); 		
				$("#perfil").show(anima);
				$("#cerrarsesion").show();
				$("#comunidad").show();
				$("#tusede").show();
                $("#favoritos").show();
				$('#infraestructura').removeClass("Activo");
				$('#dotacion').removeClass("Activo");
				$('#convivencia').removeClass("Activo");
				$('#asistencia').removeClass("Activo");
				$('#transporte').removeClass("Activo");
				var urlsede ="http://geoportal.dane.gov.co/wssicole/serviciousuario.php?operacion=obtenerSedesUsuario&numerodoc=" + datossesion.cedula;
				d3.json(urlsede, function(error, data) {
					datossedesession = data;
					sedeActiva = [];
					for(i=0; i < data.length; i++){
                        
						$('#nombreSede').append($('<option>', {
							value: data[i]["CODIGOSEDE"],
							text: data[i]["NOMBRE_SEDE"]
						}));						
						html = '<div class = "colegioAgregado">' + data[i]["NOMBRE_SEDE"] + ' <img id = "actualizarSede' +  data[i]["CODIGOSEDE"] +'" class="imagenControlSede" src="imagenes/actualizar.png" style= "right:13%" onclick= "actualizarfuncion(this.id)"/><img id = "eliminarSede' + data[i]["CODIGOSEDE"] + '" class="imagenControlSede" src="imagenes/eliminar.png" onclick= "eliminarfuncion(this.id)"/></div>';
						$("#sedesAgregadasPerfil").append(html);
						sedeActiva.push(data[i]["CODIGOSEDE"]); 
						$("#seccionPerfil #nombre").val(datossesion.username);	
                        
                       
					}
					console.log("Sedes ")
					console.log(sedeActiva)
					habilitarseccion(datossesion.rolusuario)
                        
                        $("#preaload").hide();
                    
                    // var largo =84 + 25*data.length
                    //$("#seccionPerfil #borde").css("height",largo + "px");
				});
			}
			else{
				mensaje("¡Error!",data[2]);
				$("#contrasena").val("");
                 $(this).prop("disabled",false);
                $("#preaload").hide();
                $(".botonesIniciar").show();
                $("#cambiartrafico").hide();
                $("#cambiarmapa").hide();
			
	}
    });
                }
    
	
	
	
	//****** Busqueda Colegio
	$("#inputBusqueda2").keypress(function(e) {
		$("#busquedaPopup").css("z-index","100");
		if(e.which == 13){
				busquedaavanzada();
		}
	

	
	});
	
	$("#busquedacolegio").keypress(function(e) {
		var palabra = $("#busquedacolegio").val();
		if(e.which == 13) {
			$("#favoritosSede").hide(anima);
			$("#contenedorFavoritos").hide(anima);
			$("#contenedorSedes").show(anima);
			var url = "http://geoportal.dane.gov.co/wssicole/serviciobusqueda.php?";
			var palabra = $("#busquedacolegio").val();
			if(palabra != ""){
				url += "palabrasclave=" + palabra.toUpperCase();
				console.log(url);
			}
			d3.json(url, function(error, data) {
				numerodeSedes = data.length;
				$("#contenedorSedes").empty();
				var html = "";
				var imagenSector = "";
				var colorLetras = "";
				var codigos = [];
				colegiosfound = [];
				distanfound = [];	
		
				for (var i = 0; i < data.length; i++) {
					var sitioini = data[i];
					mostrarCercania2(sitioini);	
				}
				
				if(colegiosfound.length!=0) {
				colegiosfound.sort(function (a,b) {
					if (a[0] > b[0]) return  1;
					if (a[0] < b[0]) return -1;
					return 0;
				});
				
				for(i=0; i < colegiosfound.length; i++){
					colegiosfound[i][2] = colegiosfound[i][2].replace("?","Ñ");
					
					if(colegiosfound[i][4]==1 || colegiosfound[i][4]=="OFICIAL"){
						imagenSector = "imagenes/oficial.png";
						colorLetras = "#0A738C";
					}else if (colegiosfound[i][4]==2 || colegiosfound[i][4]=="NO OFICIAL"){
						imagenSector = "imagenes/no-oficial.png"; 
						colorLetras = "#70A12E";
					} 
					
					html+= "<div id = '" + colegiosfound[i][1] + " 'class ='contenedorColegio' onclick='sedeClick("+ colegiosfound[i][1] +")'>";
					html+= "<div class = 'tipoColegio' style = 'background-image:url(" + imagenSector + ")'></div><div class = 'infoColegio'>";
					html+= "<h3 style='color:" + colorLetras + "'>" + colegiosfound[i][2] +"</h3><p class ='direccionColegio'>" + colegiosfound[i][3] + "</p>";
					html+= "<p class = 'distanciaColegio' style='color:" + colorLetras + "'>" + colegiosfound[i][0] +"m</p></div></div>";
				} 
				$("#contenedorSedes").append(html);
				}else{
					$("#contenedorSedes").append("No hay resultados.");
				}
			});	
		}else if( e.which == 8){
			if(palabra.length<2){
				$("#contenedorSedes").hide(anima);
				$("#favoritosSede").show(anima);
			}
		}	
	});
	
	function mostrarCercania2(sitioini){
		var lati = parseFloat(sitioini.LATITUD.replace(",","."));
		var longi = parseFloat(sitioini.LONGITUD.replace(",","."));
		var myLatlng = new google.maps.LatLng(lati,longi);
		var x1 = new google.maps.LatLng(markerLatLngIni.lat(),markerLatLngIni.lng());	
		var x2 = new google.maps.LatLng( myLatlng.lat(),myLatlng.lng());
		var distancia = Math.round(google.maps.geometry.spherical.computeDistanceBetween(x1, x2));			
		colegiosfound.push([distancia,sitioini.CODIGO_SEDE,sitioini.NOMBRE_IES, sitioini.DIRECCION, sitioini.SECTOR]);
		distanfound.push(distancia);
	}
		
	$("#imagenSalir").click(function(){
		$("#formularioSesion").hide();
		$("#botonSalir").hide();
		$("#iniciar").show();
		$("#cambiarmapa").show();
		$("#cambiartrafico").show();
	});

	$("#volver").click(function(){
		$("#cambiarmapa").show();
		$("#cambiartrafico").show();
		$("#menuInicial").show();	
		$("#menuInicial").show();
		$("#iniciar").hide();
        $("#tusede").show();
        $("#divFavoritos").hide();
		//$("#barraSesion").hide();
		sesionactiva = "a";
	});
	
		
	
	//function volverActualizar(){
	$("#infoUsuario").click(onclick, function () {	
		$("#seccionFoto").hide();
		$("#botonSalir").show();
		$("#formularioSesion").show();
	});
	
	$("#seccionPerfil #infoUsuario").click(onclick, function () {	
		$("#formularioActualizar #nombres").val(datossesion.nombres)
		$("#formularioActualizar #apellidos").val(datossesion.apellidos)
		$("#formularioActualizar #numeroDoc").val(datossesion.cedula)
        
        switch(datossesion.tipodocumento){
                
            case "CÉDULA DE CIUDADANÍA":
                    $("#formularioActualizar #tipoDoc").val("1");
                    break;
                
            case "TARJETA DE IDENTIFICACION":
			     $("#formularioActualizar #tipoDoc").val("2");
                break;    
            case "CÉDULA DE EXTRANJERÍA":
			     $("#formularioActualizar #tipoDoc").val("3");
                break;  
            case "REGISTRO CIVIL DE NACIMIENTO":
			     $("#formularioActualizar #tipoDoc").val("4");
                break;   
                
            case "NÚMERO DE IDENTIFICACIÓN PERSONAL":
			     $("#formularioActualizar #tipoDoc").val("5");
                break;  
            case "NÚMERO ÚNICO DE IDENTIFICACIÓN PERSONAL":
			     $("#formularioActualizar #tipoDoc").val("6");
                break;
            case "NÚMERO DE IDENTIFICACIÓN - SECRETARÍA DE EDUCACIÓN":
			     $("#formularioActualizar #tipoDoc").val("7");
                break  
            case "CERTIFICACIÓN DE CABILDO":
			     $("#formularioActualizar #tipoDoc").val("8");
                break;
            default:
                
                break;
        }
		
		
		
        
        
		var fecnac = datossesion.fecha_nacimiento;
		$("#formularioActualizar #diaNac").val(fecnac.substring(0,2));
		
		var anio = parseInt(fecnac.substring(7,9));
		if( anio > 59 && anio < 99){
			anio = "19" + anio;
		}		
		else{
			if(anio > 9){
				anio = "20" + anio;
			}
			else{
				anio = "200" + anio;
			}
		}
		$("#formularioActualizar #anoNac").val(anio);
		
		if(fecnac.substring(3,6) == "JAN"){
			$("#formularioActualizar #mesNac").val("01");
		}
		if(fecnac.substring(3,6) == "FEB"){
			$("#formularioActualizar #mesNac").val("02");
		}
		if(fecnac.substring(3,6) == "MAR"){
			$("#formularioActualizar #mesNac").val("03");
		}
		if(fecnac.substring(3,6) == "APR"){
			$("#formularioActualizar #mesNac").val("04");
		}
		if(fecnac.substring(3,6) == "MAY"){
			$("#formularioActualizar #mesNac").val("05");
		}
		if(fecnac.substring(3,6) == "JUN"){
			$("#formularioActualizar #mesNac").val("06");
		}	
		if(fecnac.substring(3,6) == "JUL"){
			$("#formularioActualizar #mesNac").val("07");
		}
		if(fecnac.substring(3,6) == "AUG"){
			$("#formularioActualizar #mesNac").val("08");
		}
		if(fecnac.substring(3,6) == "SEP"){
			$("#formularioActualizar #mesNac").val("09");
		}
		if(fecnac.substring(3,6) == "OCT"){
			$("#formularioActualizar #mesNac").val("10");
		}
		if(fecnac.substring(3,6) == "NOV"){
			$("#formularioActualizar #mesNac").val("11");
		}
		if(fecnac.substring(3,6) == "DEC"){
			$("#formularioActualizar #mesNac").val("12");
		}
		if(datossesion.rolusuario == "Directivo"){
			$("#formularioActualizar #roles").val("1");
		}
		if(datossesion.rolusuario == "Docente"){
			$("#formularioActualizar #roles").val("2");
		}
		if(datossesion.rolusuario == "Administrativo"){
			$("#formularioActualizar #roles").val("3");
		}
		if(datossesion.rolusuario == "Padre de Familia/ Acudiente"){
			$("#formularioActualizar #roles").val("4");
		}
		if(datossesion.rolusuario == "Estudiante"){
			$("#formularioActualizar #roles").val("5");
		}
		if(datossesion.rolusuario == "Investigador"){
			$("#formularioActualizar #roles").val("6");
		}
		if(datossesion.rolusuario == "Otros"){
			$("#formularioActualizar #roles").val("7");
		}
		$("#seccionPerfil").hide();
		$("#formularioActualizar").show();
		$("#botonSalir2").show();
	});
	

	$("#sesion").click(onclick, function () {		
		sesionactiva = "b";
		$("#menuInicial").hide();
        $("#infoSicole").hide();
		$("#iniciar").show();
        $("#cambiarmapa").hide(anima);
        $("#cambiartrafico").hide(anima);
        $(".botonesIniciar").show();
	});

	$("#volver2").click(onclick, function () {		
		$("#seccionFoto").hide();
		$("#seccionPerfil").hide();
		$("#iniciar").show();
		$("#cambiarmapa").show();
		$("#cambiartrafico").show();
        if(datossesion != "" && datossesion != undefined){
            $("#tusede").show();
        }
	});

	$("#crearPerfilBoton").click(onclick,function () {
		crearPerfil();

	});
	
	

	$("#botonSalir").click(onclick,function () {
		$("#formularioSesion").hide();
		$("#formularioActualizar").hide();
		$("#botonSalir").hide();
		$("#iniciar").show();
		$("#cambiarmapa").show();
		$("#cambiartrafico").show();
	});	
    
    $("#volverPerfil").click(onclick,function () {
		$("#formularioSesion").hide();
		$("#formularioActualizar").hide();
		$("#botonSalir").hide();
		$("#iniciar").show();
		//$("#cambiarmapa").show();
		//$("#cambiartrafico").show();
        $("#barraSesion").css("width","70%");
	});	
    
	$("#botonSalir2").click(onclick,function () {
						   
		$("#formularioActualizar").hide();
		$("#botonSalir2").hide();
		$("#seccionPerfil").show();
	});
	
	$("#botonGrabar").click(onclick,function () {
			if(sedeActiva[0] != undefined){
				urlregistro += "&sedesEducativas=" + sedeActiva;
			}	
				console.log(encodeURI(urlregistro));
				d3.json(encodeURI(urlregistro), function(error, data) {
					console.log(data);	
					if(data[1] == "true"){
						mensaje("¡Felicitaciones!","Se ha creado el usuario con éxito.");
						$("#seccionFoto").hide();
						$("#seccionPerfil").hide();	
						
						clicInicial($("#formularioSesion #correo").val(), $("#formularioSesion #password").val());
						var urlsede ="http://geoportal.dane.gov.co/wssicole/serviciousuario.php?operacion=obtenerSedesUsuario&numerodoc=" + $("#numeroDoc").val();
						console.log(urlsede);
					d3.json(urlsede, function(error, data) {
						datossedesession = data;
						$('#nombreSede').html("");
						for(i=0; i < data.length; i++){
							$('#nombreSede').append($('<option>', {
							value: data[i]["CODIGOSEDE"],
							text: data[i]["NOMBRE_SEDE"]
						}));						
					}
				});		
					}
					else{
						mensaje("¡Error!",data[2]);
						$("#seccionFoto").hide();
						$("#formularioSesion").show();
					}
				});	
					
	});
	
	
	
	$("#perfil").click(onclick, function () {
		abrirPerfil();	
	});
	
	$("#irAPerfil").click(onclick, function (){
		abrirPerfil()
	})
	
	function abrirPerfil(){
		clasePerfil = 2;
		sesionactiva = "e";
		$("#seccionPerfil #tituloNombre").html(datossesion.nombres + " " + datossesion.apellidos);
		$("#seccionPerfil #infoUsuario").empty();

		var html = "";
			
		html += "<div id='informacionvisible'>" + datossesion.rolusuario + "<br>";	
		html += datossesion.username + "<br>";
        html += datossesion.tipodocumento + "   ";
		html += datossesion.cedula + "<br>";
		html += datossesion.fecha_nacimiento + "<br>";
		html += "</div>";	


		html += "<div id='actualizarInformacion'>";	
		html += "<img style='position:relative; float:left' src='imagenes/actualizar.png' width='30px'>"
		html += "<h3>Actualizar datos</h3>";
		html += "</div>";

		$("#seccionPerfil #infoUsuario").append(html);	
		
		var urlimg = "http://geoportal.dane.gov.co/wssicole/obtenerFotoUsuario.php?documento=" + datossesion.cedula;
		$('#seccionPerfil #fotoUsuarioMask').css("background-image", "url("+urlimg+")"); 		
		
        $("#barraSesion").css("width", "100%");
		$("#menuInicial").hide();
		$("#seccionPerfil").show();
		$("#cambiarmapa").hide(); 
		$("#cambiartrafico").hide(); 
		$("#sicoleLogo").hide();
	}
	
	$("#volver6").click(onclick, function () { 
	
			$("#menuInicial").show();
			$("#cambiarmapa").show();
			$("#cambiartrafico").show();
			$("#seccionPerfil").hide();
			$("#sicoleLogo").show(); 
			sesionactiva = "a";
            $("#barraSesion").css("width", "70%");
			$("#seccionPerfil #botonload").hide(500);
            if(datossesion != "" && datossesion != undefined){
                $("#tusede").show();
            }
	//	});		
	});
	
    $("#volver7").click(onclick, function () {
        $("#menuInicial").show();
        $("#cambiarmapa").show();
        $("#sesion").show();
        $("#iniciar").hide();
        $("#sesion").show();
        $("#acercade").show();
    });
                  
    $("#tusede").click(onclick, function () {
		habilitarseccion(datossesion.rolusuario);
		$("#menuInicial").hide();
		$("#sedeCuentanos").show(anima);
		$("#cambiarmapa").hide();   
		$("#cambiartrafico").hide();   
		$("#sicoleLogo").hide();  
        $("#barraSesion").width("100%");
		$("#infoSicole").hide();
		$("#divFavoritos").hide();
        $("#tusede").show();
	});
	
	$("#contacto").click(onclick, function () {
		sesionactiva = "c";
        $("#tusede").hide();
		$("#cambiarmapa").hide();
        $("#infoSicole").hide();
		$("#cambiartrafico").hide();
		$("#contactoVentana").show();
		$("#menuInicial").hide();
		$("#sicoleLogo").hide();
        $("#barraSesion").width("80%");
		$("#iniciar").hide();
        $("#divFavoritos").hide();
	});
	
$("#favoritos").click(onclick, function (){
	$("#cambiarmapa").hide();
    $("#tusede").hide();
	$("#cambiartrafico").hide();
	$("#menuInicial").hide();
	$("#sicoleLogo").hide();
	$("#iniciar").hide();
    $("#divFavoritos").show();
	var tipoDoc = cambiaraNumeroDoc(datossesion.tipodocumento);
	uriPrefere ="http://geoportal.dane.gov.co/wssicole/favoritos.php?operacion=consultar&tipo_documento=" +tipoDoc+"&numero_documento=" + datossesion.cedula;
	d3.json(uriPrefere, function(error, sedestotal) {
		console.log(uriPrefere);
		if(sedestotal.favorito== true){
			numeroPrefere = sedestotal.sedes.length;
			colegiosfound = [];
			$("#listaFavoritos #contenedorColegiosCercanos").html("");
			$("#favoritosUsuario").html("");
			imprimirFavoritos(sedestotal.sedes);
		}
	});
})

function imprimirFavoritos(id){
		var htmlpri = "";
		var imagenSector = "";
		var colorLetras = "";
		idEsp = id[numeroPrefere-1]["ID_SEDE"]
		codigoPrefere("http://geoportal.dane.gov.co/wssicole/serviciobusqueda.php?&codigosede=" + idEsp, id);
	}
	
	function codigoPrefere(url,id){
		d3.json(encodeURI(url), function(error, data4) {
			mostrarCercania2(data4[0]);
			numeroPrefere--;
			if(numeroPrefere>0){
				imprimirFavoritos(id);
			}else{
			console.log(colegiosfound);
				var imagenSector = "",
				colorLetras = "",
				htmlpri = "";
				if(colegiosfound.length!=0) {
					colegiosfound.sort(function (a,b) {
					if (a[0] > b[0]) return  1;
					if (a[0] < b[0]) return -1;
					return 0;
				});
					for(i =0 ; i<colegiosfound.length; i++){
						if(colegiosfound[i][4] == "OFICIAL"){
							imagenSector = "imagenes/oficial.png";
							colorLetras = "#0A738C"
						}else if(colegiosfound[i][4] == "NO OFICIAL"){
							imagenSector = "imagenes/no-oficial.png"; 
							colorLetras = "#70A12E";
						}
						
					if($("#agregarSede").css("display")=="block"){
							htmlpri += "<div id = '" + colegiosfound[i][2] + " 'class ='contenedorColegio' onclick='sedeClick(" + colegiosfound[i][1] + ")'><div class = 'tipoColegio' style = 'background-image:url(" + imagenSector + ")'></div><div class = 'infoColegio'><h3 style='color:" + colorLetras + "'>" + colegiosfound[i][2] +"</h3><p class ='direccionColegio'>" + colegiosfound[i][3] + "</p><p class = 'distanciaColegio' style='color:" + colorLetras + "'>" +  colegiosfound[i][0] +"m</p></div></div>";
						}else{
							htmlpri += "<div id = '" + colegiosfound[i][2] + " 'class ='contenedorColegio' onclick='ubicarCentro("+ colegiosfound[i][1] +", 0)'><div class = 'tipoColegio' style = 'background-image:url(" + imagenSector + ")'></div><div class = 'infoColegio'><h3 style='color:" + colorLetras + "'>" + colegiosfound[i][2] +"</h3><p class ='direccionColegio'>" + colegiosfound[i][3] + "</p><p class = 'distanciaColegio' style='color:" + colorLetras + "'>" +  colegiosfound[i][0] +"m</p></div></div>";
						}
						
						
					}
					$("#favoritosUsuario").append(htmlpri);	
					$("#contenedorFavoritos").append(htmlpri);
				}
				
			}
		
		
			
		});
	}
	
	function mostrarCercania2(sitioini){
		var lati = parseFloat(sitioini.LATITUD.replace(",","."));
		var longi = parseFloat(sitioini.LONGITUD.replace(",","."));
		var myLatlng = new google.maps.LatLng(lati,longi);
		var x1 = new google.maps.LatLng(markerLatLngIni.lat(),markerLatLngIni.lng());	
		var x2 = new google.maps.LatLng( myLatlng.lat(),myLatlng.lng());
		var distancia = Math.round(google.maps.geometry.spherical.computeDistanceBetween(x1, x2));			
		colegiosfound.push([distancia,sitioini.CODIGO_SEDE,sitioini.NOMBRE_IES, sitioini.DIRECCION, sitioini.SECTOR]);
		distanfound.push(distancia);
	}
	
	
	$("#volver4").click(onclick, function () {
		$("#cambiarmapa").show();
		$("#cambiartrafico").show();
		$("#menuInicial").show();
		$("#infoSicole").hide();
		$("#sicoleLogo").show();  
		sesionactiva = "a";
        $("#barraSesion").width("70%");
        if(datossesion != "" && datossesion != undefined){
            $("#tusede").show();
        }
	});
	$("#volver5").click(onclick, function () {
		$("#cambiarmapa").show();
		$("#cambiartrafico").show();
		$("#contactoVentana").hide();
		$("#menuInicial").show();
		$("#sicoleLogo").show();
		sesionactiva = "a";
        if(datossesion != "" && datossesion != undefined){
            $("#tusede").show();
        }
	});
	
	$("#acercade").click(onclick, function () {
        $("#tusede").hide();
		$("#cambiarmapa").hide();
		$("#cambiartrafico").hide();
		$("#menuInicial").hide();
		$("#sicoleLogo").hide();
		$("#infoSicole").show();   
		sesionactiva = "d";		
		$("#iniciar").hide();
        $("#divFavoritos").hide();
	});


                
         

	$("#cerrarsesion").click(onclick, function () {
        $(".botonesIniciar").show();
        $("#cambiarmapa").hide(anima);
        $("#cambiartrafico").hide(anima);
		$("#sesion").show();
		$("#perfil").hide();
		$("#comunidad").hide();
		$("#tusede").hide();
		$("#cerrarsesion").hide();
		$("#menuInicial").hide();
		$("#iniciar").show();
		$("#usuario").val("");		
		$("#contrasena").val("");
        $("#divFavoritos").hide();
        $("#favoritos").hide();
		datossedesession = 0;
		sesionactiva = "b";
		datossesion = [];
		$('#nombreSede').find('option').remove();
		$("#sedesAgregadasPerfil").html("");
		$('#infraestructura').removeClass("Activo");
		$('#transporte').removeClass("Activo");
		$('#convivencia').removeClass("Activo");
		$('#asistencia').removeClass("Activo");
		$("#encabezadoInstitucion").hide(anima);
		$("#avisoConvivencia").hide(anima);
	});
	
	$("#seccionFoto #buscarSede").click(onclick, function () {
		$("#seccionFoto").hide();
		$("#sicoleLogo").hide();
		$("#agregarSede").show(); 
		clasePerfil = 1;
		llenarFavoritos();
		$("#contenedorSedes").hide();
		$("#busquedacolegio").val("");
		$("#favoritosSede").show();
		$("#contenedorFavoritos").show();
	});
	
	
	function llenarFavoritos(){
	var tipoDoc = cambiaraNumeroDoc(datossesion.tipodocumento);
	uriPrefere ="http://geoportal.dane.gov.co/wssicole/favoritos.php?operacion=consultar&tipo_documento=" +tipoDoc+"&numero_documento=" + datossesion.cedula;
	d3.json(uriPrefere, function(error, sedestotal) {
		//console.log(uriPrefere);
		if(sedestotal.favorito== true){
			numeroPrefere = sedestotal.sedes.length;
			colegiosfound = [];
			$("#contenedorFavoritos").html("");
			imprimirFavoritos(sedestotal.sedes);
		}
	});


}

	
	$("#seccionPerfil #buscarSede").click(onclick, function () {
		$("#seccionPerfil").hide();
		$("#sicoleLogo").hide();
		$("#agregarSede").show();
		clasePerfil = 2;
		llenarFavoritos();
		$("#contenedorSedes").hide();
		$("#busquedacolegio").val("");
		$("#favoritosSede").show();
		$("#contenedorFavoritos").show();		
	});
	
	$("#botonCancelar").click(onclick, function () {
		$("#seccionFoto").show();
		$("#agregarSede").hide();
    });
	
	$("#retornar").click(onclick, function () {
		$("#menuInicial").show();
		$("#cambiarmapa").show();
		$("#cambiartrafico").show();
		$("#sedeCuentanos").hide();
		$("#sicoleLogo").show();
        $("#barraSesion").width("70%");
    });

	$("#GuardarJornada").click(onclick, function () {
		sedeActiva.push(CodsedeActiva);
		console.log(sedeActiva);
		cont = 0;
		jorselc = "";
		if($("input[name=manana]:checked").val() != undefined){
			cont++;
			jorselc += "- Jornada Mañana";
		}
		if($("input[name=tarde]:checked").val() != undefined){
			cont++;
			jorselc += "- Jornada Tarde";
		}
		if($("input[name=noche]:checked").val() != undefined){
			cont++;
			jorselc += "- Jornada Noche";
		}
		if($("input[name=festivos]:checked").val() != undefined){
			cont++;
			jorselc += "- Jornada Fin de Semana";
		}
		if($("input[name=completa]:checked").val() != undefined){
			cont++;
			jorselc += "- Jornada Completa";
		}
		if(cont > 0){
			if(clasePerfil == 1){
				$("#seccionFoto").show();
				$("#contenedorJornadas").hide();						
				html = '<div class = "colegioAgregado">' + NsedeActiva + " " + jorselc + ' <img id = "actualizarSede' +  CodsedeActiva +'" class="imagenControlSede" src="imagenes/actualizar.png" style= "right:18%" onclick= "actualizarfuncion(this.id)"/><img id = "eliminarSede' + CodsedeActiva + '" class="imagenControlSede" src="imagenes/eliminar.png" onclick= "eliminarfuncion(this.id)"/></div>'
				$("#sedesAgregadas").append(html);
			}
			
			if(clasePerfil == 2){
				$("#seccionPerfil").show();
				$("#contenedorJornadas").hide();						
				html = '<div class = "colegioAgregado">' + NsedeActiva + " " + jorselc + ' <img id = "actualizarSede' +  CodsedeActiva +'" class="imagenControlSede" src="imagenes/actualizar.png" style= "right:18%" onclick= "actualizarfuncion(this.id)"/><img id = "eliminarSede' + CodsedeActiva + '" class="imagenControlSede" src="imagenes/eliminar.png" onclick= "eliminarfuncion(this.id)"/></div>'
				$("#sedesAgregadasPerfil").append(html);
				
            }
        }
		else{
			mensaje("¡Error!","Debe escoger una opción disponible");
			
		}
    });
});	
function cambiarTipo(tipo){
    
    switch(tipo){
        case "1": 
            return("Cédula de ciudadanía");
            break;
        case "2":
            return("Tarjeta de Identidad");
            break;
        case "3":
            return("Cédula de extranjería o Identificación de Extranjería");
            break;   
        case "4":
            return("Registro Civil de Nacimiento");
            break;  
        case "5":
            return("Número de Identificación Personal (NIP)");
            break;
        case "6":
            return("Número Único de Identificación Personal (NUIP)");
            break;
        case "7":
            return("No de Identificación - Secretaría de Educación");
            break;
        case "8":
            return("Certificado de Cabildo");
            break;   
        default:
            return("oh my god");
            break;     
            
    }
    
}
function cargarformufoto(){
	
	$("#seccionFoto").show();
	$("#botonSalir").hide();
	$("#formularioSesion").hide();
	$("#seccionFoto #tituloNombre").html($("#nombres").val() + " " + $("#apellidos").val());
	$("#seccionFoto #infoUsuario").empty();
	
    var tipoDocumento = cambiarTipo($('#tipoDoc').val());
	var html = "";
		
	html += "<div id='informacionvisible'>" + $('#roles :selected').text() + "<br>";	
	html += $("#correo").val() + "<br>";
    html += tipoDocumento + "    ";
	html += $('#numeroDoc').val() + "<br>";
	html += $('#diaNac').val() + " - " + $('#mesNac').val() + " - " + $('#anoNac').val() + "<br>";
	html += "</div>";	
	
	
	html += "<div id='actualizarInformacion'>";	
	html += "<img style='position:relative; float:left' src='imagenes/actualizar.png' width='30px'>"
	html += "<h3>Actualizar datos</h3>";
	html += "</div>";
	
	$("#seccionFoto #infoUsuario").append(html);	
	
}

function sedeClick(sede) {		
	url = "http://geoportal.dane.gov.co/wssicole/colegio2.php?cod_col=" + sede;
    console.log(url);
	d3.json(url, function(error, data) {
		console.log("jornadas")
		console.log(url)
		NsedeActiva = data[0]["NOM_COL"].replace("?","Ñ");
		CodsedeActiva = data[0]["COD_COL"];
		var jornased = data[0]["JORNADA"].split(",");
		$("#agregarSede").hide();
		$("#contenedorJornadas").show();
		$("input[name=manana]").removeAttr('checked');
		$("input[name=tarde]").removeAttr('checked');
		$("input[name=noche]").removeAttr('checked');
		$("input[name=festivos]").removeAttr('checked');
		$("input[name=completa]").removeAttr('checked');
		$(".textoCheck").css("color", "#AAA")
		$(".squaredOne label").css("background-color", "#CCC")
		$("#contenedorHorarios h1").text(NsedeActiva);
		
		for(i=0; i < jornased.length; i++){
			if(obtenerjornada(jornased[i]) == "MAÑANA"){
				$("input[name=manana]").removeAttr('disabled');
				$("#ContenidoManana .textoCheck").css("color", "#000")
				$("#ContenidoManana label").css("background-color", "#727272")
			}
			if(obtenerjornada(jornased[i]) == "TARDE"){
				$("input[name=tarde]").removeAttr('disabled');
				$("#ContenidoTarde .textoCheck").css("color", "#000")
				$("#ContenidoTarde label").css("background-color", "#727272")
			}
			if(obtenerjornada(jornased[i]) == "NOCHE"){
				$("input[name=noche]").removeAttr('disabled');
				$("#ContenidoNoche .textoCheck").css("color", "#000")
				$("#ContenidoNoche label").css("background-color", "#727272")
			}
			if(obtenerjornada(jornased[i]) == "FIN DE SEMANA"){
				$("input[name=festivos]").removeAttr('disabled');
				$("#ContenidoFestivo .textoCheck").css("color", "#000")
				$("#ContenidoFestivo label").css("background-color", "#727272")
			}
			if(obtenerjornada(jornased[i]) == "COMPLETA"){
				$("input[name=completa]").removeAttr('disabled');
				$("#ContenidoCompleta .textoCheck").css("color", "#000")
				$("#ContenidoCompleta label").css("background-color", "#727272")
			}
		}	
	});
}

function ubicarCentro (codigo, distancia){
	uricol = "http://geoportal.dane.gov.co/wssicole/colegio2.php?cod_col="+codigo;
    console.log("Código" + uricol);
	$.getJSON(uricol, function(data)
	{
		if (data.length > 0){

		    	var lat = "";
		    	var longi = "";
		    	var latcor = "";
		    	var longcor = "";

		    	lat = data[0]['LATITUD'];
		    	longi = data[0]['LONGITUD'];
                latcor = lat.replace(",",".");
		    	longcor = longi.replace(",",".");
                var latitud = parseFloat(latcor);
		    	var longitud = parseFloat(longcor);
		    	var ubicacion = { lat: latitud, lng: longitud};
                infoMarker.close();
                markerGeo.setVisible(false);
				map.setCenter(ubicacion);
                markerini.setPosition(ubicacion);
                $("#busquedaPopup").hide();
                cargarinfo(codigo);
                }else{
                    
                    $("#preaload").hide();
                }
				if($("#barraSesion").css("display")== "block"){
					$("#barraSesion").hide(anima);
				}
        });
	//
}

/**********************Autocompletar búsqueda**************************************/

 function realizarBusquedaPredio(nombreColegio){
     var pos = 0;
	 enFiltro = false;
     var direccion = $("#inputBusqueda").val();
     direccion=direccion.toUpperCase();       
    	uribusqueda = "http://geoportal.dane.gov.co/wssicole/serviciobusqueda.php?palabrasclave="+direccion;
        uribusqueda=encodeURI(uribusqueda);
        busqueda=uribusqueda.replace("%C2%91","");
     
        console.log("Uri Búsqueda final:");
		console.log(busqueda);
		$.getJSON(busqueda, function(data)
		{
			for(i =0;i<data.length;i++){
				//if(nombreColegio==data[i]["NOMBRE_SEDE"]){
				if(nombreColegio==data[i]["COD_COL"]){
					pos = i;
				}
			}
			//*********************************************************************
			//*********************************************************************
			$('#fondo').hide();
			$('#ventana_modal').hide();
			//********************************************************************
			//*********************************************************************
			//datos = data;
			if (data.length > 0)
			{

		    	var lat = "";
		    	var longi = "";
		    	var latcor = "";
		    	var longcor = "";
				console.log(data[pos]);
		    	lat = data[pos]['LATITUD'];
		    	longi = data[pos]['LONGITUD'];
                latcor = lat.replace(",",".");
		    	longcor = longi.replace(",",".");
                var latitud = parseFloat(latcor);
		    	var longitud = parseFloat(longcor);
		    	var ubicacion = { lat: latitud, lng: longitud};
                infoMarker.close();
                markerGeo.setVisible(false);
				map.setCenter(ubicacion);
                map.setZoom(17);
                markerini.setPosition(ubicacion);
                $("#busquedaPopup").hide();
                openInfoWindowUbicacionIni(markerini,cargarinfo(data[pos]['CODIGO_SEDE']));
                }else{
                    
                    $("#preaload").hide();
               }
        });
 }
 
