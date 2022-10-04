import React from 'react';
import Header from '../../components/Header';

class Search extends React.Component {
  constructor() {
    super();

    this.state = {
      disabled: true,
      length: 0,
    };
  }

  handleChange = (e) => {
    this.setState(() => ({
      length: e.target.value.length,
    }), () => {
      const { length } = this.state;
      const minLength = 2;
      if (length >= minLength) {
        this.setState({
          disabled: false,
        });
      }
    });
  };

  render() {
    const { disabled } = this.state;
    return (
      <div data-testid="page-search">
        <Header />
        <input
          type="text"
          data-testid="search-artist-input"
          onChange={ (e) => this.handleChange(e) }
        />
        <button
          type="button"
          data-testid="search-artist-button"
          disabled={ disabled }
        >
          Pesquisar

        </button>
      </div>
    );
  }
}

export default Search;
