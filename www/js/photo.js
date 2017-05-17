$(document).ready(function () {
	
	$('#form').ajaxForm(function(data) { 
        console.log(data); 
		if(data == true){
			$("#botonload").hide(500);   
			$("#nombre").val(usuario);	
			fotoarriba = 1;
		}
		else{
			alert("Error al subir la foto de perfil");
		}
    });	
	
	$('#form1').ajaxForm(function(data) { 
        console.log(data); 
		if(data == true){
			$("#seccionPerfil #botonload").hide(500);   
		}
		else{
			alert("Error al subir la foto de perfil");
		}
    });	
	
	
	//Function for preview image.
    function imageIsLoaded(e) {

        $('#fotoUsuarioMask').css("background-image", "url(" + e.target.result + ")");  
        $("#botonload").show(500);   
		
    }
		//Function for preview image.
    function imageIsLoaded2(e) {
		console.log(e.target.result )
        $('#seccionPerfil #fotoUsuarioMask').css("background-image", "url(" + e.target.result + ")");  
        $("#seccionPerfil #botonload").show(500);   
		
    }
    
    $(function () {
        $("#file").change(function () {
		console.log("oauis");
            if (this.files && this.files[0]) {
                var reader = new FileReader();
                reader.onload = imageIsLoaded;
                reader.readAsDataURL(this.files[0]);	
            }
        });
    });
   
});


	