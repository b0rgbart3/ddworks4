<?php session_start(); ?>
<!doctype html>
<html lang="en">
    <head>
        <meta charset="utf-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <title>Dority Design Works</title>
        <script src="https://ajax.googleapis.com/ajax/libs/jquery/3.5.1/jquery.min.js"></script>
        <link rel="preconnect" href="https://fonts.gstatic.com">
        <link href="https://fonts.googleapis.com/css2?family=Arimo:ital,wght@0,400;0,500;0,600;0,700;1,400&family=Caveat:wght@500&family=Jost:ital,wght@0,300;0,400;0,500;0,600;0,700;0,800;0,900;1,300;1,400&display=swap" rel="stylesheet">

        <link rel="stylesheet" href="css/home.css">
    </head>

    <body>
    <?php 
    if (isset($_SESSION['ddw_submission'])&& 
       ($_SESSION['ddw_submission']  == true) &&
       ($_SESSION['ddw_submission_error']==false ))
    {
        echo "<div class='thankyou'>Thank you for contacting us.<br>We will be in touch shortly.</div>";
        unset($_SESSION['ddw_fullname']);
        unset($_SESSION['ddw_email']);
        unset($_SESSION['ddw_message']);
        unset($_SESSION['ddw_submission']);
        unset($_SESSION['ddw_submission_error']);
    }
    else {
    ?>
        <a name='contact'></a>

        <form id="contactForm" class='form' method='post' enctype="multipart/form-data" action="gather.php">
            <h1>Contact Dority Design Works:</h1>  
            
            <div class='inputs'>
                <label name='fullname'>Full Name</label>
                <input type='text' name='fullname' id='fullname' class='namefield'>
                <p class='notify'></p>

                <label name='email'>Email</label>
                <input type='text' name='email' id='email'>
                </input>
                <p class='notify'></p>
            
                <label name='message'>Message</label>
                <textarea name='message' id='message' cols='60' rows='6'></textarea>
                <p class='notify'></p>

                <input type='text' name='not_human' id='human_test'>

                <input type='submit' name='submit' value='send' id='send'>
            </div>
        </form>
        <?php 
    }?>

    </body>
<script src='js/form_validation.js'></script>
</html>