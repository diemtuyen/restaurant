import React from 'react';
import {Collapse, Navbar, NavbarToggler, NavbarBrand,
    UncontrolledDropdown, DropdownToggle, DropdownMenu, DropdownItem, 
    Nav, NavItem, NavLink, NavDropdown,    
    Row, Col} from 'reactstrap';  
import logo from '../images/logo.jpg';
import $ from 'jquery';

export default class Layout extends React.Component {
    constructor(props) {
      super(props);
  
      this.toggle = this.toggle.bind(this);
      this.state = {
        isOpen: false,
        height: 0,
        header: null,
        footer: null,
        userName: null
      };
    }
    toggle() {
      this.setState({
        isOpen: !this.state.isOpen
      });
    }
    componentDidMount(){
        let headerHeight= this.state.header.clientHeight;
        let footerHeight= this.state.footer.clientHeight;
        if (localStorage.getItem('user') != null) 
        this.setState({
           userName: JSON.parse(localStorage.getItem('user')).userName
        })
        this.setState({
            height: window.innerHeight - headerHeight - footerHeight
        })
    }
    render() {        
        return (            
            <div>
                <div ref={ e => { this.state.header = e; } }>
                    <Navbar color="light" light expand="md">
                        <NavbarBrand href="/"><img src={logo} height='45px'/></NavbarBrand>
                        {/* <NavbarToggler onClick={this.toggle} /> */}
                        {/* <Collapse isOpen={this.state.isOpen} navbar> */}
                            <Nav className="ml-auto" navbar>
                                <UncontrolledDropdown nav inNavbar>
                                    <DropdownToggle nav caret>
                                        <i class="fa fa-bell" aria-hidden="true"></i>
                                    </DropdownToggle>
                                    <DropdownMenu right>
                                        <DropdownItem>
                                            <i class="fa fa-envelope" aria-hidden="true"></i>{' '}Email
                                        </DropdownItem>
                                        <DropdownItem>
                                            <i class="fa fa-comment" aria-hidden="true"></i>{' '}New Comment
                                        </DropdownItem>
                                        <DropdownItem>
                                            <i class="fa fa-tasks" aria-hidden="true"></i>{' '}New task
                                        </DropdownItem>
                                        <DropdownItem>
                                            <i class="fa fa-upload" aria-hidden="true"></i>{' '}New report
                                        </DropdownItem>
                                    </DropdownMenu>
                                </UncontrolledDropdown> 
                                <UncontrolledDropdown nav inNavbar>
                                    <DropdownToggle nav caret>
                                        {this.state.userName ? this.state.userName :<i class="fa fa-user" aria-hidden="true"></i>}
                                    </DropdownToggle>
                                    <DropdownMenu right>
                                        <DropdownItem>
                                            <i class="fa fa-user" aria-hidden="true"></i>{' '}User Profile
                                        </DropdownItem>
                                        <DropdownItem>
                                            <i class="fa fa-gear" aria-hidden="true"></i>{' '}Settings
                                        </DropdownItem>
                                        <DropdownItem divider />
                                        <DropdownItem>
                                            <i class="fa fa-sign-out" aria-hidden="true"></i>{' '}Log out
                                        </DropdownItem>
                                        </DropdownMenu>
                                </UncontrolledDropdown>
                            </Nav>
                        {/* </Collapse> */}
                    </Navbar>
                </div>
                <div style={{minHeight: this.state.height, borderBottom: '1px solid #f5f5f5'}}>
                    <Row>
                        <Col md='2' className="sidebar">
                            <Nav vertical>
                                <NavItem>
                                    <NavLink href="/">
                                        <i class="fa fa-dashboard" aria-hidden="true"></i>{' '}Dashboard
                                    </NavLink>
                                    <NavLink href="/order">
                                        <i class="fa fa-hand-o-right" aria-hidden="true"></i>{' '}Order Management
                                    </NavLink>
                                    <NavLink href="/cooker">
                                        <i class="fa fa-angellist" aria-hidden="true"></i>{' '}Cooker Management
                                    </NavLink>
                                    <NavLink href="#">
                                        <i class="fa fa-bar-chart-o" aria-hidden="true"></i>{' '}Report Management
                                    </NavLink>
                                    <NavLink href="#">
                                        <i class="fa fa-edit" aria-hidden="true"></i>{' '}Finance Management
                                    </NavLink>
                                    <NavLink href="#">
                                        <i class="fa fa-wrench" aria-hidden="true"></i>{' '}Settings
                                    </NavLink>
                                    <NavLink className="second-level" href="/table">
                                        <i class="fa fa-table" aria-hidden="true"></i>{' '}Table
                                    </NavLink>
                                    <NavLink className="second-level" href="/category">
                                        <i class="fa fa-bars" aria-hidden="true"></i>{' '}Category
                                    </NavLink>
                                    <NavLink className="second-level" href="/utility">
                                        <i class="fa fa-book" aria-hidden="true"></i>{' '}Menu
                                    </NavLink>
                                    <NavLink className="second-level" href="#">
                                        <i class="fa fa-user-o" aria-hidden="true"></i>{' '}Users
                                    </NavLink>
                                    <NavLink href="#">
                                        <i class="fa fa-dashboard" aria-hidden="true"></i>{' '}Dashboard
                                    </NavLink> 
                                </NavItem>                    
                            </Nav>
                        </Col>
                        <Col md='10' className="content">
                            {this.props.children}
                        </Col>
                    </Row>
                </div>                
                <div ref={ e => { this.state.footer = e; } }>
                    <p style={{backgroundColor: '#f8f8f8', padding: 20}}> Copyright@2018 </p>
                </div>
            </div> 
        );
    }
}
