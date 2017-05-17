var direccionCaja = "";
var busquedaDireccion = "";
var mapaJornadas = "";
var inputSeleccionado = $("#inputBusqueda");
var uriTipoBusqueda = "http://geoportal.dane.gov.co/wssicole/serviciobusqueda.php?palabrasclave=";
var auxiliarScroll=300;
var colorDonut = [];
var bandera = false;
var favorito = false;
var jActiva = "";
var htmlActualizar = "";
var actualizarId = "";
var entransporte = false;
var changeTasas = false;
var vectorRecursos = ["Total docentes", "Docentes con posgrado", "Estudiantes por docente"];
var vectorTasas = ["aprobación", "reprobación", "deserción", "transferencia"];
var tasasNiveles = ["preescolar", "primaria", "secundaria", "media"];

function crearOtrosFiltros(){
	var htmlOtros = "";
	for(i= 0 ; i<vectorTasas.length; i++){
		var mayuscula = vectorTasas[i].charAt(0).toUpperCase() + vectorTasas[i].slice(1);
		var valor = vectorTasas[i].replace("ó","o");
		htmlOtros+= "<div id = 'despliegue" + mayuscula.replace("ó","o") + "' class = 'desplegableOtroFiltro'><p style= 'float:left;  width: 25%;'>" + mayuscula + ":</p><div class='imagenDespliegueOtros'></div></div>"  
		htmlOtros+= '<div id="seccion' + mayuscula.replace("ó","o") +'" class ="seccionesFiltros" style = "height:auto; display:none">'
		for(j=0; j<tasasNiveles.length;j++){
			var mayuscula1 = tasasNiveles[j].charAt(0).toUpperCase() + tasasNiveles[j].slice(1);
			htmlOtros+= '<div class = "seccionesFiltros"><div class = "titulofiltros">' + mayuscula1 + '</div>';
			htmlOtros+= '<div class = "contenedorLimites indicadorOtrosFiltros">0</div><form class = "rangeFiltro" style= "margin-top:20px;">';
			htmlOtros+= '<input type = "range" id = "'+ mayuscula.replace("ó","o") + mayuscula1 +'" name = "desercion"' + mayuscula1 +' min ="0" max = "1" value = "1" step = "0.1" onchange="cambioTasas(this.id)"/>';
			htmlOtros+= '<output id ="output' + mayuscula1+'" for="'+  mayuscula.replace("ó","o") + mayuscula1 + '" onforminput="value = desercion'+ mayuscula1 +'.valueAsNumber;" style="margin-left: 94%;" >1.0</output></form><div class = "contenedorLimites indicadorOtrosFiltros">1.0</div></div>';
		}
		htmlOtros+= "</div>"
	}
	$("#filtrosAdicionales").html(htmlOtros);
	$(".desplegableOtroFiltro").click(onclick, function(){
		var id = $(this).attr("id");
		id = id.replace("despliegue","");
		id = id.charAt(0).toUpperCase() + id.slice(1);
		if($("#seccion" + id + "").css("display")=="none"){
			$(this).css("border-bottom", "none");
			$("#despliegue" + id.replace("ó", "o") + " .imagenDespliegueOtros").css("background-image", "url(imagenes/flecha_azul.png)")
			
		}else{
			$(this).css("border-bottom", "#01b4ed solid 2px")
			$("#despliegue" + id.replace("ó", "o") + " .imagenDespliegueOtros").css("background-image", "url(imagenes/flecha_azulder.png)")
		}
		$("#seccion" + id + "").toggle(anima);
	
	})	
	
	/*$("#filtroDistanciaR").change(function() {
		ubicarIndicador($(this));
	})*/
}
crearOtrosFiltros();
function cambioTasas(id){
	changeTasas = true;
	var contenedor = $("#" + id + "")
	ubicarIndicador(contenedor);
}

//$('.autocomplete').autocomplete();  

function estilosParteInferior(){
    var barra = $("#barrainferior").height();
	var alturaFiltro = parseFloat($("body").height()) - barra - 40;	
	$("#barrafiltro").height(alturaFiltro);
	$("#transporteBarra").css("bottom", barra);
	$("#infocolecerca").css("bottom", barra);
	$("#isocronas").css("bottom", barra);
    var alturaContenido = $("#infoColeEsp").height()-($("#barraTitulo").height()+$(".selectores").height()+$(".campodetextos").height()-10);
    $("#contenidoInfoCole").height(alturaContenido);
	$("#contenedorColegiosCercanos").height(alturaContenido);
    $("#menuDesplegableAbajo").css("bottom", barra);
    $("#ventanaCategoriasAbajo").css("bottom", barra);
    $("#infoColeEsp").css("bottom", barra);
	var alturaBusqueda = parseFloat($("#busquedaPopup").css("top")) +  parseFloat($("#panel").height());
	$("#busqueda").css("bottom", barra);
	var width1 = parseFloat($("#outputSaber1").width())/-2;
	//"outputSaber2"
	//"outputSaber3"
	if(navigator.userAgent.toLowerCase().indexOf('firefox') > -1){
		$("#contenidoRecursos output").css("margin-top", "75px");
		$("#indicadorDocente").css("margin-top", "-127px");
		$("#outputDocente3").css("margin-top","15px");
	}
	
	
	var izq = ($(window).width() - $(".Guardar2").width())/2 -40;
	console.log();
	//$(".Guardar2").css("margin-left", izq);
	
	$("#busquedaPopup").css("top", $("#cabezote").height() +20);
	
	
}
  
estilosParteInferior();      

$("#influ").click(function(){
        
    if(document.getElementById("influ").checked==true){
        $("#slider").css("opacity","1");
        $("#area").css("opacity","1");
        $("#slider").slider("enable");
    } 
    else{
        $("#slider").css("opacity","0.3");
            $("#area").css("opacity","0.3");
            $("#slider").slider("disable");
            
    }
});

$("#agregarinivel").change(function(){
    mapaJornadas=$(this).val();     
});

$(function () {
    var uribusqueda = "http://geoportal.dane.gov.co/wssicole/serviciobusqueda.php?";
   //$.getJSON(uribusqueda, function(data)
	//{
	/*var vector = [];
	for(i =0; i<data.length;i++){
		var valor = data[i]["NOMBRE_SEDE"].replace("\xC3","Ñ") + " ZZZ" + data[i]["DIRECCION"] + " ZZZ" + data[i]["BARRIO"]; 
		vector.push({label: valor,  value: data[i]["CODIGO_SEDE"]});
	}
       console.log("busqueda" + vector);*/

    $("#inputBusqueda").keyup(function(e){
     if($(this).val().length <= 3){
         
         $("#ui-id-1").hide(anima);
     }else{
     } 
    });
    $("#inputBusqueda").autocomplete({
        minLength: 0,
        source: function(request, response) {
            if(request.term.length>3){
            var salida = "http://geoportal.dane.gov.co/wssicole/serviciobusqueda.php?palabrasclave=" +request.term,
                salida2 = "http://geoportal.dane.gov.co/wssicole/serviciobusqueda.php?direccion=" +request.term,    
                 vector = [];
            $.getJSON(salida, function(data)
            {
              $.getJSON(salida2, function(data2)
             {   
                if(data.length == 0){
                    data = data2;
                }  
                for(i =0; i<data.length;i++){
		              var valor = data[i]["NOMBRE_SEDE"].replace("\xC3","Ñ") + " ZZZ" + data[i]["DIRECCION"] + " ZZZ" + data[i]["BARRIO"]; 
		              vector.push({label: valor,  value: data[i]["CODIGO_SEDE"]});
	           }
                
			     var results = $.ui.autocomplete.filter(vector, request.term);
			     response(results.slice(0, 5));
                $("#ui-id-1").show(anima);
            });
            });    
            }
                
		},
        focus: function (event, ui) {
            $("#project").val(ui.item.label);
            return false;
        },
        select: function (event, ui) {
			var res = ui.item.label.split(" ZZZ");
			console.log(res);
            $("#inputBusqueda").val(res[0]);
            $("#inputBusqueda-id").val(ui.item.value);
           // $("#project-description").html(ui.item.desc);
            //$("#project-icon").attr("src", "images/" + ui.item.icon);
			//realizarBusquedaPredio(res[0]);
            realizarBusquedaPredio(ui.item.value);
			return false;
        }
    })
		
        .data("ui-autocomplete")._renderItem = function (ul, item) {
		var res = item.label.split("ZZZ");
        return $("<li>")
            .data("ui-autocomplete-item", item)
           /* .append("<a>" + item.label + "<br></a>")
            .appendTo(ul);*/
            .append("<div class='imagenUbicador'></div><a><b>" + res[0] + "</b>, " + res[1] + ", " + res[2] +"</a>")
			.appendTo(ul);
			
    };
//});
});




function jornadasFiltro(sitioini){
    var valorJornada=0;
    switch(mapaJornadas){
        case "PREESCOLAR":
            valorJornada=parseInt(sitioini.PREESCOLAR);
            break;
        case "PRIMARIA":
            valorJornada=parseInt(sitioini.PRIMARIA); 
            break;
        case "SECUNDARIA": 
            valorJornada=parseInt(sitioini.SECUNDARIA); 
            break;
        case "MEDIA": 
            valorJornada=parseInt(sitioini.SECUNDARIA); 
            break; 
        case "":
            valorJornada=1;
            break;    
    }
    if(valorJornada==0)
        return false;
    else
        return true;
}

