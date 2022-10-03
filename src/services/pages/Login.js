import React from 'react';
// import { Redirect } from 'react-router-dom';
// import { createUser } from '../userAPI';
// import Carregando from './Carregando';
// import Search from './Search';

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
    // const createUser = this.props;
    // console.log(getLogado);
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

export default Login;
