import React from 'react';
import PropTypes from 'prop-types';
import Carregando from './Carregando';
import Header from '../components/Header';
import MusicCard from '../components/MusicCard';
import getMusics from '../services/musicsAPI';
import { getFavoriteSongs, addSong, removeSong } from '../services/favoriteSongsAPI';
import styles from './styles/Album.module.css';

class Album extends React.Component {
  constructor() {
    super();

    this.state = {
      musics: [],
      isLoading: true,
      favorites: [],
      isLoadingFav: true,
      IDs: [],
    };
  }

  componentDidMount() {
    const { id: { match: { params } } } = this.props;
    getMusics(params.id)
      .then((response) => this.setState({
        musics: response,
        isLoading: false,
      }));
    getFavoriteSongs()
      .then((response) => {
        const IDs = response.map((song) => song.trackId);
        this.setState({
          favorites: response,
          isLoadingFav: false,
          IDs,
        });
      });
  }

  handleStorage = (func, e) => {
    const { musics } = this.state;
    this.setState({
      isLoadingFav: true,
    });
    const music = musics
      .filter((entry) => entry.trackId === Number(e.target.id));
    func(...music)
      .then(() => getFavoriteSongs()
        .then((songs) => {
          const IDs = songs.map((song) => song.trackId);
          this.setState({
            favorites: songs,
            isLoadingFav: false,
            IDs,
          });
        }));
  };

  addingMusic = (e) => {
    this.handleStorage(addSong, e);
  };

  removingMusic = (e) => {
    this.handleStorage(removeSong, e);
  };

  handleChange = (e) => (e.target.checked ? this.addingMusic(e) : this.removingMusic(e));

  render() {
    const { isLoading, musics, favorites, isLoadingFav, IDs } = this.state;

    if (isLoading) return <Carregando />;

    return (
      <>
        <Header />
        <div
          data-testid="page-album"
        >
          <div className={ styles.container }>
            <span data-testid="artist-name">
              {`${musics[0].artistName}`}
            </span>
            <span data-testid="album-name">
              {`${musics[0].collectionName}`}
            </span>
            { isLoadingFav
              ? (
                <div>
                  <div className={ styles.text__div }>
                    Carregando...
                  </div>
                  <div className={ styles['lds-spinner'] }>
                    <div />
                    <div />
                    <div />
                    <div />
                    <div />
                    <div />
                    <div />
                    <div />
                    <div />
                    <div />
                    <div />
                    <div />
                  </div>
                </div>)
              : (
                musics
                  .filter((music) => typeof music.trackId !== 'undefined')
                  .map((music) => {
                    const check = IDs.includes(music.trackId);
                    return (
                      <MusicCard
                        key={ music.trackId }
                        musics={ musics }
                        favorites={ favorites }
                        isLoadingFav={ isLoadingFav }
                        handleChange={ this.handleChange }
                        IDs={ IDs }
                        music={ music }
                        check={ check }
                      />
                    );
                  })
              )}
          </div>
        </div>
      </>
    );
  }
}

Album.propTypes = {
  id: PropTypes.shape({
    match: PropTypes.shape({
      params: PropTypes.shape({
        id: PropTypes.string.isRequired,
      }),
    }),
  }).isRequired,
};

export default Album;
