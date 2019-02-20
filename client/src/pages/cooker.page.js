import React from 'react';
import $ from 'jquery';
import { connect } from "react-redux";
import WidgetOrder from '../components/WidgetOrder';
import WidgetListOrder from '../components/WidgetListOrder';
import WidgetListServed from '../components/WidgetListServed';
import {bookingActions} from '../actions/booking.actions';

class CookerPage extends React.Component {
    constructor(props) {
        super(props); 
        this.toggleList = this.toggleList.bind(this);    
        this.state = {
            isShown: false
        }        
    }
    componentWillMount(){
        this.props.dispatch(bookingActions.setPageType('cooker'));        
    }
    toggleList(){
        this.setState({ isShown: !this.state.isShown });  

        if(this.state.isShown){
            $(".widget-main").css({"width": "calc(100% - 12px)"});
            $(".widget-lstOrder").css({"display": "none"});
            
        } else {
            $(".widget-main").css({"width": "calc(100% - 200px - 12px)"}); 
            $(".widget-lstOrder").css({"display": "inline-block"});       
        }        
    }
    render(){ 
        return(
            <div>                
                <div className="angle-double" onClick={this.toggleList}>
                    <span>
                        <i className="fa fa-navicon" aria-hidden="true" />
                    </span>                    
                </div>
                <div className="widget-main">
                    <WidgetOrder/>
                </div>
                <div className="widget-lstOrder">  
                    <WidgetListOrder/>
                    <WidgetListServed/>
                </div>
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