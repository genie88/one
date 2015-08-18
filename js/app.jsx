var App = React.createClass({
  getInitialState: function() {
    return {
      elems: [{
  		id: "001",
  		type: 'image'
	  },{
  		id: "002",
  		type: 'text'
	  }]
    }
  },

  render: function(){
  	return (
  	  <Scene elems={this.state.elems}/>
  	)
  }

});


React.render(<App/>, document.getElementById('scene')); 