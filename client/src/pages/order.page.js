import React from 'react';
import _ from 'lodash';
import { Row, Col } from 'reactstrap';
import OrderForm from '../components/OrderForm';
import WidgetListOrder from '../components/WidgetListOrder';
import {bookingActions} from '../actions/booking.actions';

class OrderPage extends React.Component {
    constructor(props) {
        super(props);        
    }
    render(){
        const rs = _.get(window.restaurant,'resource'); 
        return(
            <div className="order-food-form">
                <Row>
                    <Col sm="8" md="9">
                        <div className='order-food'>
                            <div className="title">
                                <h2>{_.get(rs, 'bookForm.title')}</h2>
                                <label className='number_no'>{`${_.get(rs,'bookForm.no')}: 20180712/............`}</label>
                            </div>
                            <OrderForm/>
                        </div>                     
                    </Col>
                    <Col sm="4" md="3">
                        <h1>List of Orders</h1>
                        <WidgetListOrder/>
                    </Col>
                </Row>
            </div>
        )
    }
}
export default OrderPage