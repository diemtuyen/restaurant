import React from 'react';
import _ from 'lodash';
import { Row, Col } from 'reactstrap';

class CookerPage extends React.Component {
    constructor(props, context) {
        super(props, context);        
    }
    render(){
        const rs = _.get(window.restaurant,'resuource');
        return(
            <div>
                <Row>
                    <Col sm="8" md='10'>dashboard</Col>
                    <Col sm='4' md='2'>table watting</Col>
                </Row>
            </div>
        )
    }
}

export default CookerPage;