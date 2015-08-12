/***************************/
//@Author: Adrian "yEnS" Mato Gondelle & Ivan Guardado Castro
//@website: www.yensdesign.com
//@email: yensamg@gmail.com
//@license: Feel free to use it, but keep this credits please!					
/***************************/

$(document).ready(function(){
	//global vars
	var checkoutform = $("#checkoutform");
	var registerform = $("#registerform");
	var recoverPasswordForm = $("#recoverPasswordForm");
	var loginform = $("#loginForm");
	var firstname = $("#inputFirstname");
	var orderfirstname = $("#inputOrderFirstname");
	var lastname = $("#inputLastname");
	var orderlastname = $("#inputOrderLastname");
	var where = $("#inputWhere");
	var orderwhere = $("#inputOrderWhere");
	var when = $("#inputWhen");
	var orderwhen = $("#inputOrderWhen");
	var comment = $("#inputComment");
	var ordercomment = $("#inputOrderComment");
	var mobilenumber = $("#inputMobile");
	var ordermobilenumber = $("#inputOrderMobile");
	var latitude = $("#latbox");
	var longitude = $("#lngbox");
	var nameInfo = $("#nameInfo");
	var email = $("#inputEmail");
	var emaillogin = $("#inputEmailLogin");
	var orderemail = $("#inputOrderEmail");
	var emailInfo = $("#emailInfo");
	var passwordlogin = $("#inputPasswordLogin");
	var password = $("#inputPassword");
	var pass1 = $("#pass1");
	var pass1Info = $("#pass1Info");
	var pass2 = $("#pass2");
	var pass2Info = $("#pass2Info");
	var message = $("#message");


	// Check the cart in storage
	if(sessionStorage.getItem("cart") == null){
		var cart = [];
	}else
	{
		var cart = JSON.parse(sessionStorage["cart"]);
	} 
	
	//On blur
	//firstname.blur(validateFirstName(firstname));
	/*
	orderfirstname.blur(validateFirstName(orderfirstname));
	lastname.blur(validateLastName(lastname));
	where.blur(validateWhere(where));
	mobilenumber.blur(validateMobile(mobilenumber));
	email.blur(validateEmail(email));
	pass1.blur(validatePassword(pass1));
	//pass2.blur(validatePass2);
	//On key press
	orderfirstname.keyup(validateFirstName(orderfirstname));
	//firstname.keyup(validateFirstName(firstname));
	lastname.keyup(validateLastName(lastname));
	where.keyup(validateWhere(where));
	emaillogin.keyup(validateEmailLogin(emaillogin));
	passwordlogin.keyup(validatePasswordLogin(passwordlogin));
	mobilenumber.keyup(validateMobile(mobilenumber));
	pass1.keyup(validatePassword(pass1));
	//pass2.keyup(validatePass2);
	message.keyup(validateMessage(message));
	*/
	
	//On Submitting of the Order Form
	checkoutform.submit(function(e){
		//cart.push("firstname":firstname,"lastname":lastname,"email":email,"location":where);
		//console.log(cart);

		if(validateFirstName(orderfirstname) & validateLastName(orderlastname) & validateWhere(orderwhere) & validateMobile(ordermobilenumber))
		{
				//return true;
				
				var cart = JSON.parse(sessionStorage["cart"]);
				
				console.log(cart);


				var items = JSON.stringify(cart);
				var orderdetails = {};
				orderdetails["firstname"] = orderfirstname.val();
				orderdetails["lastname"] = orderlastname.val();
				orderdetails["where"] = orderwhere.val();
				orderdetails["email"] = orderemail.val();
				orderdetails["mobilenumber"] = ordermobilenumber.val();
				orderdetails["when"] = orderwhen.val();
				orderdetails["comment"] = ordercomment.val();
				//orderdetails["latitude"] = latitude.val();
				//orderdetails["longitude"] = longitude.val();

				var details = JSON.stringify(orderdetails);
				

				$("#myModal").modal("show");
				$.ajax({
					url: 'include/BL/personBL.php',
					type: 'POST',
					data: {data: items,orderdetails:orderdetails},
					success:function(response){
						
					},
					error:function(ts){
						var error = ts.responseText;
						//alert(error);
					}
				});

				//clearsessions();

				//window.location.href = "js/mail.php?data=";
				
				return false;
				//[TODO] Pass the variable and arrays to php
				
			}
			else
			{
				e.preventDefault();
				alert("fields you entered are not correct");
				return false;
			}
		});

	//On submitting of the login form
	loginform.submit(function(e) {
		
		/* Act on the event */
		if(validateEmailLogin(emaillogin) & validatePasswordLogin(passwordlogin))
		{
			var loginemail = emaillogin.val();
			var loginpassword = passwordlogin.val();

			$.ajax({
				url: 'include/BL/personBL.php',
				type: 'POST',
				data: {email: loginemail,password:loginpassword},
				success:function(response){
					var logininfo = $.parseJSON(response);

					if (logininfo[0] === 0){
						alert(logininfo[1]);
					}
					else
					{
						//alert(logininfo[1]["last_name"]);
						var person = {};
						person["firstname"] = logininfo[1]["first_name"];
						person["lastname"] = logininfo[1]["last_name"];
						person["email"] = logininfo[1]["email"];
						person["mobile"] = logininfo[1]["mobile_phone"];
						person["where"] = logininfo[1]["default_location"];
						
						sessionStorage["person"] = JSON.stringify(person);

						//alert(person.length);
/*
						person.push({firstname:logininfo[1]["first_name"],
							lastname:logininfo[1]["last_name"],
							email:logininfo[1]["email"],
							mobile:logininfo[1]["mobile_phone"],
							location:logininfo[1]["default_location"]
						});
			*/

			$("div.authenticationpanel").hide('slow', function() {
							//[TODO] Show a different panel with name and order details.
							//$(this).fadeIn();
						});
			displayuser(person["firstname"]);
			$("#orderContainer").css('display', 'block');
			$("#inputOrderFirstname").val(logininfo[1]["first_name"]);
			$("#inputOrderLastname").val(logininfo[1]["last_name"]);
			$("#inputOrderEmail").val(logininfo[1]["email"]);
			$("#inputOrderMobile").val(logininfo[1]["mobile_phone"]);
			$("#inputOrderWhere").val(logininfo[1]["default_location"]);
		}

	},
	error:function(ts){
		var error = ts.responseText;
						//alert(error);
					}
				});
e.preventDefault();
}
else
{
			//alert("I am here");
			e.preventDefault();
			return false
		}
		
	});

//On submit of Registration Form
registerform.submit(function(e) {
		//validate inputs on the form
		if(validateFirstName(firstname) & validateLastName(lastname) & validateEmail(email) & validatePassword(password) & validateMobile(mobilenumber)  ){

				//var items = JSON.stringify(cart);
				var persondetails = {};
				persondetails["firstname"] = firstname.val();
				persondetails["lastname"] = lastname.val();
				persondetails["email"] = email.val();
				persondetails["password"] = password.val();
				persondetails["phonenumber"] = mobilenumber.val();
				persondetails["location"] = where.val();
				//var persondetails = JSON.stringify(persondetails);

				//alert("I am here");
				//$("#imgloading").show();
				$("#registrationcontainer").html('<img id="imgloading" src="/images/loadingtomato.gif">');

				$.ajax({
					url: 'include/BL/personBL.php',
					type: 'POST',
					data: {personinfo: persondetails},
					success:function(response){
						$("#imgloading").hide();
						var registrationinfo = $.parseJSON(response);

						if (registrationinfo[0] === 0)
						{
							alert(registrationinfo[1]);
							$("#collapseTwo").collapse('hide');
							$("#collapseOne").collapse('show');

							$("#inputEmailLogin").val(persondetails["email"]);
							$("#inputPasswordLogin").focus();
						}
						else
						{

							var person = {};
							person["firstname"] = persondetails["firstname"];
							person["lastname"] = persondetails["lastname"];
							person["email"] = persondetails["email"];
							person["mobile"] = persondetails["phonenumber"];
							person["where"] = persondetails["location"];
							person["password"] = persondetails["password"];
							
							sessionStorage["person"] = JSON.stringify(person);


							$("div.authenticationpanel").hide('slow', function() {
							//$(this).fadeIn();
						});

							displayuser(persondetails["firstname"]);
							$("#orderContainer").css('display', 'block');
							$("#inputOrderFirstname").val(persondetails["firstname"]);
							$("#inputOrderLastname").val(persondetails["lastname"]);
							$("#inputOrderEmail").val(persondetails["email"]);
							$("#inputOrderMobile").val(persondetails["phonenumber"]);
							$("#inputOrderWhere").val(persondetails["location"]);
						}


						//[TODO]Send an Email to the User with their account information
						//alert("Send an email to user");
						$.ajax({
							url: 'include/BL/personBL.php',
							type: 'POST',
							data: {persondetails:person},
							success:function(response){
						//alert("email has been sent");
					},
					error:function(ts){
						var error = ts.responseText;
						//alert(error);
					}
				});


						//$("div.orderdetails").show();
					},
					error:function(xhr, status, error){
						var error = xhr.responseText;
						alert(error);
					}
				});
				//alert("I am here too");	
				e.preventDefault();
			}
			else
			{
				e.preventDefault();
			}
		});

//ON click of recover email form
recoverPasswordForm.submit(function(e) {
	/* Act on the event */
	var recoverPasswordEmail = $("#inputRecoverPasswordEmail");
	if(validateEmail(recoverPasswordEmail))
	{
			//[TODO] - Check password corresponding to the email and if its correct, then send the password to the corresponding email;
		}
		else
		{
			alert("Please enter correct email");
			e.preventDefault();	
		};
		
	});

	//validation functions
	function validateEmail(email){
		//testing regular expression
		var a = email.val();
		var filter = /^[a-zA-Z0-9]+[a-zA-Z0-9_.-]+[a-zA-Z0-9_-]+@[a-zA-Z0-9]+[a-zA-Z0-9.-]+[a-zA-Z0-9]+.[a-z]{2,4}$/;
		//if it's valid email
		if(filter.test(a)){
			email.removeClass("error");
			emailInfo.text("Valid E-mail please, you will need it to log in!");
			emailInfo.removeClass("error");
			return true;
		}
		//if it's NOT valid
		else{
			email.addClass("error");
			emailInfo.text("Stop cowboy! Type a valid e-mail please :P");
			emailInfo.addClass("error");
			return false;
		}
	}
	//validate Email when user is login in
	function validateEmailLogin(emaillogin){
		var a = emaillogin.val();
		var filter = /^[a-zA-Z0-9]+[a-zA-Z0-9_.-]+[a-zA-Z0-9_-]+@[a-zA-Z0-9]+[a-zA-Z0-9.-]+[a-zA-Z0-9]+.[a-z]{2,4}$/;
		//if it's valid email
		//alert(a);
		if(filter.test(a)){
			emaillogin.removeClass("error");
			emailInfo.text("Valid E-mail please, you will need it to log in!");
			emailInfo.removeClass("error");
			return true;
		}
		//if it's NOT valid
		else{
			emaillogin.addClass("error");
			emailInfo.text("Stop cowboy! Type a valid e-mail please :P");
			emailInfo.addClass("error");
			return false;
		}	
	}


	function validateFirstName(firstname){
		//if it's NOT valid
		if(firstname.val().length < 1){
			firstname.addClass("error");
			nameInfo.text("We want names with more than 1 letters!");
			nameInfo.addClass("error");
			return false;
		}
		//if it's valid
		else{
			firstname.removeClass("error");
			nameInfo.text("What's your name?");
			nameInfo.removeClass("error");
			return true;
		}
	}
	function validateLastName(lastname){

		if(lastname.val().length <1){
			lastname.addClass("error");
			nameInfo.text("We want last names with more than 1 letter");
			nameInfo.addClass("error");
			return false;
		}
		else
		{
			lastname.removeClass("error");
			nameInfo.text("What's your last name?");
			nameInfo.removeClass("error");
			return true;
		}
	}

	function validateMobile(mobilenumber){
		if(mobilenumber.val().length <1){
			mobilenumber.addClass("error");
			//whereInfo.text("We want last names with more than 1 letter");
			//whereInfo.addClass("error");
			return false;
		}
		else
		{
			mobilenumber.removeClass("error");
			//whereInfo.text("What's your last name?");
			//whereInfo.removeClass("error");
			return true;
		}
	}

	function validateWhere(where){
		if(where.val().length <1){
			where.addClass("error");
			//whereInfo.text("We want last names with more than 1 letter");
			//whereInfo.addClass("error");
			return false;
		}
		else
		{
			where.removeClass("error");
			//whereInfo.text("What's your last name?");
			//whereInfo.removeClass("error");
			return true;
		}

	}
	function validatePasswordLogin(passwordlogin){
		//it's NOT valid
		if(passwordlogin.val().length <1){
			passwordlogin.addClass("error");
			pass1Info.text("Ey! Remember: At least 5 characters: letters, numbers and '_'");
			pass1Info.addClass("error");
			return false;
		}
		//it's valid
		else{			
			passwordlogin.removeClass("error");
			pass1Info.text("At least 5 characters: letters, numbers and '_'");
			pass1Info.removeClass("error");
		//	validatePass2();
		return true;
	}
}

function validatePassword(password){
	//var a = $("#password1");
	//var b = $("#password2");

		//it's NOT valid
		if(password.val().length <1){
			password.addClass("error");
			pass1Info.text("Ey! Remember: At least 5 characters: letters, numbers and '_'");
			pass1Info.addClass("error");
			return false;
		}
		//it's valid
		else{			
			password.removeClass("error");
			pass1Info.text("At least 5 characters: letters, numbers and '_'");
			pass1Info.removeClass("error");
			//validatePass2();
			return true;
		}
	}
	function displayuser(firstname){
		$("#btnprofilename").html("Hi "+firstname+" <span class='caret'></span>");
		$("#labelfirstname").html(firstname);
	}


	$('#myModal').on('hidden.bs.modal', function (e) {

		clearsessions();
	})

	function clearsessions()
	{
		sessionStorage.removeItem("person");
		sessionStorage.removeItem("cart");
		window.location.href = "/index.html";
	}
/*
function validatePass1(){
	var a = $("#password1");
	var b = $("#password2");

		//it's NOT valid
		if(pass1.val().length <5){
			pass1.addClass("error");
			pass1Info.text("Ey! Remember: At least 5 characters: letters, numbers and '_'");
			pass1Info.addClass("error");
			return false;
		}
		//it's valid
		else{			
			pass1.removeClass("error");
			pass1Info.text("At least 5 characters: letters, numbers and '_'");
			pass1Info.removeClass("error");
			validatePass2();
			return true;
		}
	}

	function validatePass2(){
		var a = $("#password1");
		var b = $("#password2");
		//are NOT valid
		if( pass1.val() != pass2.val() ){
			pass2.addClass("error");
			pass2Info.text("Passwords doesn't match!");
			pass2Info.addClass("error");
			return false;
		}
		//are valid
		else{
			pass2.removeClass("error");
			pass2Info.text("Confirm password");
			pass2Info.removeClass("error");
			return true;
		}
	}
	*/
	function validateMessage(message){
		//it's NOT valid
		if(message.val().length < 10){
			message.addClass("error");
			return false;
		}
		//it's valid
		else{			
			message.removeClass("error");
			return true;
		}
	}
	//[TODO] Impelement a function to logout a person
	$("#logoutlink").on("click",function(){
		//alert("Do you really want to log me out?");
	});

	function logout(){
		$.session.remove("person");
	}


});