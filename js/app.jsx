var React =  require('React');
var SettingPanel = require('./widget/settingPanel.jsx');
var Scene =  require('./Scene.jsx');
var Elem =  require('./Elem.jsx');
var Notify =  require('./components/notify.jsx');


var App = React.createClass({
  getInitialState: function() {
    return {
    elems: [{
  		id: "001",
  		type: 'image',
      content: 'image/demo.png',
      styles: {
        left: '26%',
        top: '38%'

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
        textAlign: 'center',
        left: '10%',
        top: '65%'
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
      styles: {
        fontSize: '20px',
        textAlign: 'center',
        left: '10%',
        top: '80%'
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
      id: "004",
      type: 'text',
      content: '',
      styles: {
        width: '20%',
        height: '20%',
        left: '40%',
        top: '10%',
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

  //元素创建事件处理函数
  onElemCreate: function(data) {
    this.createElem(data.type);
  },

  //注册广播消息监听
  addListenners: function (){
    //监听来自Scene组件的以下事件
    Messenger.add('elem.remove', this.props.id, this.onElemRemove);
    Messenger.add('elem.create', this.props.id, this.onElemCreate);
    //Messenger.add('elem.resize.start', this.props.id, this.onElemResizeStart);
  },

  componentDidMount: function(){
    //注册广播消息监听
    this.addListenners();
  },

  //创建元素
  createElem: function(type) {
    var elem = {
      id: parseInt(Math.random() * 10000),
      type: type,
      content: type=='image'? 'image/demo.png' : '请在此输入文字',
      styles: One.Style.getDefaultStyle(type),
      animations: [
      ]
    };

    var state = $.extend(true, {}, this.state);
    state.elems.push(elem);
    this.replaceState(state);
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
  	  <div>
        <Scene elems={this.state.elems}/>
        <Notify />
      </div>
  	)
  }

});


React.render(<App id="app-001"/>, document.getElementById('scene')); 
React.render(<SettingPanel />, document.getElementById('settingPanel'));
