/***************************/
//@Author: Adrian "yEnS" Mato Gondelle & Ivan Guardado Castro
//@website: www.yensdesign.com
//@email: yensamg@gmail.com
//@license: Feel free to use it, but keep this credits please!					
/***************************/

$(document).ready(function(){
	//global vars
	var form = $("#checkoutform");
	var registerform = $("#registerform");
	var loginform = $("#loginForm");
	var firstname = $("#inputFirstname");
	var lastname = $("#inputLastname");
	var where = $("#inputWhere");
	var when = $("#inputWhen");
	var comment = $("#inputComment");
	var mobilenumber = $("#inputMobile");
	var latitude = $("#latbox");
	var longitude = $("#lngbox");
	var nameInfo = $("#nameInfo");
	var email = $("#inputEmail");
	var emaillogin = $("#inputEmailLogin");
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
	firstname.blur(validateFirstName);
	lastname.blur(validateLastName);
	where.blur(validateWhere);
	mobilenumber.blur(validateMobile);
	email.blur(validateEmail);
	pass1.blur(validatePassword);
	//pass2.blur(validatePass2);
	//On key press
	firstname.keyup(validateFirstName);
	lastname.keyup(validateLastName);
	where.keyup(validateWhere);
	emaillogin.keyup(validateEmailLogin);
	passwordlogin.keyup(validatePasswordLogin);
	mobilenumber.keyup(validateMobile);
	pass1.keyup(validatePassword);
	//pass2.keyup(validatePass2);
	message.keyup(validateMessage);
	
	//On Submitting of the Order Form
	form.submit(function(e){
		
		//cart.push("firstname":firstname,"lastname":lastname,"email":email,"location":where);
		//console.log(cart);

		if( validateLastName() & validateFirstName() & validateEmail()  & validateWhere() & validateMobile())
		{
				//return true;
				//$("#myModal").modal("show");
				var cart = JSON.parse(sessionStorage["cart"]);
				
				console.log(cart);


				var items = JSON.stringify(cart);
				var orderdetails = {};
				orderdetails["firstname"] = firstname.val();
				orderdetails["lastname"] = lastname.val();
				orderdetails["where"] = where.val();
				orderdetails["email"] = email.val();
				orderdetails["mobilenumber"] = mobilenumber.val();
				orderdetails["when"] = when.val();
				orderdetails["comment"] = comment.val();
				orderdetails["latitude"] = latitude.val();
				orderdetails["longitude"] = longitude.val();

				var details = JSON.stringify(orderdetails);

				$("#myModal").modal('show');
				$.ajax({
					url: 'include/mail.php',
					type: 'POST',
					data: {data: items,orderdetails:orderdetails},
					success:function(response){
						
					},
					error:function(ts){
						var error = ts.responseText;
						//alert(error);
					}
				});
				//window.location.href = "js/mail.php?data=";
				
				return false;
				//[TODO] Pass the variable and arrays to php
			}
			else
			{
				e.preventDefault();
				
				return false;
			}
		});

	//On submitting of the login form
	loginform.submit(function(e) {
		
		/* Act on the event */
		if(validateEmailLogin() & validatePasswordLogin())
		{
			var loginemail = emaillogin.val();
			var loginpassword = passwordlogin.val();

			$.ajax({
				url: 'include/BL/personBL.php',
				type: 'POST',
				data: {email: loginemail,password:loginpassword},
				success:function(response){
					alert(response);
				},
				error:function(ts){
					var error = ts.responseText;
						//alert(error);
					}
				});

		}
		else
		{
			//alert("I am here");
			e.preventDefault();
			return false
		}
		
	});

	registerform.submit(function(e) {
		//validate inputs on the form
		if(validateFirstName() & validateLastName() & validateEmail() & validatePassword() & validateMobile()  ){

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

				$.ajax({
					url: 'include/BL/personBL.php',
					type: 'POST',
					data: {personinfo: persondetails},
					success:function(response){
						alert(response);
						$("div.authenticationpanel").hide('slow', function() {
							//[TODO] Show a different panel with name and order details.
							//$(this).fadeIn();
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


	//validation functions
	function validateEmail(){
		//testing regular expression
		var a = $("#inputEmail").val();
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
	function validateEmailLogin(){
		var a = $("#inputEmailLogin").val();
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


	function validateFirstName(){
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
	function validateLastName(){

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

	function validateMobile(){
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

	function validateWhere(){
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
	function validatePasswordLogin(){
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

function validatePassword(){
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
	function validateMessage(){
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
});