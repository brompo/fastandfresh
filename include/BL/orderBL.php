<?php

include_once("../DAO/orderDAO.php");


error_reporting(E_ALL);
ini_set('display_errors', '1');

$orderDAO = new orderDAO();

//Passed After Order Confirmation
if(isset($_POST["cartdata"])){
	$cartdata = $_POST["cartdata"];
	$orderdetails = $_POST["orderdetails"];
	$persondetails = $_POST["persondetails"];
	$orderstatus = "test";
	$feedback = "test";
	if($orderdetails["when"] == "")
	{
		$deliverydate = strtotime("tomorrow");
		$deliverydate = date("d-m-Y",$deliverydate);
	}
	else
	{
		$deliverydate = $orderdetails["when"];
	}
	$orderdate = date("Y-m-d H:i:s");

	//[TODO] Save an Order
	$orderDAO->saveorder($persondetails["ID"],1,$orderdetails["where"],$deliverydate,$orderdetails["comment"],$orderdate,$orderstatus,$feedback);
	
	//[TODO] Retrieve an order ID
	$neworder = $orderDAO->selectlastorder();
	$orderID = $neworder["ID"];

	foreach ($cartdata as $data) {
		$itemID = $data["itemID"];
		$quantity = $data["count"];
		$sub_total = $data["itemtotalcost"];
		$comment = "";

		$orderDAO->saveorderdetails($itemID,$orderID,$quantity,$sub_total,$comment);
	}

	print json_encode($cartdata);

	//[TODO] Save the details of the order
	//$orderDAO->saveorderdetails($itemID,$orderID,$quantity,$sub_total,$comment);
	

}

?>