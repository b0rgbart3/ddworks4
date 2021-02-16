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
        trackMove(e);
        trackStart(e);
        
    });

    $('.carousel').on('mouseup', function(e) {
        window.ddw_dragging = false;
    });

    $('.carousel').on('mousemove', function(e) {
        if (window.ddw_dragging) {
        trackMove(e);
        let distance = window.ddw_x - window.ddw_prevx;
        if (distance > 0) {
            window.ddw_direction = "right";
        }
        if (distance < 0 ) {
            window.ddw_direction = "left";
        }
        slideSlides(distance);
        }
    });

});


function trackMove(e) {
    window.ddw_prevx = window.ddw_x;
    window.ddw_prevy = window.ddw_y;
    e = e || window.event;

    let pageX = e.pageX;
    let pageY = e.pageY;
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

    let pageX = e.pageX;
    let pageY = e.pageY;
    // IE 8
    if (pageX === undefined) {
        pageX = e.clientX + document.body.scrollLeft + document.documentElement.scrollLeft;
        pageY = e.clientY + document.body.scrollTop + document.documentElement.scrollTop;
    }

    window.ddw_startx = pageX;
    window.ddw_starty = pageY;
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

function checkForReposition(distance) {
    if (distance > 0) {

       
       // console.log("distance:" + distance);

        let fsPos = $(window.ddw_firstSlide).position().left;
      //  console.log('fsPos: ' + fsPos);
       
        if (fsPos >= 1 ) {

            console.log("reached the begining.");
            // we have reached the very begining of the slide sequence, so we need to
            // wrap the last slide around to the left.

            // let lastSlide = window.ddw_slideOrder.pop();
            // window.ddw_slideOrder.unshift(lastSlide);
            // console.log("new slide order: " + window.ddw_slideOrder);
           
            let lastLeft = 0 - $(window.ddw_lastSlide).width();
            $(window.ddw_lastSlide).css({left: lastLeft + "px"});
            // console.log('Wrapping');

             window.ddw_firstSlide = window.ddw_lastSlide;
             window.ddw_slideNumber = window.ddw_slideNumber -1;
             if (window.ddw_slideNumber < 0) {
                 window.ddw_slideNumber = window.ddw_slideCount -1;
             }
             console.log('slideNumber: ' + window.ddw_slideNumber);
             console.log('slideCount: ' + window.ddw_slideCount);
             window.ddw_lastSlideNumber = window.ddw_lastSlideNumber -1;
             if (window.ddw_lastSlideNumber < 0 ) {
                 window.ddw_lastSlideNumber = window.ddw_slideCount -1;
             }

             console.log('lastSlideNumber: ' + window.ddw_lastSlideNumber);
             window.ddw_lastSlide = window.ddw_slides[window.ddw_lastSlideNumber];


        }

    } else {

    }
}