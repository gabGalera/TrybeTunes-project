import React from 'react';
import PropTypes from 'prop-types';
import styles from './MusicCard.module.css';

class MusicCard extends React.Component {
  render() {
    const {
      music,
      handleChange,
      check } = this.props;

    return (
      <div className={ styles.container }>
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
              checked={ check }
              onChange={ (e) => handleChange(e) }
            />
          </label>
        </span>
      </div>
    );
  }
}

MusicCard.propTypes = {
  music: PropTypes.shape().isRequired,
  handleChange: PropTypes.func.isRequired,
  check: PropTypes.bool.isRequired,
};

export default MusicCard;
