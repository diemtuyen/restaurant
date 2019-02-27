import React from 'react';
import { Row, Col} from 'reactstrap';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';

class HomePage extends React.Component {
    render() {
        const { user, users } = this.props;
        return (
            <div className='dashboard'>
                <Row>
                    <Col md='3' sm='6' xs='12' className='msg'>
                        <Row>
                            <Col><i class="fa fa-comment"></i></Col>
                            <Col>52</Col>
                        </Row>
                        <Row>Messages</Row>
                    </Col>
                    <Col md='3' sm='6' xs='12' className='view'>
                        <Row>
                            <Col><i class="fa fa-eye"></i></Col>
                            <Col>52</Col>
                        </Row>
                        <Row>View</Row>
                    </Col>
                    <Col md='3' sm='6' xs='12' className='share'>
                        <Row>
                            <Col><i class="fa fa-share-alt"></i></Col>
                            <Col>52</Col>
                        </Row>
                        <Row>Share</Row>
                    </Col>
                    <Col md='3' sm='6' xs='12' className='user'>
                        <Row>
                            <Col><i class="fa fa-users"></i></Col>
                            <Col>52</Col>
                        </Row>
                        <Row>User</Row>
                    </Col>
                </Row>
                <Link to="/login">Logout</Link>
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

export default connect(mapStateToProps)(HomePage);