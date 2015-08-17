/* -----------------------------------------------------
BEGIN VELOCITY ANIMATIONS
----------------------------------------------------- */
/**
 * Usage: 
 *  velocitySequence = [
 *    { elements: nth0, properties: 'custom.fadeOut', options: vOption1 },
 *    { elements: nth1, properties: 'custom.slideDownIn', options: vOption2 },
 *    { elements: nth2, properties: 'custom.slideUpIn', options: vOption3 },
 *    { elements: nth3, properties: 'custom.zoomOutIn', options: vOption4 },
 *  ]; 
 *  $.Velocity.RunSequence(velocitySequence);
 *
 */

// Register new animations
$.Velocity.RegisterEffect("custom.pulse", {
    defaultDuration: 900,
    calls: [
        [ { scale: 1.1 }, 0.50 ],
        [ { scale: 1 }, 0.50 ]
    ]
})
$.Velocity.RegisterEffect("custom.flipXIn", {
    defaultDuration: 700,
    calls: [
        [ { opacity: 1, rotateY: [ 0, -55 ] } ]
    ]
})
$.Velocity.RegisterEffect("custom.flipXOut", {
    defaultDuration: 700,
    calls: [
        [ { opacity: 0, rotateY: 55 } ]
    ],
    reset: { rotateY: 0 }
});
$.Velocity.RegisterUI("custom.slideUpIn", {
  defaultDuration: 500,
  calls: [[ { opacity: [1,0], translateY: [0,90], translateZ: 0 } ]]
});

$.Velocity.RegisterUI("custom.slideDownIn", {
  defaultDuration: 500,
  calls: [[ { opacity: [1,0], translateY: [0,-90], translateZ: 0 } ]]
});

$.Velocity.RegisterUI("custom.slideLeftIn", {
  defaultDuration: 500,
  calls: [[ { opacity: [1,0], translateX: [0,-90], translateZ: 0 } ]]
});

$.Velocity.RegisterUI("custom.slideRightIn", {
  defaultDuration: 500,
  calls: [[ { opacity: [1,0], translateX: [0,90], translateZ: 0 } ]]
});

$.Velocity.RegisterUI("custom.zoomOutIn", {
  defaultDuration: 500,
  calls: [[ { opacity: [1,0], scale:[1,1.5], translateZ: 0 } ]]
});

$.Velocity.RegisterUI("custom.zoomInIn", {
  defaultDuration: 500,
  calls: [[ { opacity: [1,0], scale:[1,0.5], translateZ: 0 } ]]
});

$.Velocity.RegisterUI("custom.superZoomOutIn", {
  defaultDuration: 500,
  calls: [[ { opacity: [1,0], scale:[1,5], translateZ: 0, translateY: [0,500] } ]],
});

$.Velocity.RegisterUI("custom.flickUpIn", {
  defaultDuration: 500,
  calls: [[ { opacity: [1,0], translateY: [0,90], rotateZ: [0,10], translateZ: 0 } ]]
});

$.Velocity.RegisterUI("custom.flickDownIn", {
  defaultDuration: 500,
  calls: [[ { opacity: [1,0], translateY: [0,-90], rotateZ: [0,-10], translateZ: 0 } ]]
});

$.Velocity.RegisterUI("custom.fadeOut", {
  defaultDuration: 300,
  calls: [[ { opacity: 0, translateZ: 0 } ]],
  reset: { translateY:0, opacity:0, rotateZ:0, scale:1, translateX:0 }
});
