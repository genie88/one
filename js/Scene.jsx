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

  //注册广播消息监听
  addListenners: function (){
    //监听来自Scene组件的以下事件
    //Messenger.add('elem.remove', this.props.id, this.onElemRemove);
    //Messenger.add('elem.resize.start', this.props.id, this.onElemResizeStart);
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
    Messenger.broadcast('scene.mouse.down', evt);
    return false;
  },
  onMouseMove: function(evt){
    Messenger.broadcast('scene.mouse.move', evt);
    return false;
  },
  onMouseUp: function(evt){
    Messenger.broadcast('scene.mouse.up', evt);
    return false; 
  },

  //扩展this.state
  extendState: function (state) {
    var newState = $.extend(true, this.state , state);
    this.setState(newState); 
  },

  // 运行当前页面上所有元素的动画
  goVelocity: function(handler) {

  },

  componentDidMount: function(){
    //注册广播消息监听
    this.addListenners();
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

    //读取属性上的elems对象数组，然后进行渲染
    var elems = this.props.elems.map(function(elem){
      return (
        <Elem type={elem.type} id={elem.id} content={elem.content}></Elem>
      );
    });

    return (
      <div id={self.id} 
          className= "scene active"
          style={self.state.styles}
          onClick={this.onClick}
          onMouseMove={this.onMouseMove}
          onDragStart= {function(){return false;}}
          onMouseUp={this.onMouseUp}
          onMouseDown={this.onMouseDown}>
        {elems}
      </div>
    );
  }
});