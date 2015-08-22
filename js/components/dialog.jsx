/** @jsx React.DOM **/
var React =  require('React');
var ColorPicker = require('../components/colorPicker.jsx');

var Dialog = React.createClass({
  getInitialState: function() {
    return {
      show: true,
    }
  },

  onOKHandler:function(){
    this.hide();
    this.props.onOKClick && this.props.onOKClick();
  },

  onCancelHandler:function(){
    this.hide();
    this.props.onCancelClick && this.props.onCancelClick();
  },

  onCloseHandler: function(){
    this.hide();
  },

  onBackdropHandler: function(){
    !this.props.backStatic && this.hide();
  },

  /**
   * 隐藏弹窗本身
   */
  hide: function(){
    this.props.onRequestClose 
    && this.props.onRequestClose()
  },

  extendState: function (state) {
    var newState = $.extend(true, this.state , state);
    this.setState(newState); 
  },

  /**
   * <Dialog buttons={{ok:'确定', cancel: '取消', extend: '下一步'}} />
   **/
  getButtons: function(){
    var buttons = this.props.buttons  || { ok:'确定', cancel: '取消'},
        hasOK = !!buttons.ok,
        hasCancle = !!buttons.cancel,
        hasExtend = !!buttons.extend;
    return (
      <div>
        <span className="button" style={{display: hasExtend?'':'none'}} 
            onClick={this.onExtendHandler}>{buttons.extend}</span>
        <span className="button" style={{display: hasCancle?'':'none'}} 
            onClick={this.onCancelHandler}>{buttons.cancel}</span> 
        <span className="button button-primary" style={{display: hasOK?'':'none'}} 
            onClick={this.onOKHandler}>{buttons.ok}</span>
      </div>
    )  
  },

  render: function() {
    var self = this;
    var style = {
      display: this.props.show ? 'block' : 'none'
    }

    return (
      <div id={this.props.id} style={style}> 
        <div className="md-modal md-effect-20" >
          <div className="md-header"> 
            <span> {this.props.title} </span>
            <i className="fa fa-close" onClick={this.onCloseHandler}> </i>
          </div>
          <div className="md-content">   
              {this.props.children}
          </div>
          <div className="md-footer">
            {this.getButtons()}
          </div>
        </div>
        <div className="md-overlay" onClick={this.onBackdropHandler}></div>
      </div>
    	
    );
  }
});

module.exports =  Dialog;