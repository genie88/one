/** @jsx React.DOM */

/**
 * A Simple Tab Component
 *
 * Usage
    var Tabs = require('./tab.jsx');
    var App = React.createClass({
      render: function() {
        return (
          <Tabs>
            <Tabs.Panel title='Tab #1'>
              <h2>Content #1 here</h2>
            </Tabs.Panel>
            <Tabs.Panel title='Tab #2'>
              <h2>Content #2 here</h2>
            </Tabs.Panel>
            <Tabs.Panel title='Tab #3'>
              <h2>Content #3 here</h2>
            </Tabs.Panel>
          </Tabs>
        );
      }
    });
    React.renderComponent(<App />, mountNode);}
*/
'use strict';

var React = require('React');
var classNames = require('classnames');

var Tabs = React.createClass({
  displayName: 'Tabs',
  propTypes: {
    className: React.PropTypes.oneOfType([
      React.PropTypes.array,
      React.PropTypes.string,
      React.PropTypes.object
    ]),
    tabActive: React.PropTypes.number,
    onMount: React.PropTypes.func,
    onBeforeChange: React.PropTypes.func,
    onAfterChange: React.PropTypes.func,
    children: React.PropTypes.oneOfType([
      React.PropTypes.array,
      React.PropTypes.element
    ]).isRequired
  },
  getDefaultProps () {
    return { tabActive: 1 };
  },
  getInitialState () {
    return {
      tabActive: this.props.tabActive
    };
  },
  componentDidMount() {
    var index = this.state.tabActive;
    var $selectedPanel = this.refs['tab-panel'];
    var $selectedMenu = this.refs[`tab-menu-${index}`];

    if (this.props.onMount) {
      this.props.onMount(index, $selectedPanel, $selectedMenu);
    }
  },
  componentWillReceiveProps: function(newProps){
    if(newProps.tabActive){ this.setState({tabActive: newProps.tabActive}) }
  },
  render () {
    var className = classNames('tabs', this.props.className);
    return (
      <div className={className}>
        {this._getMenuItems()}
        {this._getSelectedPanel()}
      </div>
    );
  },
  setActive(index, e) {
    var onAfterChange = this.props.onAfterChange;
    var onBeforeChange = this.props.onBeforeChange;
    var $selectedPanel = this.refs['tab-panel'];
    var $selectedTabMenu = this.refs[`tab-menu-${index}`];

    if (onBeforeChange) {
      var cancel = onBeforeChange(index, $selectedPanel, $selectedTabMenu);
      if(cancel === false){ return }
    }

    this.setState({ tabActive: index }, function(){
      if (onAfterChange) {
        onAfterChange(index, $selectedPanel, $selectedTabMenu);
      }
    });

    e.preventDefault();
  },
  _getMenuItems () {
    if (!this.props.children) {
      throw new Error('Tabs must contain at least one Tabs.Panel');
    }

    if (!Array.isArray(this.props.children)) {
      this.props.children = [this.props.children];
    }

    var self = this;

    var $menuItems = this.props.children
      .map(function($panel){
        typeof $panel === 'function' ? $panel() : $panel;
        return $panel;
      })
      .filter(function($panel) {
        return $panel;
      })
      .map(function($panel, index){
        var ref = 'tab-menu-'+ (index + 1);
        var title = $panel.props.title;
        var classes = classNames(
          'tabs-menu-item',
          self.state.tabActive === (index + 1) && 'is-active'
        );

        return (
          <li ref={ref} key={index} className={classes}>
            <a href='#' onClick={self.setActive.bind(self, index + 1)}>
              {title}
            </a>
          </li>
        );
      });

    return (
      <nav className='tabs-navigation'>
        <ul className='tabs-menu'>{$menuItems}</ul>
      </nav>
    );
  },
  _getSelectedPanel () {
    var index = this.state.tabActive - 1;
    var $panel = this.props.children[index];

    return (
      <article ref='tab-panel' className='tab-panel'>
        {$panel}
      </article>
    );
  }
});

Tabs.Panel = React.createClass({
  displayName: 'Panel',
  propTypes: {
    title: React.PropTypes.string.isRequired,
    children: React.PropTypes.oneOfType([
      React.PropTypes.array,
      React.PropTypes.element
    ]).isRequired
  },
  render () {
    return <div>{this.props.children}</div>;
  }
});

module.exports = Tabs;