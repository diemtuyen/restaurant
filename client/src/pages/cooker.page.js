import React from 'react';
import _ from 'lodash';
import { Row, Col } from 'reactstrap';
import OrderArraysForm from '../components/OrderArraysForm';
import {bookingActions} from '../actions/booking.actions';
import { connect } from "react-redux";

class CookerPage extends React.Component {
    constructor(props, context) {
        super(props, context);
        
    }
    componentDidMount(){ 
        this.props.dispatch(bookingActions.getItems());        
    }
    render(){
        const rs = _.get(window.restaurant,'resource');
        console.log(this.props.tables);
        console.log(this.props.categories);
        return(
            <div>
                <Row>
                    <Col sm="8" md="9"><OrderArraysForm tableItems = {this.props.tables} categoryItems = {this.props.categories}/></Col>
                    <Col sm="4" md="3">table watting</Col>
                </Row>
            </div>
        )
    }
}
const mapStateToProps = state => {
    return {
        tables: state.bookingReducer.tables,
        categories: state.bookingReducer.categories
    }
}

export default connect(mapStateToProps)(CookerPage);