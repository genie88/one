var Colr = require('colr');
var React = require('React');
var CPicker = require('react-colorpicker');

var ColorPicker = React.createClass({

  getInitialState: function () {
    return {
      color: '#000000',
    };
  },

  setColor: function () {
    var color = Colr.fromRgb(
      Math.random() * 255, 
      Math.random() * 255, 
      Math.random() * 255
    );

    // replace current color and origin color
    this.setState({
      color: color.toHex()
    });
  },

  handleChange: function (color) {
    this.setState({
      color: color.toHex()
    });
  },

  render: function () {
    return (
      <div>
        <button onClick={this.setColor}>Load Random Color</button>
        <div>Active: {this.state.color}</div>

        <div id='container'>
          <CPicker
            color={this.state.color}
            onChange={this.handleChange}
          />
        </div>
      </div>
    );
  },

});


module.exports =  ColorPicker;