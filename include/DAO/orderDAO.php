<?php

include_once("connection.php");

error_reporting(@E_ALL);

/**
* 
*/
class orderDAO 
{
	
	function __construct()
	{
		# code...
	}

	function saveorder($personID,$packagingID,$location,$deliverydate,$comments,$orderdate,$status,$feedback){

		$saveorderquery = "INSERT INTO tblorder VALUES ('','$personID','packagingID','$location','$deliverydate','$comments','$orderdate','$status','$feedback')";

		$result = mysql_query($saveorderquery) or die(mysql_error());
	}
	function selectallorderbyperson($personID){
		//$selectorderquery = "SELECT * FROM tblorder WHERE "

	}

	function selectlastorder()
	{
		$selectorderquery = "SELECT * FROM tblorder ORDER BY ID DESC LIMIT 1";
		$result = mysql_query ($selectorderquery) or DIE(mysql_error());

		$lastorder = mysql_fetch_array($result);

		return $lastorder;
	}

	function saveorderdetails($itemID,$orderID,$quantity,$sub_total,$comment){
		$saveorderdetailquery = "INSERT INTO tblorderitems VALUES ('','$itemID','$orderID','$quantity','$sub_total','$comment')";

		$result = mysql_query($saveorderdetailquery) or DIE(mysql_error());
	}


}
?>