$("#tipoDeBusqueda").click(onclick, function(){
    
    if($("#ventanaTipoBusqueda").css("display")=="none"){
       $("#ventanaTipoBusqueda").show(anima); 
    }
    
});
  


$("#busquedaGeoportal").click(onclick,function () {
    $("#logoBusqueda").css("background-image","url(imagenes/geop_ico.png)");
    $("#inputBusqueda").show();
	$("#inputBusqueda2").hide();  
	$("#busqueda").hide(anima);	
	$("#ventanaTipoBusqueda").hide(anima);
});



$("#menuDesplegableIzq").on( "swiperight", swiperightHandler );
function swiperightHandler(){
   $("#ventanaCategoriasIzq").show(anima); 
    ocultarPaneles();
   historial_navegacion++;
}

$("#transporteBarra").on("swipedown", function (){
	$("#transporteRanges").hide(anima);
	$("#nombreTransporte").show(anima);
    $("#flechaDespliegue").show(anima);
    $("#flechaDespliegueAbajo").hide(anima);
});

$("#transporteBarra").on("swipeup", function (){
	$("#transporteRanges").show(anima);
	$("#nombreTransporte").hide(anima);    
	$("#flechaDespliegue").hide(anima);
    $("#flechaDespliegueAbajo").show(anima);
});

$("#isocronas").on("swipedown", function (){
	$("#nombreIsocronas").show(anima);
	$("#isocronasInputs").hide(anima);
	$("#flechaDespliegue").show(anima);
});

$("#isocronas").on("swipeup", function (){
	$("#nombreIsocronas").hide(anima);
	$("#isocronasInputs").show(anima);
	$("#flechaDespliegue").hide(anima)
});
/*
$("#barrafiltro").on("swipedown", function (){
	$("#nombreFiltros").show(anima);
	$("#encabezadoFiltro").hide(anima);
	$("#flechaDespliegue").show(anima);
	$(".botoneraReportes").hide(anima);
	$("#filtrosPrincipales").hide(anima)
	$("#filtrosAdicionales").hide(anima)
	$(this).animate({
		bottom: "25px"
	},anima);
	$(this).height("auto");
})

$("#barrafiltro").on("swipeup", function (){
	$("#nombreFiltros").hide(anima);
	$("#encabezadoFiltro").show(anima);
	$("#flechaDespliegue").hide(anima);
	$(".botoneraReportes").show(anima);
	
	if($("#filtrosOtros").hasClass("sombra")){
		$("#filtrosPrincipales").show(anima)
	} else if($("#filtrosNormales").hasClass("sombra2")){
		$("#filtrosAdicionales").show(anima)
	}
	$(this).animate({
		bottom: "inherit"
	},anima);
	 var barra = $("#barrainferior").height();
	var alturaFiltro = parseFloat($("body").height()) - barra - 40;	
	$("#barrafiltro").height(alturaFiltro);
});
*/
$("#infocolecerca").on("swipedown", function (){
	if(posicionSedeActual != ""){
		sitiosCerca(posicionSedeActual);
		$("#lugaresCercanos").hide(anima);
		$("#auxiliar2").hide(anima);
		$("#distanciaCerca").hide(anima);
		$("#nombreSedeCerca").hide();
	    $("#nombreCercaA").show(anima); 
		$("#flechaDespliegue").show(anima);
		var barra = $("#barrainferior").height();
		$(this).animate({
			bottom: barra
		},anima);
	}else{
	}
});

$("#infocolecerca").on("swipeup", function (){
	if(posicionSedeActual != ""){
		sitiosCerca(posicionSedeActual);
		$("#lugaresCercanos").show(anima);
		$("#auxiliar2").show(anima);
		$("#distanciaCerca").show(anima);
		$("#nombreSedeCerca").show();
	    $("#nombreCercaA").hide(anima);
		$("#flechaDespliegue").hide(anima);
	}else{
	}
});
/*  
$("#flechaDespliegue").on("swipeup", function (){
	if(cercaHabilitado == true){
		if(posicionSedeActual != ""){
			sitiosCerca(posicionSedeActual);
			$("#lugaresCercanos").show(anima);
			$("#auxiliar2").show(anima);
			$("#distanciaCerca").show(anima);
			$("#nombreSedeCerca").show();
			$("#nombreCercaA").hide(anima);
			$("#flechaDespliegue").hide(anima);
		}else{
		}
	}	
});
*/
$("#barraTitulo").on("swipedown", function (){
	if($("#infoColeEsp").height()>= 110){
		$("#infoColeEsp").animate({
			height: "8%"
		}, 500, function (){
			$("#barraTitulo").height("70%");
			$(".campodetextos").height("0");
            var barra = $("#barrainferior").height();            
			$(this).css("bottom",barra/2 - 13);
		});
	}else{
	}
});


$("#barraTitulo").on("swipeup", function (){
	if($("#infoColeEsp").height()>= 110){
	}else{
		 $("#infoColeEsp").animate({
			height: "70%"
		}, 500, function(){
				$("#barraTitulo").height("8%");
				$(".campodetextos").height("auto");
				$(this).css("bottom","26px");
			});
		
	}
});

$("#ventanaCategoriasIzq").on("swipeleft", function (){
	mostrarPaneles();
});

$("#ventanaCategoriasDer").on("swiperight", function (){
	mostrarPaneles();
});

$("#barraSesion").on("swipeleft", function (){
	$(this).hide(anima);
	mostrarPaneles();
});
    
$("#menuDesplegableDer").on( "swipeleft", function (){
   $("#ventanaCategoriasDer").show(anima); 
    ocultarPaneles();
    historial_navegacion++;
	if(enFiltro == true){
		nombreTitulo = "Resultados filtro";
	}else{
		nombreTitulo = "Sedes cercanas";
	}
	sitiosCercanos();
	var alturaContenido = $("#infoColeEsp").height-($("#barraTitulo").height()+$(".selectores").height()+$(".campodetextos").height()-10);
	
	historial_navegacion++;
});



$("#menuDesplegableAbajo").on("swipeup",function(){
   $("#ventanaCategoriasAbajo").show(anima); 
    $(this).hide(anima);
    historial_navegacion++;
});

$("#retraer").on("swipedown", function(){
    
    $("#menuDesplegableAbajo").show(anima);
    $("#ventanaCategoriasAbajo").hide(anima);
    
})


$("#scrollBajar").click(onclick,function () {

    scrollColegios(1); 
});


$("#scrollSubir").click(onclick,function () {

    scrollColegios(-1);  
});

$("#busqueda").on("swipedown", function (){
	$("#contenidoBusqueda").hide(anima);
	$("#busqueda h2").css("text-align", "center").css("margin-bottom", "-1%");
	$("#flechaDespliegue").show(anima);
});
$("#busqueda").on("swipeup", function (){
	$("#contenidoBusqueda").show(anima);
	$("#busqueda h2").css("text-align", "left").css("margin-bottom", "0%");
	$("#flechaDespliegue").hide(anima);
});


function scrollColegios(factor){
    var contenedorCercanos = $("#contenedorColegiosCercanos")
    var scroll = contenedorCercanos.scrollTop() +(auxiliarScroll*factor);
    contenedorCercanos. animate({ scrollTop : scroll},500,botonesScroll)
    
    
}

 $("#contenedorColegiosCercanos").scroll(botonesScroll);

$("#salirFuncionBusqueda").click(function (){
	$("#busqueda").hide(anima);
	$("#contenidoBusqueda").show(anima);
	$("#busqueda h2").css("text-align", "left").css("margin-bottom", "0%");
	$("#flechaDespliegue").hide(anima);
	lugaresCercanos();
	$("#ventanaCategoriasDer").hide();
});
 
 
function botonesScroll (){
    var contenedorCercanos = $("#contenedorColegiosCercanos");
    var adicionalSuma = contenedorCercanos.height();  
    var scrollBoton = contenedorCercanos.scrollTop();   
    if(scrollBoton>0){
        $("#scrollSubir").show(100);
        if((scrollBoton + adicionalSuma) >= document.getElementById("contenedorColegiosCercanos").scrollHeight){
                $("#scrollBajar").hide(100);
            }else{
                $("#scrollBajar").show(100);
            };
            
        }else{
        $("#scrollSubir").hide(100);
    }
           
}


$("#botonOficiales").click(onclick,function(){	
    $("#Oficial").prop( "checked", true);
    $("#NoOficial").prop( "checked", false);
    $(".botonesAbajo").css("background-color", "#DBDBDB").css("color","black");
    $(this).css("background-color","#01B4ED").css("color","white");
    lugaresCercanos();
    map.setCenter(markerini.getPosition());
	$("#preaload").show();

});


