import React from 'react';
import {Navbar, NavbarBrand,
    UncontrolledDropdown, DropdownToggle, DropdownMenu, DropdownItem, 
    Nav, NavItem, NavLink } from 'reactstrap';  
import logo from '../images/logo.jpg';
import $ from 'jquery';
import {globalConstants} from '../constants/global.constants';
export default class Layout extends React.Component {
    constructor(props) {
        super(props);    
        this.toggle = this.toggle.bind(this);
        this.toggleMenu = this.toggleMenu.bind(this);
        this.state = {
            isOpen: false,
            height: 0,
            header: null,
            footer: null,
            isShown: true,
            userName: null
        };
    }
    toggle() {
        this.setState({
            isOpen: !this.state.isOpen
        });
    }
    toggleMenu(){
        this.setState({ isShown: !this.state.isShown });  

        if(this.state.isShown){
            $("#layout.sidebar").css({"width": "71px"}); 
            $(".content").css({"width": "calc(100% - 71px)"}); 
        } else {
            $("#layout.sidebar").css({"width": "200px"}); 
            $(".content").css({"width": "calc(100% - 200px)"});      
        }
    }
    componentDidMount(){
        let headerHeight= this.state.header.clientHeight;
        let footerHeight= this.state.footer.clientHeight;
        if (localStorage.getItem(globalConstants.USER) != null) 
        this.setState({
           userName: JSON.parse(localStorage.getItem(globalConstants.USER)).userName
        })
        this.setState({
            height: window.innerHeight - headerHeight - footerHeight
        })

        $( document ).ready(function() {
            $('#clickable').on("click", function (e) {  
                //this.setState({ this.state.isShown: true });            
                if ($(this).hasClass('panel-collapsed')) {                    
                    $('#lstSecond').slideDown();
                    $(this).removeClass('panel-collapsed');
                    $(this.lastChild).removeClass('fa-angle-left');
                    $(this.lastChild).addClass('fa-angle-down');
                }
                else {
                    $('#lstSecond').slideUp();
                    $(this).addClass('panel-collapsed');
                    $(this.lastChild).removeClass('fa-angle-down');
                    $(this.lastChild).addClass('fa-angle-left');
                }
            });
        });
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
                                        <i className="fa fa-bell" aria-hidden="true"></i>
                                    </DropdownToggle>
                                    <DropdownMenu right>
                                        <DropdownItem>
                                            <i className="fa fa-envelope" aria-hidden="true"></i>{' '}Email
                                        </DropdownItem>
                                        <DropdownItem>
                                            <i className="fa fa-comment" aria-hidden="true"></i>{' '}New Comment
                                        </DropdownItem>
                                        <DropdownItem>
                                            <i className="fa fa-tasks" aria-hidden="true"></i>{' '}New task
                                        </DropdownItem>
                                        <DropdownItem>
                                            <i className="fa fa-upload" aria-hidden="true"></i>{' '}New report
                                        </DropdownItem>
                                    </DropdownMenu>
                                </UncontrolledDropdown> 
                                <UncontrolledDropdown nav inNavbar>
                                    <DropdownToggle nav caret>
                                        {this.state.userName ? this.state.userName :<i className="fa fa-user" aria-hidden="true"></i>}
                                    </DropdownToggle>
                                    <DropdownMenu right>
                                        <DropdownItem>
                                            <i className="fa fa-user" aria-hidden="true"></i>{' '}User Profile
                                        </DropdownItem>
                                        <DropdownItem>
                                            <i className="fa fa-gear" aria-hidden="true"></i>{' '}Settings
                                        </DropdownItem>
                                        <DropdownItem divider />
                                        <DropdownItem>
                                            <i className="fa fa-sign-out" aria-hidden="true"></i>{' '}Log out
                                        </DropdownItem>
                                        </DropdownMenu>
                                </UncontrolledDropdown>
                                <a className="btn btn-light" href="/login" role="button">Log in</a>
                            </Nav>
                        {/* </Collapse> */}
                    </Navbar>
                </div>
                <div style={{minHeight: this.state.height, borderBottom: '1px solid #f5f5f5'}}>
                    <div>
                        <div id="layout" className="sidebar">                        
                            <Nav vertical>
                                <NavItem>
                                    <NavLink className="arrows-alt-menu" onClick={this.toggleMenu}>
                                        <i className="fa fa-arrows-alt" aria-hidden="true"></i>{' '}
                                    </NavLink>
                                    <NavLink href="/">
                                        <i className="fa fa-dashboard" aria-hidden="true"></i>{' '}{this.state.isShown ? 'Dashboard': ''}
                                    </NavLink>
                                    <NavLink href="/order">
                                        <i className="fa fa-cutlery" aria-hidden="true"></i>{' '}{this.state.isShown ? 'Order Management': ''}
                                    </NavLink>
                                    <NavLink href="/cooker">
                                        <i className="fa fa-angellist" aria-hidden="true"></i>{' '}{this.state.isShown ? 'Cooker Management': ''}
                                    </NavLink>
                                    <NavLink href="#">
                                        <i className="fa fa-bar-chart-o" aria-hidden="true"></i>{' '}{this.state.isShown ? 'Report Management': ''}
                                    </NavLink>
                                    <NavLink href="#">
                                        <i className="fa fa-edit" aria-hidden="true"></i>{' '}{this.state.isShown ? 'Finance Management': ''}
                                    </NavLink>
                                    <NavLink href="#" id="clickable" className="panel-collapsed">
                                        <i className="fa fa-wrench" aria-hidden="true"></i>{' '}{this.state.isShown ? 'Settings': ''}
                                        <i className="fa fa-angle-left" aria-hidden="true"></i>
                                    </NavLink>
                                </NavItem>
                                <NavItem id="lstSecond" className="collapsein">
                                    <NavLink className="second-level" href="/table">
                                        <i className="fa fa-table" aria-hidden="true"></i>{' '}{this.state.isShown ? 'Table': ''}
                                    </NavLink>
                                    <NavLink className="second-level" href="/category">
                                        <i className="fa fa-bars" aria-hidden="true"></i>{' '}{this.state.isShown ? 'Category': ''}
                                    </NavLink>
                                    <NavLink className="second-level" href="/utility">
                                        <i className="fa fa-book" aria-hidden="true"></i>{' '}{this.state.isShown ? 'Menu': ''}
                                    </NavLink>
                                    <NavLink className="second-level" href="/except">
                                        <i className="fa fa-ban" aria-hidden="true"></i>{' '}{this.state.isShown ? 'Except': ''}
                                    </NavLink>
                                    <NavLink className="second-level" href="/kind">
                                        <i className="fa fa-server" aria-hidden="true"></i>{' '}{this.state.isShown ? 'Kind': ''}
                                    </NavLink>
                                    <NavLink className="second-level" href="#">
                                        <i className="fa fa-user-o" aria-hidden="true"></i>{' '}{this.state.isShown ? 'Users': ''}
                                    </NavLink>
                                </NavItem>                    
                            </Nav>
                        </div>
                        <div className="content">
                            {this.props.children}
                        </div>
                    </div>
                </div>                
                <div ref={ e => { this.state.footer = e; } }>
                    <p style={{backgroundColor: '#f8f9fa', padding: 20}}> Copyright@2019 </p>
                </div>
            </div> 
        );
    }
}
