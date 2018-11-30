import React from 'react';
import _ from 'lodash';
import { Row, Col } from 'reactstrap';
import WidgetDetailOfOrder from '../components/WidgetDetailOfOrder';
import WidgetListOrder from '../components/WidgetListOrder'

class CookerPage extends React.Component {
    constructor(props, context) {
        super(props, context);
        
    }
    render(){ 
           
        return(
            <div>
                <Row>
                    <Col sm="8" md="9">
                        <h1>List of Order</h1>
                        <WidgetDetailOfOrder/>
                    </Col>
                    <Col sm="4" md="3">
                        <h1>List of Table</h1>
                        <WidgetListOrder />
                    </Col>
                </Row>
            </div>
        )
    }
}


export default CookerPage;