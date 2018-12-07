import React, { Component} from 'react';
import { connect } from 'react-redux';
import { Button } from 'reactstrap';
import Login from '../presentation/Login';
import Register from '../presentation/Register';
import { logoutUser } from '../../actions/authActions';

class Authentication extends Component {

    constructor(){
        super();

        this.state = {
            toggleReg: false
        };
    }

    componentDidMount(){
        
    }

    showLogin(){
        this.setState({
            toggleReg: false   
        });        
    }    

    showReg(){
        this.setState({
            toggleReg: true   
        });
    }    

    logout(){
        this.props.dispatch(logoutUser());
    }    

    render(){

        const userNotLoggedIn = (
            <div>
                <Button onClick={this.showLogin.bind(this)}>Login</Button>{' '}<Button onClick={this.showReg.bind(this)}>Register</Button>
                { this.state.toggleReg ? <Register /> : <Login /> }
            </div>
        );
        const userLoggedIn = (<div>Logged in as: {this.props.username} <Button onClick={this.logout.bind(this)}>Logout</Button></div>);

        return (
            <div className="alignC">
                {this.props.loggedIn ? userLoggedIn : userNotLoggedIn}
            </div>
        )
    }
}

const mapStateToProps = state => {
    return {
        loggedIn: state.authRedu.loggedIn,
        username: state.authRedu.username
    }
}

export default connect(mapStateToProps)(Authentication)