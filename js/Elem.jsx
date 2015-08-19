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
    //selected = !this.state.selected;
    this.extendState({selected: true});
    //this.goVelocity($this);
    return false;
    
  },

  onRemove: function() {
    //如果直接删除元素会有个致命的bug，改如何解决？
    this.extendState({ styles: {display: 'none'}});
    $("#"+ this.props.id).attr('data-remove', 'true');
    this.extendState({removed: true});
    //$this.remove();

    //这个直接暴力删除dom节点，会有问题吗？
    //var  $this = $("#"+ this.props.id);
    //$this.remove();
    //Messenger.broadcast('elem.remove', {id: this.props.id});    
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
    var self = this;
    Messenger.add('scene.mouse.move', this.props.id, this.onMouseMove);
    Messenger.add('scene.mouse.up', this.props.id, this.onMouseUp);
    Messenger.add('scene.selected', this.props.id, function(){
      self.extendState({selected: false});
    });
    Messenger.add('elem.selected', this.props.id, function(data){
      if (data.id != self.props.id) self.extendState({selected: false});
    });
  },

  //取消拖动或缩放的状态变量
  cancelResizeAndDrag: function(){
    this.extendState({
      data: {
        resizing: false,
        resizeStart: false,
        moving:false,
        dragStart:false,
        control: 'dummy'
      }
    });
  },

  //===================================================//
  //            Original Mouse Event Handler           //
  //===================================================//
  onMouseDown: function(evt){
    var e = evt.nativeEvent;
    this.extendState({
      data: {
        prePoints: {x: e.clientX, y: e.clientY},
        control: $(evt.target).attr('data-controls')
      }
    })

    //根据当前点击位置不同，进入不同的处理分支
    switch(this.state.data.control){
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
        this.extendState({data: { resizeStart: true }});
        break;
      //删除组件按钮
      case 'x':
        break;
      default : 
        this.extendState({data: { dragStart: true }});
        break;
    }
  },
  onMouseMove: function(evt){
    var e = evt.nativeEvent,
        currPoints = {x: e.clientX, y: e.clientY},
        prePoints = this.state.data.prePoints;
        offset = { 
          x: currPoints.x - prePoints.x ,
          y: currPoints.y - prePoints.y ,
        };

      //标记为拖动开始
      if ( !!this.state.data.dragStart ) {
        //触发元素拖动开始事件
        this.onDragStart({data: this.state.data.prePoints});
        this.extendState({data: { dragStart: true, moving: true }});
      } 

      if( !!this.state.data.moving) {
        //触发元素拖动事件
        this.onDrag({data: currPoints});

        //移动元素
        var top = ( parseFloat(this.state.styles.top) /100 ) * SCREEN.height ,
            left= ( parseFloat(this.state.styles.left) /100 )* SCREEN.width ;
        top += offset.y;
        left += offset.x;
        this.extendState({
          styles: {
            top:  (top  / SCREEN.height * 100) + '%',
            left: (left / SCREEN.width   * 100) +'%'
          }
        });
      }

      //标记为缩放操作开始
      if ( !!this.state.data.resizeStart ) {
        //触发元素缩放开始事件
        this.onResizeStart({data: this.state.data.prePoints});
        this.extendState({data: { resizeStart: true, resizing: true }});
      } 
     
      if( !!this.state.data.resizing) {
        //触发元素缩放事件
        this.onResize({data: currPoints});

        //缩放元素
        var style = {},
            width = ( parseFloat(this.state.styles.width) / 100 )* SCREEN.width,
            height= ( parseFloat(this.state.styles.height)/ 100 )* SCREEN.height,
            top = ( parseFloat(this.state.styles.top) / 100 ) * SCREEN.height,
            left= ( parseFloat(this.state.styles.left)/ 100 ) * SCREEN.width;

        //根据当前点击位置不同，进入不同的处理分支
        switch(this.state.data.control){
          //左上缩放控件
          case 'tl' : 
            height -= offset.y; //offset.y为负值
            top += offset.y;
            width -= offset.x; //offset.x为负值
            left += offset.x;
            style = {
              top: (top  / SCREEN.height * 100) + '%',
              left: (left / SCREEN.width   * 100) +'%',
              width: (width / SCREEN.width   * 100) +'%',
              height: (height  / SCREEN.height * 100) + '%'
            };
            break;
          //右上缩放控件
          case 'tr' : 
            height -= offset.y; //offset.y为负值
            top += offset.y;
            width += offset.x;
            style = {
              top: (top  / SCREEN.height * 100) + '%',
              width: (width / SCREEN.width   * 100) +'%',
              height: (height  / SCREEN.height * 100) + '%'
            };
            break;
          //左下缩放控件
          case 'bl' : 
            width -= offset.x;
            height += offset.y;
            left += offset.x;
            style = {
              left: (left / SCREEN.width   * 100) +'%',
              width: (width / SCREEN.width   * 100) +'%',
              height: (height  / SCREEN.height * 100) + '%'
            };
            break;
          //右下缩放控件
          case 'br' : 
            width += offset.x;
            height += offset.y;
            style = {
              width: (width / SCREEN.width   * 100) +'%',
              height: (height  / SCREEN.height * 100) + '%'
            };
            break;
          //顶部缩放控件
          case 't' : 
            height -= offset.y; //offset.y为负值
            top += offset.y;
            style = {
              top: (top  / SCREEN.height * 100) + '%',
              height: (height  / SCREEN.height * 100) + '%'
            };
            break;
          //右缩放控件
          case 'r' :
            width += offset.x;
            style = { width: (width / SCREEN.width   * 100) +'%'};
            break; 
          //底部缩放控件
          case 'b' : 
            height += offset.y;
            style = { height: (height  / SCREEN.height * 100) + '%' };
            break;
          //左缩放控件
          case 'l' :
            width -= offset.x; //offset.x为负值
            left += offset.x;
            style = {
              left: (left / SCREEN.width   * 100) +'%',
              width: (width  / SCREEN.width * 100) + '%'
            };
            break;
          //删除组件按钮
          case 'x':
            break;
          default : 
            break;
        } // End of Switch

        this.extendState({ styles: style});
      }

    this.extendState({data: { prePoints: currPoints}});
  },
  onMouseUp: function(evt){
    var e = evt.nativeEvent,
        currPoints = {x: e.clientX, y: e.clientY};

    //根据当前控件不同，进入不同的处理分支
    switch(this.state.data.control){
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
        if (!!this.state.data.resizing) { 
          //触发元素缩放结束事件
          this.onResizeEnd({data: currPoints});
          console.log('resize end');
        } 
        break;
      //删除组件按钮
      case 'x':
        //不处理
        return true;
        break;
      //组件主体部分
      default : 
        //如果有拖动，视为拖动事件
        if (!!this.state.data.moving) {
          //触发元素拖动结束事件
          console.log('drag end');
          this.onDragEnd({data: currPoints});
        } 
        break;
    }

    this.cancelResizeAndDrag();
    return false;
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
    var self = this, 
        _animations = this.props.animations,
        _style = {};

    //compute styles
    _style = $.extend(true, _style, 
      One.Style.getDefaultStyle(this.props.type), 
      this.props.styles
    );
    if (this.props.type == 'image') {
      $.extend(true, _style, 
        { backgroundImage: 'url(' + self.props.content + ')'}
      );  
    }

    return {
      selected: false,
      removed: false,
      styles: _style,
      animations: _animations,
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
      }
    }
  },

  render: function() {
   var self = this;
    _className = "elem " + (this.state.selected? " elem-active ": " ") + (" elem-" + this.props.type)
    _content = "" ;

    //内容区显示元素
    switch(self.props.type){
      case 'image':
        _content = '';
        break;
      case 'text':
        _content = self.props.content ;
        break;
      default:
        break;
    }

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
            {_content}
          </div>
          <a className="icon icon-remove" data-controls="x" onClick={this.onRemove.bind()}></a>
        </div>
      </div>
    );
  }
});