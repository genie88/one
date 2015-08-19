var App = React.createClass({
  getInitialState: function() {
    return {
    elems: [{
  		id: "001",
  		type: 'image',
      content: 'image/demo.png',
      styles: {

      },
      animations: [
        { p: { translateX: 100 }, o: { duration: 1000 } },
        { p: { top: '40%' }, o: { duration: 1000, sequenceQueue: false }},
        { p: { rotateZ: 360 }, o: { duration: 1000 }},
        { p: "custom.pulse", o: { duration: 1000 }},
        { p: "custom.flipXOut", o: { duration: 1000 }},
        { p: "custom.slideUpIn", o: { duration: 1000 }}
      ]
	  },{
  		id: "002",
  		type: 'text',
      content: '你好， 世界',
      styles: {
        fontSize: '20px',
        textAlign: 'center'
      },
      animations: [
        { p: { translateX: 100 }, o: { duration: 1000 } },
        { p: { top: '40%' }, o: { duration: 1000, sequenceQueue: false }},
        { p: { rotateZ: 360 }, o: { duration: 1000 }},
        { p: "custom.pulse", o: { duration: 1000 }},
        { p: "custom.flipXOut", o: { duration: 1000 }},
        { p: "custom.slideUpIn", o: { duration: 1000 }}
      ]
	  },{
      id: "003",
      type: 'text',
      content: 'Hello, World',
      animations: [
        { p: { translateX: 100 }, o: { duration: 1000 } },
        { p: { top: '40%' }, o: { duration: 1000, sequenceQueue: false }},
        { p: { rotateZ: 360 }, o: { duration: 1000 }},
        { p: "custom.pulse", o: { duration: 1000 }},
        { p: "custom.flipXOut", o: { duration: 1000 }},
        { p: "custom.slideUpIn", o: { duration: 1000 }}
      ]
    },{
      id: "004",
      type: 'text',
      content: '',
      styles: {
        width: '20%',
        height: '20%',
        borderRadius: '100%',
        backgroundColor: '#880000'
      },
      animations: [
        { p: { translateX: 100 }, o: { duration: 1000 } },
        { p: { top: '40%' }, o: { duration: 1000, sequenceQueue: false }},
        { p: { rotateZ: 360 }, o: { duration: 1000 }},
        { p: "custom.pulse", o: { duration: 1000 }},
        { p: "custom.flipXOut", o: { duration: 1000 }},
        { p: "custom.slideUpIn", o: { duration: 1000 }}
      ]
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