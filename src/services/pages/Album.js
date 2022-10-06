import React from 'react';
import PropTypes from 'prop-types';
import Carregando from './Carregando';
import Header from '../../components/Header';
import MusicCard from '../../components/MusicCard';
import getMusics from '../musicsAPI';
import { getFavoriteSongs, addSong } from '../favoriteSongsAPI';

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

  addingMusic = (e) => {
    const { musics } = this.state;
    this.setState({
      isLoadingFav: true,
    });
    const music = musics
      .filter((entry) => entry.trackId === Number(e.target.value));
    console.log(music);
    addSong(...music)
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

  render() {
    const { isLoading, musics, favorites, isLoadingFav, IDs } = this.state;

    return (
      <div data-testid="page-album">
        {isLoading ? (
          <Carregando />
        ) : (
          <>
            <Header />
            <span data-testid="artist-name">
              {`${musics[0].artistName}`}
            </span>
            <span data-testid="album-name">
              {`${musics[0].collectionName}`}
            </span>
            { isLoadingFav
              ? <Carregando />
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
                        addingMusic={ this.addingMusic }
                        IDs={ IDs }
                        music={ music }
                        check={ check }
                      />
                    );
                  })
              )}
          </>
        )}
      </div>
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
