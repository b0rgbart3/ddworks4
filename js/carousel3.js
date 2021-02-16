$(document).ready(function() { 

    window.ddw_dragging = false;
    window.ddw_currentSlideNumber = 0;
   
    window.ddw_slides = $(".slide");
    window.ddw_slideCount = window.ddw_slides.length;
    window.ddw_firstSlide = window.ddw_slides[0];
    window.ddw_firstSlideNumber = 0;
    window.ddw_slideNumber = 0;
    window.ddw_lastSlide = window.ddw_slides[window.ddw_slideCount-1];
   
    window.ddw_lastSlideNumber = window.ddw_slideCount-1;
    console.log("last slide number: " + window.ddw_lastSlideNumber);
    console.log("# of slides: "+window.ddw_slideCount);

    window.ddw_carouselWidth = $(".carousel").width();

    let slideOrder = [];
    for (var i = 0; i < window.ddw_slides.length; i++) {
        slideOrder.push(i);
    }   
    window.ddw_slideOrder = slideOrder;
    console.log('slideOrder: ' + slideOrder);
    

    tracker = setInterval(function() {

            if (window.ddw_dragging) {
               
              //  console.log('move');
            }
    }, 1);


    $('.carousel').on('mouseout', function(e) {
        window.ddw_dragging = false;
    });

    $('.carousel').on('mousedown', function(e) {
    
        window.ddw_dragging = true;
       trackStart(e);
    });

    $('.carousel').on('touchstart', function(e) {
        
        window.ddw_dragging = true;
        trackStart(e);
        trackMove(e);
        
    });
    $('.carousel').on('touchend', function(e) {
        window.ddw_dragging = false;
    });

    $('.carousel').on('mouseup', function(e) {
        window.ddw_dragging = false;
      //  trackMove(e);
    });

    $('.carousel').on('touchmove', function(e) {
       // console.log('touch moving');
        trackMove(e);
        moving(e);
    });

    $('.carousel').on('mousemove', function(e) {
        trackMove(e);
        moving(e);
    });

});

function moving(e) {
    if (window.ddw_dragging) {
       
        
        let distance = window.ddw_x - window.ddw_prevx;
        if (distance > 0) {
            window.ddw_direction = "right";
        }
        if (distance < 0 ) {
            window.ddw_direction = "left";
        }
        slideSlides(distance);
        
        }
}

function trackMove(e) {
    window.ddw_prevx = window.ddw_x;
    window.ddw_prevy = window.ddw_y;
    e = e || window.event;

    let pageX = (e.type.toLowerCase() === 'mousemove')
    ? e.pageX
    : e.originalEvent.touches[0].pageX;
    let pageY = (e.type.toLowerCase() === 'mousemove')
    ? e.pageX
    : e.originalEvent.touches[0].pageX;
    // IE 8
    if (pageX === undefined) {
        pageX = e.clientX + document.body.scrollLeft + document.documentElement.scrollLeft;
        pageY = e.clientY + document.body.scrollTop + document.documentElement.scrollTop;
    }

    window.ddw_x = pageX;
    window.ddw_y = pageY;
}

function trackStart(e) {
    e = e || window.event;

    let pageX = (e.type.toLowerCase() === 'mousemove')
    ? e.pageX
    : e.originalEvent.touches[0].pageX;
    let pageY = (e.type.toLowerCase() === 'mousemove')
    ? e.pageX
    : e.originalEvent.touches[0].pageX;
    // IE 8
    if (pageX === undefined) {
        pageX = e.clientX + document.body.scrollLeft + document.documentElement.scrollLeft;
        pageY = e.clientY + document.body.scrollTop + document.documentElement.scrollTop;
    }

    window.ddw_prevx = pageX;
    window.ddw_prevy = pageY;
}

function slideSlides(distance) {
    window.ddw_slides.map( (index, slide) => {
        //console.log(slide);
        let leftPos = $(slide).position().left;
      //  console.log("Left: " + leftPos);
        leftPos = leftPos +distance;


        $(slide).css({left: leftPos + "px" });
        });

        checkForReposition(distance);
}

// This is the method that checks to see if we need to
// wrap the slide deck around the other side (so we have a continuous mobius strip)
function checkForReposition(distance) {

    // If the distance is > 0 then we are moving to the right
    if (distance > 0) {

        // Get the position of the "first slide"
        let fsPos = $(window.ddw_firstSlide).position().left;
       
        // Detect if the slide is moving past the edge of the carousel's left frame
        if (fsPos >= 1 ) {

            // if the position of the first slide is >= 1, then 
            // we have reached the very begining of the slide sequence, so we need to
            // wrap the "last slide" around to the left.
           
            let lastLeft = 0 - $(window.ddw_lastSlide).width();
            $(window.ddw_lastSlide).css({left: lastLeft + "px"});
    
            // here we reset what is known as the "first" and "last" slide
            // so the cycle can continue
            window.ddw_firstSlide = window.ddw_lastSlide;
            window.ddw_firstSlideNumber = window.ddw_lastSlideNumber;
            window.ddw_slideNumber = window.ddw_slideNumber -1;
            if (window.ddw_slideNumber < 0) {
                window.ddw_slideNumber = window.ddw_slideCount -1;
            }
            window.ddw_lastSlideNumber = window.ddw_lastSlideNumber -1;
            if (window.ddw_lastSlideNumber < 0 ) {
                window.ddw_lastSlideNumber = window.ddw_slideCount -1;
            }
            window.ddw_lastSlide = window.ddw_slides[window.ddw_lastSlideNumber];


        }

    } 
    // If the distance < 0 then we are moving to the left
    if (distance < 0) {
        // Get the position of the "last slide"
        let fsPos = $(window.ddw_lastSlide).position().left;
        let cWidth = $('.carousel').width();
        let rightEdge = fsPos + $(window.ddw_lastSlide).width();

        // Detect if the slide is moving past the edge of the carousel's right frame
        if (rightEdge <= cWidth ) {
            // we have reached the very end of the slide sequence, so we need to
            // wrap the "first slide" around to the right.

            let firstLeft = cWidth-1;  // set the left side of the first slide to the edge of the frame
            $(window.ddw_firstSlide).css({left: firstLeft + "px"});

            // here we reset what is known as the "first" and "last" slide
            // so the cycle can continue
            window.ddw_lastSlide = window.ddw_firstSlide;
            window.ddw_lastSlideNumber = window.ddw_firstSlideNumber;
            window.ddw_slideNumber = window.ddw_slideNumber + 1;
            if (window.ddw_slideNumber > (window.ddw_slideCount-1)) {
                window.ddw_slideNumber = 0;
            }
            window.ddw_firstSlideNumber = window.ddw_firstSlideNumber +1;
            if (window.ddw_firstSlideNumber > (window.ddw_slideCount-1) ) {
                window.ddw_firstSlideNumber = 0;
            }
            window.ddw_firstSlide = window.ddw_slides[window.ddw_firstSlideNumber];
           
        }
    }
}