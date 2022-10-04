import React from 'react';
import PropTypes from 'prop-types';
import Header from '../../components/Header';
import MusicCard from '../../components/MusicCard';
import getMusics from '../musicsAPI';

class Album extends React.Component {
  constructor() {
    super();

    this.state = {
      musics: [],
      isLoading: true,
    };
  }

  shouldComponentUpdate() {
    const { musics } = this.state;
    // console.log('oi');
    return (musics.length === 0);
  }

  musiquinhas = (id) => {
    getMusics(id)
      .then((response) => this.setState({
        musics: response,
        isLoading: false,
      }));
  };

  render() {
    const { id: { match: { params } } } = this.props;
    const { isLoading } = this.state;
    const { musics } = this.state;

    this.musiquinhas(params.id);
    return (
      <div data-testid="page-album">
        <Header />
        {isLoading ? (
          <span>
            Na espera
          </span>
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
