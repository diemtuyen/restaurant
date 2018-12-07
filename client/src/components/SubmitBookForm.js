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
import BookForm from '../components/BookForm';
import {bookingActions} from '../actions/booking.actions';

let SubmitBookForm = props => {
    const { tables, categories, kinds, excepts, utilities, handleSubmit, pristine, submitting } = props
    const rs = _.get(window.restaurant,'resource');
    return (
    <form onSubmit={handleSubmit}>
        <div className="selectTable">
            <label htmlFor="table">{_.get(rs,'bookForm.tableId')}</label>{' '}
            <Field
                name="Table"
                component={renderDropdownList}                
                data={tables}/>{' '} 
            <label name="takeAway">{_.get(rs,'bookForm.takeAway')}</label>
            <Field
                name="takeAway"
                id="takeAway"
                component="input"
                type="checkbox" />
        </div> 
        <BookForm categories={categories} kinds={kinds} excepts={excepts} utilities={utilities}/>
        <br/>
        <div className="alignC">
            <Button type="submit" disabled={pristine || submitting}>Submit</Button> 
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
    dispatch(bookingActions.addOrder(values));
  }
    
});

export default compose(
  connect(),
  reduxForm({
      form: 'submitBookForm'
  }),
  commonWrapped()
)(SubmitBookForm);