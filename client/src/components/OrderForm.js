import React from 'react';
import {compose} from 'redux';
import { connect } from "react-redux";
import { formValueSelector, Field, FieldArray, reduxForm, change } from 'redux-form';
import renderDropdownList from '../controls/dropdown.control';
import renderFoods from '../controls/foods.control';
import { Row, Col, Button, FormGroup, Label } from 'reactstrap';
import 'react-widgets/dist/css/react-widgets.css'
import _ from 'lodash';
import {bookingActions} from '../actions/booking.actions';
import commonWrapped from '../hocs/hocs.common';
import $ from 'jquery';
class OrderForm extends React.Component {
  constructor(props, context) {
    super(props, context);
    this.state={
      openNoteSuggest:false
    }
    this.addDetail = this.addDetail.bind(this);
    this.fnShowNoteSuggest = this.fnShowNoteSuggest.bind(this);
    this.fnAddSuggestNote = this.fnAddSuggestNote.bind(this);
  }
  componentDidMount(){ 
    this.props.dispatch(bookingActions.getCategories());
  }
  addDetail =(e)=>{    
    this.props.dispatch(change(this.props.form, 'Details', [{id: 1, openNote: false}]));
  }
  fnShowNoteSuggest = (item, idx) => {
    var id = `${item}.openNote`;
    id = $.escapeSelector(id);    
    $(`#${id}`).trigger("click");    
  }
  fnAddSuggestNote = (food, index, value)=>{
    let item = _.get(this.props, food);
    item.selectedNote = value;
    this.props.dispatch(change(this.props.form, food, {selectedNote: value, id: item.id, openNote: item.openNote, refresh: new Date().toString()}));
  }
  render(){
      const {handleSubmit, pristine, reset, submitting } = this.props;
      const rs = _.get(window.restaurant,'resource');
      return(
        <form className='form-order' onSubmit={handleSubmit}>
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
          <FieldArray name="Details" 
                rs={rs} 
                component={renderFoods} 
                foods={this.props.foods} 
                // kinds={this.props.kinds} 
                // excepts={this.props.excepts} 
                suggestNote={this.props.suggestNote}
                utilities={this.props.utilities}
                fnShowNoteSuggest={this.fnShowNoteSuggest}
                fnAddSuggestNote={this.fnAddSuggestNote}/>
          <div className="alignR submit">
              <Button type="submit" disabled={pristine || submitting}>{_.get(rs,'bookForm.submit')}</Button>
          </div>
        </form>  
      )
  }
}
const selector = formValueSelector('orderForm');
const mapStateToProps = state => {
  return {
      tables: state.bookingReducer.tables,
      foods: state.bookingReducer.foods,
      kinds: state.bookingReducer.kinds,
      // excepts: state.bookingReducer.excepts,
      // utilities: state.bookingReducer.utilities,
      suggestNote: state.bookingReducer.suggestNote,
      Details: selector(state, `Details`)
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
