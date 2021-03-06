/** @jsx React.DOM **/
var React =  require('React');


/**
 * A Small But Useful Notification component.
 * Usage: 
 *  <Notify dismissable onDismiss={this.onDismissHandler}/>
 *  When you want to push a notification, you just call the following lines :
 *  Messenger.broadcast('notify.push', {
        content: '', 
        dismissable: false, 
        level: 'warning', 
        timeout: 2000
    });


    TODO: 1. add notify levels &  fifo
          2. add complex html notify msg
 * 
 **/
var Notify = React.createClass({
  getInitialState: function() {
    return {
      show: false,
      level: 'info',
      content: '',
      tid : 0
    }
  },

  addListenners: function (){
    //监听以下事件
    var self = this;
    Messenger.add('notify.push', 'c-notify-' + this.props.id, this.onShowHandler);
  },

  onShowHandler: function(msg){
    var dismissable, timeout, level
        self = this;
    if ( msg.content && msg.content.length < 1) {
      console.log('c-notify : empty message ignored.');
    }

    dismissable = (typeof msg.dismissable == 'undefined') ? 
                        this.props.dismissable : msg.dismissable;
    timeout = msg.timeout || 2000;
    level = msg.level || 'info';


    clearTimeout(this.state.tid);

    this.extendState({show: true, content: msg.content, level: level});
    if (dismissable) {
      //延时自动消失
      tid = setTimeout(function(){
        self.onDismissHandler();
      }, timeout);
      //缓存tid
      this.extendState({tid: tid});
    }
  },

  onDismissHandler: function(){
    this.extendState({show: false});
    this.props.onDismissHandler && this.props.onDismissHandler();
  },

  extendState: function (state) {
    var newState = $.extend(true, this.state , state);
    this.setState(newState); 
  },

  componentDidMount: function(){
    //注册广播消息监听
    this.addListenners();
  },
  

  render: function() {
    var self = this,
        style = {
          display: this.state.show ? 'block': 'none'
        },

        notifyClassName = "c-notify " + this.state.level;

    return (
      <div id={this.props.id} className={notifyClassName} style={style}> 
        <div>{this.state.content}</div>
        <i className="fa fa-close" onClick={this.onDismissHandler}> </i>
      </div>
    	
    );
  }
});

module.exports =  Notify;