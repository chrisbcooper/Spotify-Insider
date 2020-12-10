import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';

import TopSongs from '../Songs/TopSongs';
import Profile from '../User/Profile';



const HomePage = () => {


  const getMusic = async () => {


  }


  return (
    <Router>
        <Switch >
          <Route exact path='/' component={Profile} />
          <Route exact path='/profile' component={Profile} />
          <Route exact path='/top_songs' component={TopSongs}/>
        </Switch>
    </Router>
  );
};

export default HomePage;
