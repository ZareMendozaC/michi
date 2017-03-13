$('#0').click(DrawMovimiento);
$('#1').click(DrawMovimiento);
$('#2').click(DrawMovimiento);
$('#3').click(DrawMovimiento);
$('#4').click(DrawMovimiento);
$('#5').click(DrawMovimiento);
$('#6').click(DrawMovimiento);
$('#7').click(DrawMovimiento);
$('#8').click(DrawMovimiento);
function setObjectLocalStorage(key, value) {
    localStorage.setItem(key, JSON.stringify(value));
}
function getObjectLocalStorage(key) {
    var value = localStorage.getItem(key);
    return JSON.parse(value);
}

var ganadoras = [ [0, 1, 2], [3, 4, 5] , [6, 7, 8], [0, 3, 6], [1, 4, 7], [2, 5, 8], [0, 4, 8]];
var celdas=[0,0,0,0,0,0,0,0,0];
var numJugadas= 9;
var jugador1='a';
var jugador2='b';
var turnA = true;
var jugarMaquina = false;
var modoJuego= localStorage.getItem("jugadorB");
ModoJuego();

function ModoJuego(){
	if(modoJuego=='maquina')
	{
		alert(modoJuego);
		jugarMaquina=true;
	}
	else
	{
		jugarMaquina=false;
	}
}


function DrawMovimiento(){
	posicion=this.id;
	marcar(posicion);
	$(this).find('#cubo').addClass("animated flipOutY");
}
function estaMarcado(posicion)
{
	if(celdas[posicion]!=0)
		return true;
	else
		return false;
}
function marcar(posicion)
{
	if(turnA)
	{
		console.log(1);
		if(estaMarcado(posicion)==false)
		{
			celdas[posicion] = jugador1;
			$('#'+posicion).find('img').remove();
			$('#'+posicion).append('<img class= "animated bounce" src="img/star.png"/>');

			setTimeout(function(){
				if(comprobarGanador(jugador1)){
					alert('gano jugador1');
				} else {
					if(jugarMaquina){

						if(celdas.indexOf(0) != -1) {

							var posMaquina = jugadaAleatoria();
							celdas[posMaquina] = jugador2;
							$('#'+posMaquina).find('img').remove();
							$('#'+posMaquina).append('<img class= "animated bounce" src="img/flor.png"/>');
							if(comprobarGanador(jugador2)){
								alert('gano jugador2');
							}
						} else {
							alert("empate");
						}
					}
				}
			},500);
		}
		else
		{
			alert("esa posición ya esta marcada!");
		}
	}else{
		console.log(2);
		if(estaMarcado(posicion)==false)
		{
			celdas[posicion] = jugador2;
			$('#'+posicion).find('img').remove();
			$('#'+posicion).append('<img class= "animated bounce" src="img/flor.png"/>');
			if(comprobarGanador(jugador2)){
				alert('gano jugador2');
			}
		}
		else
		{
			alert("esa posición ya esta marcada!");
		}
	}
	if(!jugarMaquina){
		turnA = !turnA;
	}
}

function comprobarGanador(marcador){
	var gana = true;
	for( var posGanadoras = 0; posGanadoras < ganadoras.length; posGanadoras++){
		gana = true;
		for( var pos = 0; pos < ganadoras[posGanadoras].length; pos++){
			gana = gana && (celdas[ganadoras[posGanadoras][pos]] == marcador);
		}
		if (gana){
			return gana;
		}
		gana = false;
	}
	return gana;
}

function aleatorio(a,b) {
	return Math.round(Math.random()*(b-a)+parseInt(a));
}

function jugadaAleatoria(){
	var valida = false;
	var pos = 0;
	do{
		pos = aleatorio(0,9);
		if(!estaMarcado(pos)){
			valida = true;
		}
	} while(valida == false)

	return pos;
}

