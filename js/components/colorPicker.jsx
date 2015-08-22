var Colr = require('colr');
var React = require('React');
var CPicker = require('react-colorpicker');
var Dialog = require('./dialog.jsx');

var ColorPicker = React.createClass({

  getInitialState: function () {
    return {
      color: this.setColor(),
      modalIsOpen: false
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

  openPanel: function() {
    this.setState({modalIsOpen: true});
  },

  closeModal: function() {
    this.setState({modalIsOpen: false});
  },

  handleChange: function (color) {
    this.setState({
      color: color.toHex()
    });
  },

  render: function () {
    return (
      <div className="cpicker">
        <span className="color-box" style={{backgroundColor: this.state.color}}
          onClick={this.openPanel} > </span>
        <Dialog title="调色板" show={this.state.modalIsOpen} onRequestClose={this.closeModal}> 
          <CPicker color={this.state.color} onChange={this.handleChange}/>
        </Dialog>
      </div>
    );
  },

});


module.exports =  ColorPicker;