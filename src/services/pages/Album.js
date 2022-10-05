import React from 'react';
import PropTypes from 'prop-types';
import Carregando from './Carregando';
import Header from '../../components/Header';
import MusicCard from '../../components/MusicCard';
import getMusics from '../musicsAPI';
// import { getFavoriteSongs } from '../favoriteSongsAPI';

class Album extends React.Component {
  constructor() {
    super();

    this.state = {
      musics: [],
      isLoading: true,
      // logado: false,
      // favorites: [],
      // isLoadingFav: true,
    };
  }

  componentDidMount() {
    const { id: { match: { params } } } = this.props;
    this.musiquinhas(params.id);
  }

  musiquinhas = (id) => {
    getMusics(id)
      .then((response) => this.setState({
        musics: response,
        isLoading: false,
      }));
  };

  render() {
    const { isLoading, musics } = this.state;

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
            <MusicCard
              musics={ musics }
            />
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
