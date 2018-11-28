import React from 'react';
import {compose} from 'redux';
import { connect } from "react-redux";
import { Field, FieldArray, reduxForm } from 'redux-form';
import renderDropdownList from '../controls/dropdown.control';
import renderFoods from '../controls/foods.control';
import { Row, Col, Button } from 'reactstrap';
import 'react-widgets/dist/css/react-widgets.css'
import _ from 'lodash';
import {bookingActions} from '../actions/booking.actions';
import commonWrapped from '../hocs/hocs.common';

class OrderForm extends React.Component {
  constructor(props, context) {
    super(props, context);
  }
  componentDidMount(){ 
    this.props.dispatch(bookingActions.getItems());        
  }
  render(){
      const { handleSubmit, pristine, reset, submitting } = this.props;
      const rs = _.get(window.restaurant,'resource');
      return(
        <form onSubmit={handleSubmit}>
          <h2 className="alignC">{_.get(rs,'bookForm.title')}</h2> 
          <Row>
            <Col sm="12" md="12" className="selectTable">
              <label htmlFor="table">{_.get(rs,'bookForm.tableId')}</label>{' '}
              <Field
                name="table"
                component={renderDropdownList}                
                data={this.props.tables}/>{' '} 
              <label name="takeAway">{_.get(rs,'bookForm.takeAway')}</label>
              <Field
                name="takeAway"
                id="takeAway"
                component="input"
                type="checkbox" />
            </Col>
          </Row>
          <Row>
            <Col sm="12" md="12">        
              <FieldArray name="Details" component={renderFoods} categories={this.props.categories} kinds={this.props.kinds} excepts={this.props.excepts} utilities={this.props.utilities} />
            </Col>
          </Row>
          <Row>
            <Col sm="12" md="12" className="alignC"> 
              <Button type="submit" disabled={submitting}>{_.get(rs,'bookForm.submit')}</Button> 
            </Col>
          </Row>
        </form>  
      )
  }
}
const mapStateToProps = state => {
  return {
      tables: state.bookingReducer.tables,
      categories: state.bookingReducer.categories,
      kinds: state.bookingReducer.kinds,
      excepts: state.bookingReducer.excepts,
      utilities: state.bookingReducer.utilities,
  }
}
const mapDispatchToProps = dispatch => ({
  onSubmit: values => {
    console.log(values);
    dispatch(bookingActions.addOrder(values));
  }
    
});
export default compose(
  connect(mapStateToProps, mapDispatchToProps),
  reduxForm({
      form: 'orderForm'
  }),
  commonWrapped()
)(OrderForm);
