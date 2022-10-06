import React from 'react';
import PropTypes from 'prop-types';

class Login extends React.Component {
  constructor() {
    super();

    this.state = {
      length: 0,
      disabled: true,
      name: '',
    };
  }

  handleChange = (e) => {
    this.setState(() => ({
      length: e.target.value.length,
      name: e.target.value,
    }), () => {
      const { length } = this.state;
      const minLength = 3;
      if (length >= minLength) {
        this.setState({
          disabled: false,
        });
      }
    });
  };

  render() {
    const { disabled, name } = this.state;
    const { getLogado } = this.props;

    return (
      <div data-testid="page-login">
        <input
          type="text"
          data-testid="login-name-input"
          onChange={ (e) => this.handleChange(e) }
        />
        <button
          className="btn-form"
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
    );
  }
}

Login.propTypes = {
  getLogado: PropTypes.func.isRequired,
};

export default Login;
