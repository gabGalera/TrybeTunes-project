import React from 'react';
import { Link } from 'react-router-dom';
import Header from '../components/Header';
import searchAlbumsAPI from '../services/searchAlbumsAPI';
import styles from './styles/Search.module.css';

class Search extends React.Component {
  constructor() {
    super();

    this.state = {
      disabled: true,
      inputValue: '',
      artist: '',
      requestCompleted: false,
      response: '',
    };
  }

  handleChange = (e) => {
    const { value } = e.target;
    const { length } = value;
    const minLength = 2;
    this.setState(() => ({
      inputValue: value,
      artist: value,
    }));
    if (length >= minLength) {
      this.setState({
        disabled: false,
      });
    } else {
      this.setState({
        disabled: true,
      });
    }
  };

  getRequisition = () => {
    const { artist } = this.state;
    searchAlbumsAPI(artist)
      .then((response) => {
        console.log(response);
        this.setState({
          response: response.filter((entry) => entry.artistName.includes(artist)),
          requestCompleted: true,
          inputValue: '',
        });
      });
  };

  render() {
    const {
      disabled,
      inputValue,
      requestCompleted, response, artist } = this.state;

    return (
      <>
        <Header />
        <div className={ styles.bg__container } />
        <div
          className={ styles.container }
          data-testid="page-search"
        >
          <input
            type="text"
            data-testid="search-artist-input"
            placeholder="Type here to search"
            value={ inputValue }
            onChange={ (e) => this.handleChange(e) }
          />
          <span />
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
                {(response.length === 0) ? (
                  <span>Nenhum álbum foi encontrado</span>
                ) : (
                  <ul>
                    {response.map((entry) => (
                      <li key={ entry.collectionName }>
                        <img src={ entry.artworkUrl100 } alt="" />
                        <Link
                          to={ `/album/${entry.collectionId}` }
                          data-testid={ `link-to-album-${entry.collectionId}` }
                          id={ entry.collectionId }
                        >
                          {entry.collectionName}
                        </Link>
                        <span>{entry.artistName}</span>
                      </li>
                    ))}
                  </ul>
                )}
              </div>
            )
          }
        </div>
      </>
    );
  }
}

export default Search;
