var React = require('react');
var ActorSearch = require('../components/ActorSearch');
var ShowList = require('../components/ShowList');


var ShowContainer = React.createClass({

  getInitialState: function() {
    return {
      currentSearch: "",
      foundShows: [],
      message: ""
    }
  },

  handleSearchTextChange: function( searchText ) {
    this.setState({
      currentSearch: searchText
    });
    if( searchText.length > 5) {
      this.setState({
        message: "Loading..."
      })
      var url = 'http://netflixroulette.net/api/api.php?actor=' + encodeURI(searchText);
      var request = new XMLHttpRequest();
      request.open('GET', url);
      request.onload = function() {
        if ( request.status === 200 ) {
          var data = JSON.parse(request.responseText);
          this.setState({
            foundShows: data
          });
        } else {
          console.log( "request error code:", request.status );
          this.setState({
            message: "Sorry no shows found :-(",
            foundShows: []
          });
        }
      }.bind( this );
      request.send();
    };

    this.setState({
      showNoShowsMessage: true
    });
  },

  render: function() {
    return (
      <div>
        <h1>Netflix Roulette </h1>
        <ActorSearch
          onSearchTextChange={ this.handleSearchTextChange }
        />
      <ShowList
        message={ this.state.message }
        shows={ this.state.foundShows }
      />
      </div>
      )
  }
});

module.exports = ShowContainer;
