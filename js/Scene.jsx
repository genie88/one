/** @jsx React.DOM **/

var Scene = React.createClass({
  id : "scene-" + parseInt(Math.random() * 10000),
  index: 0,

  //场景新建事件处理函数
  onCreate: function() {
    Messenger.broadcast('scene.create', {id: this.id}); 
  },
  //场景加载事件处理函数
  onMount: function() {
    Messenger.broadcast('scene.mount', {id: this.id}); 
  },
  //场景进入事件处理函数
  onEnter: function() {
    Messenger.broadcast('scene.enter', {id: this.id});
  },
  //场景离开事件处理函数
  onLeave: function() {
    Messenger.broadcast('scene.leave', {id: this.id});
  },
  //场景删除事件处理函数
  onRemove: function() {
    Messenger.broadcast('scene.remove', {id: this.id});
  },

  data: {
      //drag flags
      moving: false,
      dragStart: false,

      //resize flags
      resizeStart: false,
      resizing: false,

      prePoints: {x:0 , y:0}
  },

  //===================================================//
  //            Original Mouse Event Handler           //
  //===================================================//
  onClick: function() {
    Messenger.broadcast('scene.selected', {id: this.id});
    var  $this = $("#"+ this.id);
    selected = !this.state.selected;
    this.extendState({selected: selected});
    this.goVelocity($this);
    return false;
    
  },
  onMouseDown: function(evt){
    var e = evt.nativeEvent;
    
    this.data.prePoints = {x: e.clientX, y: e.clientY};
    this.data.resizeStart = true;
    this.data.dragStart = true;
  },
  onMouseMove: function(evt){
    var e = evt.nativeEvent,
        currPoints = {x: e.clientX, y: e.clientY},
        prePoints = this.data.prePoints;
        offset = { 
          x: currPoints.x - prePoints.x ,
          y: currPoints.y - prePoints.y ,
        };

      //标记为拖动开始
      if ( !!this.data.dragStart ) {
        //触发元素拖动开始事件
        //this.onDragBegin({data: this.data.prePoints});
        this.data.dragStart = true;
        this.data.moving = true;
      } 
      if( !!this.data.moving) {
        //触发元素拖动事件
        //this.onDrag({data: currPoints});
      }

      //标记为缩放操作开始
      if ( !!this.data.resizeStart ) {
        //触发元素缩放开始事件
        //this.onResizeBegin({data: this.data.prePoints});
        this.data.resizeStart = true;
        this.data.resizing = true;
      } 
      if( !!this.data.resizing) {
        //触发元素缩放事件
        //this.onResize({data: currPoints});
      }
  
    this.data.prePoints = currPoints;
    return false;
  },
  onMouseUp: function(evt){
    //如果有拖动，视为拖动事件
    if (this.data.moving) {
      var e = evt.nativeEvent,
      currPoints = {x: e.clientX, y: e.clientY};

      this.data.moving = false;
      this.data.dragStart = false;
      //触发元素拖动结束事件
      //this.onDragBegin({data: currPoints});
      return false;
    } 
  },


  //扩展this.state
  extendState: function (state) {
    var newState = $.extend(true, this.state , state);
    this.setState(newState); 
  },

  // 运行当前页面上所有元素的动画
  goVelocity: function(handler) {

  },
  
  getInitialState: function() {
    return {
      selected: false,
      styles: {
        top: "0px",
        left: "0px",
        width: "100%",
        height: "100%",
        backgroundColor: "transparent",
        backgroundImage: ""
      },
      animations: [
      ]
    }
  },

  render: function() {
   var self = this;
    return (
      <div id={self.id} 
          className= "scene active"
          style={self.state.styles}
          onClick={this.onClick}
          onMouseMove={this.onMouseMove}
          onDragStart= {function(){return false;}}
          onMouseUp={this.onMouseUp}
          onMouseDown={this.onMouseDown}>
        hello, scene!
      </div>
    );
  }
});

React.renderComponent(<Scene />, document.getElementById('scene')); 