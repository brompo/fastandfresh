<?php

/**
* 
*/
include_once("connection.php");

error_reporting(E_ALL);
ini_set('display_errors', '1');

class personDAO 
{
	function __construct() {
		
	}
	
	//Select Person by ID function
	function selectpersonbyid($id)
	{
		$selectquery = "select * from tblperson where person_id = '$id'";
	}

	//Select Person Function
	function selectperson($email,$password){

		$person = $this->selectpersonbyemail($email);
		if ($person[0] > 0)
		{
		$selectquery = "select * from tblperson where email = '$email' and password = '$password'";
		$result = mysql_query($selectquery) or die(mysql_error());

		if(mysql_num_rows($result)>0){
		$person = mysql_fetch_array($result);
		return array(1,$person);	
		}
		else
		{
			$message = "password invalid, please try again";
			return array(0,$message);
		}

		}
		else
		{
			$message = "email does not exist,please register";
			return array(0,$message);
		}
		
	}
	function selectpersonbyemail($email)
	{
		$selectquery = "select * from tblperson where email = '$email'";
		$result = mysql_query($selectquery) or die(mysql_error());

		$person = mysql_fetch_array($result);
		$count = mysql_num_rows($result);
		return array($count,$person);
	}

	//Insert Person Function
	function insertperson($firstname,$lastname,$email,$password,$phonenumber,$location,$role){

		//[TODO] Check if the user exists;
		$person = $this->selectpersonbyemail($email);
		if ($person[0] > 0)
		{
			//[TODO] - Do something when someone does exist;
			$message = "email already exists,log in instead";
			return array(0,$message);
		}
		else {
			$insertquery = "insert into tblperson value ('','$firstname','$lastname','$email','$password','$phonenumber','$location','$role')";
			$result = mysql_query($insertquery) or die(mysql_error());

			$person = $this->selectpersonbyemail($email);	

			return array(1,$person);
		}
		
	}
	//Add Person Function
	function addperson($first_name,$last_name,$email,$mobile_phone,$default_location)
	{

	}

}

?>