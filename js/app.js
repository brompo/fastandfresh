$(document).ready(function(){
//Assign up a class for a clicked menu item
var loc = window.location.pathname;
	//alert(loc);

//Initialize Session Variables

if(sessionStorage.getItem("person")== null){
	var person = {};
}
else
{
	var person = {};
	person = sessionStorage["person"];
}


//Check if the cart is empty or not, then display the items
if(sessionStorage.getItem("cart") == null){
	var cart = [];
	//cart.push({displayname:"Delivery Fee",countname:"deliveryfeecontainer",count:1,price:4000, unit:"",itemtotalcost:4000});
}else
{
	var cart = JSON.parse(sessionStorage["cart"]);
	if(cart.length == 0){
	//cart.push({displayname:"Delivery Fee",countname:"deliveryfeecontainer",count:1,price:4000, unit:"",itemtotalcost:4000});	
};
fillcart(cart);

} 

$(".categoriessidebar").find("a").each(function(){
		//alert($(this).attr('href'));
		$(this).parent().toggleClass('active',$(this).attr('href') == loc);
	});

	appendVegetables(); // Appends data into the vegetable page
	appendHerbs(); // Appends data into the Herbs page
	appendFruits(); // Appends data into the Fruits page
	appendMeats(); //Appends data into the Meats page
	appendDriedGoods(); //Appends data into the dried goods page
	appendCleaningMaterials(); //Appends data into the Cleaning Materials page
	appendmain();
	if(loc == "/checkout.html")
	{
		showcarttable(cart);
		if($.isEmptyObject(person))
		{
			$("#orderContainer").css('display', 'none');
		}
		else
		{
			$("div.authenticationpanel").hide();
			alert(person.firstname);
			$("#inputOrderFirstname").val(person.firstname);
						$("#inputOrderLastname").val(person.lastname);
						$("#inputOrderEmail").val(person.email);
						$("#inputOrderMobile").val(person.mobile);
						$("#inputOrderWhere").val(person.where);
		}
		
		
	}
	else if(loc == "/vegetable.html")
	{
		function appendVegetables(){
		//Read the json file and append the div onto the 
		$.getJSON("data/vegetables.json",function(data){
			appendhtml(data);
		});
	}	
}
else if(loc == "/fruits.html")
{
	function appendFruits(){
		$.getJSON("data/fruits.json",function(data){
			appendhtml(data);
		});
	}
}
else if(loc == "/herbs.html")
{
	function appendHerbs(){
				//Read the json file and append the div onto the 
				$.getJSON("data/herbs.json",function(data){
					appendhtml(data);
				});
			}	
		}
		else if(loc == "meats.html")
		{
			function appendMeats(){
				$.getJSON("data/meatandseafoods.json",function(data){
					appendhtml(data);
				});
			}
		}
		else if(loc == "driedgoods.html")
		{
			function appendDriedGoods(){
				$.getJSON("data/driedgoods.json",function(data){
					appendhtml(data);
				});
			}
		}
		function appendmain(){
	//Read the json file and append the div onto the 
	$.getJSON("data/main.json",function(data){
		appendhtml(data);
	});
}

// Appnding data to the herbs page

//Appending data to the Fruits page


//Appending data to the Meat and Sea Foods page

//Appending data to the Dried Goods page

//Appending data to the Fruits page
function appendCleaningMaterials(){
	$.getJSON("data/cleaningmaterials.json",function(data){
		appendhtml(data);
	});
}

//displayitemcart(cart);
function displayitemcart(cart){
	$.each(cart,function(key,val){
		var itemcountcontainers = val.countname;
		//alert(itemcountcontainers);
		$("."+itemcountcontainers).show();
	});
}


var total = 0;
var totalitems = 0;
var cabbagecontainercount = 0;
var carrotscontainercount = 0;
var celerycontainercount = 0;
var tomatoescontainercount = 0;
var eggplantscontainercount = 0;
var pepperscontainercount = 0;


//Check if the checkout page is fully loaded

//Clicking the add button
$(document).on("click",".qtyplus",function(){

	cabbagecontainercount = $(this).siblings('.qty').val();
	cabbagecontainercount = Number(cabbagecontainercount) + 1;
	$(this).siblings('.qty').val(cabbagecontainercount);

});

//Clicking on the minus button
$(document).on("click",".qtyminus",function(){
	cabbagecontainercount = $(this).siblings('.qty').val();
	if (cabbagecontainercount <= 0){	
	}
	else{
		cabbagecontainercount = Number(cabbagecontainercount) - 1;
		$(this).siblings('.qty').val(cabbagecontainercount);
	}
});

$(document).on("click",".removefromcart",function(e){
	//alert("I am nowhere too");
	e.stopPropagation();
	var fadeoutcontainer = $(this).closest('.cartrow');
	$(fadeoutcontainer).fadeOut(function(){
		this.remove();
	});

	
	var cartitemname = $(fadeoutcontainer).children('.cartitemname').html();
	//[TODO]Remove the cart from the container
	var currentcartrow = $.grep(cart, function(value){
		return value.displayname == cartitemname; 
	});

	var itemtotalcost = currentcartrow[0]['itemtotalcost'];

	//remove item from the cart
	edititemincart(cartitemname,0,itemtotalcost);
	deleteitemsfromcart();
	fillcart(cart);

	var currentcontainername = currentcartrow[0].countname;
	$("#"+currentcontainername).hide();
	//$('#lbl'+currentcontainername).text(val.count+val.unit);

	e.preventDefault();

});


$(document).on("click","a.btn-add",function(e){
	var itemvalue = $(this).closest('div').children('.itemvalue').val();
	var countname = $(this).closest('div').attr('id')+"count";
	var displayname = $(this).closest('div').children('.item_name').html();
	var count = $(this).closest('div').children('.qty').val();
	var unit = $(this).closest('div').children('.itemunit').val();
	var itemtotalcost = Number(itemvalue) * Number(count);

	var exist = 0
	total = 0;
	totalitems = 0;
		//alert(name);

		//[TODO] - Check if the cart is empty
		exist = edititemincart(displayname,count,itemtotalcost);

		//Calls function to remove item from Cart if their count = 0
		deleteitemsfromcart();

		if (exist == 0 & count != 0)
		{
			//Adds to the cart
			additemtocart(displayname,countname,count,itemvalue,unit,itemtotalcost);
		}

		fillcart(cart);

		if(count == 0){
			$('.'+countname).hide();	
		}
		else
		{
			$('.'+countname).show();
		}

		$('#lbl'+countname).text(count+unit);

		e.preventDefault();
		//sessionStorage.delItem("cart");

	});

//On Click of the remove button
$(document).on("click","a.btn-remove",function(){
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

$(document).on("click",".cart-dropdown",function(){
	showcart(cart);
});

//On Click of the checkout button
$(document).on("click","button.btn-checkout",function(){
	if (window.location.pathname != "/checkout.html"){
		window.location.href = "/checkout.html";
	};
	//showcart(cart);
});

//On Load of the cart table

$(document).on("click","#btnsubmitorder",function(){
	//alert("I clicked the register button");
});

//On hide of the modal
/*
$(document).on("hidden","#myModal",function(){
	window.location.href = "/fastandfresh/index.html";
});*/

$('#myModal').on('hidden.bs.modal', function (e) {

	cart = [];
	sessionStorage["cart"] = JSON.stringify(cart);
	console.log(sessionStorage["cart"]);

	window.location.href = "/index.html";
})

// On keyup on the search area
$(document).on("keyup","#vegetablesearch",function(){
	var searchitem = $(this).val().toLowerCase();

	//$("div.greenamaranthus").css("border","3px solid red");
	$("div.itemcontainer").each(function(){
		var idname = $(this).attr('id');
		//alert(idname);
		//alert(classname(indexOf(searchitem)));
		(idname.indexOf(searchitem) != -1) ? $(this).show(): $(this).hide();

	});
	/*
	$("div.vegetablesectionholder").filter(function(index) {
		$(this).hide();
	});
*/
});

//On Click of the register buttom
$(document).on("click","btnregister",function(){
	
});

//On Click of the order form

$(document).on("click","button.btn-order",function(){
	
	//$("#myModal").modal('show');
	var emptyfields  = $(":input.required").filter(function(){
		return $(this).val() === "";
	}).length;
	//alert(emptyfields);
});


// Adding items to the Items List
function addtoitems(itemtoappend,array)
{
	$.each(array,function(key,val){
		itemtoappend.append("<div>"+
			"<label class='cartitemname'>"+mambo+"</label>"+
			"<label class='cartitemvalue'>"+poa+"</label>"+
			"<label class='cartitemcount'>"+hali+"</label>"+
			"</div><br/>");
	});
}

function fillcart(presentcart){
	var carttotal = 0;
	$.each(presentcart,function(key,val){
		carttotal = Number(carttotal) + (Number(val.count) * Number(val.price));
	});
	//console.log(cart);
	if (presentcart.length != 0)
	{
		carttotal = carttotal + 4000;
	}
	
	totalitems = presentcart.length ;
	$("btn-total-checkout").val(carttotal);
	var valuetoshow = "TZS: " + carttotal;
	$("#btn-total-checkout").html(valuetoshow);
	$(".btn-items").html(totalitems + " items");

	
} // fillcart

function additemtocart(displayname,countname,count,itemvalue,unit,itemtotalcost){
	//cart.push({displayname:displayname,countname:countname,count:count,price:itemvalue, unit:unit,itemtotalcost:itemtotalcost});
	cart.push({displayname:displayname,countname:countname,count:count, unit:unit,price:itemvalue,itemtotalcost:itemtotalcost});
	//cart.push({itembought:itembought});
	sessionStorage["cart"] = JSON.stringify(cart);
}
function deleteitemsfromcart()
{
	cart = $.grep(cart, function(value){
		return value.count != 0; 
	});
	sessionStorage["cart"] = JSON.stringify(cart);
}

function edititemincart(displayname,count,itemtotalcost)
{
	var exist = 0;
	$.each(cart,function(key,val){
		if(val.displayname == displayname){
			exist = 1;
			val.count = count;
			val.itemtotalcost = itemtotalcost;
		}
	});
	sessionStorage["cart"] = JSON.stringify(cart);
	return exist;
}

function appendhtml(data){
	//alert(data.category+"sectionholder");

	$.each(data.products,function(key,val){

		var appendel = $("<div id='"+val.name+"' itemscope itemtype='http://schema.org/Product' class='col-xs-6 col-sm-4 col-md-2 col-lg-2 itemcontainer '>"+
			"<div id='"+val.name+"containercount' class='"+val.name+"containercount cartcontainer' hidden>"+
			"<button type='button' class='btn btn-default btn-xs'>"+
			"<span class='glyphicon glyphicon-shopping-cart'></span>"+ 
			"<label class='boughtitems' id='lbl"+val.name+"containercount'></label>"+
			"</button>"+
			"</div>"+
			"<div class='thumbnail'>"+
			"<img data-src='/images/vegetables/cabbage.jpg' src='"+val.picture+"' alt='...'>"+
			"<div itemprop='offers' itemscope itemtype='http://schema.org/Offer' id='"+val.name+"container' class='caption simpleCart_shelfItem cartinfo'>"+
			"<h5 itemprop='name' class='item_name'>"+val.displayname+"</h5>"+
			"<input id='txtcabbage' class='itemvalue item_price' type='text' value='"+val.price+"' hidden>"+
			"<p itemprop='price'>Tsh "+val.price+"/"+val.unit+"</p>"+
			"<input type='button' value='"+val.unit+"' class='itemunit' field='itemunit' hidden>"+
			"<input type='button' value='-' class='qtyminus' field='quantity'>"+
			"<input type='text' name='quantity' value='0' class='qty val"+val.name+"containercount'>"+
			"<input type='button' value='+'' class='qtyplus' field='quantity'>"+
			"<p><a href='#' class='btn btn-default btn-add item_add' role='button'><b> Add to Cart</b></a></p>"+
			"</div>"+
			"</div>"+
			"</div>");
$("."+data.category+"sectionholder").append(appendel);

var itemcountid = appendel.find(".cartcontainer").attr('id');
	//appendel.find(".cartcontainer").show();
	
	$.each(cart,function(key,val){
		if(itemcountid == val.countname){
			appendel.find("#"+val.countname).show();
			$('#lbl'+val.countname).text(val.count+val.unit);
			$('.val'+val.countname).val(val.count);
		}
	});
	//alert("I am here");


});

}//Append HTML

function showcart(cart){
	var cartitems = "<tr ><th>Item</th><th>Qty</th><th>Price</th><th>Delete</th></tr>";

	$.each(cart,function(key,val){
		//alert(val.name);

		cartitems += "<tr class='cartrow'><td class='cartitemname'>"+val.displayname+"</td><td class='cartitemcount'>"+val.count+" "+val.unit+
		"</td><td>"+val.itemtotalcost+"</td><td><a href='#'><span class='glyphicon glyphicon-trash removefromcart'></span></a></td>";

	});
	cartitems += "<tr class='cartrow deliverypricerow'><td class='cartitemname'>Delivery Fee</td><td class='cartitemcount'></td><td>4000</td><td></td>";

	$(".cartitems").html(cartitems);
}
function showcarttable(cart){
	var cartitems = "<tr ><th>Item</th><th>Qty</th><th>Price</th><th></th></tr>";

	$.each(cart,function(key,val){
		//alert(val.name);

		cartitems += "<tr class='cartrow'><td class='cartitemname'>"+val.displayname+"</td><td class='cartitemcount'><input type='text' value="+val.count+" /> "+val.unit+
		"</td><td>"+val.itemtotalcost+"</td><td><a href='#'><span class='glyphicon glyphicon-trash removefromcart'></span></a></td>";

	});
	cartitems += "<tr class='cartrow deliverypricerow'><td class='cartitemname'>Delivery Fee</td><td class='cartitemcount'></td><td>4000</td><td></td>";

	$(".cartitems").html(cartitems);
}
//Add items to the cart and display
/*
function showcart(cart)
{
	//$.each(cart,function(key,val){
	//	$(".cartitems").append("<tr><td>"+
	//		"</td><td>"+ val.name
	//		"</td><td>"+ val.count
	//		"</td><a href=''><span class='glyphicon glyphicon-trash'></span></a><td>"+ 
			"</td></tr>");
	//});
	
}
*/
});