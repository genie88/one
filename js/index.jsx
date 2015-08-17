/** @jsx React.DOM **/

var Sprite = React.createClass({
  id : "sprite_2459",
  handleClick: function() {
    var  $this = $("#"+ this.id);
    this.goVelocity($this);
    
  },

  // 运行组件上的动画
  goVelocity: function(handler) {
    //注入element引用
    $.each(this.state.animations, function(index, animation){
      animation.e = handler;
    });
    $.Velocity.RunSequence(this.state.animations);
  },
  
  getInitialState: function() {
    return {
      heroimg: 'http://placebabies.com/500/500/1',
      styles: {
        width: "100px",
        height: "100px",
         background: "#9a21a5"
      },
      animations: [
        { p: { translateX: 100 }, o: { duration: 1000 } },
        { p: { top: '50%' }, o: { duration: 1000, sequenceQueue: false }},
        { p: { rotateZ: 360 }, o: { duration: 1000 }},
        { p: "custom.pulse", o: { duration: 1000 }},
        { p: "custom.flipXOut", o: { duration: 1000 }},
        { p: "custom.slideUpIn", o: { duration: 1000 }}
      ]
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