import React from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';

class HomePage extends React.Component {
    componentDidMount() {
        //this.props.dispatch(userActions.getAll());
    }

    render() {
        const { user, users } = this.props;
        return (
            <div className="col-md-6 col-md-offset-3">
                <h1>Hi {user.firstName}!</h1>
                <p>You're logged in with React & JWT!!</p>
                <h3>Users from secure api end point:</h3>
                <p>
                    <Link to="/login">Logout</Link>
                </p>
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