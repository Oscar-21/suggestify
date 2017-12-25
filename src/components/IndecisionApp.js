import React, { Component } from 'react';
import AddOption from './AddOption';
import Action from './Action';
import Header from './Header';
import Options from './Options';
import OptionModal from './OptionModal';

export default class IndecisionApp extends Component {

  state = {
    user: [],
    options: [],
    selectedOption: undefined,
    email: this.props.location.search.split('=')[1] || '',
    playlist: '',
    playlists: [],
  };

  componentDidMount() {
    try {
      const json = localStorage.getItem('user');
      if (json) {
        const user = JSON.parse(json);

        if (user) {
          this.setState(() => ({ user }));
        }
      } else {
        console.log(this.state.email);
        alert(document.cookie);
      }
    } catch (e) {
      // Do nothing at all
    }
  }

  componentDidUpdate(prevProps, prevState) {
    if (prevState.user.length !== this.state.user.length) {
      const json = JSON.stringify(this.state.user);
      localStorage.setItem('user', json);
    }
  }

  componentWillUnmount() {
    console.log('componentWillUnmount');
  }

  getUser = () => {

  }

  getMyPlaylists = () => {
    fetch(`https://api.spotify.com/v1/me/playlists`, {
      headers: {
        Authorization: `Bearer ${this.state.accessToken}`
      },
    })
    .then(response => response.json())
    .then(playlists => {
      this.setState({ playlists: playlists }, () => {
        console.log(this.state.playlists);
      });
    })
    .catch(error => {
      alert(error.message, error.code);
    })
  }

  getMyPlaylists = () => {
    fetch(`https://api.spotify.com/v1/me/playlists`, {
      headers: {
        Authorization: `Bearer ${this.state.accessToken}`
      },
    })
    .then(response => response.json())
    .then(playlists => {
      this.setState({ playlists: playlists }, () => {
        console.log(this.state.playlists);
      });
    })
    .catch(error => {
      alert(error.message, error.code);
    })
  }

  handleDeleteOptions = () => {
    this.setState(() => ({ options: [] }));
  };

  handleClearSelectedOption = () => {
    this.setState(() => ({ selectedOption: undefined }));
  }

  handleDeleteOption = optionToRemove => {
    this.setState((prevState) => ({
      options: prevState.options.filter((option) => optionToRemove !== option)
    }));
  };

  handlePick = () => {
    const randomNum = Math.floor(Math.random() * this.state.options.length);
    const option = this.state.options[randomNum];
    this.setState(() => ({
      selectedOption: option
    }));
  };

  handleAddOption = option => {
    if (!option) {
      return 'Enter valid value to add item';
    } else if (this.state.options.indexOf(option) > -1) {
      return 'This option already exists';
    }

    this.setState(prevState => ({
      options: prevState.options.concat(option)
    }));
  };

  playlist = e => this.setState({	playlist:e.target.value });


  render() {
    const subtitle = 'modern day mixtapes with shared Spotify playlists';
    const { 
      redirect, 
      options, 
      selectedOption, 
      playlists 
    } = this.state;

    return (
      <div>
        <Header subtitle={subtitle} />
        <div className="container">
          <Action
            // hasOptions={this.state.options.length > 0}
            click={this.click}
            handlePick={this.handlePick}
            redirect={redirect}
          />
          <div className="widget">
            <Options
              options={options}
              handleDeleteOptions={this.handleDeleteOptions}
              handleDeleteOption={this.handleDeleteOption}
            />
            <AddOption
              handleAddOption={this.handleAddOption}
              onClick={this.getMyPlaylists}
              onChange={this.playlist}
            />
          </div>
        </div>
        <OptionModal
          selectedOption={selectedOption}
          handleClearSelectedOption={this.handleClearSelectedOption}
        />

        {!!playlists.items && 
        <ul>
          {playlists.items.map((playlist, key) => 
          <li key={`playlist${key}`} >{!!playlist.collaborative ? playlist.name : null}</li>)}
        </ul>}
      </div>
    );
  }
}
