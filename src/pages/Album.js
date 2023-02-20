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
    const { isLoading, musics, isLoadingFav, IDs } = this.state;

    if (isLoading) return <Carregando />;

    return (
      <>
        <Header />
        <div className={ styles.bg__container } />
        <div className={ styles.bg__img } />
        <div
          data-testid="page-album"
        >
          <div className={ styles.album__div }>
            <img src={ musics[0].artworkUrl100 } alt="" />
            <div>
              <span
                className={ styles.album__name }
                data-testid="album-name"
              >
                {`${musics[0].collectionName}`}
              </span>
              <span
                className={ styles.artist__name }
                data-testid="artist-name"
              >
                {`${musics[0].artistName}`}
              </span>
            </div>
          </div>
          <div className={ styles.container }>
            { isLoadingFav
              ? (
                <div className={ styles.loading__div }>
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
                </div>
              )
              : (
                <div className={ styles.music__div }>
                  {
                    musics
                      .filter((music) => typeof music.trackId !== 'undefined')
                      .map((music) => {
                        const check = IDs.includes(music.trackId);
                        return (
                          <MusicCard
                            key={ music.trackId }
                            musics={ musics }
                            handleChange={ this.handleChange }
                            music={ music }
                            check={ check }
                          />
                        );
                      })
                  }
                </div>
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
