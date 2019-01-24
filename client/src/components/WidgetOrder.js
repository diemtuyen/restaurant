import React from 'react';
import {compose} from 'redux';
import { connect } from "react-redux";
import {Link} from 'react-router-dom';
import commonWrapped from '../hocs/hocs.common';
import $ from 'jquery';
import _ from 'lodash';
import { formValueSelector, Field, FieldArray, reduxForm, change } from 'redux-form';
import { Row, Col, Button, FormGroup, Label } from 'reactstrap';
import renderDropdownList from '../controls/dropdown.control';
import renderFoods from '../controls/foods.control';
import 'react-widgets/dist/css/react-widgets.css';
import {bookingActions} from '../actions/booking.actions';
import { history } from '../helpers/history';

class WidgetOrder extends React.Component{
    constructor(props){
        super(props);
        this.state={
            openNoteSuggest:false
        }
        this.addDetail = this.addDetail.bind(this);
        this.handleEditOrder = this.handleEditOrder.bind(this); 
        this.fnShowNoteSuggest = this.fnShowNoteSuggest.bind(this);
        this.fnAddSuggestNote = this.fnAddSuggestNote.bind(this);
        this.markDone = this.markDone.bind(this);

    }
    handleEditOrder(){
        this.props.dispatch(bookingActions.setPageType('alter'));
        history.push('/order');
    }
    componentDidMount(){ 
        this.props.dispatch(bookingActions.getCategories());
    }
    componentWillReceiveProps(nextProps){
        if( this.props.initialized && !nextProps.initialized){
            this.props.dispatch(change(this.props.form, 'Details',  this.props.Details));
            this.props.dispatch(change(this.props.form, 'Table',  this.props.Table));
        }   
    }
    markDone() {
        this.props.dispatch(bookingActions.markDone(this.props.selectOrder));  
      }
    addDetail =(e)=>{
        let Details;
        Details = _.cloneDeep(this.props.tempDetails) || [];
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
                        <h2>{_.get(rs, `widgetOrder.${this.props.pageType}.name`)}</h2>
                            {(this.props.pageType === 'order') && <label className='number_no'>{_.get(rs, `widgetOrder.${this.props.pageType}.title`)}</label>}
                            {(this.props.pageType !== 'order') && <span className='number_no'>{_.get(rs, `widgetOrder.${this.props.pageType}.title`)}{' '}
                                <b>{this.props.title}</b></span>}
                    </div>
                    <form className='form-order' onSubmit={handleSubmit}>
                        <Row className="order-food-header">
                            <Col xs={5}>
                                <FormGroup row>
                                    <Label for="table">{_.get(rs, `widgetOrder.${this.props.pageType}.tableId`)}</Label>
                                    <Col sm={12} className="order-food-header-col-input">
                                    { this.props.pageType !== 'cooker' &&  
                                        <Field
                                        name="Table"
                                        valueField="id"
                                        textField='title'
                                        component={renderDropdownList}     
                                        data={this.props.tables}/>}                                    
                                    {this.props.pageType === 'cooker' && <span>{this.props.Table}</span>}
                                    </Col>
                                </FormGroup>
                            </Col>
                            <Col xs={2}>
                                <FormGroup takeAway>
                                    <Label takeAway>
                                    {(this.props.pageType == 'order') ?
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
                                        {' '}{_.get(rs, `widgetOrder.${this.props.pageType}.takeAway`)}
                                    </Label>
                                </FormGroup>
                            </Col>
                            {this.props.pageType !=='cooker'&&<Col xs={2}><Button type="button" onClick={this.addDetail}>{_.get(rs, `widgetOrder.${this.props.pageType}.addFood`)}</Button></Col>}
                            {this.props.pageType ==='cooker'&&<Col xs={2}><Button type="button" onClick={this.handleEditOrder}>{_.get(rs, `widgetOrder.${this.props.pageType}.editOrder`)}</Button></Col>}
                        </Row>
                        <FieldArray name="Details" 
                            rs={rs}
                            pageType={this.props.pageType}
                            component={renderFoods} 
                            kinds={this.props.kinds} 
                            foods={this.props.foods} 
                            suggestNote={this.props.suggestNote}
                            utilities={this.props.utilities}
                            fnShowNoteSuggest={this.fnShowNoteSuggest}
                            fnAddSuggestNote={this.fnAddSuggestNote}/>
                            
                        <div className="alignR submit">
                            {this.props.pageType !== 'cooker' && <Button type="button" onClick={handleSubmit(values => this.props.onSubmit({...values}))}disabled={pristine || submitting}>{_.get(rs, `widgetOrder.${this.props.pageType}.submit`)}</Button>}
                            {this.props.pageType === 'cooker' && <Button type="button" onClick={this.markDone} >{_.get(rs, `widgetOrder.${this.props.pageType}.submit`)}</Button>}
                        </div>
                    </form> 
                </div>
            </div>
        )
    }
}
const selector = formValueSelector('orderForm');

const mapStateToProps = state => {
    
    if (!_.isNull(state.bookingReducer.selectOrder) && !_.isNull(state.bookingReducer.selectOrder.details)){
        return {
            tables: state.bookingReducer.tables,
            foods: state.bookingReducer.foods,
            kinds: state.bookingReducer.kinds,
            suggestNote: state.bookingReducer.suggestNote,
            pageType: state.bookingReducer.pageType,
            title: state.bookingReducer.selectOrder.title,
            Table: state.bookingReducer.selectOrder.tableId,
            Details: state.bookingReducer.selectOrder.details,
            tempDetails: selector(state, 'Details'),
            initialValues: {
                Details: state.bookingReducer.selectOrder.details,
                Table: state.bookingReducer.selectOrder.tableId,
            }                
        } 
    }
    else{
        return {
            tables: state.bookingReducer.tables,
            foods: state.bookingReducer.foods,
            kinds: state.bookingReducer.kinds,
            suggestNote: state.bookingReducer.suggestNote,
            pageType: state.bookingReducer.pageType,
            tempDetails: selector(state, 'Details'),
            Details: selector(state, 'Details'),
        } 
    }
}
const mapDispatchToProps = dispatch => ({
  onSubmit: values => {
    let title = Date.now().toString();
    const fields = {Title: title, Status: { Title: 'Order', id: '1' }};
    const jsonOrder = Object.assign({}, values, fields);
    _.forEach(jsonOrder.Details, (i) => {
        i.JsonExcept = JSON.stringify(i.JsonExcept);
        i.JsonUtility = JSON.stringify(i.JsonUtility);
    });
    if(this.pageType === 'order')
        dispatch(bookingActions.addOrder(jsonOrder));
    else
        dispatch(bookingActions.updateOrder(jsonOrder));
  }    
});
export default compose(
    connect(mapStateToProps, mapDispatchToProps),
    reduxForm({
        form: 'orderForm',
        enableReinitialize: true
    }),
    commonWrapped()
  )(WidgetOrder);

  