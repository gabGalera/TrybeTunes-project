import React from 'react';
import PropTypes from 'prop-types';

import { addSong, getFavoriteSongs } from '../services/favoriteSongsAPI';
import getMusics from '../services/musicsAPI';
import Carregando from '../services/pages/Carregando';

class MusicCard extends React.Component {
  constructor() {
    super();

    this.state = {
      isLoadingFav: true,
      favorites: [],
    };
  }

  componentDidMount() {
    getFavoriteSongs()
      .then((response) => this.setState({
        favorites: response,
        isLoadingFav: false,
      }));
  }

  addingMusic = (e) => {
    this.setState({
      isLoadingFav: true,
    });
    getMusics(Number(e.target.value))
      .then((entry) => {
        console.log(entry);
        addSong(...entry);
      })
      .then(() => getFavoriteSongs()
        .then((songs) => this.setState({
          favorites: songs,
          isLoadingFav: false,
        })));
  };

  // addingMusic = (e) => {
  //   const { favorites } = this.state;
  //   getMusics(Number(e.target.id))
  //     .then((response) => this.setState({
  //       song: response,
  //     }, () => {
  //       this.setState({
  //         isLoadingFav: true,
  //       }, () => {
  //         const { song } = this.state;
  //         let aux = [];
  //         if (favorites.length === 0) {
  //           aux = song;
  //         } else {
  //           aux = [...favorites, song];
  //         }
  //         // console.log(favorites);
  //         addSong(...song).then(() => {
  //           // this.waitMusic();
  //           this.setState({
  //             favorites: aux,
  //           }, () => this.setState({
  //             isLoadingFav: false,
  //           }));
  //         });
  //       });
  //     }));
  // };

  render() {
    const { isLoadingFav, favorites } = this.state;
    const { musics } = this.props;
    // musics = musics
    //   .filter((music) => typeof music.trackId !== 'undefined');

    const IDs = favorites.map((song) => song.trackId);

    console.log(favorites);

    // if (isLoadingFav === true) return <Carregando />;

    return (
      <div>
        { isLoadingFav
          ? <Carregando />
          : musics
            .filter((music) => typeof music.trackId !== 'undefined')
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
                    value={ music.trackId }
                    checked={ IDs.includes(music.trackId) }
                    onChange={ (e) => this.addingMusic(e) }
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
  // favorites: PropTypes.arrayOf(PropTypes.number).isRequired,
};

export default MusicCard;
