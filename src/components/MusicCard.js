import React from 'react';
import PropTypes from 'prop-types';

class MusicCard extends React.Component {
  render() {
    let { musics } = this.props;
    musics = musics
      .filter((music) => typeof music.trackId !== 'undefined');

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
            </span>

          )) }
      </div>
    );
  }
}

MusicCard.propTypes = {
  musics: PropTypes.shape().isRequired,
};

export default MusicCard;
