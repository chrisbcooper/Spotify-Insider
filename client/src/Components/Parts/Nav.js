import React from 'react';
import '../../Styles/App.css';
import {logout} from '../../Spotify';
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome';
import { faUser, faMusic, faHistory, faListUl, faSignOutAlt, faSpotify } from '@fortawesome/free-solid-svg-icons';
import SpotifyIcon from '../../Images/SpotifyIcon.png';

const NavHeader = () => {

    return (
        <nav className='sidenav'>
                <div>
                    <a href='/'><img class='spotify-icon' src={SpotifyIcon} alt=""/></a>
                </div>
                <div className='horizontal-div'>
                    <a href='/recently_played_songs'><div className='icon-div'><FontAwesomeIcon className='icon' icon={faHistory} /></div> Recent</a>
                    <a href='/top_songs'><div className='icon-div'><FontAwesomeIcon className='icon' icon={faMusic} /></div>Top Songs</a>
                    <a href='/top_artists'><div className='icon-div'><FontAwesomeIcon className='icon' icon={faUser} /></div>Top Artists</a>
                    <a href='/current_playlists'><div className='icon-div'><FontAwesomeIcon className='icon' icon={faListUl} /></div>Playlists</a>
                </div>
                <div className='logout-nav'>
                    <button className='logout-btn' onClick={logout}><div className='icon-div'><FontAwesomeIcon className='icon' icon={faSignOutAlt} /></div>Logout</button>
                </div>
        </nav>
    );


}


export default NavHeader;