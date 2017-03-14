$('#inicio').click(function(){
	window.location= "index.html"
})
$('#historial').click(function(){
	window.location= "historial.html"
})
$('#enviarHistorial').click(enviarHistorial);

function enviarHistorial(_ganador,_perdedor,_numJugadas){
	$.ajax({
		url:'http://test-ta.herokuapp.com/games',
		type:'POST',
		data:{
			game:
			{ winner_player:_ganador, loser_player:_perdedor, number_of_turns_to_win:_numJugadas }}
	}).success(function(_data){

	});
}
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

var ganadoras = [ [0, 1, 2], [3, 4, 5] , [6, 7, 8], [0, 3, 6], [1, 4, 7], [2, 5, 8], [0, 4, 8],[2, 4, 6]];
var celdas=[0,0,0,0,0,0,0,0,0];
var numJugadas= 9;
var jugador1='a';
var jugador2='b';
var turnA = true;
var jugarMaquina = false;
var modoJuego= localStorage.getItem("jugadorB");
var nombreJugadorA= localStorage.getItem("jugadorA");
var nombreJugadorB= localStorage.getItem("jugadorB");
var numJugadasA=0;
var numJugadasB=0;
function init(){
	ModoJuego();
	$('#turno').html('Turno de ' +nombreJugadorA);
	$('#movimiento1').html(numJugadasA);
	$('#movimiento2').html(numJugadasB);
	$('.nombA').html('Movimientos de: '+ nombreJugadorA);
	$('.nombB').html('Movimientos de: '+ nombreJugadorB);

}
function ModoJuego(){

	if(modoJuego=='maquina')
	{
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
		$('#turno').html('Turno de ' +nombreJugadorB);
		console.log(1);
		if(estaMarcado(posicion)==false)
		{
			celdas[posicion] = jugador1;
			$('#'+posicion).find('img').remove();
			$('#'+posicion).append('<img class= "animated bounce" src="img/star.png"/>');
			numJugadasA+=1;
			$('#movimiento1').html(numJugadasA);
			setTimeout(function(){
				if(comprobarGanador(jugador1)){
					//alert('gano jugador1');
					$('#ganador').html('Ganó '+nombreJugadorA+' !!!');
					enviarHistorial(nombreJugadorA,nombreJugadorB,numJugadasA);
				} else {
					if(jugarMaquina){
						$('#turno').html('Turno de ' +nombreJugadorA);
						if(celdas.indexOf(0) != -1) {

							var posMaquina = jugadaAleatoria();
							celdas[posMaquina] = jugador2;
							$('#'+posMaquina).find('img').remove();
							$('#'+posMaquina).append('<img class= "animated bounce" src="img/flor.png"/>');
							numJugadasB+=1;
							$('#movimiento2').html(numJugadasB);
							if(comprobarGanador(jugador2)){
								//alert('gano jugador2');
								$('#ganador').html('Ganó '+nombreJugadorB+' !!!');
								enviarHistorial(nombreJugadorB,nombreJugadorA,numJugadasB);
							}
						} else {
							$('#ganador').html('Empate!!!');
							enviarHistorial("null",nombreJugadorA+' y '+nombreJugadorB,numJugadasA);
						}
					}
				}
			},800);
		}
		else
		{
			alert("esa posición ya esta marcada!");
		}
	}else{
		console.log(2);
		$('#turno').html('Turno de ' +nombreJugadorA);
		if(estaMarcado(posicion)==false)
		{
			celdas[posicion] = jugador2;
			$('#'+posicion).find('img').remove();
			$('#'+posicion).append('<img class= "animated bounce" src="img/flor.png"/>');
			numJugadasB+=1;
			$('#movimiento2').html(numJugadasB);
			if(comprobarGanador(jugador2)){
				//alert('gano jugador2');
				$('#ganador').html('Ganó '+nombreJugadorB+' !!!');
				enviarHistorial(nombreJugadorB,nombreJugadorA,numJugadasB);
			}
		}
		else
		{
			alert("esa posición ya esta marcada!");
		}
	}
	if(!jugarMaquina){
		turnA = !turnA;
		if(celdas.indexOf(0) == -1) {
			//alert("empate!!!");
			$('#ganador').html('Empate!!!!');
			enviarHistorial("null",nombreJugadorA+' y '+nombreJugadorB,numJugadasA);
		}
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

