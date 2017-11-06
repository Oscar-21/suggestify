import React, { PureComponent } from 'react';
class Home extends PureComponent {
  constructor(props) {
    super(props);
    this.state = {
      queryString: this.props.location.search || '',
      accessToken: this.props.location.search.slice(14) || '',
      me: '',
      artist: '',
      playlists: '',
    };
  }

  componentWillMount() {
    if (this.props.location.search !== '' ) {
       console.log('profile loaded');
       fetch('https://api.spotify.com/v1/me', {
        headers: {
          Authorization: ` Bearer ${this.state.accessToken}`        
        },
       }).then(response => 
          response.json()
        ).then(me => {
          this.setState({	me: me});
       });
    }
  }


  getMyPlaylists = () => {
    fetch(`https://api.spotify.com/v1/me/playlists`, {
      headers: {
        Authorization: ` Bearer ${this.state.accessToken}`
      },
    })
    .then(response => 
      response.json()
    )
    .then(playlists => {
      this.setState({	playlists: playlists }, () => {
        console.log(this.state.playlists);
      });
    });
  }

  getUserPlaylists = () => {
    fetch(`https://api.spotify.com/v1/users/${this.state.me.id}/playlists`, {
      headers: {
        Authorization: ` Bearer ${this.state.accessToken}`
      },
    })
    .then(response => 
      response.json()
    )
    .then(playlists => {
      this.setState({	playlists: playlists }, () => {
        console.log(this.state.playlists);
      });
    });
  }

  getArtist = () => {
    fetch('https://api.spotify.com/v1/artists/0OdUWJ0sBjDrqHygGUXeCF', {
      headers: {
        Authorization:` Bearer ${this.state.accessToken}`
      },
    }).then(response => 
      response.json()
    ).then(artist => {
      this.setState({	artist: artist }, () => {
        console.log(this.state.artist);
      });
    })
  }

  render() {
    return (
      <div> 
      {console.log('renderTwo')}
        <a href="http://localhost:8888/api/login">Login</a>
        <button onClick={() => {this.getArtist()}}>Artist</button>
        <button onClick={() => {console.log(this.state.me)}}>Me</button>
        <button onClick={() => {console.log(this.state.me.id)}}>Me.id</button>
        <button onClick={() => {this.getMyPlaylists()}}>Playlist</button>
      </div>
    );
  } 
}
export default Home;