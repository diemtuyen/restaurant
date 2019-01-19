import React from 'react';
import { connect } from "react-redux";
import WidgetOrder from '../components/WidgetOrder';
import WidgetListOrder from '../components/WidgetListOrder';
import {bookingActions} from '../actions/booking.actions';
import $ from 'jquery';
import _ from 'lodash';

class OrderPage extends React.Component {
    constructor(props) {
        super(props);   
        this.toggleList = this.toggleList.bind(this);    
        this.state = {
            isShown: false
        } 
    }    
    componentWillMount(){
        if (_.isNull(this.props.pageType))
            this.props.dispatch(bookingActions.setPageType('order'));        
    }
    toggleList(){
        this.setState({ isShown: !this.state.isShown });  

        if(this.state.isShown){
            $(".widget-main").css({"width": "calc(100% - 12px)"});
            $(".widget-lstOrder").css({"display": "none"});
            
        } else {
            $(".widget-main").css({"width": "calc(100% - 215px)"}); 
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
                    {this.state.isShown && <WidgetListOrder/>} 
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

export default connect(mapStateToProps)(OrderPage);