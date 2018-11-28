import React from 'react';
import _ from 'lodash';
import { Row, Col } from 'reactstrap';
import OrderForm from '../components/OrderForm';

class CookerPage extends React.Component {
    constructor(props, context) {
        super(props, context);
    }
    render(){        
        return(
            <div>
                <Row>
                    {/* <Col sm="8" md="9"><OrderForm onSubmit={this.submitOrderFood} tableItems = {this.props.tables} categoryItems = {this.props.categories} kindItems = {this.props.kinds} exceptItems = {this.props.excepts} utilityItems = {this.props.utilities}/></Col> */}
                    <Col sm="8" md="9"><OrderForm /></Col>
                    <Col sm="4" md="3">table watting</Col>
                </Row>
            </div>
        )
    }
}


export default CookerPage;