import React from 'react';
import { Link } from 'react-router-dom';
import Carregando from '../pages/Carregando';
import { getUser } from '../services/userAPI';
import styles from './Header.module.css';
import logo from '../images/logo.png';

class Header extends React.Component {
  constructor() {
    super();

    this.state = {
      logado: false,
      response: '',
    };
  }

  componentDidMount() {
    this.getRequisition();
  }

  getRequisition = () => {
    this.setState({
      logado: true,
    }, () => {
      getUser()
        .then((response) => this.setState({
          response: response.name,
          logado: false,
        }));
    });
  };

  render() {
    const { logado, response } = this.state;

    if (logado) return <Carregando />;

    return (
      <header
        className={ styles.container }
        data-testid="header-component"
      >
        <img src={ logo } alt="logo" />
        <nav className={ styles.nav }>
          <Link to="/search" data-testid="link-to-search">Search</Link>
          <Link to="/favorites" data-testid="link-to-favorites">Favorites</Link>
          <Link to="/profile" data-testid="link-to-profile">Profile</Link>
        </nav>
        <span data-testid="header-user-name">
          <p>
            {response}
          </p>
        </span>
      </header>
    );
  }
}

export default Header;
