import React from 'react';
import _ from 'lodash';
import { Row, Col } from 'reactstrap';
import OrderArraysForm from '../components/OrderArraysForm';
import {tableActions} from '../actions/table.actions'

class CookerPage extends React.Component {
    constructor(props, context) {
        super(props, context);
        console.log('aaaaaaaaaaaa');  
        const lstTable = tableActions.getListTable();
        console.log(lstTable);     
    }
    render(){
        const rs = _.get(window.restaurant,'resource');
        return(
            <div>
                <Row>
                    <Col sm="8" md="9"><OrderArraysForm /></Col>
                    <Col sm="4" md="3">table watting</Col>
                </Row>
            </div>
        )
    }
}

export default CookerPage;