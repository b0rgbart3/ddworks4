$(document).ready(function() { 
    window.ddw_spinning =false;
    window.ddw_dragging = false;
    window.ddw_currentSlideNumber = 0;

    jQuery.event.special.touchstart = {
        setup: function( _, ns, handle ){
          if ( ns.includes("noPreventDefault") ) {
            this.addEventListener("touchstart", handle, { passive: true });
          } else {
            this.addEventListener("touchstart", handle, { passive: true });
          }
        }
      };
      
    // if (window.ddw_spinner) {
    // clearInterval(window.ddw_spinner); }

    window.ddw_slides = $('.slide');
    window.ddw_slideCount = window.ddw_slides.length;
    window.ddw_slide_width = 1200;
    console.log(window.ddw_slides);
   // $('.slide').css({left: "-200px" });

    $(".carousel").on('mousedown', function(e) {
        e.stopPropagation();
        // if (window.ddw_spinner) {
        // clearInterval(window.ddw_spinner); }

      //  console.log('carousel down');
        touchDown(e);
    });

    $(".carousel").on('mousemove', function(e) {
        if (!window.ddw_spinning) {
          dragMe(e);
        }
    });

    $(".slide").on('mousedown', function(e) {
        // e.stopPropagation();
        // if (window.ddw_spinner) {
        //     clearInterval(window.ddw_spinner); }

        // console.log('slide down');
        // touchDown(e);
    });
    $('.slideImage').on('mousedown', function(e) {
        // e.stopPropagation();
        // if (window.ddw_spinner) {
        //     clearInterval(window.ddw_spinner); }
    
        // console.log('image down');
        // touchDown(e);
    });

    $(".carousel").mouseup(function(e) {
        e.stopPropagation();
       console.log('carousel up');
        letUp(e);
    });

    $(".slide").mouseup( function(e) {
        // e.stopPropagation();
        // console.log('slide up');
        // letUp(e);
    });
    $('.slideImage').mouseup(function(e) {
        // e.stopPropagation();
        // console.log('image up');
        // letUp(e);
    });

 $('.carouselContainer').on('mouseout', function(e) {
      
    window.ddw_dragging = false;

    //     if ($(e.target).hasClass('carouselContainer')) {
    //         console.log("from the container");
    //         window.ddw_moving = false;
    //         if (window.ddw_spinner) {
    //             console.log("Moved out");
    //             clearInterval(window.ddw_spinner); }
    //     }

     });

    $('.carousel').on("swipeleft", function() {
       // console.log("left");
        window.ddw_direction = "left";
        window.ddw_move = 1;
        window.ddw_v = 1;
        spin();
    });
    // $('.carousel').on("swipeleft", function() {
    //     console.log("left");
    //     window.ddw_direction = "left";
    //     window.ddw_move = 1;
    //     window.ddw_v = 1;
    //     spin();
    // });
    $('.carousel').on("swiperight", function() {
      //  console.log("right");
        window.ddw_direction = "right";
        window.ddw_move = 1;
        window.ddw_v = 1;
        spin();
    });
});

function dragMe(e) {
    if (window.ddw_dragging) {
    e = e || window.event;

    let pageX = e.pageX;
    let pageY = e.pageY;
    // IE 8
    if (pageX === undefined) {
        pageX = e.clientX + document.body.scrollLeft + document.documentElement.scrollLeft;
        pageY = e.clientY + document.body.scrollTop + document.documentElement.scrollTop;
    }

    
    window.ddw_dragx = pageX;
    let xDistance = window.ddw_dragx - window.ddw_x;
  //  console.log('xDistance: ' + xDistance);
    if (xDistance > 0) {
        window.ddw_direction = "right";
       // console.log("moving left");
    } else {
        window.ddw_direction = "left";
       // console.log("moving right");
    }

    window.ddw_slides.map( function(index,slide) {

        leftPos = $(slide).position().left;
        let newLeft = leftPos;
        
        if (window.ddw_direction == "left") {
        newLeft = leftPos - 1;
    // console.log(newLeft);
        }
        else {
            newLeft = leftPos + 1;
        //  console.log(newLeft);

        }
        $(slide).css({left: newLeft + "px"});

        // if ((newLeft < -800)  || (newLeft > 1600)){
        //     clearInterval(window.ddw_spinner);
        // }
});
  }

}


function touchDown(e) {
  
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
    window.ddw_t = new Date().getTime();
    window.ddw_dragging = true;
   
}

