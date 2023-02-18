import React from 'react';
import PropTypes from 'prop-types';
import styles from './styles/Login.module.css';

class Login extends React.Component {
  constructor() {
    super();

    this.state = {
      disabled: true,
      name: ' ',
    };
  }

  handleChange = (e) => {
    const name = e.target.value;
    const minLength = 3;
    if (name.length >= minLength) {
      this.setState({
        disabled: false,
        name,
      });
    } else {
      this.setState({
        disabled: true,
        name,
      });
    }
  };

  render() {
    const { disabled, name } = this.state;
    const { getLogado } = this.props;

    return (
      <div
        data-testid="page-login"
      >
        <div className={ styles.bg__color } />
        <div className={ styles.container } />
        <div className={ styles.login__form }>
          <div className={ styles.logo__container } />
          <div className={ styles.input_container }>
            <input
              className={ styles.login__input }
              type="text"
              data-testid="login-name-input"
              placeholder="What is your name?"
              onChange={ (e) => this.handleChange(e) }
            />
            <button
              className={ styles.login__button }
              data-testid="login-submit-button"
              type="button"
              disabled={ disabled }
              onClick={ () => {
                getLogado(name);
              } }
            >
              Entrar
            </button>
          </div>
        </div>
      </div>
    );
  }
}

Login.propTypes = {
  getLogado: PropTypes.func.isRequired,
};

export default Login;
