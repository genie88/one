/*

class Example extends React.Component {
  constructor(props) {
    super(props)
    //(length of value > 1) means Multi-Select
    this.state = {
      value: ["green", "blue"]  
    }

    //(length of value == 1) means Single-Select
    //this.state = {
    //  value: "green"  
    //}
  }

  handleUpdate(newValue) {
    this.setState({value: newValue})
  }

  render() {
    return (
      <ButtonGroup
        value={this.state.value}
        onUpdate={this.handleUpdate}
        wrapper={ButtonGroup}>
        <Button value="red">Red</Button>
        <Button value="green">Green</Button>
        <Button value="blue">Blue</Button>
      </ButtonGroup>
    )
  }
}
*/
'use strict';
import React from 'React'

const ButtonGroup = React.createClass({
  getDefaultProps() {
    return {
      multi: true
    }
  },

  propTypes: {
    value: React.PropTypes.oneOfType([
      React.PropTypes.array,
      React.PropTypes.string
    ]).isRequired,
    wrapper: React.PropTypes.func.isRequired,
    onUpdate: React.PropTypes.func.isRequired,
    multi: React.PropTypes.bool
  },

  handleClick(button) {
    let buttonValue = button.props.value

    if (this.props.multi) {
      this.updateMultiSelect(buttonValue)
    } else {
      this.updateSelect(buttonValue)
    }
  },

  updateMultiSelect(button) {
    let value = this.props.value
    let buttonIdx = value.indexOf(button)
    let newValue

    if (buttonIdx >= 0) {
      newValue = value.slice()
      newValue.splice(buttonIdx, 1)
    } else {
      newValue = value.concat([button])
    }

    this.props.onUpdate(newValue)
  },

  updateSelect(button) {
    this.props.onUpdate(button)
  },

  render() {
    let buttons = React.Children.map(this.props.children, button => {
      let buttonValue = button.props.value
      let active

      if (this.props.multi) {
        active = this.props.value.indexOf(buttonValue) >= 0
      } else {
        active = this.props.value == buttonValue
      }

      return (
        React.cloneElement(button, {
          active: active,
          onClick: this.handleClick.bind(this, button)
        })
      )
    })

    return React.createElement(this.props.wrapper, {}, buttons)
  },
})

export default ButtonGroup