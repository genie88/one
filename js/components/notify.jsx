/** @jsx React.DOM **/
var React =  require('React');

var Notify = React.createClass({
  getInitialState: function() {
    return {
      show: true,
      content: 'testing'
    }
  },

  onShowHandler: function(){
    this.extendState({show: true});
  },

  onDismissHandler: function(){
    this.extendState({show: false});
  },

  extendState: function (state) {
    var newState = $.extend(true, this.state , state);
    this.setState(newState); 
  },

  render: function() {
    var self = this;
        style = {
          display: this.state.show ? 'block': 'none'
        }

    return (
      <div id={this.props.id} className="c-notify" style={style} > 
        <div>{this.state.content}</div>
        <i className="fa fa-close" onClick={this.onDismissHandler}> </i>
      </div>
    	
    );
  }
});

module.exports =  Notify;