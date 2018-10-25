import React, { Component} from 'react';
import { submitFood } from '../../actions/tableActions';
import { connect } from 'react-redux';
import WidgetForm from "../WidgetForm";
import { Values } from "redux-form-website-template";
import { formValues } from 'redux-form';

class OrderFood extends Component {   
    constructor(){
        super();
        this.state = {
            foodItem: ''
        };
        this.submitFood = this.submitFood.bind(this);
    }   
    updateOrder(event){        
        this.setState({
            foodItem: event.target.value 
        });
    } 
    submitFood(){
        this.props.dispatch(submitFood(this.props.tableItemID, {body: this.state.foodItem}));   
        this.setState({
            foodItem: ''
        });        
    }
    render(){
        return (
            <div>
                <h3>Order Food</h3>
                <textarea value={this.state.comment} onChange={this.updateOrder.bind(this)} id="testSubmitServer" type="text"></textarea>
                <WidgetForm onSubmit={this.submitFood}/>                
                <Values form="reactWidgets" />
            </div>
        )
    }
}
export default connect()(OrderFood);
