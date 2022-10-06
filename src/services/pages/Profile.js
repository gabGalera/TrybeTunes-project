import React from 'react';
import { Link } from 'react-router-dom';
import Header from '../../components/Header';
import { getUser } from '../userAPI';
import Carregando from './Carregando';

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
    console.log(info);

    return (
      <div data-testid="page-profile">
        <Header />
        {
          isLoading
            ? <Carregando />
            : (
              <span>
                <p>
                  {info.name}
                </p>
                <p>
                  {
                    info.email
                  }
                </p>
                <p>
                  {
                    info.description
                  }
                </p>
                <img
                  src={ info.image }
                  alt="Imagem de perfil"
                  data-testid="profile-image"
                />
                <Link to="/profile/edit">Editar perfil</Link>
              </span>)
        }
      </div>
    );
  }
}

export default Profile;
