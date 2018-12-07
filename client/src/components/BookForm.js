import React from 'react';
import {compose} from 'redux';
import { Field, reduxForm, formValueSelector  } from 'redux-form';
import { Row, Col, Button } from 'reactstrap';
import { connect } from 'react-redux';
import renderInput from '../controls/input.control'; 
import renderDropdownList from '../controls/dropdown.control';
import renderMultiselect from '../controls/multiselect.control';
import {adminActions} from '../actions/admin.actions';
import commonWrapped from '../hocs/hocs.common';
import {required} from '../controls/FieldValidations';
import _ from 'lodash';

let BookForm = props => {
    const { tables, categories, kinds, excepts, utilities, handleSubmit, pristine, submitting } = props
    const rs = _.get(window.restaurant,'resource');
    return (
    <form onSubmit={handleSubmit}>         
        <div>
            <Row>  
                <Col md={4}>
                <label>Category</label>
                <Field
                    name='category'
                    component={renderDropdownList}
                    data={categories}/>
                </Col>
                <Col md={4}>
                <label>Type</label>
                <Field
                    name='kind'
                    component={renderDropdownList}                        
                    data={kinds}/>
                </Col>
                <Col md={4}>
                <label>Count</label>
                <Field
                    name='count'
                    component={renderDropdownList}
                    data={[ '1', '2', '3', '4', '5', '6' ]}/> 
                </Col>
            </Row> 
            <Row>            
                <Col md={12}>
                <label>Utility</label>
                <Field
                    component={renderMultiselect}
                    name='JsonUtility'
                    data={utilities}
                    validate={[required]}
                    showError
                    />
                </Col>
            </Row>
            <Row>
                <Col md={12}>
                <label>Exception</label>
                <Field
                    name='JsonExcept'
                    component={renderMultiselect}
                    data={excepts}/>
                </Col>
            </Row>
            <Row>
                <Col md={12}>
                <label>Note</label>{' '}
                <Field
                    className='res-input'
                    name='note'
                    type='text'
                    component={renderInput}
                />
                </Col>
            </Row>
        </div>
        <div className="alignC">
            <Button type="submit" disabled={pristine || submitting}>Add Food</Button> 
        </div>
    </form>
  )
}

const mapStateToProps = state => {
  return {
    
  }
}

const mapDispatchToProps = dispatch => ({
  onSubmit: values => {    
    //dispatch(adminActions.addCategory(values));
  }
    
});
export default compose(
  connect(),
  reduxForm({
      form: 'bookForm'
  }),
  commonWrapped()
)(BookForm);