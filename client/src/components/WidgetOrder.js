import React from 'react';
import {compose} from 'redux';
import { connect } from "react-redux";
import commonWrapped from '../hocs/hocs.common';
import $ from 'jquery';
import _ from 'lodash';
import { formValueSelector, Field, FieldArray, reduxForm, change } from 'redux-form';
import { Row, Col, Button, FormGroup, Label } from 'reactstrap';
import renderDropdownList from '../controls/dropdown.control';
import renderFoods from '../controls/foods.control';
import 'react-widgets/dist/css/react-widgets.css';
import {bookingActions} from '../actions/booking.actions';

class WidgetOrder extends React.Component{
    constructor(props){
        super(props);
        this.state={
            openNoteSuggest:false,
            orderItem: null
        }
        this.addDetail = this.addDetail.bind(this);
        this.fnShowNoteSuggest = this.fnShowNoteSuggest.bind(this);
        this.fnAddSuggestNote = this.fnAddSuggestNote.bind(this);
        this.markDone = this.markDone.bind(this);

    }
    componentDidMount(){ 
        if (this.props.pagetype == 'order')
            this.props.dispatch(bookingActions.getCategories());
    }
    componentWillReceiveProps(nextProps){
        if (this.props.pagetype == 'cooker'){            
            this.props.dispatch(bookingActions.getOrder(nextProps.selectOrder.rowGuid));
            if(!_.isUndefined(nextProps.selectOrder.details) && !_.isNull(nextProps.selectOrder.details)){
                this.setState({
                    orderItem: nextProps.selectOrder
                });
                this.props.dispatch(change(this.props.form, 'Details',  nextProps.selectOrder.details));
            } 
        }          
    }
    markDone() {
        this.props.dispatch(bookingActions.markDone(this.props.selectOrder));  
      }
    addDetail =(e)=>{
        this.setState({
            numFood: this.state.numFood + 1
        });
        let Details = _.cloneDeep(this.props.Details) || [];
        Details.push({openNote: false});
        this.props.dispatch(change(this.props.form, 'Details',  Details));
    }
    fnShowNoteSuggest = (item, idx) => {
        var id = `${item}.openNote`;
        id = $.escapeSelector(id);    
        $(`#${id}`).trigger("click");    
    }
    fnAddSuggestNote = (food, index, value)=>{
        let item = _.cloneDeep( _.get(this.props, food)) || {};
        item.selectedNote = value;
        this.props.dispatch(change(this.props.form, food, {...item, refresh: new Date().toString()}));
    }
    render(){
        const rs = _.get(window.restaurant,'resource');
        const {handleSubmit, pristine, reset, submitting } = this.props;
        return(
            <div className="order-food-form">
                <div className='order-food'>
                    <div className="title">
                        <h2>{_.get(rs, `widgetOrder.${this.props.pagetype}.name`)}</h2>
                        {(this.props.pagetype == 'order') ?
                            <label className='number_no'>{_.get(rs, `widgetOrder.${this.props.pagetype}.title`)}</label>:
                            <span className='number_no'>{_.get(rs, `widgetOrder.${this.props.pagetype}.title`)}{' '}
                                <b>{(this.state.orderItem == null ? '' :this.state.orderItem.title )}</b></span>}
                    </div>
                    <form className='form-order' onSubmit={handleSubmit}>
                        <Row className="order-food-header">
                            <Col xs={5}>
                                <FormGroup row>
                                    <Label for="table">{_.get(rs, `widgetOrder.${this.props.pagetype}.tableId`)}</Label>
                                    <Col sm={12} className="order-food-header-col-input">
                                        {(this.props.pagetype == 'order') ?
                                        <Field
                                        name="Table"
                                        component={renderDropdownList}                
                                        data={this.props.tables}/> : (this.state.orderItem == null ? '' :<span>{this.state.orderItem.tableId}</span>)}
                                    </Col>
                                </FormGroup>
                            </Col>
                            <Col xs={2}>
                                <FormGroup takeAway>
                                    <Label takeAway>
                                    {(this.props.pagetype == 'order') ?
                                    <Field
                                        name="takeAway"
                                        id="takeAway"
                                        component="input"
                                        type="checkbox" /> :
                                    <Field
                                        name="takeAway"
                                        id="takeAway"
                                        component="input"
                                        type="checkbox" />}
                                        {' '}{_.get(rs, `widgetOrder.${this.props.pagetype}.takeAway`)}
                                    </Label>
                                </FormGroup>
                            </Col>
                            <Col xs={2}><Button type="button" onClick={this.addDetail}>{_.get(rs, `widgetOrder.${this.props.pagetype}.addFood`)}</Button></Col>
                        </Row>
                        <FieldArray name="Details" 
                            rs={rs}
                            pagetype={this.props.pagetype}
                            component={renderFoods} 
                            foods={this.props.foods} 
                            suggestNote={this.props.suggestNote}
                            utilities={this.props.utilities}
                            fnShowNoteSuggest={this.fnShowNoteSuggest}
                            fnAddSuggestNote={this.fnAddSuggestNote}/>
                            
                        <div className="alignR submit">
                            <Button type="submit" disabled={pristine || submitting}>{_.get(rs, `widgetOrder.${this.props.pagetype}.submit`)}</Button>
                        </div>
                    </form> 
                </div>
            </div>
        )
    }
}
const selector = formValueSelector('orderForm');

const mapStateToProps = state => {
    return {
        tables: state.bookingReducer.tables,
        foods: state.bookingReducer.foods,
        kinds: state.bookingReducer.kinds,
        suggestNote: state.bookingReducer.suggestNote,
        Details: selector(state, `Details`),
        selectOrder: state.bookingReducer.selectOrder
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
  )(WidgetOrder);