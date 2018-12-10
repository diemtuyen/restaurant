import React from 'react';
import _ from 'lodash';
import { Row, Col } from 'reactstrap';
import OrderForm from '../components/OrderForm';
import Widget from '../components/Widget';

class OrderPage extends React.Component {
    constructor(props) {
        super(props);
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
                            <OrderForm/>
                        </div>                     
                    </Col>
                    <Col sm="4" md="3"><Widget /></Col>
                </Row>
            </div>
        )
    }
}


export default OrderPage;