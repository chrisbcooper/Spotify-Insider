import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import {Fragment} from 'react';

import RecentlyPlayedSongs from '../Songs/RecentlyPlayedSongs';
import Profile from '../User/Profile';
import Nav from '../Parts/Nav';
import TopSongs from '../Songs/TopSongs';
import TopArtists from '../Artists/TopArtists';



const HomePage = () => {


  return (
    <Fragment>
      <Router>
        <Nav />
          <section className='container'>
          <Switch >
            <Route exact path='/' component={Profile} />
            <Route exact path='/profile' component={Profile} />
            <Route exact path='/recently_played_songs' component={RecentlyPlayedSongs}/>
            <Route exact path='/top_songs' component={TopSongs} />
            <Route exact path='/top_artists' component={TopArtists} />
          </Switch>
          </section>
      </Router>
    </Fragment>
  );
};

export default HomePage;
