(function (global){
var Style = {

  getComputedStyle: function() {

  },

  //获取各个类型Elem的默认样式
  getDefaultStyle: function(type){
    switch(type) {
      case 'text': 
        return {
          opacity: '1',
          width: '80%',
          height: '5%',
          fontStyle: 'normal',
          fontWeight: 'normal',
          fontFamily: 'Microsoft YaHei',
          fontSize: '14px',
          textAlign: 'left',
          lineHeight: '1',
          textShadow: 'rgb(221, 221, 221) 0px 0px 0px',
          left: '0%',
          right: 'auto',
          top: '0%',
          bottom: 'auto',
          zIndex: '10',
          margin: '0%',
          textDecoration: 'none',
          verticalAlign: 'top',
          color: 'rgb(0, 0, 0)',
          backgroundImage: 'none',
          backgroundColor: "#eee"
        }
        break;
      case 'image':
      	return {
          opacity: '1',
          width: '50%',
          height: '20%',
          fontStyle: 'normal',
          fontWeight: 'normal',
          fontFamily: 'Microsoft YaHei',
          fontSize: '14px',
          textAlign: 'left',
          lineHeight: '1',
          textShadow: 'rgb(221, 221, 221) 0px 0px 0px',
          left: '0%',
          right: 'auto',
          top: '0%',
          bottom: 'auto',
          zIndex: '10',
          margin: '0%',
          textDecoration: 'none',
          verticalAlign: 'top',
          color: 'rgb(0, 0, 0)',
          backgroundImage: 'none',
          backgroundColor: 'transparent',
          backgroundSize: 'contain',
    	  backgroundPosition: '50% 50%',
    	  backgroundRepeat: 'no-repeat'
        }
      default:
        return {};
    }
  }


};

global.Style = Style;

})(window.One);