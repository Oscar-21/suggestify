import React, { Component } from 'react';

export default class AddOption extends Component {

  state = {
    error: undefined
  };

  handleAddOption = e => {
    e.preventDefault();
    const option = e.target.elements.option.value.trim();
    const error = this.props.handleAddOption(option);

    this.setState(() => ({ error }));

    if (!error) {
      e.target.elements.option.value = '';
    }
  };

  render() {
    const { onClick, onChange} = this.props;
    return (
      <div>
        {this.state.error && <p className="add-option-error">{this.state.error}</p>}
        <div className="add-option" onSubmit={this.handleAddOption}>
          <input onChange={onChange} className="add-option__input" type="text" name="option" />
          <button onClick={onClick} className="button">Create Playlist</button>
        </div>
      </div>
    );
  }
}
