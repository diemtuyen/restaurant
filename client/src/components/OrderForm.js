import React from 'react';
import {compose} from 'redux';
import { connect } from "react-redux";
import { Field, FieldArray, reduxForm, change } from 'redux-form';
import renderDropdownList from '../controls/dropdown.control';
import renderFoods from '../controls/foods.control';
import { Row, Col, Button, FormGroup, Label } from 'reactstrap';
import 'react-widgets/dist/css/react-widgets.css'
import _ from 'lodash';
import {bookingActions} from '../actions/booking.actions';
import commonWrapped from '../hocs/hocs.common';

class OrderForm extends React.Component {
  constructor(props, context) {
    super(props, context);
    this.addDetail = this.addDetail.bind(this);
  }
  componentDidMount(){ 
    this.props.dispatch(bookingActions.getCategories());
    console.log(this.props)       
  }
  addDetail =(e)=>{
    this.props.dispatch(change(this.props.form, 'Details', [{id: 1}, {id: 2}]));
  }
  render(){
    debugger;
      const {handleSubmit, pristine, reset, submitting } = this.props;
      const rs = _.get(window.restaurant,'resource');
      return(
        <form onSubmit={handleSubmit}>
          <Row className="order-food-header">
              <Col xs={5}>
                  <FormGroup row>
                      <Label for="table">{_.get(rs,'bookForm.tableId')}</Label>
                      <Col sm={12} className="order-food-header-col-input">
                        <Field
                          name="Table"
                          component={renderDropdownList}                
                          data={this.props.tables}/>
                      </Col>
                  </FormGroup>
              </Col>
              <Col xs={2}>
                  <FormGroup takeAway>
                    <Label takeAway>
                      <Field
                        name="takeAway"
                        id="takeAway"
                        component="input"
                        type="checkbox" />{' '}
                        {_.get(rs,'bookForm.takeAway')}
                      </Label>
                  </FormGroup>
              </Col>
              <Col xs={2}><Button type="button" onClick={this.addDetail}>Add Food</Button></Col>
          </Row>
          <FieldArray name="Details" rs={rs} component={renderFoods} foods={this.props.foods} kinds={this.props.kinds} excepts={this.props.excepts} utilities={this.props.utilities} />
          <div className="alignR submit">
              <Button type="submit" disabled={pristine || submitting}>{_.get(rs,'bookForm.submit')}</Button>
          </div>
        </form>  
      )
  }
}
const mapStateToProps = state => {
  return {
      tables: state.bookingReducer.tables,
      foods: state.bookingReducer.foods,
      kinds: state.bookingReducer.kinds,
      excepts: state.bookingReducer.excepts,
      utilities: state.bookingReducer.utilities,
  }
}
const mapDispatchToProps = dispatch => ({
  onSubmit: values => {
    let title = Date.now().toString();
    const fields = {Title: title, Status: { Title: 'Order', id: '1' }};
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
