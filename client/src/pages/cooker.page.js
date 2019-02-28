import React from 'react';
import { connect } from "react-redux";
import WidgetOrder from '../components/WidgetOrder';
import WidgetListOrder from '../components/WidgetListOrder';
import WidgetListServed from '../components/WidgetListServed';
import {bookingActions} from '../actions/booking.actions';

class CookerPage extends React.Component {
    constructor(props) {
        super(props); 
    }
    componentWillMount(){
        this.props.dispatch(bookingActions.setPageType('cooker'));        
    }
    render(){ 
        return(
            <div>                
                <WidgetOrder/>
                <WidgetListOrder/>
                <WidgetListServed/>
            </div>
        )
    }
}
const mapStateToProps = state => {
    return {
        pageType: state.bookingReducer.pageType     
    }
  }

export default connect(mapStateToProps)(CookerPage);