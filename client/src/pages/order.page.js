import React from 'react';
import _ from 'lodash';
import { Row, Col } from 'reactstrap';
import OrderForm from '../components/OrderForm';
import WidgetListOrder from '../components/WidgetListOrder';
import {bookingActions} from '../actions/booking.actions';
import { red100 } from 'material-ui/styles/colors';
import $ from 'jquery';


class OrderPage extends React.Component {
    constructor(props) {
        super(props);   
        this.toggleList = this.toggleList.bind(this);    
        this.state = {
            isShown: false
        } 
    }
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
        const rs = _.get(window.restaurant,'resource'); 
        return(
            <div className="order-food-form">
                {/* <Row>
                    <Col sm="8" md="9">
                        <div className='order-food'>
                            <div className="title">
                                <h2>{_.get(rs, 'bookForm.title')}</h2>
                                <label className='number_no'>{`${_.get(rs,'bookForm.no')}: 20180712/............`}</label>
                            </div>
                            <OrderForm/>
                        </div>                     
                    </Col>
                    <Col sm="4" md="3" className="widget-lstOrder">                      
                        <WidgetListOrder/>
                    </Col>
                </Row> */}
                <div className="angle-double" onClick={this.toggleList}>
                    <span>
                        <i className="fa fa-navicon" aria-hidden="true" />
                    </span>                    
                </div>
                <div className="widget-main">
                    <div className='order-food'>
                        <div className="title">
                            <h2>{_.get(rs, 'bookForm.title')}</h2>
                            <label className='number_no'>{`${_.get(rs,'bookForm.no')}: 20180712/............`}</label>
                        </div>
                        <OrderForm/>
                    </div>                     
                </div>
                <div className="widget-lstOrder">  
                    {this.state.isShown ? <WidgetListOrder/> : ''}   
                </div>
            </div>
        )
    }
}
export default OrderPage