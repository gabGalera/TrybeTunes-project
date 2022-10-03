import React from 'react';
import PropTypes from 'prop-types';

class Login extends React.Component {
  constructor() {
    super();

    this.state = {
      length: 0,
      disabled: true,
    };
  }

  componentDidUpdate() {

  }

  handleChange = (e) => {
    this.setState(() => ({
      length: e.target.value.length,
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
    const { disabled } = this.state;
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
            getLogado();
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
