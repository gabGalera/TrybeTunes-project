import React from 'react';
import { Route, Switch, Redirect } from 'react-router-dom';

import Login from './services/pages/Login';
import Search from './services/pages/Search';
import Album from './services/pages/Album';
import Favorites from './services/pages/Favorites';
import Profile from './services/pages/Profile';
import ProfileEdit from './services/pages/ProfileEdit';
import NotFound from './services/pages/NotFound';
import Carregando from './services/pages/Carregando';

import { createUser } from './services/userAPI';

class App extends React.Component {
  constructor() {
    super();

    this.state = {
      logado: false,
      muda: false,
    };
  }

  componentDidUpdate() {
    const { logado } = this.state;
    console.log(logado);
  }

  getLogado = () => {
    this.setState({ logado: true }, () => {
      createUser({ name: 'Name' })
        .then(() => this.setState(
          { logado: false,
            muda: true,
          },
          () => { (<Redirect to="/search" />); },
        ));
    });
  };

  render() {
    const { logado, muda } = this.state;

    if (logado === true) return <Carregando />;
    return (
      <>
        <p>TrybeTunes</p>
        <Switch>
          <Route path="/profile/edit" component={ ProfileEdit } />
          <Route path="/profile" component={ Profile } />
          <Route path="/favorites" component={ Favorites } />
          <Route path="/album/:id" render={ () => <Album /> } />
          <Route path="/search" component={ Search } />
          <Route
            exact
            path="/"
          >
            {
              muda === false
                ? <Login
                  logado={ logado }
                  getLogado={ this.getLogado }
                />
                : <Redirect to="/search" />
            }
          </Route>
          <Route path="*" component={ NotFound } />
        </Switch>
      </>
    );
  }
}

export default App;
