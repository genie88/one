/** @jsx React.DOM **/
var React =  require('React');
var Tabs = require('../components/tab.jsx');
var ColorPicker = require('../components/colorPicker.jsx');

var SettingPanel = React.createClass({

  getInitialState: function() {
    return {  };
  },

  

  render: function() {
    var self = this;

    return (
    	 <Tabs>
            <Tabs.Panel title='文本'>
              <h2>Content #1 here</h2>
              <ColorPicker/> 
            </Tabs.Panel>
            <Tabs.Panel title='样式'>
              <h2>Content #2 here</h2>
            </Tabs.Panel>
            <Tabs.Panel title='位置'>
              <h2>Content #3 here</h2>
            </Tabs.Panel>
            <Tabs.Panel title='动画'>
              <h2>Content #4 here</h2>
            </Tabs.Panel>
          </Tabs>
    );
  }
});

module.exports =  SettingPanel;