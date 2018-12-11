import React from 'react';
import _ from 'lodash';
import { connect } from "react-redux";
import {compose} from 'redux';
import { Row, Col } from 'reactstrap';
import commonWrapped from '../hocs/hocs.common';
import {cookingActions} from '../actions/cooking.actions';
import WidgetDetailOfOrder from '../components/WidgetDetailOfOrder';
import WidgetListOrder from '../components/WidgetListOrder'

class CookerPage extends React.Component {
    constructor(props) {
        super(props);
        
    }
    componentDidMount(){ 
      this.props.dispatch(cookingActions.getItems());      
      console.log(this.props.orders) ;     
    }
    render(){ 
        console.log(this.props.orders);
        return(
            <div>
                <Row>
                    <Col sm="8" md="9">
                        <h1>List of Order</h1>
                        <WidgetDetailOfOrder items={this.props.orders}/>
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
        orders: state.bookingReducer.orders
    }
  }
  
export default compose(
    connect(mapStateToProps),
    commonWrapped()
  )(CookerPage);