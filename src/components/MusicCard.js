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

  waitMusic = (e) => {
    const { favorites } = this.state;
    const { musics } = this.props;
    favorites.push(Number(e.target.id));
    this.setState({
      isLoading: true,
      favorites,
    }, () => {
      const music = musics.filter((entry) => entry.trackId === Number(e.target.id));
      addSong(music).then(() => {
        this.setState({
          isLoading: false,
        });
      });
    });
  };

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
