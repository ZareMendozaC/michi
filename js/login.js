$('#otroJugador').click(function(){
	$('#jugador1').css("display","block");
	$('#jugador2').css("display","block");
	$('#botones').css("display","none");
	$('#login').css("display","block");
	$('#nombre1').removeAttr('disabled');
	$('#nombre1').focus();
	localStorage.setItem('tipo','vs');
})
$('#computadora').click(function(){
	$('#jugador1').css("display","block");
	$('#botones').css("display","none");
	$('#login').css("display","block");
	$('#nombre1').removeAttr('disabled');
	$('#nombre1').focus();
	localStorage.setItem('tipo','computadora');
})

function setObjectLocalStorage(key, value) {
    localStorage.setItem(key, JSON.stringify(value));
}
function getObjectLocalStorage(key) {
    var value = localStorage.getItem(key);
    return JSON.parse(value);
}

$('#login').click(function(){
  	var jugadorA= $('#nombre1').val();
	var jugadorB= $('#nombre2').val();
	var tipoJuego= localStorage.getItem('tipo');


	var isvalidVs= true;
	var isvalidPc= true;
	if(tipoJuego=='vs')
	{
		if(jugadorA=='')
			{
			isvalidVs= false;
			$('#nombre1').addClass('animated pulse');
			swal("Atención!", "Por favor ingrese el nombre del jugador1", "error");

		}
		if (jugadorB=='') {
			isvalidVs= false;
			$('#nombre2').addClass('animated pulse');
			swal("Atención!", "Por favor ingrese el nombre del jugador2", "error");
		}
		else{
			if (isvalidVs) 
			{
				setObjectLocalStorage('jugadorA',jugadorA);
				setObjectLocalStorage('jugadorB',jugadorB);
				window.location= "tablero.html";
			}
		}
	}
	else
	{
		if(jugadorA=='')
			{
			isvalidPc=false;
			$('#nombre1').addClass('animated pulse');
			swal("Atención!", "Por favor ingrese el nombre del jugador1", "error");
		}
		else{
			if (isvalidPc) {
				localStorage.setItem('jugadorB','maquina');
				setObjectLocalStorage('jugadorA',jugadorA);
				window.location= "tablero.html";
			}
		}
	}



/*

	setObjectLocalStorage('jugadorA',jugadorA);
	if(jugadorB=="")
	{
		//setObjectLocalStorage('jugadorB','maquina');
		localStorage.setItem('jugadorB','maquina');
	}
	else 
	{
	setObjectLocalStorage('jugadorB',jugadorB);
	}
  	window.location= "tablero.html";*/
});

$('#inicio').click(function(){
	window.location= "index.html"
})
$('#historial').click(function(){
  window.location= "historial.html"
})