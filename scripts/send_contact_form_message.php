<?php

function sendContactMessage( $data) {

$to = "bartdority@gmail.com";
$subject = "A message was received from the DDWorks website";

$message = <<<EOD
    <html>
    <head>
    <link href='https://fonts.googleapis.com/css?family=Open+Sans:400,700' rel="stylesheet">
    </head>
    <body style="font-size:16px; font-family:sans-serif; color:#000000">
EOD;

$message .= "<div style='color:#000000;padding:10px;border:1px solid #eeeeee;'>";
$message .=  "<h1>A Message from the Contact Form of DDWorks</h1>";
$labelIndex = 0;

$message .= "<p>Full Name: ".$data['fullname']."</p>";
$message .= "<p>Email: ".$data['email']."</p>";
$message .= "<p>Message: ".$data['message']."</p>";

$message .= "</div><br>End of contact form message.<br></body></html>";

// Always set content-type when sending HTML email
$headers = "MIME-Version: 1.0" . "\r\n";
$headers .= "Content-type:text/html;charset=UTF-8" . "\r\n";

// More headers
$headers .= 'From: <info@ddworks.org>' . "\r\n";
//$headers .= 'Bcc: bartdority@gmail.com' . "\r\n";

mail($to,$subject,$message,$headers);

}
