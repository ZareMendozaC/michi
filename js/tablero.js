$('#0').click(DrawMovimiento);
$('#1').click(DrawMovimiento);
$('#2').click(DrawMovimiento);
$('#3').click(DrawMovimiento);
$('#4').click(DrawMovimiento);
$('#5').click(DrawMovimiento);
$('#6').click(DrawMovimiento);
$('#7').click(DrawMovimiento);
$('#8').click(DrawMovimiento);

var celdas=[0,0,0,0,0,0,0,0,0];
var win1= [1,1,1,0,0,0,0,0,0];
var win2= [0,0,0,1,1,1,0,0,0];
var win3= [0,0,0,0,0,0,1,1,1];
var numJugadas= 9;
var jugador1=[];
var jugador2=[];
var turnA = true;
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
		if(estaMarcado(posicion)==false)
		{
			celdas[posicion]="a";
			$('#'+posicion).find('img').remove();
			$('#'+posicion).append('<img class= "animated bounce" src="img/star.png"/>');
		}
		else
		{
			alert("esa posición ya esta marcada!");
		}
	}else{
		if(estaMarcado(posicion)==false)
		{
		celdas[posicion]="b";
		$('#'+posicion).find('img').remove();
		$('#'+posicion).append('<img class= "animated bounce" src="img/flor.png"/>');
		}
		else
		{
			alert("esa posición ya esta marcada!");
		}
	}
	console.log(celdas)
	turnA = !turnA;	
}
