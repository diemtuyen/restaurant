import React from 'react';
import {compose} from 'redux';
import { connect } from "react-redux";
import commonWrapped from '../hocs/hocs.common';
import $ from 'jquery';
import _ from 'lodash';
import { formValueSelector, Field, FieldArray, reduxForm, change, reset } from 'redux-form';
import { Row, Col, Button, FormGroup, Label } from 'reactstrap';
import renderDropdownList from '../controls/dropdown.control';
import renderFoods from '../controls/foods.control';
import renderDrink from '../controls/drink.control';
import renderOption from '../controls/option.control';
import 'react-widgets/dist/css/react-widgets.css';
import {bookingActions} from '../actions/booking.actions';
import { history } from '../helpers/history';

class WidgetOrder extends React.Component{
    constructor(props){
        super(props);
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
            this.props.dispatch(change(this.props.form, 'Drinks',  this.props.Drinks));
            this.props.dispatch(change(this.props.form, 'Options',  this.props.Options));
            this.props.dispatch(change(this.props.form, 'Table',  this.props.Table));
        }   
    }
    markDone() {
        this.props.dispatch(bookingActions.markDone(this.props.selectOrder));  
      }
    addDetail = () =>{
        let Details;
        Details = _.cloneDeep(this.props.tempDetails) || [];
        Details.push({openNote: false});
        this.props.dispatch(change(this.props.form, 'Details',  Details));
    }
    addDrink = () =>{
        let Drinks;
        Drinks = _.cloneDeep(this.props.tempDrinks) || [];
        Drinks.push({});
        this.props.dispatch(change(this.props.form, 'Drinks',  Drinks));
    }
    addOption = () =>{
        let Options;
        Options = _.cloneDeep(this.props.tempOptions) || [];
        Options.push({});
        this.props.dispatch(change(this.props.form, 'Options',  Options));
    }
    fnShowNoteSuggest = (item, idx) => {
        let id = `${item}.openNote`;
        id = $.escapeSelector(id);    
        $(`#${id}`).trigger("click");    
    }
    fnAddSuggestNote = (food, index, value)=>{
        let item = _.cloneDeep( _.get(this.props, food)) || {};
        item.selectedNote = value;
        this.props.dispatch(change(this.props.form, food, {...item}));
    }
    render(){
        const rs = _.get(window.restaurant,'resource');
        const {handleSubmit, pristine, submitting } = this.props;
        var totalPrice = 0;
        if (this.props.foods != undefined && this.props.drinks != undefined && this.props.kinds != undefined){
            this.props.tempDetails != undefined && _.forEach(this.props.tempDetails, (i) => {
                if (i.count !== undefined && i.foodId !== undefined && i.kindId !=undefined){
                    let ratio = parseFloat(_.find(this.props.kinds, (k) => { return k.id == (_.isObject(i.kindId) ? i.kindId.id : i.kindId);}).note);                    
                    let price = _.find(this.props.foods, (f) => { return f.id == (_.isObject(i.foodId) ? i.foodId.id : i.foodId);}).price;
                    totalPrice += i.count * ratio * price ;
                }  
            });
            this.props.tempDrinks != undefined && _.forEach(this.props.tempDrinks, (i) => {
                if (i.count !== undefined && i.drinkId !== undefined){
                    let price = _.find(this.props.drinks, (d) => { return d.id == (_.isObject(i.drinkId) ? i.drinkId.id : i.drinkId);}).price;
                    totalPrice += i.count * price;
                }
            });
            this.props.tempOptions != undefined && _.forEach(this.props.tempOptions, (i) => {
                if (i.foodId !== undefined && i.price !== undefined)
                    totalPrice += parseInt(i.price);
            });
        }
        return(
            <div className="content-page">
                <div>
                    <div className="title">
                        <h2>{_.get(rs, `widgetOrder.${this.props.pageType}.name`)}</h2>
                            {(this.props.pageType === 'order') && <label className='number_no'>{_.get(rs, `widgetOrder.${this.props.pageType}.title`)}</label>}
                            {(this.props.pageType !== 'order') && <span className='number_no'>{_.get(rs, `widgetOrder.${this.props.pageType}.title`)}{' '}
                                <b>{this.props.title}</b></span>}
                    </div>
                    <form className='form-order' onSubmit={handleSubmit}>
                        <Row className="form-header-row">
                            <Col xs={{size:4, offset:2}}>
                                <FormGroup row>
                                    <Label for="table">{_.get(rs, `widgetOrder.${this.props.pageType}.tableId`)}</Label>
                                    <Col sm={12} className="select-table">
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
                            {this.props.pageType !=='cooker' && <Col xs={2}>
                                <Button type="button" onClick={this.addDetail}>{_.get(rs, `widgetOrder.${this.props.pageType}.addFood`)}</Button></Col>}
                            {this.props.pageType !=='cooker' && <Col xs={2}>
                                <Button type="button" onClick={this.addDrink}>{_.get(rs, `widgetOrder.${this.props.pageType}.addDrink`)}</Button></Col>}
                            {this.props.pageType !=='cooker' && <Col xs={2}>
                                <Button type="button" onClick={this.addOption}>{_.get(rs, `widgetOrder.${this.props.pageType}.addOption`)}</Button></Col>}
                            {this.props.pageType ==='cooker'&& <Col xs={{ size: 2}}>
                                <Button type="button" onClick={this.handleEditOrder}>{_.get(rs, `widgetOrder.${this.props.pageType}.editOrder`)}</Button></Col>}
                        </Row>
                        <FieldArray name="Details" 
                            rs={rs}
                            pageType={this.props.pageType}
                            component={renderFoods} 
                            kinds={this.props.kinds} 
                            foods={this.props.foods} 
                            suggestNote={this.props.suggestNote}
                            fnShowNoteSuggest={this.fnShowNoteSuggest}
                            fnAddSuggestNote={this.fnAddSuggestNote}/>
                        <FieldArray name="Drinks" 
                            rs={rs}
                            pageType={this.props.pageType}
                            component={renderDrink} 
                            drinks={this.props.drinks}/>   
                        <FieldArray name="Options" 
                            rs={rs}
                            pageType={this.props.pageType}
                            component={renderOption} 
                            options={this.props.options}/> 
                        <div className="form-submit-row">
                            {totalPrice >0 && <span className='totalPrice'>Tong tien: {totalPrice}</span>}
                            {this.props.pageType === 'order' && <Button type="button" onClick={handleSubmit(values => this.props.onSubmit({...values, type: 'order'}))}disabled={pristine || submitting}>{_.get(rs, `widgetOrder.${this.props.pageType}.submit`)}</Button>}
                            {this.props.pageType === 'alter' && <Button type="button" onClick={handleSubmit(values => this.props.onSubmit({...values, type: 'alter'}))}disabled={pristine || submitting}>{_.get(rs, `widgetOrder.${this.props.pageType}.submit`)}</Button>}
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
            drinks: state.bookingReducer.drinks,
            kinds: state.bookingReducer.kinds,
            options: state.bookingReducer.utilities,
            suggestNote: state.bookingReducer.suggestNote,
            pageType: state.bookingReducer.pageType,
            title: state.bookingReducer.selectOrder.title,
            Table: state.bookingReducer.selectOrder.tableId,
            Details : _.filter(state.bookingReducer.selectOrder.details, detail => (detail.drinkId === null && detail.count > 0)),
            Options : _.filter(state.bookingReducer.selectOrder.details, detail => (detail.drinkId === null && detail.count === 0)),
            Drinks : _.filter(state.bookingReducer.selectOrder.details, { 'foodId': null }),
            tempDetails: selector(state, 'Details'),
            tempDrinks: selector(state, 'Drinks'),
            tempOptions: selector(state, 'Options'),
            initialValues: {
                Details : _.filter(state.bookingReducer.selectOrder.details, detail => (detail.drinkId === null && detail.count > 0)),
                Options : _.filter(state.bookingReducer.selectOrder.details, detail => (detail.drinkId === null && detail.count === 0)),
                Drinks : _.filter(state.bookingReducer.selectOrder.details, { 'foodId': null }),
                Table: state.bookingReducer.selectOrder.tableId,
            }                
        } 
    }
    else{
        return {
            tables: state.bookingReducer.tables,
            foods: state.bookingReducer.foods,
            drinks: state.bookingReducer.drinks,
            kinds: state.bookingReducer.kinds,
            options: state.bookingReducer.utilities,
            suggestNote: state.bookingReducer.suggestNote,
            pageType: state.bookingReducer.pageType,
            tempDetails: selector(state, 'Details'),
            tempDrinks: selector(state, 'Drinks'),
            tempOptions: selector(state, 'Options')
        } 
    }
}
const mapDispatchToProps = dispatch => ({
    onSubmit: values => {
        let title = Date.now().toString();
        const fields = {Title: title, Status: { Title: 'Order', id: '1' }};
        const jsonOrder = Object.assign({}, values, fields);
        _.forEach(jsonOrder.Details, (i) => {
            i.foodId = i.foodId.id;
            i.kindId = i.kindId.id;
            let txtNote = '';
            _.forEach(i.selectedNote, (j) => {
                txtNote += ` -- ` + j.title;           
            });
            if (i.note !== null && i.note !== undefined)
                txtNote += ` (` + i.note + `)`;
            i.note = txtNote;
            delete i.selectedNote;
            delete i.openNote;
        });

        let nDetails = jsonOrder.Details.length;
        _.forEach(jsonOrder.Drinks, (i) => {
            jsonOrder.Details.push({});
            jsonOrder.Details[nDetails].drinkId = i.drinkId.id;
            jsonOrder.Details[nDetails].count = i.count;
            nDetails ++;
        });
        delete jsonOrder.Drinks;

        _.forEach(jsonOrder.Options, (i) => {
            jsonOrder.Details.push({});
            jsonOrder.Details[nDetails].foodId = i.foodId.id;
            jsonOrder.Details[nDetails].price = i.price;
            jsonOrder.Details[nDetails].count = 0;
            nDetails ++;
        });
        delete jsonOrder.Options;

        if (values.type === 'alter')
            dispatch(bookingActions.updateOrder(jsonOrder));
        if (values.type === 'order')
            dispatch(bookingActions.addOrder(jsonOrder));
        dispatch(reset('orderForm'));
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

  