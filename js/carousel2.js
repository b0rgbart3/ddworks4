$(document).ready(function() { 
    window.ddw_moving = false;

    // jQuery.event.special.touchstart = {
    //     setup: function( _, ns, handle ){
    //       if ( ns.includes("noPreventDefault") ) {
    //         this.addEventListener("touchstart", handle, { passive: true });
    //       } else {
    //         this.addEventListener("touchstart", handle, { passive: true });
    //       }
    //     }
    //   };
      
    
    window.ddw_slides = $('.slide');
//     window.ddw_slide_width = 1200;
//     console.log(window.ddw_slides);
//    // $('.slide').css({left: "-200px" });

    $(".carousel").on('mousedown', function(e) {
        e.stopPropagation();
        touchDown(e);
    });

    $(".slide").on('mousedown', function(e) {
        e.stopPropagation();
        touchDown(e);
    });
    $('.slideImage').on('mousedown', function(e) {
        e.stopPropagation();
        touchDown(e);
    });

    $(".carousel").mouseup(function(e) {
        e.stopPropagation();
        letUp(e);
    });

    $(".slide").mouseup( function(e) {
        e.stopPropagation();
        letUp(e);
    });
    $('.slideImage').mouseup(function(e) {
        e.stopPropagation();
        letUp(e);
    });
    // $('.slide').on("swipeleft", function() {

    // });
    $('.carousel').on('mouseout', function(e) {
        window.ddw_moving = false;
    });
    
    $('.carousel').on("swipeleft", function(e) {
        console.log("swipe");
        if (window.ddw_mover) {
            clearInterval(window.ddw_mover);
          }
     //   window.ddw_moving=false;
        trackMe(e);
        moveLeft();
    });
    $('.carousel').on("swiperight", function() {
        if (window.ddw_mover) {
            clearInterval(window.ddw_mover);
          }
       // window.ddw_moving=false;
        trackMe(e);
        moveRight();

    });
    $('.carousel').on("tap", function() {
        console.log("tap");
        if (window.ddw_mover) {
            clearInterval(window.ddw_mover);
          }
        window.ddw_moving=false;
    })
});

function trackMe(e) {
    //console.log("TRACKING: ");
    if (ddw_moving) {
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
    
        console.log(window.ddw_x);
        if (window.ddw_x < window.ddw_start_x) {
            moveLeft();
        } else {
            moveRight();
        }
    }
}

function touchDown(e) {
    if (window.ddw_mover) {
      clearInterval(window.ddw_mover);
    }
    window.ddw_moving = true;
    trackMe(e);
    window.ddw_start_x = window.ddw_x;
    window.ddw_start_y = window.ddw_y;
}

function letUp(e) {
    if (window.ddw_mover) {
        clearInterval(window.ddw_mover);
      }
    trackMe(e);
    window.ddw_moving = false;


}

function moveRight() {
   //// window.ddw_mover = setInterval( function() {
        window.ddw_slides.map( (index, slide) => {
        //console.log(slide);
        let leftPos = $(slide).position().left;
        console.log("Left: " + leftPos);
        leftPos = leftPos + 10;
        $(slide).css({left: leftPos + "px" });
        });
//}, 10);
}

function moveLeft() {

   // window.ddw_mover = setInterval( function() {
        window.ddw_slides.map( (index, slide) => {
        //console.log(slide);
        let leftPos = $(slide).position().left;
        console.log("Left: " + leftPos);
        leftPos = leftPos - 10;
        $(slide).css({left: leftPos + "px" });
        });
//}, 10);

}
// function touchDown(e) {
//     e = e || window.event;

//     let pageX = e.pageX;
//     let pageY = e.pageY;
//     // IE 8
//     if (pageX === undefined) {
//         pageX = e.clientX + document.body.scrollLeft + document.documentElement.scrollLeft;
//         pageY = e.clientY + document.body.scrollTop + document.documentElement.scrollTop;
//     }

//     window.ddw_x = pageX;
//     window.ddw_y = pageY;
    //window.ddw_t = new Date().getTime();
   
//     startMoving();
// }

// function letUp(e) {
//     e = e || window.event;

//     let pageX = e.pageX;
//     let pageY = e.pageY;
//     // IE 8
//     if (pageX === undefined) {
//         pageX = e.clientX + document.body.scrollLeft + document.documentElement.scrollLeft;
//         pageY = e.clientY + document.body.scrollTop + document.documentElement.scrollTop;
//     }
//     stopMoving();
    
   // let xDistance = window.ddw_x - pageX;


   // let newTime = new Date().getTime();
   // let elapsedTime = newTime - window.ddw_t;

   // let velocity = (xDistance / elapsedTime) / 10;

   // console.log(xDistance + " pixels in " + elapsedTime + " milliseconds, for a velocity of: " + velocity);


    // if (velocity > 0) {
    //     window.ddw_direction = "left";
    //     console.log("moving left");
    // } else {
    //     window.ddw_direction = "right";
    //     console.log("moving right");
    // }
    // window.ddw_v = Math.abs(velocity * 2);
    // window.ddw_move = window.ddw_v ;
    // console.log("move: " + window.ddw_move);
    // spin();
    
//}


// var startMoving = function() {
//     if (!window.ddw_moving) {
//         window.ddw_moving = true;
//     console.log('moving');
//     let moved = 0;
//     let mover = setInterval( function() {
//         console.log("move by 1");
//         moved++;
//         if (moved >= 10) {
//             clearInterval(mover);
//         }

//     }, 10);
//     }
// }


// var stopMoving = function() {
//     window.ddw_moving = false;
//     console.log('stop');
// }