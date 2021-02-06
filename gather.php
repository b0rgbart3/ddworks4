<?php
session_start();
    include "scripts/send_contact_form_message.php";
    $firstname = '';
    $lastname = '';
    $email = '';
    $message = '';
    $error = '';
    $errorfield = "";
    $datareceived = false;
    if ($_SERVER["REQUEST_METHOD"] == "POST") { 
        if (isset($_POST['submit']))
        {
            $_SESSION['ddw_submission'] = true;
            $_SESSION['ddw_submission_error'] = false;

            if (isset($_POST['message'])) {
                $message = trim($_POST['message']);
                if ($message=='') {
                    $errorfield = "message";
                    $error = "a message";
                } 
                    
                $_SESSION['ddw_message'] = $message;
                
            } else {
                $errorfield = "message";
                $error = "a message";
            }

            if (isset($_POST['email'])) {
                $email = trim($_POST['email']);
                if (!filter_var($email, FILTER_VALIDATE_EMAIL)) {
                    $error = "Please include a valid email";
                    $errorfield = "email";
                }
                
                if ($email=='') {
                    $error = "a valid email";
                    $errorfield = "email";
                } 
                    $_SESSION['ddw_email'] = $email;
                
            } else {
                $error = "Please include a message";
                $errorfield = "email";
            }
            if (isset($_POST['fullname'])) {
                $fullname = trim($_POST['fullname']);
                if ($fullname=='') {
                    $error = "Please include your fullname";
                    $errorfield = "fullname";
                }
                    $_SESSION['ddw_fullname'] = $fullname;
                
            }
            if (isset($_POST['nothuman'])) {
                $error = "You are apparently not a human.";
                $errorfield = "nothuman";
            }
    

                if ($error == '') {
                    $_SESSION['ddw_submission_error'] = false;
                    $datareceived = true;

                    $data = [];
                    $data['fullname'] = $fullname;
                    $data['email'] = $email;
                    $data['message'] = $message;
                    unset($_SESSION['ddw_fullname']);
                    unset($_SESSION['ddw_email']);
                    unset($_SESSION['ddw_message']);
                    // unset($_SESSION['ddw_submission']);
                    // unset($_SESSION['ddw_submission_error']);
                    sendContactMessage($data);
          
                } 
                else {
                    $_SESSION['ddw_submission_error'] = true;

                }
          
        }

        
    } 
    header("Location: index.php");

