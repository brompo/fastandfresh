$(document).ready(function(){
//Assign up a class for a clicked menu item
var loc = window.location.pathname;
	//alert(loc);
	$(".categoriessidebar").find("a").each(function(){
		//alert($(this).attr('href'));
		$(this).parent().toggleClass('active',$(this).attr('href') == loc);
	});

	$(".cartcontainer").hide();


	//Read the json file and append the div onto the 
	$.getJSON("data/product.json",function(data){
		$.each(data.products,function(key,val){
			$(".sectionholder").append("<div class='col-sm-3 col-md-2'>"+
              "<div class='cartcontainer'>"+
              "<button type='button' class='btn btn-default btn-xs'>"+
                  "<span class='glyphicon glyphicon-shopping-cart'></span>"+ 
                  "<label class='boughtcabbage' id='lblcabbagecount'>1kg</label>"+
                "</button>"+
              "</div>"+
              "<div class='thumbnail'>"+
                "<img data-src='/images/vegetables/cabbage.jpg' src='"+val.picture+"' alt='...'>"+
                "<div id='cabbagecontainer' class='caption'>"+
                  "<h5><b>"+val.displayname+"</b></h5>"+
                  "<input id='txtcabbage' class='itemvalue' type='text' value='1500' hidden>"+
                  "<p>Tsh "+val.price+"/"+val.unit+"</p>"+
                  "<input type='button' value='-' class='qtyminus' field='quantity'>"+
                  "<input type='text' name='quantity' value='1' class='qty'>"+
                  "<input type='button' value='+'' class='qtyplus' field='quantity'>"+
                  "<p><a href='#' class='btn btn-default btn-add' role='button'><b> Add to Cart</b></a></p>"+
                "</div>"+
              "</div>"+
            "</div>");
		});
	});

var total = 0;
var totalitems = 0;
var cabbagecontainercount = 0;
var carrotscontainercount = 0;
var celerycontainercount = 0;
var tomatoescontainercount = 0;
var eggplantscontainercount = 0;
var pepperscontainercount = 0;


//Clicking the add button
$(".qtyplus").click(function(e){
	e.preventDefault();

	cabbagecontainercount = $(this).siblings('.qty').val();
	cabbagecontainercount = Number(cabbagecontainercount) + 1;
	$(this).siblings('.qty').val(cabbagecontainercount);
	/* Removed as its redundant
	
	//alert($(this).closest('div').children('.qty').val());
	var itemvalue = $(this).closest('div').children('.itemvalue').val();
	total = Number(cabbagecontainercount)* Number(itemvalue);
	var sentvalue = Number(itemvalue) * Number($(this).siblings('.qty').val());

var valuetoshow = "TZS: " + total;

		$("#btn-total-checkout").html(valuetoshow);
*/
});


$(".qtyminus").click(function(){

	//cabbagecontainercount = $(this).closest('div').children('.qty').val();
	cabbagecontainercount = $(this).siblings('.qty').val();
	if (cabbagecontainercount <= 0){	
	}
	else{
	cabbagecontainercount = Number(cabbagecontainercount) - 1;
	$(this).siblings('.qty').val(cabbagecontainercount);
	//alert($(this).closest('div').children('.qty').val());
	}
	/* Removed as its redundant
	var itemvalue = $(this).siblings('.itemvalue').val();
	total = Number(cabbagecontainercount)* Number(itemvalue);

	var valuetoshow = "TZS: " + total;

		$("#btn-total-checkout").html(valuetoshow);
	*/
});




$("a.btn-add").click(function(){
	//if($(this).parent().closest('div').)

//alert(total);
        var itemvalue = $(this).closest('div').children('.itemvalue').val();
	    if(cabbagecontainercount > 0)
	    {
	    	//$(this).parent().children('.btn-remove').show();
	    	//check if the count has more than one item
	    }

		//$("btn-total-checkout").attr('value') = value;
		cabbagecontainercount = $(this).closest('div').children('.qty').val();
		total = Number(itemvalue) * Number(cabbagecontainercount);

		$("btn-total-checkout").val(total);

		var valuetoshow = "TZS: " + total;

		$("#btn-total-checkout").html(valuetoshow);
		$(".cartcontainer").show();
		$('label.boughtcabbage').show().text(cabbagecontainercount+"kg");


	});

//On Click of the remove button
 $("a.btn-remove").click(function(){
 	
 	
	var sentvalue = $(this).parent().closest('div').children('.itemvalue').val();
	cabbagecontainercount = Number(cabbagecontainercount) - Number(1);
 	//alert(cabbagecontainercount);
 	  if(cabbagecontainercount == 0)
	    {
	    	$(this).hide();
	    }
		//$("btn-total-checkout").attr('value') = value;
		total = Number(total) - Number(sentvalue);

		$("btn-total-checkout").val(total);

		var valuetoshow = "TZS: " + total;

		$("#btn-total-checkout").html(valuetoshow);
});

});
