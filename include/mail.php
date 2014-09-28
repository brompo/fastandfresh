<?php


//$data = json_decode(stripslashes($_GET['data']));
//$data = $_REQUEST['data'];
$info = $_POST['data'];
$details = $_POST['orderdetails'];
$data = json_decode($info);
//print_r($data);
print_r($data);
$body = "<b>Name:</b> $details[firstname] $details[lastname]<br/>";
$body .= "<b>Mobile Number:</b> $details[mobilenumber]<br/>";
$body .= "<b>Where:</b> $details[where]<br/>";
$body .= "<b>When:</b> $details[when]<br/>";
$body .= "<b>Comments:</b> $details[comment]<br/>";
$body .= "<table cellspacing='2' style='border:1px solid gray'><caption>Order Details</caption><tr align='left'><th>Item</th><th>Quantity</th><th>Price</th><th>Unit</th><tr><br/>";
$totalcost = 0;
foreach ($data as $key => $value) {
	$body .= "<tr>";
	foreach ($value as $key => $value) {
		if($key == "countname"){
			
		}
		elseif($key == "itemtotalcost"){
			$totalcost += $value;
		}
		else {
			$body .= "<td width='100'>$value</td>";
		}
	}
	$body .= "</tr>";
}
$body .= "</table>";
$body .= "<br/><b>Order Cost: </b> $totalcost";
$body .= "<br/><br/><b>Delivery Cost:</b> 4000";
$totalcost = $totalcost + 4000;
$body .= "<br/><br/><b>Grand Total: </b> $totalcost <br />";

$body .= "Delivery Location is https://www.google.com/maps/@$details[latitude],$details[longitude],16z";
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
$mail->Host = "smtp.gmail.com";
$mail->Port = 465; // or 587
$mail->IsHTML(true);

$mail->Username = "brompo@gmail.com";
$mail->Password = "MnYaMpI1986";
$mail->SetFrom($details['email']);
$mail->Subject = "Fast and Fresh order from ".$details['firstname'];
$mail->Body = $body;
$mail->AddAddress("brian@tanzict.or.tz");

 if(!$mail->Send()){
	//print_r("Mailer Error: " . $mail->ErrorInfo);
}
else{
	//print_r("Message has been sent");
}
/*
*/
?>
