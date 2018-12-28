import React from 'react';
import _ from 'lodash';
import WidgetOrder from '../components/WidgetOrder';
import WidgetListOrder from '../components/WidgetListOrder';
import $ from 'jquery';

class OrderPage extends React.Component {
    constructor(props) {
        super(props);   
        this.toggleList = this.toggleList.bind(this);    
        this.handlePageType = this.handlePageType.bind(this);    
        this.state = {
            isShown: false,
            pageType: 'order'
        } 
    }
    handlePageType(type){
        this.setState({
            pageType: type
        });
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
            <div>                
                <div className="angle-double" onClick={this.toggleList}>
                    <span>
                        <i className="fa fa-navicon" aria-hidden="true" />
                    </span>                    
                </div>
                <div className="widget-main">
                    <WidgetOrder pageType= {this.state.pageType}/>
                </div>
                <div className="widget-lstOrder">  
                    {this.state.isShown ? <WidgetListOrder pageType= {this.state.pageType} handlePageType={this.handlePageType}/> : ''} 
                </div>
            </div>
        )
    }
}
export default OrderPage