$("#botonNoOficiales").click(onclick,function(){
    $("#Oficial").prop( "checked", false);
    $("#NoOficial").prop( "checked", true);
    $(".botonesAbajo").css("background-color", "#DBDBDB").css("color","black");
    $(this).css("background-color","#01B4ED").css("color","white");
    lugaresCercanos();
    map.setCenter(markerini.getPosition());
	$("#preaload").show();
});

$("#botonTodos").click(onclick,function(){
    
    $("#Oficial").prop( "checked", true);
    $("#NoOficial").prop( "checked", true);
    $(".botonesAbajo").css("background-color", "#DBDBDB").css("color","black")
    $(this).css("background-color","#01B4ED").css("color","white");
	$("#preaload").show();
	enFiltro =false;
    lugaresCercanos();
    map.setCenter(markerini.getPosition());
});


$("#Oficial").click(onclick, activarbotones);
$("#NoOficial").click(onclick, activarbotones);


function activarbotones(){
    
    $(".botonesAbajo").css("background-color", "#DBDBDB").css("color","black")
    
    if($('#Oficial').is(':checked')&&$('#NoOficial').is(':checked')){
        $("#botonTodos").css("background-color","#01B4ED").css("color","white");
    }else if($('#Oficial').is(':checked')){
        $("#botonOficiales").css("background-color","#01B4ED").css("color","white");
    }else if($('#NoOficial').is(':checked')){
        $("#botonNoOficiales").css("background-color","#01B4ED").css("color","white");
    }
}

function eventosInfo (){
$("#botonAbrirFoto").click(onclick, function (){
    
    $("#popUpFotoCole").show(anima);                       
                           
})

$("#botonSalir3").click(onclick,function () {
                        
    $("#popUpFotoCole").hide(anima);                    
})

$("#popUpFotoCole").click(onclick,function () {
                        
    $("#popUpFotoCole").hide(anima);                    
})

$("#tituloJornadas").click(onclick,function(){
   $("#tablaJornadas").show(anima);
   $(this).hide();
   $("#tituloJornadas1").show();
});

$("#tituloJornadas1").click(onclick,function(){
   $("#tablaJornadas").hide(anima);
   $(this).hide();
   $("#tituloJornadas").show();
});

$("#tituloNiveles").click(onclick,function(){
	$("#tablaNiveles").show(anima);
	$(this).hide();
   $("#tituloNiveles1").show();
});

$("#tituloNiveles1").click(onclick,function(){
	$("#tablaNiveles").hide(anima);
	$(this).hide();
   $("#tituloNiveles").show();
});

}

$(".selectores").click(onclick, function () {
	jActiva = $(this).attr("id");
	jornadaActivada();
});

function jornadaActivada() { 
	if(jActiva == ""){
		$(".columnaGraficas").hide();
		$(".columnaInfo").hide();
		$("#donaNivel").show(anima);
		$("#columnaInfoNiveles").show(anima);
		$("#donaJornada").show(anima);
		$("#columnaInfoJornadas").show(anima);
		if($("#tituloJornadas1").css("display") == "none"){
			$("#tituloJornadas").show();
		}
	
	}else if($("#" +jActiva + "").css("opacity")=="1"){
		var id = jActiva;
        $(".selectores").removeClass("botonPresionado");
        $("#" +jActiva + "").addClass("botonPresionado");
        coloresSecciones("#F39C1F", "#FCF0A5");
		$("#tituloJornadas").hide();
		$("#tituloJornadas1").hide();
        $("#tablaJornadas").hide();
		$(".columnaGraficas").hide();
		$(".columnaInfo").hide();
		$("#columnaInfoNiveles" + id + "").show(anima);
		$("#donaNivel" + id + "").show(anima);
		eficienciaInternaJornada();
		cambiarColorGraficas(color2Dona);
		recursosJornadas();
		$("#imagenSexo1").show();
		$("#imagenSexo").hide();
	}
}

function eficienciaInternaJornada(){
	var posicion = -1;
	var jornadaAux = jActiva;
	if(jornadaAux == "MANANA"){
		jornadaAux = "MAÑANA"
	}else if(jornadaAux == "FINDESEMANA"){
		jornadaAux = "FIN DE SEMANA"
	}
	for( i=0; i<jorna.length; i++){
		if(jorna[i] == jornadaAux){
			posicion = i;
			
		}
	}
	convertirEficiencia("Desercion",desercionjor[posicion]);
	convertirEficiencia("Aprobacion", aprobacionjor[posicion]);
	convertirEficiencia("Reprobacion", reprobacionjor[posicion]);
	convertirEficiencia("Transferencia", transferenciajor[posicion]);
}

function recursosJornadas (){
	var posicion = -1;
	var jornadaAux = jActiva;
	if(jornadaAux == "MANANA"){
		jornadaAux = "MAÑANA"
	}else if(jornadaAux == "FINDESEMANA"){
		jornadaAux = "FIN DE SEMANA"
	}
	for( i=0; i<jorna.length; i++){
		if(jorna[i] == jornadaAux){
			posicion = i;
		}
	}
	llenarDonaRecursos(posicion+1,color2Dona);
	numeroEstuPorProfe(posicion+1);
}

function llenarDonaRecursos(posicion,color){
	var porcentajeInsumo = 0
	
	textoinsumo(pordoc[posicion], totdoc[posicion]);
	
	porcentajeInsumo = pordoc[posicion] * 100; 
	donaInsumo = [];
	donaInsumo.push({ "jornada": "Porcentaje docentes sin posgrado", "population": 100- porcentajeInsumo});
	donaInsumo.push({ "jornada": "Porcentaje docentes posgrado", "population": porcentajeInsumo});
	$("#donaRecursos").html("");
	
	bandera1 = false;
	bandera2 = false;
	colorDonut = color;
	hacerDona3(donaInsumo, totdoc[posicion], "donaRecursos");
	$("#textoSin p").css("color",color[0]);
	$("#textoCon p").css("color",color[1]);
}

function numeroEstuPorProfe(posicion){
	var porcentaje;
	porcentaje = (numestdoc[posicion]/48)*100;
	if(isNaN(porcentaje)){
		porcentaje = 0;
	}
	if(porcentaje>98){
		porcentaje = 98; 
	}
	$("#estudiantesPordocentes").width(porcentaje + "%");	
	porcentaje = Math.round(porcentaje);
	$("#numeroEstudiantes").text(numestdoc[posicion])
}


function convertirEficiencia(palabra, total){
	var total1 = parseFloat(total)* 100;
	$("#texto" + palabra).text( Math.round(total1) + "%");
	$("#tasa" + palabra).height(total1 + "%");
}

$("#barraTitulo").click(onclick, function (){
    $(".selectores").removeClass("botonPresionado"); 
    coloresSecciones("#318DA6", "#CDEAFB");
    $("#tituloJornadas").show(anima);
	$(".columnaGraficas").hide();
	$(".columnaInfo").hide();
	$("#donaNivel").show(anima);
	$("#columnaInfoNiveles").show(anima);
	$("#donaJornada").show(anima);
	$("#columnaInfoJornadas").show(anima);
	var longitud = desercionjor.length - 1;
	convertirEficiencia("Desercion",desercionjor[longitud]);
	convertirEficiencia("Aprobacion", aprobacionjor[longitud]);
	convertirEficiencia("Reprobacion", reprobacionjor[longitud]);
	convertirEficiencia("Transferencia", transferenciajor[longitud]);
	cambiarColorGraficas(color1Dona);
	llenarDonaRecursos(0,color1Dona);
	numeroEstuPorProfe(0)
	jActiva = "";
	$("#imagenSexo").show();
	$("#imagenSexo1").hide();
});


function coloresSecciones(color1, color2) {
    $("#barraTitulo").css("background-color", color1); 
    $(".contenidoIdentificacion").css("color", color1);
    $(".tituloIdenficacion").css("color", color1);
    $("#agregarColegioFavorito").css("color", color1);
	$("#textoSexo").css("color", color1);
	$(".escogerCircle").css("fill", color1);
	$(".listasCaracteristicas").css("color", color1);
	$(".lineaGraficas").css("border-color", color1);
	$(".tituloColor").css("color", color1);
	$(".textoMulticolor").css("border-color", color1);
	$("#contenidoRecursos h3").css("color", color1);
	$("#contenidoRecursos h3").css("border-color", color1);
	$("#barraPorEstudiantes").css("border-color", color1);
	$("#contenidoRecursos .textoLeyendaBarra").css("cssText", "color: " + color1 + "!important;");
}

function cambiarColorGraficas(arrayColor){
	var nombres = ["Desercion", "Aprobacion", "Reprobacion", "Transferencia"];
	for(i=0; i<nombres.length; i++){
		$("#tasa" + nombres[i] + "").css("background-color", arrayColor[i])
		$("#circulo" + nombres[i] + "").css("fill", arrayColor[i]);
	}

}

$("#busquedaPopup").click(onclick,function(){
    
    cerrarInfocole();
    mostrarPaneles();
    $("#barraSesion").hide(anima);
});

$("#cabezote").click(onclick,function(){
    
    cerrarInfocole();
    mostrarPaneles();
    var sesion = $("#barraSesion");
    $("#busqueda").hide(anima);    
})

