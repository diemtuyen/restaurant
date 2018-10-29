import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import {  Nav, NavItem, NavLink } from 'reactstrap';
import classnames from 'classnames';
 
class Layout extends Component {    
    render() {
        return (
            <div>
                <div>
                    <h1 className="header">Welcome to Tien Hai</h1>
                </div>                
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
                </Nav>
                { this.props.children }
            </div>
            );
        }
}

export default Layout;