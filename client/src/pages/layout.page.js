import logo from '../images/logo.jpg';
import React from 'react';
import { Link } from 'react-router-dom';
import {  Collapse,  Navbar,  NavbarToggler,  NavbarBrand,  Nav,  NavItem,  NavLink } from 'reactstrap';
import {globalConstants} from '../constants/global.constants';
export default class Layout extends React.Component {
  constructor(props) {
    super(props);

    this.toggleNavbar = this.toggleNavbar.bind(this);
    this.state = {
      isOpenMenu: false,
            userName: null
    };
  }
  toggleNavbar() {
    this.setState({
      isOpenMenu: !this.state.isOpenMenu
    });
  }
    componentDidMount(){
        if (localStorage.getItem(globalConstants.USER) != null) 
        this.setState({
           userName: JSON.parse(localStorage.getItem(globalConstants.USER)).userName
        })
    }
  render() {
    return (
        <div>
            <Navbar color='light' light expand='lg'>
                <NavbarBrand href='/'><img src={logo}/>Tien Hai</NavbarBrand>
                <div className='profile text-center'>
                        <span>Welcome, <strong>{this.state.userName ? this.state.userName :<i className="fa fa-user" aria-hidden="true"></i>}</strong></span><br/>
                        
                        <Link to href='/email'>
                            <i className='fa fa-envelope' aria-hidden='true'></i>
                        </Link>
                        <Link to href='/email'>
                            <i className='fa fa-user' aria-hidden='true'></i>
                        </Link>
                        <Link to href='/email'>
                            <i className='fa fa-gear' aria-hidden='true'></i>
                        </Link>
                    </div> 
                <NavbarToggler onClick={this.toggleNavbar} />                
                <Collapse isOpen={this.state.isOpenMenu} navbar>
                    <Nav navbar>
                        <NavItem>
                            <NavLink href='/'>
                                <i className='fa fa-dashboard' aria-hidden='true'></i>Dashboard
                            </NavLink>
                            <NavLink href='/order'>
                                <i className='fa fa-cutlery' aria-hidden='true'></i>Order Management
                            </NavLink>
                            <NavLink href='/cooker'>
                                <i className='fa fa-angellist' aria-hidden='true'></i>Cooker Management
                            </NavLink>
                            <NavLink href='#'>
                                <i className='fa fa-bar-chart-o' aria-hidden='true'></i>Report Management
                            </NavLink>
                            <NavLink href='#'>
                                <i className='fa fa-edit' aria-hidden='true'></i>Finance Management
                            </NavLink>
                            <NavLink href='#'>
                                <i className='fa fa-wrench' aria-hidden='true'></i>Settings
                            </NavLink>
                            <NavLink href='/login'>
                                <i class="fa fa-sign-in" aria-hidden="true"></i>Login
                            </NavLink>
                        </NavItem>                             
                    </Nav>
                </Collapse>  
            </Navbar>
            <div className={`content show-menu-${this.state.isOpenMenu}`}>
                {this.props.children}
            </div>
        </div>
        
    );
  }
}