$("#cabezote1").click(function (){
    
   $(this).hide(); 
});

function sectorSeleccion (sector){
    var url = "http://geoportal.dane.gov.co/wssicole/serviciobusqueda.php?";
    
    if(sector == "todos" ){
		url += "&sector=todos";
	}
	else{
		if(sector =="oficial"){
			url += "&sector=oficial";
		}
		if(sector == "nooficial"){
			url += "&sector=nooficial";
		}
	}
}

$("#inputBusqueda2").click(onclick, function(){

	$("#busqueda").show(anima);
});

function ocultarBusqueda(){
	
}
$("#volverJornada").click(onclick, function(){
	$("#agregarSede").show(); 
	$("#contenedorJornadas").hide(anima);
})

$("#volverPerfil2").click(onclick, function(){
	$("#seccionPerfil").show(anima);
	$("#formularioActualizar").hide(anima);

})

$("#cancelarSede").click(onclick, function (){
	
	
	if(clasePerfil == 1){
		$("#seccionFoto").show();
		$("#agregarSede").hide();	
		if(htmlActualizar != ""){
			$("#sedesAgregadas").html(htmlActualizar);
		}	
	}
	
			
	if(clasePerfil == 2){
		$("#seccionPerfil").show();
		$("#agregarSede").hide();
		if(htmlActualizar != ""){
			$("#sedesAgregadasPerfil").html(htmlActualizar);
		}	
	};
	htmlActualizar = "";
})

function actualizarfuncion(id){
	htmlActualizar = $("#sedesAgregadasPerfil").html();
	$("#" + id + "").parent().remove(); 
	$("#seccionFoto").hide();
	$("#sicoleLogo").hide();
	$("#agregarSede").show(); 
	//cambiar claseperfil.
	var idSede = id.replace("actualizarSede","");
	
	console.log(sedeActiva);
	var i =0;
	var actua = false;
	while(actua == false &&  i<sedeActiva.length){
		if (sedeActiva[i] == idSede){
				console.log("sede a borrar" + idSede);
				console.log(i);
				sedeActiva.splice(i, 1);
				actua = true
		}
		i++
	}
	console.log(sedeActiva)
}

function eliminarfuncion(id){
		$("#divMascara").show(anima);
		$("#divMascara").css("display", "flex");
		
	$("#cancelarEliminar").click(function(){
		$("#divMascara").hide(anima);
	})

	$("#confirmarEliminar").click(function(){
		$("#divMascara").hide(anima);
		$("#" + id + "").parent().remove(); 
		var idSede = id.replace("eliminarSede","");
		var i =0;
		var actua = false;
		while(actua == false&& i<sedeActiva.length){
			if (sedeActiva[i] == idSede){
				sedeActiva.splice(i, 1);
				actua = true;
			} 
			i++;
		}
		
	})	
}


function agregarSedesPerfil (){
	var sedesComas = "";
	if(sedeActiva!= undefined){
			for(i=0;i<sedeActiva.length;i++){
				if(i==sedeActiva.length-1){
					sedesComas+= sedeActiva[i];
				}	
				else{	
					sedesComas+= sedeActiva[i] + ",";
				}	
			}
			
			console.log("comas" + sedesComas);
			var urlactualizar = "http://geoportal.dane.gov.co/wssicole/serviciousuario.php?operacion=modificarusuario";
			
			var nombres = datossesion.nombres;
			urlactualizar+= "&nombres=" + nombres;
			var apellidos = datossesion.apellidos;
			urlactualizar+= "&apellidos=" + apellidos;
			var tipo = $("#formularioActualizar #tipoDoc").val();
			urlactualizar+= "&id_tipo="+tipo;
			var numero = datossesion.cedula;
			urlactualizar+= "&numero_documento="+numero;
			var fecha = datossesion.fecha_nacimiento;
			urlactualizar+= "&fecha_nacimiento="+fecha;
			console.log(datossesion.rolusuario);
			var rol = cambiarUsuarios(datossesion.rolusuario)
			console.log(rol)
			//var rol = $('#formularioActualizar #roles').val();
			urlactualizar+= "&id_rol="+rol;
			urlactualizar+= "&sedesEducativas=" + sedesComas; 
			console.log("AQUI");
			console.log(urlactualizar);
			d3.json(encodeURI(urlactualizar), function(error, data) {
					
					if(data[1] == "true"){
						mensaje("¡Felicitaciones!",data[2]);
					}else{
						mensaje("¡Error!",data[2]);
					}
				var urlsede ="http://geoportal.dane.gov.co/wssicole/serviciousuario.php?operacion=obtenerSedesUsuario&numerodoc=" + datossesion.cedula;
				//console.log("Sede");
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
			});
				
			
			datossesion.tipodocumento = cambiarTipo(datossesion.tipodocumento);
			datossesion.rolusuario = $('#formularioActualizar #roles :selected').text()
	}
	//});
	//$("#menuInicial").show();
	//$("#cambiarmapa").show();
	//$("#cambiartrafico").show();
	$("#seccionPerfil").hide();
	//$("#sicoleLogo").show();
	$("#barraSesion").hide(anima);
}

function cambiarUsuarios(rol){
	switch(rol){
	
		case 'Directivo':
			return 1;
			break;
		case 'Directivo':
			return 2;
			break;
		case 'Administrativo':
			return 3;
			break;
		case 'Padre de Familia/Acudiente':
			return 4;
			break;
		case 'Estudiante':
			return 5;
			break;
		case 'Investigador':
			return 6;
			break;
		case 'Otros':
			return 7;
			break
			
	}			
}



$("#grabarPerfil").click(onclick,function(){
	agregarSedesPerfil();
	$("#barraSesion").width("70%");
	$("#seccionPerfil").hide(anima);
	$("#perfil").show(anima);
	$("#menuInicial").show(anima);
	$("#cambiarmapa").show(anima);
	
});

function hacerDona(data, total){
	var width = ($("body").width() * 0.465) -10,
		height = 140,
		radius = Math.min(width, height) / 2;
	var color = d3.scale.ordinal()
		.range(colorDonut);
	
	var arc = d3.svg.arc()
    .outerRadius(radius - 20)
    .innerRadius(radius - 40);
	var pi = (Math.PI)/2;
	
	var pie = d3.layout.pie()
    .sort(null)
    .value(function(d) {return d.population; });
	var svg = d3.select("#donaJornada").append("svg")
		.attr("id", "svgJornada")
		.attr("width", width)
		.attr("height", height)
		.append("g")
		.attr("transform", "translate(" + width / 2 + "," + height / 2 + ")");	
	
			 var g = svg.selectAll(".arc")
			.data(pie(data))
			.enter().append("g")
			.attr("class", "arc");
			
			g.append("path")
				.attr("d", arc)
				.style("fill", function(d) { return color(d.data.jornada); });
			
			
			
			var image_width = 20;
			var image_height = 20;

// add the image



			g.append("svg:image")
				.attr("xlink:href",function (d){
					switch(d.data.jornada){
						case "MANANA":
							return "imagenes/manana3.png"	
							break;
						case "TARDE":
							return "imagenes/tarde3.png"	
							break;
						case "NOCHE":
							return "imagenes/noche3.png"	
							break;
						case "FINDESEMANA":
							return "imagenes/sf3.png"	
							break;
						case "COMPLETA":
							return "imagenes/continua3.png"	
							break;	
					}	
				})
				.attr("transform", function(d){
					var x = arc.centroid(d)[0] - image_width/2;
					var y = arc.centroid(d)[1] - image_height/2;
					if(x>(-image_width/2) && x<0){
						x-= 10;
					}
					return "translate(" + x + "," + y + ")";
				})
				.attr("width", image_width)
				.attr("height", image_height);

					
			g.append("text")
				.attr("transform", "rotate(90)")
				.attr("class", "textoPromedio")
				.attr("transform", function(d){
				var x = arc.centroid(d)[0];
				var y = arc.centroid(d)[1];
				if(Math.abs(x)>2){
					x-=10;
					y-=12;
					
				}
				return "translate(" + x + "," + y + ")";
				})
				.style("font-size", "0.6rem")
				.text(function(d) { 
					var promedio = Math.round((d.data.population/total)*100);
					return promedio + "%"; 
				});
				
				g.append("text")
						.attr("id", "textoCentralN")
						.attr("transform", "translate(-18,0)")
						.style("font-size", "1rem")
						.style("width", "100")
						.text(function() {
							if(bandera1 == false){
								bandera1 = true; 
								return total
							}else{
								return "";
							}
						})
						
				g.append("text")
					.attr("id", "textoCentral")
					.attr("transform", "translate(-22,10)")
					.style("font-size", "0.5rem")
					.text(function() {
						if(bandera2 == false){
							bandera2 = true;
							return "Estudiantes"
						}else{
							return "";
						}
					})
}

function type(d) {
  d.population = +d.population;
  return d;
}

