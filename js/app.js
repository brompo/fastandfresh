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
	person = JSON.parse(sessionStorage["person"]);
	displayuser(person['firstname']);
	addaccountlinks();
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
if(loc == "/fastandfresh/index.html")
{
	appendmain();
}

else if(loc == "/fastandfresh/vegetables.html")
{
	appendVegetables(); // Appends data into the vegetable page
}
else if(loc == "/fastandfresh/herbs.html")
{
	appendHerbs(); // Appends data into the Herbs page
}
else if(loc == "/fastandfresh/fruits.html")
{
	appendFruits(); // Appends data into the Fruits page
}
else if(loc == "/fastandfresh/meats.html")
{
	appendMeats(); //Appends data into the Meats page
}
else if(loc == "/fastandfresh/driedgoods.html")
{
	appendDriedGoods(); //Appends data into the dried goods page
}
	//appendCleaningMaterials(); //Appends data into the Cleaning Materials page
	if(loc == "/fastandfresh/checkout.html")
	{
		showcarttable(cart);
		if($.isEmptyObject(person))
		{
			$("#orderContainer").css('display', 'none');
		}
		else
		{
			$("div.authenticationpanel").hide();
			//alert(person.firstname);
			$("#inputOrderFirstname").val(person.firstname);
			$("#inputOrderLastname").val(person.lastname);
			$("#inputOrderEmail").val(person.email);
			$("#inputOrderMobile").val(person.mobile);
			$("#inputOrderWhere").val(person.where);
		}
		
		
	}

	function appendmain(){
	//Read the json file and append the div onto the 
	$.getJSON("data/main.json",function(data){
		appendhtml(data);
	});
}

