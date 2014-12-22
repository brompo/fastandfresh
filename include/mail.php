<?php


//$data = json_decode(stripslashes($_GET['data']));
//$data = $_REQUEST['data'];
$info = $_POST['data'];
$details = $_POST['orderdetails'];
$data = json_decode($info);
//print_r($data);
print_r($data);
$body = "Dear $details[firstname] $details[lastname]<br/><br/>";
$body .= "Welcome to fast and fresh and we are more than happy to serve you.<br/><br/>";
$body .= "<table cellspacing='2' style='border:1px solid gray'><caption>Order Details</caption><tr align='left'><th>Item</th><th>Quantity</th><th>Unit</th><th>Price</th><tr><br/>";
$totalcost = 0;
foreach ($data as $key => $value) {
	$body .= "<tr>";
	foreach ($value as $key => $value) {
		if($key == "countname" || $key == "price"){
			
		}
		elseif($key == "itemtotalcost"){
			$totalcost += $value;
			$body .= "<td width='100'>$value</td>";
		}
		else {
			$body .= "<td width='100'>$value</td>";
		}
	}
	$body .= "</tr>";
}
$body .= "</table>";
$body .= "<br/><b>Order Cost: </b> $totalcost";
$body .= "<br/><b>Delivery Cost:</b> 4000";
$totalcost = $totalcost + 4000;
$body .= "<br/><b>Grand Total: </b> $totalcost <br /><br/>";
$body .= "<b>Mobile Number:</b> $details[mobilenumber]<br/>";
$body .= "<b>Your Comments:</b> $details[comment]<br/><br/>";
$body .= "Order to be delivered at $details[where]. $details[when]<br/><br/>";
$body .= "Thankyou for using fast and fresh. For more enquiries, feel free to reach us.<br /><br />";
$body .= "Fast and Fresh<br /><br />";
$body .= "<b>NB:</b> This is an automatic generated email, confirming the order has been received by us<br />";


//$body .= "Delivery Location is https://www.google.com/maps/@$details[latitude],$details[longitude],16z";
//$body .= "<b>Total Cost</b>"$totalcost;

//print_r($data);
  // here i would like use foreach:
//mail("brompo@gmail.com","from fast and fresh","test email","From: brian@test.com");

include "class.phpmailer.php"; // include the class name
$mail = new PHPMailer(); // create a new object
$mail->IsSMTP(); // enable SMTP

$mail->SMTPDebug = 1; // debugging: 1 = errors and messages, 2 = messages only
$mail->SMTPAuth = true; // authentication enabled
$mail->SMTPSecure = 'ssl'; // secure transfer enabled REQUIRED for GMail
$mail->Host = "gator4027.hostgator.com";
$mail->Port = 465; // or 587
$mail->IsHTML(true);

$mail->Username = "fast@fastandfresh.co.tz";
$mail->Password = "f@st@ndfr3sh";
$mail->SetFrom("fast@fastandfresh.co.tz","Fast and Fresh Team");
$mail->Subject = "Confirmation of Order from ".$details['firstname'];
$mail->Body = $body;
$mail->AddAddress("fast@fastandfresh.co.tz");
$mail->AddAddress($details['email']);
//$mail->AddCC($details['email']);

 if(!$mail->Send()){
	//print_r("Mailer Error: " . $mail->ErrorInfo);
}
else{
	//print_r("Message has been sent");
}
/*
*/
?>