function hacerDona2(data, total, contenedor){
	var width = ($("body").width() * 0.465) -10,
		height = 140,
		radius = (Math.min(width, height) / 2);	
		
	var color = d3.scale.ordinal()
		.range(colorDonut);
	
	var arc = d3.svg.arc()
    .outerRadius(radius - 20)
    .innerRadius(radius - 40);
	var pi = (Math.PI)/2;
	
	var pie = d3.layout.pie()
    .sort(null)
    .value(function(d) {return d.population; });
	var svg = d3.select("#" + contenedor +"").append("svg")
		.attr("id", "svgNivel")
		.attr("width", width)
		.attr("height", height)
		.append("g")
		.attr("transform", "translate(" + width / 2 + "," + height / 2 + ")");	
	
			 var g = svg.selectAll(".arc")
			.data(pie(data))
			.enter().append("g")
			.attr("class", "arc");
			
			g.append("path")
				.attr("d", arc)
				.style("fill", function(d) { return color(d.data.jornada); });
			
			
			if(data.length == 1){
				var image_width = 20;
				var image_height = 20;
			}else{
				var image_width = 15;
				var image_height = 15;
			}
// add the image



			g.append("svg:image")
				.attr("xlink:href",function (d){
					switch(d.data.jornada){
						case "Preescolar":
							return "imagenes/preescolar1.png"	
							break;
						case "Primaria":
							return "imagenes/primaria1.png"	
							break;
						case "Secundaria":
							return "imagenes/secundaria1.png"	
							break;
						case "Media":
							return "imagenes/media1.png"	
							break;	
					}	
				})
				.attr("transform", function(d){
					if(data.length == 1){
						var x = -60;
						var y =-60;
					}else{
						var x = arc.centroid(d)[0]*1.6 - image_width/2;
						var y = arc.centroid(d)[1]*1.6 - image_height/2;
						
						if(x>60){
							y-=45;
							x-=20;
						}else if (y<-72){
							y+=5;
						}
					}
					
					return "translate(" + x + "," + y + ")";
				})
				.attr("width", image_width)
				.attr("height", image_height);

					
			g.append("text")
				.attr("class", "textoPromedio")
				.attr("transform", function(d){
				var x = arc.centroid(d)[0]-5;
				var y = arc.centroid(d)[1];
				return "translate(" + x + "," + y + ")";
				})
				.style("font-size", "0.6rem")
				.text(function(d) { 
					var promedio = Math.round((d.data.population/total)*100);
					return promedio + "%"; 
				});	
			
					g.append("text")
						.attr("id", "textoCentralN")
						.attr("transform", "translate(-18,0)")
						.style("font-size", "1rem")
						.style("width", "100")
						.text(function() {
							if(bandera1 == false){
								bandera1 = true; 
								return total;
							}else{
								return "";
							}
						})
						
					g.append("text")
						.attr("id", "textoCentral")
						.attr("transform", "translate(-22,10)")
						.style("font-size", "0.5rem")
						.text(function() {
							if(bandera2 == false){
								bandera2 = true;
								return "Estudiantes"
							}else{
								return "";
							}
						})
};


function hacerDona3(data, total, contenedor){
	var width = ($("body").width() * 0.365)-3,
		height = 150,
		radius = (Math.min(width, height) / 2);	
	var color = d3.scale.ordinal()
		.range(colorDonut);
	
	var arc = d3.svg.arc()
    .outerRadius(radius - 0)
    .innerRadius(radius - 20);
	var pi = (Math.PI)/2;
	
	var pie = d3.layout.pie()
    .sort(null)
    .value(function(d) {return d.population; });
	var svg = d3.select("#" + contenedor +"").append("svg")
		.attr("id", "svgInsumo")
		.attr("width", width)
		.attr("height", height)
		.append("g")
		.attr("transform", "translate(" + width / 2 + "," + height / 2 + ")");	
	
			 var g = svg.selectAll(".arc")
			.data(pie(data))
			.enter().append("g")
			.attr("class", "arc");
			
			g.append("path")
				.attr("d", arc)
				.style("fill", function(d) { return color(d.data.jornada); });
			
			
			if(data.length == 1){
				var image_width = 20;
				var image_height = 20;
			}else{
				var image_width = 15;
				var image_height = 15;
			}
// add the image					
			g.append("text")
				.attr("class", "textoPromedio")
				.attr("transform", function(d){
				var x = arc.centroid(d)[0]-5;
				var y = arc.centroid(d)[1];
				return "translate(" + x + "," + y + ")";
				})
				.style("font-size", "0.6rem")
				.text(function(d) { 
					var promedio = d.data.population;
					return promedio + "%"; 
				});	
			
					g.append("text")
						.attr("id", "textoCentralN")
						.attr("transform", function () {
							if(total<10){
								return "translate(-10,0)"
							}else if(total<100){
								return "translate(-20,0)"
							}else{
								return "translate(-17,0)"
							}
						})
						.style("font-size", "1.8rem")
						.style("color" , "rgb(49, 141, 166)")
						.style("width", "100")
						.text(function() {
							if(bandera1 == false){
								bandera1 = true;
								return total;
							}else{
								return "";
							}
						})
						
					g.append("text")
						.attr("id", "textoCentral")
						.attr("transform", "translate(-30,20)")
						.style("font-size", "0.9rem")
						.style("color" , "rgb(49, 141, 166)")
						.text(function() {
							if(bandera2 == false){
								bandera2 = true;
								return "Docentes"
							}else{
								return "";
							}
						})
};

$(".volverMenu").click(onclick, function(){
	cerrarTodos();
	$("#sedeCuentanos").show(anima);
	if(entransporte == true){
		estadoRuta == 0;
		entransporte = false;
		salirTransporte();
	}
});

$(".ubicadorTransporte").click(onclick, function (){
	$(".ubicadorTransporte").css("opacity",0.5);
	$("#barraSesion").hide(anima);
	$(this).css("opacity",1);
	var id = $(this).attr("id");
	console.log(id);
	if(id == "ubicadorOrigen"){
		markerOrigen.setMap(map);
		estadoOrigen = 1;
		estadoDestino = 0;	
	}else if(id =="ubicadorDestino"){
		markerDestino.setMap(map);
		estadoOrigen = 0;
		estadoDestino = 1;	
	}
})
	

function salirTransporte() {
	$("#infocoledistancia").hide();
	enCalcularSitios = false;
	renderer.setMap(null);
	$("#desde_distancia").val("");
	$("#hasta_distancia").val("");
	$("#infocoledistancia").empty();
	markerOrigen.setMap(null);
	markerDestino.setMap(null);
	setGeoBuscadores();
	setMiUbicacion();
	$("#transporteBarra").hide(anima);
	$("#botonPreguntaTransp").css("margin-top", "0");
}
 
/*********************************************************************************************************
											NUEVA ENCUESTA
*********************************************************************************************************/

function conTelefono(){
	var valor = $('input:radio[name=resp1]:checked').val();
	if(valor == "S"){
		$("#siUsaMovil").show(anima);
		$("#noUsaMovil").hide();
		$("#siAccede").show(anima);
	}else if(valor == "N"){
		$("#noUsaMovil").show(anima);
		$("#siUsaMovil").hide();
		$("#siAccede").hide();
	}
}

function tipoConexion(){
	var valor = $('input:radio[name=resp2]:checked').val();
	if(valor== "S"){
		$("#tipoConexion").show(anima);
	}else if(valor== "N"){
		$("#tipoConexion").hide(anima);
	}
	
}

function otrosAccesos(){
	var valor = $('input:radio[name=resp1-2]:checked').val();
	$("#tipoConexion").hide(anima);
	if(valor == "3"){
		$("#siUsaMovil").hide(anima);
		$("#siAccede").hide(anima);
		$("#botonMoviles").css("background-color","#B6134E");
	}else{
		$("#siUsaMovil").show(anima);
		$("#siAccede").show(anima);
		$("#botonMoviles").css("background-color","#EEE");
	}
}    
 
 
 function cerrarTodos(){
		$("#formularioSesion").hide();
		$("#contactoVentana").hide();
		$(".subventana").hide();
		$("#menuInicial").hide(anima);
		$("#cambiarmapa").hide(anima);
		$("#avisoConvivencia").hide(anima);
		$("#sedeEncuesta").show(anima)
}

$("#filtrosOtros").click(onclick, function(){
	$("#filtrosAdicionales").show(anima);
	$("#filtrosPrincipales").hide(anima);
	$("#filtrosNormales").css("background-color","#01B4ED");
	$("#filtrosNormales p").css("color","white");
	$(this).css("background-color","white");
	$("#filtrosOtros p").css("color","#01B4ED");
	$(this).removeClass("sombra");
	$("#filtrosNormales").addClass("sombra2");

})

$("#filtrosNormales").click(onclick, function(){
	$("#filtrosAdicionales").hide(anima);
	$("#filtrosPrincipales").show(anima);
	$("#filtrosOtros").css("background-color","#01B4ED");
	$("#filtrosOtros p").css("color","white");
	$(this).css("background-color","white");
	$("#filtrosNormales p").css("color","#01B4ED");
	$(this).removeClass("sombra2");
	$("#filtrosOtros").addClass("sombra");
})



