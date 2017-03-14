$('#inicio').click(function(){
	window.location= "index.html"
})
$('#historial').click(function(){
  window.location= "historial.html"
})

var currentGameID;

function onclickBtn()
{
	getSingleGame($(this).parent().data('idgame'));
	$('#lista-juegos').css("display","none")
	$('#lista-comentarios').css("display","block");
	$('#comentar').css("display","block");
	getComentarios($(this).parent().data('idgame'));
	currentGameID=  $(this).parent().data('idgame');
}
function onClickBtnComentar()
{
	enviarComentario(currentGameID, $('#nombre').val(), $('#content').val());
	$('#nombre').val("");
	$('#content').val("");
	$('#nombre').focus();
}
function init(){
	getHistorial();
	$('#lista-juegos').on('click','#ver',onclickBtn);
	$('#btnEnviar').click(onClickBtnComentar);
}
function getHistorial()
{
	$.ajax({
		url:'https://test-ta.herokuapp.com/games'
	}).success(function(_data){
		dibujarHistorial(_data);
	});
}
function dibujarHistorial(_datos)
{
	var lista= $('#lista-juegos');
	for( var i in _datos)
	{
		if(_datos[i].winner_player=="null")
		{
		 lista.append('<li data-idgame='+_datos[i].id+'>'+_datos[i].loser_player+' empataron '+'<button id="ver" class="btn btn-xs pull-right">Comentar</button></li>');
		}
		else{
		lista.append('<li data-idgame='+_datos[i].id+'>'+_datos[i].winner_player+' le ganó a '+_datos[i].loser_player+' en '+_datos[i].number_of_turns_to_win+' movimientos'+'<button id="ver" class="btn btn-xs pull-right">Comentar</button></li>');
		}
	}
}
function getSingleGame(_idGame){
	$.ajax({
		url:'https://test-ta.herokuapp.com/games/'+_idGame,
		type: 'GET'

	}).success(function(_data){
	});
}

function getComentarios(_idGame){
$.ajax({
		url:'https://test-ta.herokuapp.com/games/'+_idGame+'/comments',
		type: 'GET'

	}).success(function(_data){
		dibujarComentarios(_data);
	});

}
function dibujarComentarios(_datos){
	var lista= $('#lista-comentarios');
	lista.empty();
	for(var i in _datos)
	{
		var html= '<li>'+_datos[i].name+' dice: '+'<p>'+_datos[i].content+'</p></li>';
		lista.append(html);
	}
}

function enviarComentario(_idGame, _name, _content){
	$.ajax({
		url:'https://test-ta.herokuapp.com/games/'+_idGame+'/comments',
		type:'POST',
		data:{comment:{ name:_name, content:_content, game_id:_idGame }}
	}).success(function(_data){
		getComentarios(_idGame);
	});

}