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
      isLoading: false,
      logado: false,
    };
  }

  getLogado = (name) => {
    this.setState({ isLoading: true }, () => {
      createUser({ name })
        .then(() => this.setState(
          { isLoading: false,
            logado: true,
          },
          () => { (<Redirect to="/search" />); },
        ));
    });
  };

  render() {
    const { isLoading, logado } = this.state;

    if (isLoading === true) return <Carregando />;
    return (
      <>
        <p>TrybeTunes</p>
        <Switch>
          <Route path="/profile/edit" component={ ProfileEdit } />
          <Route path="/profile" component={ Profile } />
          <Route path="/favorites" component={ Favorites } />
          <Route path="/album/:id" render={ (id) => <Album id={ id } /> } />
          <Route path="/search" component={ Search } />
          <Route
            exact
            path="/"
          >
            {
              logado === false
                ? <Login isLoading={ isLoading } getLogado={ this.getLogado } />
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