function letUp(e) {
    window.ddw_dragging = false;

    e = e || window.event;

    let pageX = e.pageX;
    let pageY = e.pageY;
    // IE 8
    if (pageX === undefined) {
        pageX = e.clientX + document.body.scrollLeft + document.documentElement.scrollLeft;
        pageY = e.clientY + document.body.scrollTop + document.documentElement.scrollTop;
    }
    
    let xDistance = window.ddw_x - pageX;


    let newTime = new Date().getTime();
    let elapsedTime = newTime - window.ddw_t;

    let velocity = (xDistance / elapsedTime) / 10;

   // console.log(xDistance + " pixels in " + elapsedTime + " milliseconds, for a velocity of: " + velocity);


    if (velocity > 0) {
        window.ddw_direction = "left";
       // console.log("moving left");
    } else {
        window.ddw_direction = "right";
       // console.log("moving right");
    }

    if ((velocity > .05) || (velocity < -.05)) {
    window.ddw_v = Math.abs(velocity * 2);
    window.ddw_move = window.ddw_v ;
   // console.log("move: " + window.ddw_move);

    if (window.ddw_spinning == false) {
    spin();
    }
  }
    
}

function spin() {

    let totalMove = 0;
    if (window.ddw_spinning == false) {
    window.ddw_spinning = true;


    window.ddw_spinner = setInterval( function() {
      //console.log('spinning: '+ window.ddw_move);

      if (!window.ddw_move) {
          window.ddw_move = 0;
      }
      if (!window.ddw_v) {
          window.ddw_v= 1;
      }
            window.ddw_move += window.ddw_v;
            totalMove += window.ddw_move;
            
        
          //  console.log("total move: " + totalMove);
          //  console.log("window.ddw_slide_width: " + window.ddw_slide_width);

        if (totalMove >= window.ddw_slide_width)  {
            totalMove = 0;
            window.ddw_spinning = false;
            clearInterval(window.ddw_spinner);
           
          //  console.log("clearing interval");
          //  console.log("Done");
            if (window.ddw_direction == "right") {
                window.ddw_currentSlideNumber = window.ddw_currentSlideNumber -1;
                if (window.ddw_currentSlideNumber < 0 ) {
                    window.ddw_currentSlideNumber = window.ddw_slideCount-1;
                }

            } else {
                window.ddw_currentSlideNumber = window.ddw_currentSlideNumber + 1;
                if (window.ddw_currentSlideNumber >= window.ddw_slideCount ) {
                    window.ddw_currentSlideNumber = 0;
                }
            }
            console.log("current slide: " + window.ddw_currentSlideNumber);
        } else {
        moveSlides();
       // console.log(window.ddw_move);
        }
        
        // if ((window.ddw_move >= (window.ddw_slide_width *.9) ) || ( window.ddw_move <= (0- (window.ddw_slide_width*.9)))){
          
        //     window.ddw_slowing = setInterval( function() {

        //         if (window.ddw_direction == "left") {
        //             window.ddw_move += .1
        //         } else {
        //             window.ddw_move -= .1;
        //         }
        //        // moveSlides();
        //         console.log('spinning: '+ window.ddw_move);
        //         if ((window.ddw_move <= (0 - window.ddw_slide_width)) || (window.ddw_move >= window.ddw_slide_width)){
        //             clearInterval(window.ddw_slowing);
        //         }

        //     }, 10)
        
    }, 10 );
  }
  
}

function moveSlides() {

 
    window.ddw_slides.map( function(index,slide) {

            leftPos = $(slide).position().left;
            let newLeft = leftPos;
            
            if (window.ddw_direction == "left") {
            newLeft = leftPos - window.ddw_move;
        // console.log(newLeft);
            }
            else {
                newLeft = leftPos + window.ddw_move;
            //  console.log(newLeft);

            }
            $(slide).css({left: newLeft + "px"});

            // if ((newLeft < -800)  || (newLeft > 1600)){
            //     clearInterval(window.ddw_spinner);
            // }
    });

    // window.ddw_slides.map( function(index,slide) {
     
    //     let leftPos = 0;
    //   //  console.log("Slide # " + index);

    //     console.log(window.ddw_move);

    //     if (window.ddw_direction == "left") {
    //         leftPos = $(slide).position().left - window.ddw_move;
            
    //     $(slide).css({left: leftPos + "px"});
    //     }
    //     else {
    //         leftPos = $(slide).position().left + window.ddw_move;
    //         $(slide).css({left: leftPos + "px"});
    //     }

        
    // });

}