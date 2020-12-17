import React from 'react';
import {Nav, Navbar, NavDropdown} from 'react-bootstrap';
import '../../Styles/App.css';
import {logout} from '../../Spotify';

const NavHeader = () => {

    return (
        <nav className='sidenav'>
            <a href='/recently_played_songs'>Recent</a>
            <a href='/top_songs'>Recent</a>
            <a href='/top_artists'>Recent</a>
            <a href='/current_playlists'>Recent</a>
        </nav>
    );


}


export default NavHeader;