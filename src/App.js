import React from 'react';
import { Route, Switch, Redirect } from 'react-router-dom';

import Login from './pages/Login';
import Search from './pages/Search';
import Album from './pages/Album';
import Favorites from './pages/Favorites';
import Profile from './pages/Profile';
import ProfileEdit from './pages/ProfileEdit';
import NotFound from './pages/NotFound';
import Carregando from './pages/Carregando';

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
    const description = `
    Lorem ipsum dolor sit amet consectetur adipisicing elit.
    Magnam, non optio quaerat nobis aut itaque doloribus 
    illum aliquid saepe perspiciatis. 
    Officia consectetur placeat aut aspernatur quis deserunt, totam nemo vitae.`;
    const email = 'example@hotmail.com';
    const image = 'examplePhoto.jpeg';
    this.setState({ isLoading: true }, () => {
      createUser({ name, email, image, description })
        .then(() => this.setState(
          { isLoading: false,
            logado: true,
          },
          () => {
            (<Redirect to="/search" />);
          },
        ));
    });
  };

  render() {
    const { isLoading, logado } = this.state;

    if (isLoading) return <Carregando />;
    return (
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
    );
  }
}

export default App;
