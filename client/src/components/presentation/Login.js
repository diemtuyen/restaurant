import React, { Component } from 'react';
import { Button } from 'reactstrap';
import { submitLogin } from '../../actions/authActions';
import { connect } from 'react-redux';

class Login extends Component {

    constructor(){
        super();

        this.state = {
            details:{
            }
        };
    }

    updateDetails(event){
        let updateDetails = Object.assign({}, this.state.details);

        updateDetails[event.target.id] = event.target.value;
        this.setState({
            details: updateDetails   
        });
    }

    login(){
        this.props.dispatch(submitLogin(this.state.details));    
    }

    render(){
        return (
            <div className="logForm">
                <h3>Login</h3>
                Username <input onChange={this.updateDetails.bind(this)} id="username" type="text" placeholder= "Username"/><br/>
                Password <input onChange={this.updateDetails.bind(this)} id="password" type="password" placeholder= "Password"/><br/>
                <Button onClick={this.login.bind(this)}>Go</Button>
            </div>
        )
    }
}

const mapStateToProps = state => {
    return {
    }
}

export default connect(mapStateToProps)(Login);