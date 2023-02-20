import React from 'react';
import { Link } from 'react-router-dom';
import Header from '../components/Header';
import { getUser } from '../services/userAPI';
import Carregando from './Carregando';
import styles from './styles/Profile.module.css';

class Profile extends React.Component {
  constructor() {
    super();

    this.state = {
      info: {},
      isLoading: true,
    };
  }

  componentDidMount() {
    getUser()
      .then((response) => this.setState({
        info: response,
        isLoading: false,
      }));
  }

  render() {
    const { info, isLoading } = this.state;

    return (
      <div
        className={ styles.container }
        data-testid="page-profile"
      >
        <Header />
        <div className={ styles.bg__container } />
        <div className={ styles.bg__img } />
        {
          isLoading
            ? <Carregando />
            : (
              <div
                className={ styles.container }
                style={ {
                  marginLeft: '20vw',
                } }
              >
                <img
                  className={ styles.img }
                  id="image"
                  src={ info.image }
                  // src={ require(`../images/${info.image}`) }
                  alt="Imagem de perfil"
                  data-testid="profile-image"
                />
                <span className={ styles.span__container }>
                  <div>
                    <p className={ styles.title__span }>Nome</p>
                    <p className={ styles.input__span }>
                      {info.name}
                    </p>
                  </div>
                  <div>
                    <p className={ styles.title__span }>E-mail</p>
                    <p className={ styles.input__span }>
                      {
                        info.email
                      }
                    </p>
                  </div>
                  <div>
                    <p className={ styles.title__span }>Descrição</p>
                    <p className={ styles.input__span }>
                      {
                        info.description
                      }
                    </p>
                  </div>
                  <Link
                    className={ styles.btn }
                    to="/profile/edit"
                  >
                    Editar perfil

                  </Link>
                </span>
              </div>
            )
        }
      </div>
    );
  }
}

export default Profile;
