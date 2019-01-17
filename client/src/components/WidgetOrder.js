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
            openNoteSuggest:false,
            orderItem: null,
            tableId: null
        }
        this.addDetail = this.addDetail.bind(this);
        this.handleClick = this.handleClick.bind(this); 
        this.fnShowNoteSuggest = this.fnShowNoteSuggest.bind(this);
        this.fnAddSuggestNote = this.fnAddSuggestNote.bind(this);
        this.markDone = this.markDone.bind(this);

    }
    handleClick(){
        this.props.dispatch(bookingActions.setPageType('alter'));
        history.push('/order');
    }
    componentDidMount(){ 
        this.props.dispatch(bookingActions.getCategories());
    }
    componentWillReceiveProps(nextProps){
        if (this.props.pageType === 'cooker' || nextProps.pageType ==='alter'){ 
            if( !_.isNull(nextProps.selectOrder)){
                this.props.dispatch(bookingActions.getOrder(nextProps.selectOrder.rowGuid));
            }
            if(!_.isUndefined(nextProps.selectOrder.details) && !_.isNull(nextProps.selectOrder.details)){
                this.setState({
                    orderItem: nextProps.selectOrder
                });
                
                let jsonPropsDetails = JSON.stringify(this.props.currentDetails);
                let jsonNextSelectDetails = JSON.stringify(nextProps.selectOrder.details);
                let jsonNextDetails = JSON.stringify(nextProps.currentDetails);

                if (jsonNextDetails != jsonNextSelectDetails){
                    this.props.dispatch(change(this.props.form, 'Details',  nextProps.selectOrder.details));
                    this.props.dispatch(bookingActions.setCurrentDetails(nextProps.selectOrder.details));

                    if ( !_.isUndefined(nextProps.currentDetails) && jsonPropsDetails != jsonNextDetails){
                        this.props.dispatch(change(this.props.form, 'Details',  nextProps.currentDetails));
                        this.props.dispatch(bookingActions.setCurrentDetails(nextProps.currentDetails));
                    }
                } 
            } 
            if(this.props.tables.length > 0){
                this.props.dispatch(change(this.props.form, 'Table', 
                _.find(this.props.tables, (table) => { return table.id == nextProps.selectOrder.tableId;})));
            }
        }          
    }
    markDone() {
        this.props.dispatch(bookingActions.markDone(this.props.selectOrder));  
      }
    addDetail =(e)=>{
        let Details;
        if(this.props.pageType ==='order')
            Details = _.cloneDeep(this.props.Details) || [];
        else if (this.props.pageType === 'alter')
            Details = _.cloneDeep(this.props.currentDetails);
        Details.push({openNote: false});
        this.props.dispatch(change(this.props.form, 'Details',  Details));
        this.props.dispatch(bookingActions.setCurrentDetails(Details));
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
                        {(this.props.pageType == 'order') ?
                            <label className='number_no'>{_.get(rs, `widgetOrder.${this.props.pageType}.title`)}</label>:
                            <span className='number_no'>{_.get(rs, `widgetOrder.${this.props.pageType}.title`)}{' '}
                                <b>{(this.state.orderItem == null ? '' :this.state.orderItem.title )}</b></span>}
                    </div>
                    <form className='form-order' onSubmit={handleSubmit}>
                        <Row className="order-food-header">
                            <Col xs={5}>
                                <FormGroup row>
                                    <Label for="table">{_.get(rs, `widgetOrder.${this.props.pageType}.tableId`)}</Label>
                                    <Col sm={12} className="order-food-header-col-input">
                                    { this.props.pageType === 'order' &&  
                                        <Field
                                        name="Table"
                                        valueField="id"
                                        textField='title'
                                        component={renderDropdownList}     
                                        data={this.props.tables}/>}
                                    {this.props.pageType === 'alter' &&
                                            <Field
                                            name="Table"
                                            valueField="id"
                                            textField='title'
                                            component={renderDropdownList}                                              
                                            data={this.props.tables}/>}
                                    {this.props.pageType !== 'alter' && this.props.pageType !== 'order' && <span>{this.state.tableId}</span>}
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
                            {this.props.pageType ==='cooker'&&<Col xs={2}><Button type="button" onClick={this.handleClick}>{_.get(rs, `widgetOrder.${this.props.pageType}.editOrder`)}</Button></Col>}
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
                            {this.props.pageType !== 'cooker' && <Button type="submit" disabled={pristine || submitting}>{_.get(rs, `widgetOrder.${this.props.pageType}.submit`)}</Button>}
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
    if (state.bookingReducer.pageType === 'cooker'){
        return{
            tables: state.bookingReducer.tables,
            foods: state.bookingReducer.foods,
            kinds: state.bookingReducer.kinds,
            suggestNote: state.bookingReducer.suggestNote,
            currentDetails: state.bookingReducer.currentDetails,
            Details: selector(state, `Details`),
            selectOrder: state.bookingReducer.selectOrder,
            pageType: state.bookingReducer.pageType
        }
    }
    else {
        if (!_.isNull(state.bookingReducer.selectOrder) && !_.isNull(state.bookingReducer.selectOrder.details)){
            return {
                tables: state.bookingReducer.tables,
                foods: state.bookingReducer.foods,
                kinds: state.bookingReducer.kinds,
                suggestNote: state.bookingReducer.suggestNote,
                currentDetails: state.form.orderForm.values.Details,
                selectOrder: state.bookingReducer.selectOrder,
                pageType: state.bookingReducer.pageType,
                initialValues: {
                    Details: state.bookingReducer.selectOrder.details
                }
            } 
        }
        else{
            return {
                tables: state.bookingReducer.tables,
                foods: state.bookingReducer.foods,
                kinds: state.bookingReducer.kinds,
                suggestNote: state.bookingReducer.suggestNote,
                currentDetails: state.bookingReducer.currentDetails,
                Details: selector(state, `Details`),
                selectOrder: state.bookingReducer.selectOrder,
                pageType: state.bookingReducer.pageType
            } 
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

  