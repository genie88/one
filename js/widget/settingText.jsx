/** @jsx React.DOM **/
var React =  require('React');
var ColorPicker = require('../components/colorPicker.jsx');

var SettingTextPanel = React.createClass({

  getInitialState: function() {
    return {  };
  },

  render: function() {
    var self = this;

    return (
    	<div className="settingTextPanel">
        <div>
          <h4>文本样式设置</h4>

          <label>风格</label>
          <div>
            <div className="c-button" value="B"><i className="fa fa-bold"></i></div>
            <div className="c-button" value="I"><i className="fa fa-italic"></i></div>
            <div className="c-button" value="U"><i className="fa fa-underline"></i></div>
          </div>

          <div>
              <label>字体</label>
              <select>
                <option> 微软雅黑 </option>
                <option> 微软雅黑 </option>
                <option> 微软雅黑 </option>
                <option> 微软雅黑 </option>
              </select>
          </div>

          <label>大小</label>
          <input type="text" placeholder="10"/> px

          <div>
             <label>颜色</label>
            <ColorPicker/> 
          </div>

          <hr/>
          <h4>对齐方式设置</h4>
          <label>水平对齐</label>
          <div>
            <div className="c-button" value="B"><i className="fa fa-bold"></i></div>
            <div className="c-button" value="I"><i className="fa fa-italic"></i></div>
            <div className="c-button" value="U"><i className="fa fa-underline"></i></div>
          </div>

          <label>垂直对齐</label>
          <div>
            <div className="c-button" value="B"><i className="fa fa-bold"></i></div>
            <div className="c-button" value="I"><i className="fa fa-italic"></i></div>
            <div className="c-button" value="U"><i className="fa fa-underline"></i></div>
          </div>

        </div>
      </div>

        
    );
  }
});

module.exports =  SettingTextPanel;