function salirTransporte() {
	$("#despliegueTransporte").css("background-image","url(imagenes/trianguloVerde.png)");
	$("#infocoledistancia").hide();
	enCalcularSitios = false;
	renderer.setMap(null);
	$("#desde_distancia").val("");
	$("#hasta_distancia").val("");
	$("#infocoledistancia").empty();
	markerOrigen.setMap(null);
	markerDestino.setMap(null);
	setGeoBuscadores();
	setMiUbicacion();
	$("#transporte").hide(anima);
	$("#botonPreguntaTransp").css("margin-top", "0");
}
function ubicarIndicador1(valorSlider,output, valorSlider2){	
	width = $("#slider-range").width();
	// Prevent bubble from going beyond left or right (unsupported browsers)
	if (valorSlider < 0) { newPlace = 0; }
	else if (valorSlider > 1) { newPlace = width; }
	else { newPlace = (width * valorSlider);}
	var texto = "";
	margen = -0.03 * parseFloat($(".categoriasMargen").height());
	//if(valor <=mitad){
	if("profes1Output"==output){
		newPlace-=width/2-5;
		$("#" + output +"").css("left", newPlace + "px").text(valorSlider);
	}else{
		if(valorSlider2!=0){
				newPlace-=width+4;
		}else{
			newPlace-=width-3;
		}
		
		$("#" + output +"").css("left", newPlace + "px").text(valorSlider);
	}
	
	//
}





	
function ubicarIndicador(el){	
			 
	// Measure width of range input
	width = el.width();
	var mitad = (el.attr("max")-el.attr("min"))/2;
	// Figure out placement percentage between left and right of input
	newPoint = (el.val() - el.attr("min")) / (el.attr("max") - el.attr("min"));	  
	offset = -1;
	var ancho1 = $("#outputDistancia").width()/2;
	// Prevent bubble from going beyond left or right (unsupported browsers)
	if (newPoint < 0) { newPlace = 0; }
	else if (newPoint > 1) { newPlace = width; }
	else { newPlace = (width * newPoint); offset -= newPoint; }
	var valor = parseFloat(el.val())
	if(el.attr("id")=="filtroDistanciaR" || el.attr("id")=="sliderCerca"){
		var valor1 = (valor/1000).toFixed(1);
		var texto = "km"
	} else{
		valor1 = valor;
		var texto = "";
	}
	newPlace-= ancho1; 
	margen = -0.03 * parseFloat($(".categoriasMargen").height());
	//if(valor <=mitad){
		var valor3 = valor - el.attr("min")
		var valor2 = (mitad - valor3)/mitad ;
	
	newPlace+= valor2*9; 
	if(el.attr("id")=="sliderCerca"){
		newPlace-=8;
	}else if (el.attr("id")=="numeroEstudiantes"){
		newPlace+=10;
	}else if (changeTasas = true){
		newPlace-=9;
		if(valor1 == 1|| valor ==0){
			newPlace+=5;
		}
		changeTasas = false;
	}
	el
		.next("output")
		.css({
			marginLeft: newPlace + "px"//offset + "%"
		})
		.text(valor1 + texto);		 
}



$("#mostrarResultados").click(onclick, function(){
	mostrarPaneles();
	$("#infoColeEsp").hide(anima);
	nombreTitulo = "Resultados filtro";
	$("#tituloColegiosCercanos").html("");
	$("#tituloColegiosCercanos").html(nombreTitulo);
	$("#ventanaCategoriasDer").show(anima);
	$(this).hide(anima);
	
})

$("#numeroEstudiantes1").change(function() {
		ubicarIndicador($(this));
	})
	
	$("#filtroDistanciaR").change(function() {
		ubicarIndicador($(this));
	})
	
	
	
	$("#sliderCerca").change(function() {
		ubicarIndicador($(this));
	})	

function crearPerfil(){
		$("#formularioSesion #correo").val("");
		$("#formularioSesion #password").val("");
		$("#formularioSesion #nombres").val("");
		$("#formularioSesion #apellidos").val("");
		$("#formularioSesion #tipoDoc").val("1");
		$("#formularioSesion #numeroDoc").val("");
		$("#formularioSesion #diaNac").val("-");
		$("#formularioSesion #mesNac").val("-");
		$("#formularioSesion #anoNac").val("-");
		$("#formularioSesion #roles").val("1");
		$('#seccionFoto #nombre').val("");
		$('#seccionFoto #botonload').hide();
		$('#fotoUsuarioMask').css("background-image", "url(./imagenes/foto.png)");
		$('#sedesAgregadas').html("");
		sedeActiva = [];
		$("#iniciar").hide();
		$("#cambiarmapa").hide();
		$("#cambiartrafico").hide();
		$("#sicoleLogo").hide();
		$("#formularioSesion").show();
		$("#botonSalir").show();
        $("#barraSesion").css("width","90%");
		$("#barraSesion").show(anima);
	} 	
function crearCuentaUsuario(){
	
	$("#contenedorEncuesta").hide(anima);
	$("#ventanaEncuesta").hide(anima);
	$("#menuInicial").hide();
	crearPerfil();
}



