<?php

include_once("../DAO/personDAO.php");


error_reporting(E_ALL);
ini_set('display_errors', '1');
//Create an Object personDAO
$personDAO = new personDAO();

//	$person = $personDAO->insertperson("brian","paul","brompo@gmail.com",12345,12345,"mbeya");
if(isset($_POST["email"]))
{
	$email = $_POST["email"];
	$password = $_POST["password"];

	$person = $personDAO->selectperson($email,$password);

}

if(isset($_POST["personinfo"])){	
	$persondetails = $_POST['personinfo'];
	$result = $personDAO->insertperson($persondetails['firstname'],$persondetails['lastname'],$persondetails['email'],$persondetails['password'],$persondetails['phonenumber'],$persondetails['location']);

	echo $result;
}

//print_r($person);
//echo "Here i am";


?>