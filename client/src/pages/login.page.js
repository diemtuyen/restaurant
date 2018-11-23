// import React from 'react';
// import { connect } from 'react-redux';
// import _ from 'lodash';
// import { userActions } from '../actions/user.actions';

// class LoginForm extends React.Component {
//     constructor(props) {
//         super(props);
//         // reset login status
//         //this.props.dispatch(userActions.logout());
//         this.state = {
//             username: '',
//             password: '',
//             submitted: false
//         };

//         this.handleChange = this.handleChange.bind(this);
//         this.handleSubmit = this.handleSubmit.bind(this);
//     }

//     handleChange(e) {
//         const { name, value } = e.target;
//         this.setState({ [name]: value });
//     }

//     handleSubmit(e) {
//         e.preventDefault();
//         this.setState({ submitted: true });
//         const { username, password } = this.state;
//         const { dispatch } = this.props;
//         if (username && password) {
//             dispatch(userActions.login(username, password));
//         }
//     }

//     render() {
//         const { loggingIn } = this.props;
//         const { username, password, submitted } = this.state;
//         const rs = _.get(window.restaurant,'resuource');
//         return (
//             <div className="col-md-6 col-md-offset-3">
//                 <h2>{_.get(rs,'loginForm.title')}</h2>
//                 <form name="form" onSubmit={this.handleSubmit}>
//                     <div className={'form-group' + (submitted && !username ? ' has-error' : '')}>
//                         <label htmlFor="username">{_.get(rs,'loginForm.userName')}</label>
//                         <input type="text" className="form-control" name="username" value={username} onChange={this.handleChange} />
//                         {submitted && !username &&
//                             <div className="help-block">{`${_.get(rs,'loginForm.userName')} ${_.get(rs,'validate.required')}`}</div>
//                         }
//                     </div>
//                     <div className={'form-group' + (submitted && !password ? ' has-error' : '')}>
//                         <label htmlFor="password">{_.get(rs,'loginForm.password')}</label>
//                         <input type="password" className="form-control" name="password" value={password} onChange={this.handleChange} />
//                         {submitted && !password &&
//                             <div className="help-block">{`${_.get(rs,'loginForm.password')} ${_.get(rs,'validate.required')}`}</div>
//                         }
//                     </div>
//                     <div className="form-group">
//                         <button className="btn btn-primary">{_.get(rs,'loginForm.loginBtn')}</button>
//                         {loggingIn &&
//                             <img src="data:image/gif;base64,R0lGODlhEAAQAPIAAP///wAAAMLCwkJCQgAAAGJiYoKCgpKSkiH/C05FVFNDQVBFMi4wAwEAAAAh/hpDcmVhdGVkIHdpdGggYWpheGxvYWQuaW5mbwAh+QQJCgAAACwAAAAAEAAQAAADMwi63P4wyklrE2MIOggZnAdOmGYJRbExwroUmcG2LmDEwnHQLVsYOd2mBzkYDAdKa+dIAAAh+QQJCgAAACwAAAAAEAAQAAADNAi63P5OjCEgG4QMu7DmikRxQlFUYDEZIGBMRVsaqHwctXXf7WEYB4Ag1xjihkMZsiUkKhIAIfkECQoAAAAsAAAAABAAEAAAAzYIujIjK8pByJDMlFYvBoVjHA70GU7xSUJhmKtwHPAKzLO9HMaoKwJZ7Rf8AYPDDzKpZBqfvwQAIfkECQoAAAAsAAAAABAAEAAAAzMIumIlK8oyhpHsnFZfhYumCYUhDAQxRIdhHBGqRoKw0R8DYlJd8z0fMDgsGo/IpHI5TAAAIfkECQoAAAAsAAAAABAAEAAAAzIIunInK0rnZBTwGPNMgQwmdsNgXGJUlIWEuR5oWUIpz8pAEAMe6TwfwyYsGo/IpFKSAAAh+QQJCgAAACwAAAAAEAAQAAADMwi6IMKQORfjdOe82p4wGccc4CEuQradylesojEMBgsUc2G7sDX3lQGBMLAJibufbSlKAAAh+QQJCgAAACwAAAAAEAAQAAADMgi63P7wCRHZnFVdmgHu2nFwlWCI3WGc3TSWhUFGxTAUkGCbtgENBMJAEJsxgMLWzpEAACH5BAkKAAAALAAAAAAQABAAAAMyCLrc/jDKSatlQtScKdceCAjDII7HcQ4EMTCpyrCuUBjCYRgHVtqlAiB1YhiCnlsRkAAAOwAAAAAAAAAAAA==" />
//                         }
//                     </div>
//                 </form>
//             </div>
//         );
//     }
// }

// function mapStateToProps(state) {
//     const { loggingIn } = state.authentication;
//     return {
//         loggingIn
//     };
// }

// export default connect(mapStateToProps)(LoginForm);
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
class LoginForm extends React.Component {
    constructor(props, context) {
        super(props, context);        
    }
    render(){
        const { handleSubmit, pristine, reset, submitting } = this.props;
        const rs = _.get(window.restaurant,'resuource');
        return(
            <form onSubmit={handleSubmit}>
                <Row>
                    <Col xs={12} sm={12}><h2>{_.get(rs,'loginForm.title')}</h2></Col>
                </Row>
                <Row>
                    <Col xs={3} sm={2}><label htmlFor="username">{_.get(rs,'loginForm.userName')}</label></Col>
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
                    <Col xs={3} sm={2}>{_.get(rs,'loginForm.password')}</Col>
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
                    <button type="submit" disabled={submitting}>{_.get(rs,'loginForm.loginBtn')}</button>
                    <button type="button" disabled={pristine || submitting} onClick={reset}>Clear Values</button>
                </Row>
            </form>
        )
    }
}
const loadingSelector = createLoadingSelector(['USERS_LOGIN']);
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
        form: 'loginForm' // a unique identifier for this form
    }),
    commonWrapped()
)(LoginForm);