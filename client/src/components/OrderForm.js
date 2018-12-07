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
          <div className="selectTable">
            <label htmlFor="table">{_.get(rs,'bookForm.tableId')}</label>{' '}
            <Field
              name="Table"
              component={renderDropdownList}                
              data={this.props.tables}/>{' '} 
            <label name="takeAway">{_.get(rs,'bookForm.takeAway')}</label>
            <Field
              name="takeAway"
              id="takeAway"
              component="input"
              type="checkbox" />
          </div>
          <FieldArray name="Details" rs={rs} component={renderFoods} categories={this.props.categories} kinds={this.props.kinds} excepts={this.props.excepts} utilities={this.props.utilities} />
          <div className="alignC">
              <Button type="submit" disabled={pristine || submitting}>{_.get(rs,'bookForm.submit')}</Button> 
          </div>
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

    const fields = { Title: 'Order', StatusId: '1' };
    const jsonOrder = Object.assign({}, values, fields);
    
    _.forEach(jsonOrder.Details, function(i){
        i.JsonExcept = JSON.stringify(i.JsonExcept);
        i.JsonUtility = JSON.stringify(i.JsonUtility);
    });
    dispatch(bookingActions.addOrder(jsonOrder));
  }
    
});
export default compose(
  connect(mapStateToProps, mapDispatchToProps),
  reduxForm({
      form: 'orderForm'
  }),
  commonWrapped()
)(OrderForm);
