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
        return(
            <div>
                <div className="title">
                    <h2>Order Food</h2>
                </div>
                <Row>
                    <Col sm="8" md="9">
                        <OrderForm/>                        
                    </Col>
                    <Col sm="4" md="3"><Widget /></Col>
                </Row>
            </div>
        )
    }
}


export default OrderPage;