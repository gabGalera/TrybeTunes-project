import React from 'react';
import { Link } from 'react-router-dom';
import Header from '../../components/Header';

import { getUser, updateUser } from '../userAPI';
import Carregando from './Carregando';

class ProfileEdit extends React.Component {
  constructor() {
    super();

    this.state = {
      isLoading: true,
      name: '',
      email: '',
      description: '',
      image: '',
      disabled: true,

    };
  }

  componentDidMount() {
    getUser()
      .then((response) => {
        this.setState({
          info: response,
          isLoading: false,
          name: response.name,
          email: response.email,
          description: response.description,
          image: response.image,
        }, () => {
          const { name, email, description, image } = this.state;
          if (name.length > 0
          && email.length > 0
          && description.length > 0
          && image.length > 0) {
            this.setState({
              info: { name, email, description, image },
              disabled: false,
            });
          }
        });
      });
  }

  handleChange = ({ target }) => {
    const { id, value } = target;
    this.setState({
      [id]: value,
    }, () => {
      const { name, email, description, image } = this.state;
      if (name.length > 0
        && email.length > 0
        && description.length > 0
        && image.length > 0) {
        this.setState({
          info: { name, email, description, image },
          disabled: false,
        }, () => {
          const { info } = this.state;
          updateUser(info);
        });
      } else {
        this.setState({
          info: { name, email, description, image },
          disabled: true,
        }, () => {
          const { info } = this.state;
          updateUser(info);
        });
      }
    });
  };

  render() {
    const {
      isLoading,
      name,
      email,
      description,
      image,
      disabled,
    } = this.state;

    console.log('Estou aqui');

    return (
      <div data-testid="page-profile-edit">
        <Header />
        {
          isLoading
            ? <Carregando />
            : (
              <form>
                <label htmlFor="name">
                  Nome:
                  <input
                    type="text"
                    data-testid="edit-input-name"
                    id="name"
                    onChange={ (e) => this.handleChange(e) }
                    value={ name }
                  />
                </label>
                <label htmlFor="email">
                  E-mail:
                  <input
                    type="text"
                    data-testid="edit-input-email"
                    id="email"
                    onChange={ (e) => this.handleChange(e) }
                    value={ email }
                  />
                </label>
                <label htmlFor="description">
                  Description:
                  <input
                    type="text"
                    data-testid="edit-input-description"
                    id="description"
                    onChange={ (e) => this.handleChange(e) }
                    value={ description }
                  />
                </label>
                <label htmlFor="image">
                  Image:
                  <input
                    type="text"
                    data-testid="edit-input-image"
                    id="image"
                    onChange={ (e) => this.handleChange(e) }
                    value={ image }
                  />
                </label>
                <Link to="/profile">
                  <button
                    type="button"
                    data-testid="edit-button-save"
                    disabled={ disabled }
                  >
                    Save
                  </button>
                </Link>
              </form>
            )
        }
      </div>
    );
  }
}

export default ProfileEdit;
