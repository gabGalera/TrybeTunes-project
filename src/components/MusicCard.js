import React from 'react';
import PropTypes from 'prop-types';

import { addSong } from '../services/favoriteSongsAPI';
import Carregando from '../services/pages/Carregando';

class MusicCard extends React.Component {
  constructor() {
    super();

    this.state = {
      isLoading: false,
      favorites: [],
    };
  }

  // shouldComponentUpdate(e) {
  //   this.waitMusic(e);
  // }

  waitMusic = (e) => {
    const { favorites } = this.state;
    favorites.push(Number(e.target.id));
    this.setState({
      isLoading: true,
      favorites,
    }, () => {
      console.log(favorites);
      addSong().then(() => {
        this.setState({
          isLoading: false,
        });
      });
    });
  };

  // check = (entry) => {
  //   const { favorites } = this.state;
  //   if (typeof entry.target !== 'undefined') {
  //     const favorite = favorites.filter((fav) => fav === entry.target.id);
  //     console.log(favorite);
  //     return true;
  //   }
  //   const favorite = [];
  //   console.log(entry);
  //   return (favorite.length > 0);
  // };

  render() {
    const { isLoading, favorites } = this.state;
    let { musics } = this.props;
    musics = musics
      .filter((music) => typeof music.trackId !== 'undefined');

    if (isLoading === true) return <Carregando />;

    return (
      <div>
        { musics
          .map((music) => (
            <span key={ music.trackId }>
              <span>{ music.trackName }</span>
              <audio
                data-testid="audio-component"
                src={ music.previewUrl }
                controls
              >
                <track kind="captions" />
                O seu navegador não suporta o elemento
                {' '}
                {' '}
                <code>audio</code>
              </audio>
              <label htmlFor={ music.trackId }>
                Favorita
                <input
                  type="checkbox"
                  data-testid={ `checkbox-music-${music.trackId}` }
                  id={ music.trackId }
                  checked={ favorites.includes(music.trackId) }
                  onChange={ (e) => this.waitMusic(e) }
                />
              </label>
            </span>

          )) }
      </div>
    );
  }
}

MusicCard.propTypes = {
  musics: PropTypes.arrayOf(PropTypes.shape()).isRequired,
};

export default MusicCard;
