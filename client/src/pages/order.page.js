import React from 'react';
import { connect } from "react-redux";
import WidgetOrder from '../components/WidgetOrder';
import WidgetListOrder from '../components/WidgetListOrder';
import {bookingActions} from '../actions/booking.actions';
import _ from 'lodash';

class OrderPage extends React.Component {
    constructor(props) {
        super(props);
    }    
    componentWillMount(){
        if (_.isNull(this.props.pageType))
            this.props.dispatch(bookingActions.setPageType('order'));        
    }
    render(){
        return(
            <div> 
                <WidgetOrder/>
                <WidgetListOrder/>
            </div>
        )
    }
}

const mapStateToProps = state => {
    return {
        pageType: state.bookingReducer.pageType     
    }
  }

export default connect(mapStateToProps)(OrderPage);