import React from 'react';
import { Link } from 'react-router-dom';
import Carregando from '../services/pages/Carregando';
import { getUser } from '../services/userAPI';

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

    if (logado === true) return <Carregando />;

    return (
      <header data-testid="header-component">
        <span data-testid="header-user-name">
          Olá
          {' '}
          {response}
          !
        </span>
        <nav>
          <Link to="/search" data-testid="link-to-search">Search</Link>
          <Link to="/favorites" data-testid="link-to-favorites">Favorites</Link>
          <Link to="/profile" data-testid="link-to-profile">Profile</Link>
        </nav>
      </header>
    );
  }
}

export default Header;
