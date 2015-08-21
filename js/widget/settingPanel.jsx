/** @jsx React.DOM **/
var React =  require('React');
var ColorPicker = require('../components/colorPicker.jsx');

var SettingPanel = React.createClass({
  getInitialState: function() {
    return {

    }
  },

  render: function() {
    var self = this;

    return (
    	<ColorPicker> </ColorPicker>
    );
  }
});

module.exports =  SettingPanel;