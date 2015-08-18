var App = React.createClass({
  getInitialState: function() {
    return {
      elems: [{
  		id: "001",
  		type: 'image'
	  },{
  		id: "002",
  		type: 'text'
	  }]
    }
  },

  //元素删除事件处理函数
  onElemRemove: function(data) {
    this.removeElemById(data.id);
    
  },

  //注册广播消息监听
  addListenners: function (){
    //监听来自Scene组件的以下事件
    Messenger.add('elem.remove', this.props.id, this.onElemRemove);
    //Messenger.add('elem.resize.start', this.props.id, this.onElemResizeStart);
  },

  componentDidMount: function(){
    //注册广播消息监听
    this.addListenners();
  },

  //从场景中删除元素
  removeElemById: function (id){
    var elems = this.state.elems;
    for(var i=0; i< elems.length; i++){
      if (elems[i].id === id) {
        elems.splice(i,1);
      }
    }
    this.extendState({elems: elems});
  },

  //扩展this.state
  extendState: function (state) {
    var newState = $.extend(true, this.state , state);
    this.setState(newState); 
  },

  render: function(){
  	return (
  	  <Scene elems={this.state.elems}/>
  	)
  }

});


React.render(<App id="app-001"/>, document.getElementById('scene')); 