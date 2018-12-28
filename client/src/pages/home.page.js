import React from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import {Row, Col} from 'reactstrap';
import { userActions } from '../actions/user.actions';

class HomePage extends React.Component {
    componentDidMount() {
        //this.props.dispatch(userActions.getAll());
    }

    render() {
        const { user, users } = this.props;
        return (
            <div>
                <Row>
                    <Col md='3' sm='3' xs='6' className="panel" color="primary">
                        aaaaaaa
                    </Col>
                    <Col md='3' sm='3' xs='6'>
                        bbbbbbb
                    </Col>
                    <Col md='3' sm='3' xs='6'>
                        ccccccc
                    </Col>
                    <Col md='3' sm='3' xs='6'>
                        ddddddd
                    </Col>
                </Row>
                <div className="col-md-6 col-md-offset-3">
                    <h1>Hi {user.firstName}!</h1>
                    <p>You're logged in with React & JWT!!</p>
                    <h3>Users from secure api end point:</h3>
                    <p>
                        <Link to="/login">Logout</Link>
                    </p>
                </div>
            </div>
        );
    }
}

const mapStateToProps = (state) => {
    const { users, authentication } = state;
    const { user } = authentication;
    return {
        user,
        users
    };
}

// const connectedHomePage = connect(mapStateToProps)(HomePage);
// export { connectedHomePage as HomePage };
export default connect(mapStateToProps)(HomePage);