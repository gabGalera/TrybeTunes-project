import React from 'react';
import Header from '../components/Header';
import MusicCard from '../components/MusicCard';
import { getFavoriteSongs, removeSong, addSong } from '../services/favoriteSongsAPI';
import Carregando from './Carregando';

class Favorites extends React.Component {
  constructor() {
    super();

    this.state = {
      favorites: [],
      isLoadingFav: true,
      IDs: [],
    };
  }

  componentDidMount() {
    this.getFav();
  }

  getFav = () => {
    getFavoriteSongs()
      .then((response) => {
        const IDs = response.map((song) => song.trackId);
        this.setState({
          favorites: response,
          isLoadingFav: false,
          IDs,
        });
      });
  };

  handleStorage = (func, e) => {
    const { favorites } = this.state;
    this.setState({
      isLoadingFav: true,
    });
    const music = favorites
      .filter((entry) => entry.trackId === Number(e.target.id));
    func(...music)
      .then(() => getFavoriteSongs()
        .then((songs) => {
          const IDs = songs.map((song) => song.trackId);
          this.setState({
            favorites: songs,
            isLoadingFav: false,
            IDs,
          });
        }));
  };

  addingMusic = (e) => {
    this.handleStorage(addSong, e);
  };

  removingMusic = (e) => {
    this.handleStorage(removeSong, e);
  };

  handleChange = (e) => (e.target.checked ? this.addingMusic(e) : this.removingMusic(e));

  render() {
    const { isLoadingFav, favorites, IDs } = this.state;

    console.log(isLoadingFav);
    return (
      <div data-testid="page-favorites">
        <Header />
        { isLoadingFav
          ? <Carregando />
          : (
            <>
              {
                favorites
                  .filter((music) => typeof music.trackId !== 'undefined')
                  .map((music) => {
                    const check = IDs.includes(music.trackId);
                    return (
                      <MusicCard
                        key={ music.trackId }
                        favorites={ favorites }
                        isLoadingFav={ isLoadingFav }
                        handleChange={ this.handleChange }
                        IDs={ IDs }
                        music={ music }
                        check={ check }
                      />
                    );
                  })
              }
            </>
          )}
      </div>
    );
  }
}

export default Favorites;