function agregarAFavoritos (){
	var numeroDato = cambiaraNumeroDoc(datossesion.tipodocumento);
	var uri = "";
	var palabra= "";
	if (favorito == false){
		$("#estrellaColegioFavorito").css("background-image", "url(imagenes/agregado.png)");
		uri = "http://geoportal.dane.gov.co/wssicole/favoritos.php?operacion=crear";
		uri+="&tipo_documento=" + numeroDato;
		uri+= "&numero_documento=" + datossesion.cedula;
		uri+= "&codigo_sede=" +codsedeActiva;	
		$("#agregarColegioFavorito").text("Agregado a favoritos");
		favorito = true;
		palabra = "Se ha agregado la sede a la lista de tus favoritos";
	}else if (favorito == true){
		$("#estrellaColegioFavorito").css("background-image", "url(imagenes/agregar.png)");
		$("#agregarColegioFavorito").text("Agregar a favoritos");
		favorito = false; 
		uri = "http://geoportal.dane.gov.co/wssicole/favoritos.php?operacion=borrar";
		uri+="&tipo_documento=" + numeroDato;
		uri+= "&numero_documento=" + datossesion.cedula;
		uri+= "&codigo_sede=" +codsedeActiva;
		palabra = "Se ha eliminado esta sede de la lista de tus favoritos";	
	}
	d3.json(encodeURI(uri), function(error, data) {
		if(data.estado==true){
			mensaje("¡Felicitaciones!", palabra );
		}else{
			mensaje("¡Error!", "No se pudo completar la acción");
		}
	});
}

	$("#busquedacolegio").keyup(function(e) {
		var palabra = $("#busquedacolegio").val();
		if( e.which == 8){
			console.log("palabra" + palabra)
			if(palabra.length<2){
				$("#contenedorSedes").hide(anima);
				$("#favoritosSede").show(anima);
				$("#contenedorFavoritos").show(anima);
			}
		}
	});
	
	
 /***************************************************************************************************************************************
													MENÚ FUNCIONALIDADES
 ***************************************************************************************************************************************/

 	/*************  Isocronas   ************/
	
	$("#botonisocronas").click(function() {
		setGeoIsocrona();
		if(enFiltro == true){
			cerrarFiltro();
		}
		if(cercaHabilitado == true){
			cerrarCerca();
		}
		if($("#transporteBarra").css("display") == "block"){
			salirTransporte();
		}
		
		if($("#busqueda").css("display")== "block"){
			$("#contenidoBusqueda").hide(anima);
			$("#busqueda h2").css("text-align", "center").css("margin-bottom", "-1%");
			$("#flechaDespliegue").show(anima)
		}
		
	    $("#minutos").removeClass("ui-shadow-inset ui-body-inherit ui-corner-all ui-slider ui-slider-horizontal ui-widget ui-widget-content");
        $("#ventanaCategoriasIzq").hide(anima);
		$("#nombreIsocronas").hide(anima);
		$("#isocronasInputs").show(anima);
		$("#flechaDespliegue").hide(anima)
			historial_navegacion++;
			ocultarPaneles();
			$("#sliderisocronas p").text($("#minutos").val() + " Minutos");
            $("#drive").css("background-image","url(./imagenes/carro1.png)");
            $("#bicycle").css("background-image","url(./imagenes/bici2.png)");
            $("#caminar").css("background-image","url(./imagenes/camina1.png)");
            $("#caminar").css("background-size","65% auto");
            $("#isocronas").show(anima);
            var tiempo = $("#minutos").val();
            activar = true; 
			
	});	
	
	$("#salir4").click(onclick, function(){
		salirIsocrona();
	});
	
	function salirIsocrona(){	
		zoomInicial = 16;
		MapOperative.init();
		map = MapOperative.loadMap('map_canvas', panorama);
		initializeMap2();
        activar = false;
		$("#isocronas").hide(anima);
		$("#flechaDespliegue").hide(anima);
	}
	
	/************************** Transporte ************************************************/
	
	$("#botondist").click(function (event) {
		if(activar == true){
			salirIsocrona();
		}
		if(cercaHabilitado == true){
			cerrarCerca();
		}
		if(enFiltro ==true){
			cerrarFiltro();
		}
		if($("#busqueda").css("display")== "block"){
			$("#contenidoBusqueda").hide(anima);
			$("#busqueda h2").css("text-align", "center").css("margin-bottom", "-1%");
			$("#flechaDespliegue").show(anima)
		}
		
		$("#desde_distancia").val("");
		$("#hasta_distancia").val("");	
		$("#ventanaCategoriasIzq").hide(anima);
          if($(window).width()>700){
            estadoini = 1;     
          }  
		$("#barramenu").hide();
		$("#abajobotones").hide();
		$("#botonmapas").hide();
		historial_navegacion++;
		
			markerOrigen.setPosition(map.getCenter());
			markerDestino.setPosition(map.getCenter());
			markerOrigen.setMap(null);
			markerDestino.setMap(null);
			estadoOrigen =1;
			estadoDestino = 0;
			setGeocode(map.getCenter());
			modoRecorrido = "";
			$("#WALKING").css("background-image", "url(imagenes/camina1.png)");
			$("#DRIVING").css("background-image", "url(imagenes/carro1.png)");
			$("#TRANSIT").css("background-image","url(imagenes/bus1.png)");
			setTimeout(function () {
				estadoDestino = 1;
				estadoOrigen = 0;
				setGeocode(map.getCenter());
			},100);
			$("#transporteBarra").show(anima);
			
		
	});
	$("#salirFuncionTransporte").click(salirTransporte);
	
	function salirTransporte() {
		$("#flechaDespliegue").hide();
		enCalcularSitios = false;
		renderer.setMap(null);
		$("#transporteBarra").hide(anima);
		$("#desde_distancia").val("");
		$("#hasta_distancia").val("");
		$("#infocoledistancia").empty();
		markerOrigen.setMap(null);
		markerDestino.setMap(null);
		setGeoBuscadores();
		setMiUbicacion();
		$("#botonPreguntaTransp").css("margin-top", "0");
	}
	
	/******************************  Filtros *****************************************************/
	
	$("#botonfiltro").click(function (event) {
		if(activar == true){
			salirIsocrona();
		}
		if(cercaHabilitado == true){
			cerrarCerca();
		}
		if($("#transporteBarra").css("display") == "block"){
			salirTransporte();
		}
		if($("#busqueda").css("display")== "block"){
			$("#contenidoBusqueda").hide(anima);
			$("#busqueda h2").css("text-align", "center").css("margin-bottom", "-1%");
			$("#flechaDespliegue").show(anima)
		}
	
		$("#filtrosNormales").css("background-color", "white")
		$("#filtrosNormales p").css("color", "rgb(1, 180, 237)");
		$("#filtrosNormales").removeClass("sombra2");
		$("#filtrosOtros").css("background-color", "rgb(1, 180, 237)").css("color", "white");
		$("#filtrosOtros p").css("color", "white");
		$("#filtrosOtros").addClass("sombra");
		var barra = $("#barrainferior").height();
		var alturaFiltro = parseFloat($("body").height()) - barra - 40;	
		$("#barrafiltro").height(alturaFiltro);
		$("#nombreFiltros").hide(anima);
		$("#encabezadoFiltro").show(anima);
		$("#flechaDespliegue").hide(anima);
		$("#filtrosPrincipales").show(anima);
		$("#ventanaCategoriasIzq").hide(anima);
        estadoini = 1;
		$("#barrafiltro").show();
		$("#barramenu").hide();
		$("#abajobotones").hide();
		$("#botonmapas").hide();
		$(".botoneraReportes").show(anima);
		historial_navegacion++;
		enFiltro = true;
	});
	
		$("#salirFuncionFiltro").click(cerrarFiltro);
	
	function cerrarFiltro(){
		enFiltro = false;
		reiniciarFiltros();
		radioini = 50000;
		$(".botonesAbajo").css("background-color", "rgb(219, 219, 219)").css("color", "rgb(0, 0, 0)");
		$("#botonTodos").css( "background-color", "rgb(1, 180, 237)").css("color", "rgb(255, 255, 255)");
		lugaresCercanos();
		filtroAbierto = false;
		$("#barrafiltro").hide(anima);
			$(this).height("auto");
		$("#flechaDespliegue").hide();	
	}
	
	/******************************** Cerca a tu sede **********************************************/
	
	$("#botonradar").click(function (event) {
		if($("#infocolecerca").css("display") == "none"){
			if(activar == true){
				salirIsocrona();
			}
			if(enFiltro == true){
				cerrarFiltro();
			}
			if($("#transporteBarra").css("display") == "block"){
				salirTransporte();
			}
			
			$("#ventanaCategoriasIzq").hide(anima);
			cercaHabilitado = true;
			ocultarPaneles();
			if(posicionSedeActual != ""){
				sitiosCerca(posicionSedeActual);
				$("#barraCercaAtuSede").show(anima);
				$("#seleccioneSede").hide();
				$("#lugaresCercanos").show(anima);
				$("#auxiliar2").show(anima);
				$("#distanciaCerca").show(anima);
				$("#nombreSedeCerca").show();
				$("#nombreCercaA").hide(anima);
				$("#flechaDespliegue").hide(anima);
			}else{
				$("#barraCercaAtuSede").hide();
				$("#seleccioneSede").show(anima);
			}	
			$("#infocolecerca").show();
			$("#barramenu").hide();
			$("#abajobotones").hide();
			$("#botonmapas").hide();
			historial_navegacion++;
		}
		
	});	
	
	function cerrarCerca(){
		$("#infocolecerca").hide(anima);
		cercaHabilitado = false;
		if(circulo != null){
			circulo.setMap(null);
		}
		
		for (var i = 0; i < markersSitios.length; i++){
			markersSitios[i].setMap(null);
		}
		markersSitios = [];
		$("#flechaDespliegue").hide(anima);
		
}


/******************************************************************************************************************************************************************
																ISOCRONAS
******************************************************************************************************************************************************************/
																
function showVal(valor){
	$("#sliderisocronas p").text(valor+ " Min");
	//traveltime.setTime(valor);
}

function modo(tipo){
	var tiempo=$("#minutos").val();
	//traveltime.setTime(tiempo);
	switch(tipo)
	{
		case 1:
			//traveltime.setMode(walkscore.TravelTime.Mode.DRIVE);
           // traveltime.setCongestion(true);
			$("#drive").css("background-image","url(./imagenes/carro2.png)");
			$("#bicycle").css("background-image","url(./imagenes/bici1.png)");
			$("#caminar").css("background-image","url(./imagenes/camina1.png)");
			break;
			
		case 2:
			//traveltime.setMode(walkscore.TravelTime.Mode.BIKE);
           // traveltime.setCongestion(false);
			$("#drive").css("background-image","url(./imagenes/carro1.png)");
			$("#bicycle").css("background-image","url(./imagenes/bici2.png)");
			$("#caminar").css("background-image","url(./imagenes/camina1.png)");
			break;    
		case 3:
			//traveltime.setMode(walkscore.TravelTime.Mode.WALK);
           // traveltime.setCongestion(false);
			$("#drive").css("background-image","url(./imagenes/carro1.png)");
			$("#bicycle").css("background-image","url(./imagenes/bici1.png)");
			$("#caminar").css("background-image","url(./imagenes/camina2.png)");
			break;  
	}   
}

$("#botonConfirmarIsocronas").click(onclick, function(){
	var tiempo = parseFloat($("#minutos").val());
	var latitud = parseFloat(centroInicial.lat());
	var longitud = parseFloat(centroInicial.lng());
		
    var coordenadas123 =  latitud + "," + longitud;
	$("#preaload").show();
      

	var traveltime = new walkscore.TravelTime({
	  mode         : walkscore.TravelTime.Mode.WALK,
	  origin       : '47.61460,-122.31704',
	  destinations : ['47.61512,-122.32043', '47.61387,-122.32124',
					  '47.61506,-122.32767']
	});	  
	
	
	setTimeout(function (){
		traveltime.setOrigin(coordenadas123);
	}, 200); 
			
			
	 traveltime.setOptions({
	  map    : map,
	  //mode   : walkscore.TravelTime.Mode.WALK,
	  time   : tiempo,
	  color  : '#3AB8DA'
	});
			
	traveltime.on('show', function(){
	$("#preaload").hide();
		
	  map.fitBounds(traveltime.getBounds());
		
	});	
			
	traveltime.on('error', function (){
	  $("#preaload").hide();
	//mensaje("¡Error!","No se pudo dibujar la isócrona. Inténtelo de nuevo con otros parámetros");    
		 
	});        
       
	
})

/******************************************************************************************************************************************************************
																TRANSPORTE
******************************************************************************************************************************************************************/

// MARCADORES
function setUbicacionGeocodigo(marker_icono){
	$("#marker_origen").css({ opacity: 0.5 });
	$("#marker_destino").css({ opacity: 0.5 });
	$("#" + marker_icono).css({ opacity: 1 });
	
	if(marker_icono == "marker_origen"){
		markerOrigen.setMap(map);
		estadoOrigen = 1;
		estadoDestino = 0;
	}else if(marker_icono == "marker_destino"){
		markerDestino.setMap(map);
		estadoOrigen = 0;
		estadoDestino = 1;
	}
}

