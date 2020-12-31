import React, {useState} from 'react';
import {logout} from '../../Spotify';
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome';
import { faUser, faMusic, faHistory, faListUl, faSignOutAlt } from '@fortawesome/free-solid-svg-icons';
import SpotifyIcon from '../../Images/SpotifyIcon.png';

const NavHeader = () => {


    const [windowWidth, setWindowWidth] = useState(window.innerWidth);

    window.addEventListener('resize', () => setWindowWidth(window.innerWidth));

    return (
        <nav className='sidenav'>
                <div>
                    <a href='/'><img class='spotify-icon' src={SpotifyIcon} alt=""/></a>
                </div>
                <div className='horizontal-div'>
                    {windowWidth < 768 &&
                        <a href='/'><img class='spotify-icon-horizontal' src={SpotifyIcon} alt=""/></a>}
                    <a href='/recently_played_songs' className='icon-div' ><FontAwesomeIcon className='icon' icon={faHistory} /><p>Recent</p></a>
                    <a href='/top_songs' className='icon-div'><FontAwesomeIcon className='icon' icon={faMusic} /><p>Top Songs</p></a>
                    <a href='/top_artists' className='icon-div'><FontAwesomeIcon className='icon' icon={faUser} /><p>Top Artists</p></a>
                    <a href='/current_playlists' className='icon-div'><FontAwesomeIcon className='icon' icon={faListUl} /><p>Playlists</p></a>
                </div>
                <div className='logout-nav'>
                    <button className='logout-btn' onClick={logout}><div className='icon-div'><FontAwesomeIcon className='icon' icon={faSignOutAlt} /></div>Logout</button>
                </div>
        </nav>
    );


}


export default NavHeader;