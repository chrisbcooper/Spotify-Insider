import React from 'react';
import {Nav, Navbar, NavDropdown} from 'react-bootstrap'

const NavHeader = () => {

    return (
        <Navbar bg="dark" expand="lg" variant='dark'>
        <Navbar.Brand href="/profile">Spotify Insider</Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
            <Nav className="mr-auto">
            <Nav.Link href="/recently_played_songs">Recent</Nav.Link>
            <Nav.Link href="/top_songs">Top Songs</Nav.Link>
            <Nav.Link href="/top_artists">Top Artists</Nav.Link>
            <Nav.Link href='/current_playlists'>Playlists</Nav.Link>
            </Nav>
        </Navbar.Collapse>
    </Navbar>
    );


}

export default NavHeader;