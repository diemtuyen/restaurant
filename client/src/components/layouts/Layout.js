import React, { Component } from 'react';
import {  Nav, NavItem, NavLink } from 'reactstrap';
// import classnames from 'classnames';
// import { Link } from 'react-router-dom';
 
class Layout extends Component {    
    render() {
        return (
            <div>
                <Nav>
                <NavItem>
                    <NavLink href="/">All Tables</NavLink>
                </NavItem>
                <NavItem>
                    <NavLink href="/order">Order Tables</NavLink>
                </NavItem>
                <NavItem>
                    <NavLink href="/waiting">Waiting Tables</NavLink>
                </NavItem>
                <NavItem>
                    <NavLink href="/billing">Billing Tables</NavLink>
                </NavItem>
                <NavItem>
                    <NavLink disabled href="/addTable">Add new table</NavLink>
                </NavItem>
                <NavItem right>
                    <NavLink href="/log">My profile</NavLink>
                </NavItem>
                </Nav>
                { this.props.children }
            </div>
            );
        }
}

export default Layout;