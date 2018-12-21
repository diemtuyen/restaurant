import React from 'react';
// import { Row, Col } from 'reactstrap';
// import { connect } from "react-redux";
// import {compose} from 'redux';
// import commonWrapped from '../hocs/hocs.common';
// import {bookingActions} from '../actions/booking.actions';
import WidgetDetailOfOrder from '../components/WidgetDetailOfOrder';
import WidgetListOrder from '../components/WidgetListOrder';
import $ from 'jquery';
import WidgetListServed from '../components/WidgetListServed';

class CookerPage extends React.Component {
    constructor(props) {
        super(props); 
        this.toggleList = this.toggleList.bind(this);    
        this.state = {
            isShown: false
        }        
    }
    // componentDidMount(){
    //     debugger
    //     if(this.props.match.params.id != undefined)
    //         this.props.dispatch(bookingActions.getOrder(null, this.props.match.params.id));
    // }
    toggleList(){
        this.setState({ isShown: !this.state.isShown });  

        if(this.state.isShown){
            $(".widget-main").css({"width": "calc(100% - 12px)"});
            $(".widget-lstOrder").css({"display": "none"});
            
        } else {
            $(".widget-main").css({"width": "calc(100% - 200px)"}); 
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
                    <WidgetDetailOfOrder />                  
                </div>
                <div className="widget-lstOrder">  
                    {this.state.isShown ? [<WidgetListOrder/>, <WidgetListServed/>] : ''}   
                </div>
            </div>
        )
    }
}

// export default compose(
//     connect(mapStateToProps),
//     commonWrapped()
// )(CookerPage)

export default CookerPage