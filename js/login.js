$('#otroJugador').click(function(){
	$('#jugador1').css("display","block");
	$('#jugador2').css("display","block");
	$('#botones').css("display","none");
	$('#login').css("display","block");
	$('#nombre1').removeAttr('disabled');
	$('#nombre1').focus();
})
$('#computadora').click(function(){
	$('#jugador1').css("display","block");
	$('#botones').css("display","none");
	$('#login').css("display","block");
	$('#nombre1').removeAttr('disabled');
	$('#nombre1').focus();
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
  	window.location= "tablero.html";
});

$('#inicio').click(function(){
	window.location= "index.html"
})
$('#historial').click(function(){
  window.location= "historial.html"
})