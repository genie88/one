/** @jsx React.DOM **/

/**
 * 
  OnePage 基础动画组件定义

  组件属性定义
  props: {
    id  : 组件的唯一id，以"elem-"开头
    type: 组件的类型，为[image, text, geometric]几种可选之
   } 
 *
 **/
var Elem = React.createClass({


  handleClick: function() {
    Messenger.broadcast('elem.selected', {id: this.props.id});
    var  $this = $("#"+ this.props.id);
    //$this.addClass("elem-active");
    selected = !this.state.selected;
    this.extendState({selected: selected});
    this.goVelocity($this);
    return false;
    
  },

  onRemove: function() {
    Messenger.broadcast('elem.remove', {id: this.props.id});
    //alert("not implement yet");
    
  },

  onDragBegin: function(){
    Messenger.broadcast('elem.drag.begin', {id: this.props.id});
  },

  onDrag: function(){
    Messenger.broadcast('elem.drag', {id: this.props.id});
  },

  onDragEnd: function(){
    Messenger.broadcast('elem.drag.end', {id: this.props.id});
  },

  onResizeBegin: function(){
    Messenger.broadcast('elem.resize.begin', {id: this.props.id});
  },

  onResizeEnd: function(){
    Messenger.broadcast('elem.resize', {id: this.props.id});
  },

  onResize: function(){
    Messenger.broadcast('elem.resize.end', {id: this.props.id});
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
  onMouseDown: function(evt){
    //console.log('mouse down', evt.nativeEvent);
    var e = evt.nativeEvent;
    
    this.data.prePoints = {x: e.clientX, y: e.clientY};
    

    //根据当前点击位置不同，进入不同的处理分支
    var control = $(evt.target).attr('data-controls');
    console.log(control)
    switch(control){
      //左上缩放控件
      case 'tl' : 
      //右上缩放控件
      case 'tr' : 
      //左下缩放控件
      case 'bl' : 
      //右下缩放控件
      case 'br' : 
      //顶部缩放控件
      case 't' : 
      //右缩放控件
      case 'r' : 
      //底部缩放控件
      case 'b' : 
      //左缩放控件
      case 'l' :
        console.log('resize start ...');
        this.data.resizeStart = true;
        break;
      //删除组件按钮
      case 'x':
        break;
      default : 
        this.data.dragStart = true;
        break;
    }
    //console.log(this.data.prePoints);
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
        this.onDragBegin({data: this.data.prePoints});
        this.data.dragStart = true;
        this.data.moving = true;
      } 

      if( !!this.data.moving) {
        //触发元素拖动事件
        this.onDrag({data: currPoints});

        //移动元素
        var top = parseInt(this.state.styles.top),
            left= parseInt(this.state.styles.left);
        top += offset.y;
        left += offset.x;
        this.extendState({
          styles: {
            top: top + 'px',
            left: left +'px'
          }
        });
      }

      //标记为缩放操作开始
      if ( !!this.data.resizeStart ) {
        //触发元素缩放开始事件
        this.onResizeBegin({data: this.data.prePoints});
        this.data.resizeStart = true;
        this.data.resizing = true;
      } 

      if( !!this.data.resizing) {
        //触发元素缩放事件
        this.onResize({data: currPoints});

        //缩放元素
        var width = parseInt(this.state.styles.width),
            height= parseInt(this.state.styles.height);
        width += offset.y;
        height += offset.x;
        this.extendState({
          styles: {
            width: width + 'px',
            height: height +'px'
          }
        });
      }
      

    //console.log(this.data.prePoints);
    this.data.prePoints = currPoints;
    //return false;

    //console.log('mouse move', evt.nativeEvent);
  },
  onMouseUp: function(evt){

    //console.log(this.data.moving);
    //根据当前点击位置不同，进入不同的处理分支
    var control = $(evt.target).attr('data-controls');
    switch(control){
      //左上缩放控件
      case 'tl' : 
        break;
      //右上缩放控件
      case 'tr' : 
        break;
      //左下缩放控件
      case 'bl' : 
        break;
      //右下缩放控件
      case 'br' : 
        break;
      //顶部缩放控件
      case 't' : 
        break;
      //右缩放控件
      case 'r' : 
        break;
      //底部缩放控件
      case 'b' : 
        break;
      //左缩放控件
      case 'l' : 
        break;
      //删除组件按钮
      case 'x':
        //不处理
        return true;
        break;
      //组件主体部分
      default : 
        //如果有拖动，视为拖动事件
        if (this.data.moving) {
          var e = evt.nativeEvent,
          currPoints = {x: e.clientX, y: e.clientY};

          this.data.moving = false;
          this.data.dragStart = false;
          //触发元素拖动结束事件
          this.onDragBegin({data: currPoints});
          return false;
        } 
        //如果无拖动，视为点击事件
        else {
          //this.handleClick({data: currPoints});
          //return false;
        }
        break;
    }
    
        
    //console.log('mouse up', evt.nativeEvent);
  },


  //扩展this.state
  extendState: function (state) {
    var newState = $.extend(true, this.state , state);
    this.setState(newState); 
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
      selected: false,
      heroimg: 'http://placebabies.com/500/500/1',
      styles: {
        top: "0px",
        left: "0px",
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
    _className = "elem " + (this.state.selected? " elem-active ": " ") + (" elem-" + this.props.type)
    return (
      <div id={self.props.id} 
          className= {_className}
          style={self.state.styles}
          data-type={this.props.type}>
        <div 
            className="j_elem_main elem-main" 
            onClick= {this.handleClick}
            onMouseMove={this.onMouseMove}
            onDragStart= {function(){return false;}}
            //onMouseUp={this.onMouseUp}
            //onMouseDown={this.onMouseDown}
          >
          <div className="resize-hd resize-hd-corner resize-hd-tl" data-controls="tl"></div>
          <div className="resize-hd resize-hd-corner resize-hd-tr" data-controls="tr"></div>
          <div className="resize-hd resize-hd-corner resize-hd-bl" data-controls="bl"></div>
          <div className="resize-hd resize-hd-corner resize-hd-br" data-controls="br"></div>
          <div className="resize-hd resize-hd-t" data-controls="t"></div>
          <div className="resize-hd resize-hd-r" data-controls="r"></div>
          <div className="resize-hd resize-hd-b" data-controls="b"></div>
          <div className="resize-hd resize-hd-l" data-controls="l"></div>
          <div className="cont">
            <img src="image/demo.png" style={self.state.styles}/>
          </div>
          <a className="icon icon-remove" data-controls="x" onClick={this.onRemove.bind()}></a>
        </div>
      </div>
    );
  }
});