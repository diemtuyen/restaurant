import React from 'react';
import _ from 'lodash';
import { Row, Col } from 'reactstrap';
import OrderForm from '../components/OrderForm';
import panelComponent from '../components/Panel';
import Widget from '../components/Widget';

class OrderPage extends React.Component {
    constructor(props) {
        super(props);
    }
    render(){        
        const panelOrder = panelComponent(Widget);
        return(
            <div>
                <Row className="title">                    
                    <Col>
                        <h2>Order Food</h2>
                    </Col>
                </Row>
                <Row>
                    <Col sm="8" md="9">
                        <OrderForm/>                        
                    </Col>
                    <Col sm="4" md="3">{panelOrder}</Col>
                </Row>
            </div>
        )
    }
}


export default OrderPage;