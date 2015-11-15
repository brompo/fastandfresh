<?php
session_start();
ob_start();
$hasDB = false;
$server = 'localhost';
$user = 'root';
$pass = 'ruth';
$db = 'fastandfresh';
//$user = 'brompo_brompo';
//$pass = 'f@st@ndfr3sh';
//$db = 'brompo_fastandfresh';
$link = mysql_connect($server,$user,$pass);
if (!is_resource($link)) {   
	$hasDB = false;
	die("Could not connect to the MySQL server at localhost.");
} else {   
	$hasDB = true;
	mysql_select_db($db);
}
?>