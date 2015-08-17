$.Velocity
    .RegisterEffect("callout.pulse", {
        defaultDuration: 900,
        calls: [
        [ { scale: 1.1 }, 0.50 ],
        [ { scale: 1 }, 0.50 ]
      ]
    })
    .RegisterEffect("transition.flipXIn", {
        defaultDuration: 700,
        calls: [
            [ { opacity: 1, rotateY: [ 0, -55 ] } ]
        ]
    })
    .RegisterEffect("transition.flipXOut", {
        defaultDuration: 700,
        calls: [
            [ { opacity: 0, rotateY: 55 } ]
        ],
        reset: { rotateY: 0 }
    });