import React from 'react';
import { Row, Col } from 'reactstrap';
import WidgetDetailOfOrder from '../components/WidgetDetailOfOrder';
import WidgetListOrder from '../components/WidgetListOrder';
import WidgetListServed from '../components/WidgetListServed';

class CookerPage extends React.Component {
    constructor(props) {
        super(props);        
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
                        <Row>
                            <h4>List of Orders</h4>
                            <WidgetListOrder/>
                        </Row>
                        <Row>
                            <h4>List of Server</h4>
                            <WidgetListServed/>
                        </Row>
                    </Col>
                </Row>
            </div>
        )
    }
}

export default CookerPage;