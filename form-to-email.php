<?php
if (!isset($_POST[Submit]))
{
    //THis page should not be accessed directly.
    //Need to submit the form!";
}
$vistor_email = $POST['email'];
$message = $POST['message'];

//Validate first
if (empty($email)||empty($message))
{
    echo "Email and Message are mandatory!";
    exit;
}
$email_from = 'makandamilka@gmail.com'; //My Email
$email_subject= "A Letter to your olderself!";
$email_body = "You have received a new message from the email address : $visitor_email. 
               Here is the message: \n $message".

$to = "$visitor_email";

//Send the Email
mail($to, $email_subject, $email_body);
//Done redirect to Main page