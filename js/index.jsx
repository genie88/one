/** @jsx React.DOM **/

var Sprite = React.createClass({
  id : "sprite_2459",
  handleClick: function() {
      var  $this = document.querySelector("#sprite_2459");
    var mySequence = [
          { e: $this, p: { translateX: 100 }, o: { duration: 1000 } },
          { e: $this, p: { translateY: 200 }, o: { duration: 1000, sequenceQueue: false }},
         { e: $this, p: { rotateZ: 360 }, o: { duration: 1000 }}
      ];
      $.Velocity.RunSequence(mySequence);
      $($this).velocity("callout.pulse")
                   .velocity("transition.flipXOut", { delay: 100 })
                   .velocity("transition.flipXIn", { delay: 200 });
  },
  
  getInitialState: function() {
    return {
      heroimg: 'http://placebabies.com/500/500/1',
      styles: {
        width: "100px",
        height: "100px",
         background: "#9a21a5"
      },
      animations: {
      
      }
    }
  },
  render: function() {
   var self = this;
    return (
      <div id={self.id} className="sprite" style={self.state.styles} onClick={this.handleClick.bind()}>
      </div>
    );
  }
});

React.renderComponent(<Sprite />, document.getElementById('scene')); 