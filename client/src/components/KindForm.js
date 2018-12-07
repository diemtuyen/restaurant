import React from 'react';
import {compose} from 'redux';
import { Field, reduxForm, formValueSelector  } from 'redux-form';
import { Row, Col, Button } from 'reactstrap';
import { connect } from 'react-redux';
import renderInput from '../controls/input.control'; 
import {adminActions} from '../actions/admin.actions';
import commonWrapped from '../hocs/hocs.common';
import _ from 'lodash';

let KindForm = props => {
  const { handleSubmit, pristine, submitting } = props
  return (
    <form onSubmit={handleSubmit}>
      <div className="addNew">
        <h5>Add new item</h5>
        <Row>
          <Col md={4} className="txtAddNew">
            <label>Title</label>
          </Col>
          <Col md={8}>
            <Field
                className='res-input'
                name='title'
                type='text'
                component={renderInput}
            />
          </Col>
        </Row>
        <Row>
          <Col md={4} className="txtAddNew">
            <label>Note</label>
          </Col>
          <Col md={8}>
            <Field
                className='res-input'
                name='note'
                type='text'
                component={renderInput}
            />
          </Col>
        </Row>
        <div className="alignC">
          <Button type="submit" disabled={pristine || submitting}>
            Add
          </Button>
        </div>
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
    dispatch(adminActions.addKind(values));
  }
    
});
export default compose(
  connect(mapStateToProps, mapDispatchToProps),
  reduxForm({
      form: 'kindForm'
  }),
  commonWrapped()
)(KindForm);