function setGeoBuscadores(){
	
	estadoOrigen = 0;
	estadoDestino = 0;
	$("#marker_origen").css({ opacity: 0.5 });
	$("#marker_destino").css({ opacity: 0.5 });
	
}

var modoRecorrido = "TRANSIT";

function setOrigenDestino(origen, destino){
	this.origen = origen;
	this.destino = destino;
	ruta();
}

function setModoRecorrido(modoRecorrido){
	this.modoRecorrido = modoRecorrido;
	$("#TRANSIT").css("background-image","url(imagenes/bus1.png)");
	$("#WALKING").css("background-image","url(imagenes/camina1.png)");
	$("#DRIVING").css("background-image","url(imagenes/carro1.png)");

	switch(modoRecorrido){
		case 'WALKING':
			$("#WALKING").css("background-image","url(imagenes/camina2.png)");
			break;
		case "TRANSIT":
			$("#TRANSIT").css("background-image","url(imagenes/bus2.png)");
			break;
		case "DRIVING":	
			$("#DRIVING").css("background-image","url(imagenes/carro2.png)");
			break;
		default:
			break;	
	}
	
	if(modoRecorrido != ""&& destino != origen){
			ruta();
	}	
}

function ruta() {
	markerOrigen.setMap(null);
	markerDestino.setMap(null);
	var request = {
	  //origin: $('#desde_distancia').val(),
	  //destination: $('#hasta_distancia').val(),
	  origin: origen,
	  destination: destino,
	  travelMode: google.maps.TravelMode[modoRecorrido],
	  provideRouteAlternatives: true,
	};

	directions.route(request, function(response, status) {
	  if (status == google.maps.DirectionsStatus.OK) {
		calcularDistanciaRuta(response.routes[0].legs[0].steps);
		renderer.setDirections(response);
		renderer.setMap(map);
	  } else {
		renderer.setMap(null);
	  }
	});
	$("#infocoledistancia").css("display", "block");
}


function Volverrecorrido (){
		$("#infocoledistancia").css("position", "static");		
		$("#infocoledistancia").css("display", "none");
		$("#volverrecorr").css("position", "static");
		$("#cabezoteruta").css("position", "static");
		$("#infocolepardist").css("display", "block");
		$("#infocoledist").before($("#cabezoteruta"));
		$("#infocoledist").after($("#infocoledistancia"));
		$("#hacerruta").after($("#volverrecorr"));
		$("#volverrecorr").attr("onclick","Regresar()");
		estadoRuta = 0;
}

function calcularDistanciaRuta(pasos){
	var arrayDistancia = new Array();
	var arrayTiempos = new Array();
	var arraySITP = new Array();
	var arraySITPTiempo = new Array();
	arrayDistancia["WALKING"] = 0;
	arrayDistancia["TRANSIT"] = new Array();
	arrayDistancia["DRIVING"] = 0;
	arrayTiempos["WALKING"] = 0;
	arrayTiempos["TRANSIT"] = new Array();
	arrayTiempos["DRIVING"] = 0;
	for(var i = 0; i < pasos.length; i++){
		if(pasos[i].travel_mode == "TRANSIT"){
			var nombre;
			if(pasos[i].transit.line.agencies[0].name == "Transmilenio-Urbana"){
				nombre = "Ruta SITP " + pasos[i].transit.line.short_name;
			}else {
				nombre = "Ruta Transmilenio " + pasos[i].transit.line.short_name;
			}
			arraySITP[nombre] = pasos[i].distance.value;
			arraySITPTiempo[nombre] = pasos[i].duration.value;
		} else {
			arrayDistancia[pasos[i].travel_mode] = arrayDistancia[pasos[i].travel_mode] + pasos[i].distance.value;	
			arrayTiempos[pasos[i].travel_mode] = arrayTiempos[pasos[i].travel_mode] + pasos[i].duration.value;	
		}
		
	}
	arrayDistancia["TRANSIT"] = arraySITP;
	arrayTiempos["TRANSIT"] = arraySITPTiempo;
	if(entransporte == false){
		$("#infocoledistancia").empty();
		var html = "";
		if(arrayDistancia["WALKING"] > 0){
			html += "Distancia caminando: " + arrayDistancia["WALKING"]/1000 + " Km - Tiempo: " + redondeaTiempo(arrayTiempos["WALKING"]) + "</br>";
		}
		for (var ruta in arrayDistancia["TRANSIT"]){
			html += "Distancia en " + ruta + ": " + arrayDistancia["TRANSIT"][ruta]/1000 + " Km - Tiempo: " + redondeaTiempo(arrayTiempos["TRANSIT"][ruta]) + "</br>";
		}
		if(arrayDistancia["DRIVING"] > 0){
			html += "Distancia conduciendo: " + arrayDistancia["DRIVING"]/1000 + " Km - Tiempo: " + redondeaTiempo(arrayTiempos["DRIVING"]) + "</br>";
		}
		
		$("#infocoledistancia").html(html);
		if($("#transporteBarra").css("display")== "block"){
			setTimeout(function(){
				var largo = parseFloat($("#infocoledistancia").height()) +25;
				$("#botonPreguntaTransp").animate({
					marginTop: largo
				})
			},300);
		}
		
	}else{
		var time = 0;
		console.log(arrayTiempos);
		if(arrayDistancia["WALKING"] > 0){
			time = arrayTiempos["WALKING"];
		}
		if(arrayDistancia["DRIVING"] > 0 || arrayDistancia["BICYCLING"] > 0){
			time = arrayTiempos["" + modoRecorrido + ""];
		}
			
			for (var ruta in arrayDistancia["TRANSIT"]){
				console.log("transit" + arrayTiempos["TRANSIT"][ruta]);
				time+= arrayTiempos["TRANSIT"][ruta];
			}
		
		llenarTiempo(time);
		
		
	}	
}

function llenarTiempo(tiempo){
	console.log("tiempo " +tiempo);
	var segundos = (tiempo % 3600);
	var horas = (tiempo - segundos) / 3600;
	$("#horasTransporte").val(horas);
	$("#minTransporte").val(Math.ceil(segundos/60));
}

function redondeaTiempo(tiempo){
	if(tiempo <= 3540){
		return " " + Math.ceil(tiempo/60) + " min";
	}else if(tiempo > 3540 && tiempo < 3660){
		return " una hora";
	}else{
		var segundos = tiempo % 3600;
		var horas = (tiempo - segundos) / 3600;
		return " " + horas + " h " + Math.ceil(segundos/60) + " min"; 
	}
}	



/******************************************************************************************************************************************************************
															FILTROS
******************************************************************************************************************************************************************/

 $("#reporteCompleto").click(function (event) {
		$("#preaload").show();
		nombreTitulo = "Resultados filtro";
		$("#contenedorColegiosCercanos").html("");
		enFiltro = true;
		lugaresCercanos();
        map.setCenter(markerini.getPosition());
		$("#nombreFiltros").show(anima);
		$("#encabezadoFiltro").hide(anima);
		$("#flechaDespliegue").show(anima);
		$(".botoneraReportes").hide(anima);
		$("#filtrosPrincipales").hide(anima)
		$("#filtrosAdicionales").hide(anima)
		$("#barrafiltro").animate({
			bottom: "25px"
		},anima);
		$("#barrafiltro").height("auto");
		$("#ventanaCategoriasDer").show(anima);
		
});	

$("#borrarFiltros").click(onclick, function(){
	reiniciarFiltros();
	$("#tituloColegiosCercanos").text()=="Resultados filtro"
	$("#ventanaCategoriasDer").hide(anima);
	$("#numeroSedesFiltro").hide(anima);
	$("#preaload").show();
	nombreTitulo = "Resultados filtro";
	$("#contenedorColegiosCercanos").html("");
	lugaresCercanos();
    map.setCenter(markerini.getPosition());
	$("#infoColeEsp").hide(anima);
	$("#mostrarResultados").show(anima);
	filtroAbierto = true;
	$("#ventanaCategoriasDer").show();
})

function reiniciarFiltros(){
	filtroAbierto = false;
	$("#filtrosPrincipales :input").prop( "checked", "true");
	$("#filtroDistanciaR").val(2000);
	ubicarIndicador($("#filtroDistanciaR"));
	$("#numeroEstudiantes").val(100);
	ubicarIndicador($("#numeroEstudiantes"));
	$("#filtrosPrincipales output") 
	$( "#slider-range" ).slider( "values", [0,1] );
	ubicarIndicador1(0,"profes1Output", 1);
	ubicarIndicador1(1,"profes2Output", 0);
	$('#filtrosAdicionales :input').val(1.0);
	$('#filtrosAdicionales output').css("margin-left", "95%").text("1.0");
	$('#filtrosPrincipales output').css("margin-left", "92%");
	$('#outputDistancia1').css("margin-left", "42%");
	$("#profes2Output").css("margin-left","42%");
	$("#profes1Output").css("margin-left","42%");
	$("#profes1Output").css("left","-43%");
	$("#sectorOficial").prop("checked", true);
	$("#sectorNoOficial").prop("checked", true);
	
}
