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
    //this.goVelocity($this);
    return false;
    
  },

  onRemove: function() {
    Messenger.broadcast('elem.remove', {id: this.props.id});
    //alert("not implement yet");
    
  },

  onDragStart: function(){
    //发送消息给Scene组件
    Messenger.broadcast('elem.drag.start', {id: this.props.id});
  },

  onDrag: function(){
    //Messenger.broadcast('elem.drag.dragging', {id: this.props.id});
  },

  onDragEnd: function(){
    //Messenger.broadcast('elem.drag.end', {id: this.props.id});
  },

  onResizeStart: function(){
    //发送消息给Scene组件
    Messenger.broadcast('elem.resize.start', {id: this.props.id});
  },

  onResizeEnd: function(){
    //Messenger.broadcast('elem.resize.resizing', {id: this.props.id});
  },

  onResize: function(){
    //Messenger.broadcast('elem.resize.end', {id: this.props.id});
  },

  addListenners: function (){
    //监听来自Scene组件的以下事件
    Messenger.add('scene.mouse.move', this.props.id, this.onMouseMove);
    Messenger.add('scene.mouse.up', this.props.id, this.onMouseUp);
  },


  //全局标志位与数据存储
  data: {
      control: null,
      //drag flags
      moving: false,
      dragStart: false,

      //resize flags
      resizeStart: false,
      resizing: false,

      prePoints: {x:0 , y:0}
  },

  cancelResizeAndDrag: function(){
    this.data.resizing = false;
    this.data.resizeStart = false;
    this.data.moving = false;
    this.data.dragStart = false;
  },

  //===================================================//
  //            Original Mouse Event Handler           //
  //===================================================//
  onMouseDown: function(evt){
    //console.log('mouse down', evt.nativeEvent);
    var e = evt.nativeEvent;
    this.data.prePoints = {x: e.clientX, y: e.clientY};
    this.data.control = $(evt.target).attr('data-controls');

    //根据当前点击位置不同，进入不同的处理分支
    switch(this.data.control){
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
        this.onDragStart({data: this.data.prePoints});
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
        this.onResizeStart({data: this.data.prePoints});
        this.data.resizeStart = true;
        this.data.resizing = true;
      } 

      if( !!this.data.resizing) {
        //触发元素缩放事件
        this.onResize({data: currPoints});

        //缩放元素
        var width = parseInt(this.state.styles.width),
            height= parseInt(this.state.styles.height);
        width += offset.x;
        height += offset.y;
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
    var e = evt.nativeEvent,
        currPoints = {x: e.clientX, y: e.clientY};

    this.cancelResizeAndDrag();

    //根据当前控件不同，进入不同的处理分支
    switch(this.data.control){
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
        if (!!this.data.resizing) { 
          //触发元素缩放结束事件
          this.onResizeEnd({data: currPoints});
          console.log('resize end');
        } 
        return false;
        break;
      //删除组件按钮
      case 'x':
        //不处理
        return true;
        break;
      //组件主体部分
      default : 
        //如果有拖动，视为拖动事件
        if (!!this.data.moving) {
          //触发元素拖动结束事件
          console.log('drag end');
          this.onDragEnd({data: currPoints});
        } 
        return false;
        break;
    }
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

  /**
   * 组件的生命周期分成三个状态：
   *   Mounting：已插入真实 DOM
   *   Updating：正在被重新渲染
   *   Unmounting：已移出真实 DOM
   **/
  componentDidMount: function(){
    //注册广播消息监听
    this.addListenners();
    console.log('broadcast news is listening ...');
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
            onMouseDown={this.onMouseDown}
            //onMouseMove={this.onMouseMove}
            //onMouseUp={this.onMouseUp}
            onDragStart= {function(){return false;}}
          >
          <div className="resize-hd resize-hd-corner resize-hd-tl" data-controls="tl"></div>
          <div className="resize-hd resize-hd-corner resize-hd-tr" data-controls="tr"></div>
          <div className="resize-hd resize-hd-corner resize-hd-bl" data-controls="bl"></div>
          <div className="resize-hd resize-hd-corner resize-hd-br" data-controls="br"></div>
          <div className="resize-hd resize-hd-t" data-controls="t"></div>
          <div className="resize-hd resize-hd-r" data-controls="r"></div>
          <div className="resize-hd resize-hd-b" data-controls="b"></div>
          <div className="resize-hd resize-hd-l" data-controls="l"></div>
          <div className="cont" onClick= {this.handleClick}>
            <img src="image/demo.png" style={self.state.styles}/>
          </div>
          <a className="icon icon-remove" data-controls="x" onClick={this.onRemove.bind()}></a>
        </div>
      </div>
    );
  }
});