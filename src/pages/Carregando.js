import React from 'react';
import styles from './styles/Carregando.module.css';

class Carregando extends React.Component {
  render() {
    return (
      <div>
        <div className={ styles.container }>
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
      </div>
    );
  }
}

export default Carregando;
