/** @jsx React.DOM **/

var Sprite = React.createClass({
  id : "elem-" + parseInt(Math.random() * 10000),
  type: "image", //optional[image, text, geometric]
  handleClick: function() {
    var  $this = $("#"+ this.id);
    $this.addClass("elem-active");
    this.goVelocity($this);
    return false;
    
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
        backgroundColor: "transparent"
      },
      animations: [
        { p: { translateX: 100 }, o: { duration: 1000 } },
        { p: { top: '40%' }, o: { duration: 1000, sequenceQueue: false }},
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
      <div id={self.id} 
          className="elem j_elem elem-image" 
          style={self.state.styles}
          data-type={this.type} 
          onClick={this.handleClick.bind()}>
        <div className="j_elem_main elem-main">
          <div className="resize-hd resize-hd-corner resize-hd-tl"></div>
          <div className="resize-hd resize-hd-corner resize-hd-tr"></div>
          <div className="resize-hd resize-hd-corner resize-hd-bl"></div>
          <div className="resize-hd resize-hd-corner resize-hd-br"></div>
          <div className="resize-hd resize-hd-t"></div>
          <div className="resize-hd resize-hd-r"></div>
          <div className="resize-hd resize-hd-b"></div>
          <div className="resize-hd resize-hd-l"></div>
          <div className="cont">
            <img src="http://p0.qhimg.com/t01c1b079125298f4d0.png" style={self.state.styles}/>
          </div>
          <a className="icon j_elem_remove"></a>
        </div>
      </div>
    );
  }
});

React.renderComponent(<Sprite />, document.getElementById('scene')); 