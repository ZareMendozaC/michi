$('#1').click(DrawMovimiento);
$('#2').click(DrawMovimiento);
$('#3').click(DrawMovimiento);
$('#4').click(DrawMovimiento);
$('#5').click(DrawMovimiento);
$('#6').click(DrawMovimiento);
$('#7').click(DrawMovimiento);
$('#8').click(DrawMovimiento);
$('#9').click(DrawMovimiento);
function DrawMovimiento(){
	//alert(this.id);
	$(this).addClass("animated flipOutY");
}