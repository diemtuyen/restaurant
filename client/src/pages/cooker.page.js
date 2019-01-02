import React from 'react';
import $ from 'jquery';
import WidgetOrder from '../components/WidgetOrder';
import WidgetListOrder from '../components/WidgetListOrder';
import WidgetListServed from '../components/WidgetListServed';

class CookerPage extends React.Component {
    constructor(props) {
        super(props); 
        this.toggleList = this.toggleList.bind(this);    
        this.state = {
            isShown: false,
            pageType: 'cooker'
        }        
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
                    <WidgetOrder pageType= {this.state.pageType}/>
                </div>
                <div className="widget-lstOrder">  
                    <WidgetListOrder pageType= {this.state.pageType}/>
                    <WidgetListServed/>
                </div>
            </div>
        )
    }
}
export default CookerPage