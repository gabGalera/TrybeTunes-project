import React from 'react';
import { Link } from 'react-router-dom';
import Header from '../../components/Header';
import searchAlbumsAPI from '../searchAlbumsAPI';
import Carregando from './Carregando';

class Search extends React.Component {
  constructor() {
    super();

    this.state = {
      isLoading: false,
      disabled: true,
      length: 0,
      inputValue: '',
      artist: '',
      requestCompleted: false,
      response: '',
    };
  }

  handleChange = (e) => {
    this.setState(() => ({
      length: e.target.value.length,
      inputValue: e.target.value,
      artist: e.target.value,
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

  getRequisition = () => {
    this.setState({
      inputValue: '',
      isLoading: true,
    }, () => {
      const { artist } = this.state;
      searchAlbumsAPI(artist)
        .then((response) => {
          this.setState({
            response: response.filter((entry) => entry.artistName.includes(artist)),
            isLoading: false,
            requestCompleted: true,
          });
        });
    });
  };

  render() {
    const {
      disabled,
      inputValue,
      isLoading, requestCompleted, response, artist } = this.state;

    if (isLoading === true) return <Carregando />;
    return (
      <div data-testid="page-search">
        <Header />
        <input
          type="text"
          data-testid="search-artist-input"
          value={ inputValue }
          onChange={ (e) => this.handleChange(e) }
        />
        <button
          type="button"
          data-testid="search-artist-button"
          disabled={ disabled }
          onClick={ () => {
            this.getRequisition();
          } }
        >
          Pesquisar

        </button>
        {
          requestCompleted && (
            <div>
              <span>
                {' '}
                Resultado de álbuns de:
                {' '}
                {artist}
              </span>
              <ul>
                {(response.length === 0) ? (
                  <span>Nenhum álbum foi encontrado</span>
                ) : (
                  response.map((entry) => (
                    <li key={ entry.collectionName }>
                      <Link
                        to={ `/album/${entry.collectionId}` }
                        data-testid={ `link-to-album-${entry.collectionId}` }
                        id={ entry.collectionId }
                      >
                        {entry.collectionName}
                      </Link>
                    </li>
                  ))
                )}

              </ul>
            </div>
          )
        }
      </div>
    );
  }
}

export default Search;
