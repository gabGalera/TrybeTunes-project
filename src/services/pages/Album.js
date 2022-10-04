import React from 'react';
import PropTypes from 'prop-types';
import Carregando from './Carregando';
import Header from '../../components/Header';
import MusicCard from '../../components/MusicCard';
import getMusics from '../musicsAPI';
import { getFavoriteSongs } from '../favoriteSongsAPI';

class Album extends React.Component {
  constructor() {
    super();

    this.state = {
      musics: [],
      isLoading: true,
      // isLoadingFav: true,
    };
  }

  shouldComponentUpdate() {
    const { musics } = this.state;
    // console.log('oi');
    return (musics.length === 0);
  }

  getttingFavorite = () => {
    getFavoriteSongs()
      .then(() => this.setState({
        isLoading: false,
      }, () => {
        this.setState({
          isLoading: true,
        });
      }));
  };

  musiquinhas = (id) => {
    getMusics(id)
      .then((response) => this.setState({
        musics: response,
        isLoading: false,
      }));
  };

  render() {
    const { id: { match: { params } } } = this.props;
    const { isLoading, musics } = this.state;
    // const { musics } = this.state;
    this.getttingFavorite();
    this.musiquinhas(params.id);

    // if (isLoadingFav === true) return <Carregando />;

    return (
      <div data-testid="page-album">
        <Header />
        {isLoading ? (
          <Carregando />
        ) : (
          <>
            <span data-testid="artist-name">
              {`${musics[0].artistName}`}
            </span>
            <span data-testid="album-name">
              {`${musics[0].collectionName}`}
            </span>
            <MusicCard musics={ musics } />
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
