import React from 'react';
import {Nav, Navbar, NavDropdown} from 'react-bootstrap';
import '../../Styles/App.css';
import {logout} from '../../Spotify';

const NavHeader = () => {

    return (
        <nav className='sidenav'>
            <a href='/'>Home</a>
            <a href='/recently_played_songs'>Recent</a>
            <a href='/top_songs'>Top Songs</a>
            <a href='/top_artists'>Top Artists</a>
            <a href='/current_playlists'>Playlists</a>
        </nav>
    );


}


export default NavHeader;