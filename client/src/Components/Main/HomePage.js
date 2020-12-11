import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import {Fragment} from 'react';

import RecentlyPlayedSongs from '../Songs/RecentlyPlayedSongs';
import CurrentProfile from '../User/CurrentProfile';
import Nav from '../Parts/Nav';
import TopSongs from '../Songs/TopSongs';
import TopArtists from '../Artists/TopArtists';
import CurrentPlaylists from '../Playlists/CurrentPlaylists';
import Playlist from '../Playlists/Playlist';
import Profile from '../User/Profile';
import Song from '../Songs/Song';



const HomePage = () => {


  return (
    <Fragment>
      <Router>
        <Nav />
          <section className='container'>
          <Switch >
            <Route exact path='/' component={CurrentProfile} />
            <Route exact path='/profile' component={CurrentProfile} />
            <Route exact path='/profile/:id' component={Profile} />
            <Route exact path='/recently_played_songs' component={RecentlyPlayedSongs}/>
            <Route exact path='/top_songs' component={TopSongs} />
            <Route exact path='/top_artists' component={TopArtists} />
            <Route exact path='/current_playlists' component={CurrentPlaylists} />
            <Route exact path='/playlist/:id' component={Playlist} />
            <Route exact path='/song/:id' component={Song} />
          </Switch>
          </section>
      </Router>
    </Fragment>
  );
};

export default HomePage;
