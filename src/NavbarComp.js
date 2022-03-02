import React from "react";
import './App.css';
import {Navbar, Container, Nav } from 'react-bootstrap';
import {Link} from 'react-router-dom';

export default class NavbarComp extends React.Component {
    render() {
        return (

            <Navbar bg="dark" variant="dark">
                <Container >
                    <Navbar.Brand >Blog</Navbar.Brand>
                    <Nav className="me-auto">
                        <Link to="/!#" className="Links">Home</Link>
                        <Link to="/Profile" className="Links">Profile</Link>
                        <Link to="/Users" className="Links">Users</Link>
                        <Link to="/Authors" className="Links">Authors</Link>
                    </Nav>
                </Container>
            </Navbar>
        );
    }
}
