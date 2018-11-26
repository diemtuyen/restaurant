import React from 'react';
import {compose} from 'redux';
import { connect } from "react-redux";
import { Field, reduxForm } from 'redux-form';
import _ from 'lodash';
import { Row, Col } from 'reactstrap';
import renderInput from  '../controls/input.control';
import { userActions } from '../actions/user.actions';
import {required} from '../controls/FieldValidations';
import { createLoadingSelector } from '../helpers/selectors';
import commonWrapped from '../hocs/hocs.common';
class RegisterPage extends React.Component {
    constructor(props, context) {
        super(props, context);        
    }
    render(){
        const { handleSubmit, pristine, reset, submitting } = this.props;
        const rs = _.get(window.restaurant,'resource');
        return(
            <form onSubmit={handleSubmit}>
                <Row>
                    <Col xs={12} sm={12}><h2>{_.get(rs,'registerForm.title')}</h2></Col>
                </Row>
                <Row>
                    <Col xs={3} sm={2}><label htmlFor="username">{_.get(rs,'registerForm.userName')}</label></Col>
                    <Col xs={9} sm={10}>
                        <Field
                            className='res-input'
                            name='userName'
                            type='text'
                            component={renderInput}
                            validate={[required]}
                            showError
                        />
                    </Col>
                </Row>
                <Row>
                    <Col xs={3} sm={2}>{_.get(rs,'registerForm.password')}</Col>
                    <Col xs={9} sm={10}>
                        <Field 
                            className='res-input'
                            name='password'
                            type='password'
                            component={renderInput}
                            validate={[required]}
                            showError
                        />
                    </Col>
                </Row>
                <Row>
                    <Col xs={3} sm={2}>{_.get(rs,'registerForm.confirmPassword')}</Col>
                    <Col xs={9} sm={10}>
                        <Field 
                            className='res-input'
                            name='confirmPassword'
                            type='password'
                            component={renderInput}
                            validate={[required]}
                            showError
                        />
                    </Col>
                </Row>
                <Row>
                    <Col xs={3} sm={2}>{_.get(rs,'registerForm.email')}</Col>
                    <Col xs={9} sm={10}>
                        <Field 
                            className='res-input'
                            name='email'
                            type='text'
                            component={renderInput}
                            validate={[required]}
                            showError
                        />
                    </Col>
                </Row>
                <Row>
                    <Col xs={3} sm={2}>{_.get(rs,'registerForm.phoneNumber')}</Col>
                    <Col xs={9} sm={10}>
                        <Field 
                            className='res-input'
                            name='phoneNumber'
                            type='text'
                            component={renderInput}
                            validate={[required]}
                            showError
                        />
                    </Col>
                </Row>
                <Row>
                    <button type="submit" disabled={submitting}>{_.get(rs,'loginForm.loginBtn')}</button>
                    <button type="button" disabled={pristine || submitting} onClick={reset}>Clear Values</button>
                </Row>
            </form>
        )
    }
}
const loadingSelector = createLoadingSelector(['USERS_REGISTER']);
const mapStateToProps = (state) => ({ isFetching: loadingSelector(state) });
// link up desired behavior onSubmit
// this is a sample alert with the values
const mapDispatchToProps = dispatch => ({
    onSubmit: values =>
      //alert(`You submitted:\n\n${JSON.stringify(values, null, 2)}`),
      dispatch(userActions.login(values.userName, values.password))
});
export default compose(
    connect(mapStateToProps, mapDispatchToProps),
    reduxForm({
        form: 'registerForm' // a unique identifier for this form
    }),
    commonWrapped()
)(RegisterPage);