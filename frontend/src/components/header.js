import React from 'react';
import { Navbar, Nav, NavDropdown } from 'react-bootstrap';
class Header extends React.Component {
    
    render() {
        return (
          <Navbar bg="dark" variant="dark">
          <Navbar.Brand href="#home" id="home">Bas tickets</Navbar.Brand>
          <Navbar.Brand href="#home" id="home1">Bas tickets</Navbar.Brand>
          <Navbar.Toggle aria-controls="basic-navbar-nav" />
          <Navbar.Collapse id="basic-navbar-nav">
            <Nav className="mr-auto" id="my-acc">
              <Nav.Link href="#home" id="schedule">Schedule</Nav.Link>
              <NavDropdown title="Account" id="basic-nav-dropdown">
                <NavDropdown.Item href="#action/3.1">Login</NavDropdown.Item>
                <NavDropdown.Divider />
                <NavDropdown.Item href="#action/3.2">Register</NavDropdown.Item>
              </NavDropdown>
            </Nav>
          </Navbar.Collapse>
        </Navbar>
        )
    }
}
export default Header;