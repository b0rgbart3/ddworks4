$(document).ready(function() { 


    let checkValidity = function(email) {
        var re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
        return re.test(String(email).toLowerCase());
    }


    $('#fullname').on('change', function() {
        $('#fullname').removeClass('error');
    });

    $('#email').on('change', function() {
        $('#email').removeClass('error');
    });
    $('#message').on('change', function() {
        $('#message').removeClass('error');
    });
        
    $('#send').on('click', function(event) {
        $('.thankyou').remove();
        let fullname = $('#fullname').val();
        let email = $('#email').val();
        let message= $('#message').val();

        let notice = $("#fullname").next('.notify');
        if (!fullname) {
            $('#fullname').addClass('error');
            
            notice.text("Please include your full name.");
        } else {
            notice.text("");
        }
        
    
        notice = $("#email").next('.notify');
        let validemail=false;
        if (!email) {
            $('#email').addClass('error');
            notice.text("Please include your email address.");
        } else {
            validemail = checkValidity(email);
            if (!validemail) {
                $('#email').addClass('error');
        
            notice.text("Please include a valid email address.");
            } else {
                notice.text("");
            }
        }
        notice = $("#message").next('.notify');
        if (!message) {
            $('#message').addClass('error');
            notice.text("Please include a message.");
    
        } else {
            notice.text("");
        }


        if( !fullname || !email || !message || !validemail) {
            event.preventDefault();
            event.stopPropagation();

            //document.body.scrollTop = document.documentElement.scrollTop = 0;
            const element = document.querySelector('#contactForm')
                            const topPos = element.getBoundingClientRect().top + window.pageYOffset

                            window.scrollTo({
                            top: topPos, // scroll so that the element is at the top of the view
                            behavior: 'smooth' // smooth scroll
                            })
        }
        // else {
        //     window.location.href = "gather.php";
        // }

    });

});


