import React from 'react';
import _ from 'lodash';
import { Row, Col } from 'reactstrap';
import OrderForm from '../components/OrderForm';
import Widget from '../components/Widget';
import WidgetListOrder from '../components/WidgetListOrder';
import { connect } from "react-redux";
import {compose} from 'redux';
import commonWrapped from '../hocs/hocs.common';
import {bookingActions} from '../actions/booking.actions';
import {cookingActions} from '../actions/cooking.actions';


class OrderPage extends React.Component {
    constructor(props) {
        super(props);
        
    }
    componentDidMount(){ 
        this.props.dispatch(bookingActions.getCategories()); 
        //this.props.dispatch(cookingActions.getItems());
        this.props.dispatch(bookingActions.getOrders());
        console.log(this.props)
    }
    render(){
        const rs = _.get(window.restaurant,'resource'); 
        return(
            <div class="order-food-form">
                <Row>
                    <Col sm="8" md="9">
                        <div className='order-food'>
                            <div className="title">
                                <h2>{_.get(rs, 'bookForm.title')}</h2>
                                <label class='number_no'>{`${_.get(rs,'bookForm.no')}: 20180712/............`}</label>
                            </div>
                            <OrderForm tables={this.props.tables} categories={this.props.categories} kinds={this.props.kinds} excepts={this.props.utilities} excepts={this.props.utilities}/>
                        </div>                     
                    </Col>
                    <Col sm="4" md="3">
                        <h1>List of Orders</h1>
                        <WidgetListOrder items={this.props.orders}/>
                    </Col>
                </Row>
            </div>
        )
    }
}
const mapStateToProps = state => {
    return {
        orders: state.bookingReducer.orders,
        tables: state.bookingReducer.tables,
        categories: state.bookingReducer.categories,
        kinds: state.bookingReducer.kinds,
        excepts: state.bookingReducer.excepts,
        utilities: state.bookingReducer.utilities,
    }
  }
export default compose(
    connect(mapStateToProps),
    commonWrapped()
    )(OrderPage);