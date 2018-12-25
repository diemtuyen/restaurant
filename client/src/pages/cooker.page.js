import React from 'react';
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
export default CookerPage