function appendVegetables(){
		//Read the json file and append the div onto the 
		$.getJSON("data/vegetables.json",function(data){
			appendhtml(data);
		});
	}

	function appendFruits(){
		$.getJSON("data/fruits.json",function(data){
			appendhtml(data);
		});
	}

	function appendHerbs(){
				//Read the json file and append the div onto the 
				$.getJSON("data/herbs.json",function(data){
					appendhtml(data);
				});
			}	

			function appendMeats(){
				$.getJSON("data/meatandseafoods.json",function(data){
					appendhtml(data);
				});
			}
			function appendDriedGoods(){
				$.getJSON("data/driedgoods.json",function(data){
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
/*
$(document).on("click",".qtyplus",function(){

	cabbagecontainercount = $(this).siblings('.qty').val();
	cabbagecontainercount = Number(cabbagecontainercount) + 1;
	$(this).siblings('.qty').val(cabbagecontainercount);

});
*/

$(document).on("click",".qtyplus",function(e){
	var quantity = $(this).siblings('.qty').val();
	var newquantity = Number(quantity)+ 1;
	$(this).siblings('.qty').val(newquantity);

	//[TODO] Update the information on the screen and the cart.
	//alert("I am here");

	var itemvalue = $(this).closest('div').children('.itemvalue').val();
	var countname = $(this).closest('div').attr('id')+"count";
	var displayname = $(this).closest('div').children('.item_name').html();
	var count = $(this).closest('div').children('.qty').val();
	var unit = $(this).closest('div').children('.itemunit').val();
	var itemtotalcost = Number(itemvalue) * Number(count);
	var itemID = $(this).closest('div').children('.itemID').val();

	var totalprice = $(this).parent().siblings('.dataitemcost').html();
	//var newtotalprice = unitprice * newquantity;

	$(this).parents().siblings('.dataitemcost').html(itemtotalcost);

	var exist = 0
	exist =edititemincart(displayname,newquantity,itemtotalcost);

	if (exist == 0 & count != 0){
		additemtocart(displayname,countname,count,itemvalue,unit,itemtotalcost,itemID); 	
	}
	

	fillcart(cart);
	e.preventDefault();

	if(count == 0){
		$('.'+countname).hide();	
	}
	else
	{
		$('.'+countname).show();
	}

	$('#lbl'+countname).text(count+unit);




});


//Clicking on the minus button
$(document).on("click",".qtyminus",function(e){
	var quantity = $(this).siblings('.qty').val();
	if (quantity <= 0){	
	}
	else{
		var newquantity = Number(quantity)- 1;
		$(this).siblings('.qty').val(newquantity);

	//[TODO] Update the information on the screen and the cart.
	//alert("I am here");

	var itemvalue = $(this).closest('div').children('.itemvalue').val();
	var countname = $(this).closest('div').attr('id')+"count";
	var displayname = $(this).closest('div').children('.item_name').html();
	var count = $(this).closest('div').children('.qty').val();
	var unit = $(this).closest('div').children('.itemunit').val();
	var itemtotalcost = Number(itemvalue) * Number(count);
	var itemID = $(this).closest('div').children('.itemID').val();

	var totalprice = $(this).parent().siblings('.dataitemcost').html();
	//var newtotalprice = unitprice * newquantity;

	$(this).parents().siblings('.dataitemcost').html(itemtotalcost);

	var exist = 0
	exist =edititemincart(displayname,newquantity,itemtotalcost);
	deleteitemsfromcart();

	if (exist == 0 & count != 0){
		additemtocart(displayname,countname,count,itemvalue,unit,itemtotalcost,itemID); 	
	}

	if(count == 0){
		$('.'+countname).hide();	
	}
	else
	{
		$('.'+countname).show();
	}

	$('#lbl'+countname).text(count+unit);

}


fillcart(cart);
e.preventDefault();
});

//Clicking on the add button of the checkout page
$(document).on("click",".addglyphicon",function(e){

	var quantity = $(this).siblings('.qty').val();
	var newquantity = Number(quantity)+ 1;
	$(this).siblings('.qty').val(newquantity);

	//[TODO] Update the information on the screen and the cart.
	//alert("I am here");

	var totalprice = $(this).parent().siblings('.dataitemcost').html();
	var unitprice = $(this).parent().siblings('.itemprice').html();
	var displayname = $(this).parent().siblings('.cartitemname').html()
	var newtotalprice = unitprice * newquantity;

	$(this).parents().siblings('.dataitemcost').html(newtotalprice);

	edititemincart(displayname,newquantity,newtotalprice);


	fillcart(cart);
	e.preventDefault();
	//var totalprice = 0;
	//var item = '';

});
//Clicking on the remove button of the checkout page
$(document).on("click",".removeglyphicon",function(e){
	var quantity = $(this).siblings('.qty').val();
	if(quantity <= 1){

	}else{
		var newquantity = Number(quantity) - 1;
		$(this).siblings('.qty').val(newquantity);	
		var totalprice = $(this).parent().siblings('.dataitemcost').html();
		var unitprice = $(this).parent().siblings('.itemprice').html();
		var displayname = $(this).parent().siblings('.cartitemname').html()
		var newtotalprice = unitprice * newquantity;

		$(this).parents().siblings('.dataitemcost').html(newtotalprice);

		edititemincart(displayname,newquantity,newtotalprice);

		fillcart(cart);

	}
	e.preventDefault();
	
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

//Check if the item in the cart has been changed
$(document).on("focusout",".inputcartcount",function(){
//[TODO] Implement if the item is changed, to update the cart
var newquantity = $(this).val();

var unitprice = $(this).parent().siblings('.itemprice').html();
var displayname = $(this).parent().siblings('.cartitemname').html()
var newtotalprice = unitprice * newquantity;

$(this).parents().siblings('.dataitemcost').html(newtotalprice);

edititemincart(displayname,newquantity,newtotalprice);
fillcart(cart);

	/*
    $('#carttable tr').each(function(){
    	var name = $('td:nth-child(1)').text();
    	alert(name);
        if($(this).find('td').eq(0).text() == cartitemname){
      //      $('td:nth-child(3)').html(itemtotalcost);
        }
    });
*/

edititemincart(cartitemname,changedvalue,itemtotalcost);
fillcart(cart);
	//alert(itemtotalcost);


});


$(document).on("click","a.btn-add",function(e){
	var itemvalue = $(this).closest('div').children('.itemvalue').val();
	var countname = $(this).closest('div').attr('id')+"count";
	var displayname = $(this).closest('div').children('.item_name').html();
	var count = $(this).closest('div').children('.qty').val();
	var unit = $(this).closest('div').children('.itemunit').val();
	var itemtotalcost = Number(itemvalue) * Number(count);
	var itemID = $(this).closest('div').children('.itemID').val();

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
			additemtocart(displayname,countname,count,itemvalue,unit,itemtotalcost,itemID);
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

//OnClick event for Login Button
$(document).on("click","#btnprofilename",function(e){
	if(checkpersonsession() === true){
	}
	else
	{
		if (window.location.pathname != "/checkout.html"){
			window.location.href = "/checkout.html";
		};
	}

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

$('#btnlogoutconfirm').on('click',function(){
	sessionStorage.removeItem('person');

	window.location.href = "/checkout.html";

});


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
	
	var emptyfields  = $(":input.required").filter(function(){
		return $(this).val() === "";
	}).length;
	//alert(emptyfields);
});

if (window.location.pathname == "/order.html"){

	var persondetails = JSON.parse(sessionStorage["person"]);
	var personID = persondetails["ID"];
	var data = retrieveorders(personID);
   	//alert(data);

   }


//////// Function Areas ////////

function retrieveorders(personID){
	$.ajax({
		url: 'include/BL/orderBL.php',
		type: 'POST',
		dataType: 'json',
		data: {action:"retrieveorders",personID:personID},
		success:function(response){
			//alert(response);
						//[TODO] Display the data on a table format
							displayorders(response);
						//displayorders(response);
					//var data = $.parseJSON(response);
	//				return data;

},
error:function(ts){
	var error = ts.responseText;
						//alert(error);
					}
				});

}
function displayorders(orders){
	$('#tblOrders').DataTable({
		data:orders,
		columns:[
		{title:"OrderNo",},
		{title:"Order Date"},
		{title:"Delivery Date"},
		{title:"Amount"},
		{title:"Status"},
		{title:"Comments","width":"30%"}],

		"order": [[ 0, "desc" ]]
	});

	/*
	$.each(data,function(key, val) {
		var appendel = ("<tr><td>"+val.ID+"</td><td>"+val.orderdate+"</td><td>"+val.deliverydate+"</td><td>"+val.comments+"</td><td>"+val.status+"</td><td>"+val.amount+"</td></tr>");
	$("#tblOrders tbody").append(appendel);
	
	});
	*/
}

function checkpersonsession(){
	if(sessionStorage.getItem("person")== null){
		return false;
	}
	else
	{
		return true;
	}
}

function addaccountlinks(){
	var data = "<ul class='dropdown-menu dropdown-menu-right accountdetail' aria-labelledby='dropdownMenu1'>"+
	"<li><a href='#'><span class='glyphicon glyphicon-user'></span> Account</a></li>"+
	"<li><a href='order.html'><span class='glyphicon glyphicon-tasks'></span> Order History</a></li>"+
	"<li role='separator' class='divider'></li>"+
	"<li>"+
	"<a href='#' id='logoutlink' data-toggle='modal' data-target='#logoutModal'><span class='glyphicon glyphicon-log-out'></span>  Logout</a>"+
	"</li>"+
	"</ul>"
	$("#accountcontainer").append(data);
}

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

function additemtocart(displayname,countname,count,itemvalue,unit,itemtotalcost,itemID){
	//cart.push({displayname:displayname,countname:countname,count:count,price:itemvalue, unit:unit,itemtotalcost:itemtotalcost});
	cart.push({displayname:displayname,countname:countname,count:count, unit:unit,price:itemvalue,itemtotalcost:itemtotalcost,itemID:itemID});
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
			"<button type='button' class='btn btn-default btn-xs btn-counter'>"+
			"<span class='glyphicon glyphicon-shopping-cart'></span>"+ 
			"<label class='boughtitems' id='lbl"+val.name+"containercount'></label>"+
			"</button>"+
			"</div>"+
			"<div class='thumbnail'>"+
			"<div class='thumbnailimage'>"+
			"<img data-src='/images/vegetables/cabbage.jpg' src='"+val.picture+"' alt='...'>"+
			"</div>"+
			"<div itemprop='offers' itemscope itemtype='http://schema.org/Offer' id='"+val.name+"container' class='caption simpleCart_shelfItem cartinfo'>"+
			"<h5 itemprop='name' class='item_name'>"+val.displayname+"</h5>"+
			"<input id='txtcabbage' class='itemvalue item_price' type='text' value='"+val.price+"' hidden>"+
			"<p itemprop='price'>Tsh "+val.price+"/"+val.unit+"</p>"+
			"<input type='button' value='"+val.unit+"' class='itemunit' field='itemunit' hidden>"+
			"<input type='button' value='-' class='qtyminus' field='quantity'>"+
			"<input type='text' name='quantity' value='0' class='qty val"+val.name+"containercount'>"+
			"<input type='button' value='+'' class='qtyplus' field='quantity'>"+
			"<input type='text' class='itemID' value='"+val.ID+"' hidden>"+
			//"<p><a href='#' class='btn btn-default btn-add item_add' role='button'><b> Add to Cart</b></a></p>"+
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

//Cart called on other pages, not the checkout page
function showcart(cart){
	
	var cart = JSON.parse(sessionStorage["cart"]);
	var cartitems = "<tr ><th>Item</th><th>Qty</th><th>Price</th><th>Delete</th></tr>";

	$.each(cart,function(key,val){
		//alert(val.name);

		cartitems += "<tr class='cartrow'><td class='cartitemname'>"+val.displayname+"</td><td class='cartitemcount'>"+val.count+" "+val.unit+
		"</td><td>"+val.itemtotalcost+"</td><td><a href='#'><span class='glyphicon glyphicon-trash removefromcart'></span></a></td>";

	});
	cartitems += "<tr class='cartrow deliverypricerow'><td class='cartitemname'>Delivery Fee</td><td class='cartitemcount'></td><td>4000</td><td></td>";

	$(".cartitems").html(cartitems);
}
//Called when on the Checkout page
function showcarttable(cart){
	var cartitems = "<tr ><th>Item</th><th>Qty</th><th>Price</th><th></th></tr>";

	$.each(cart,function(key,val){
		//alert(val.name);

		cartitems += "<tr class='cartrow'><td class='itemprice' style='display:none'>"+val.price+"</td><td class='cartitemname'>"+val.displayname+"</td><td class='cartitemcount'><a class='addglyphicon' href='#'><span class='glyphicon glyphicon-triangle-top '></span></a><input type='text' class='inputcartcount qty' value="+val.count+" /><a class='removeglyphicon' href='#'><span class='glyphicon glyphicon-triangle-bottom '></span></a> <label class='labelitemunit'>"+val.unit+"</label>"+
		"</td><td class='dataitemcost'>"+val.itemtotalcost+"</td><td><a href='#'><span class='glyphicon glyphicon-trash removefromcart'></span></a></td>";

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


//[TODO] Function to change the title when there is a user
function displayuser(firstname){
	$("#btnprofilename").html("Hi "+firstname+" <span class='caret'></span>");
	$("#labelfirstname").html(firstname);
}

});