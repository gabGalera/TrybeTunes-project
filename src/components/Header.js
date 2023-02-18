import React from 'react';
import { Link } from 'react-router-dom';
import Carregando from '../pages/Carregando';
import { getUser } from '../services/userAPI';
import styles from './Header.module.css';
import logo from '../images/logo.png';
import searchIcon from '../images/searchIcon.png';
import star from '../images/star.png';
import profile from '../images/profile.png';

class Header extends React.Component {
  constructor() {
    super();

    this.state = {
      isLogged: false,
      response: '',
    };
  }

  componentDidMount() {
    this.getRequisition();
  }

  getRequisition = () => {
    getUser()
      .then((response) => this.setState({
        response: response.name,
        isLogged: true,
      }));
  };

  render() {
    const { isLogged, response } = this.state;

    if (!isLogged) return <Carregando />;

    return (
      <header
        className={ styles.container }
        data-testid="header-component"
      >
        <img src={ logo } alt="logo" />
        <nav className={ styles.nav }>
          <Link to="/search" data-testid="link-to-search">
            <img src={ searchIcon } alt="search icon" />
            Search
          </Link>
          <Link to="/favorites" data-testid="link-to-favorites">
            <img src={ star } alt="favorite icon" />
            Favorites
          </Link>
          <Link to="/profile" data-testid="link-to-profile">
            <img src={ profile } alt="profile icon" />
            Profile
          </Link>
        </nav>
        <span
          className={ styles.name__span }
          data-testid="header-user-name"
        >
          <img src={ profile } alt="profile icon" />
          <p>
            {response}
          </p>
        </span>
      </header>
    );
  }
}

export default Header;
