import React, { Component} from 'react';
import { submitFood } from '../../actions/tableActions';
import { connect } from 'react-redux';
import OrderFoodForm from "../OrderFoodForm";

class OrderFood extends Component {   
    constructor(){
        super();
        this.submitOrderFood = this.submitOrderFood.bind(this);
    } 
    submitOrderFood(values){
        console.log('value:::::::::: '+ values);
        this.props.dispatch(submitFood(this.props.tableItemID, {body: values})); 
    }
    render(){
        return (
            <div>
                <h3>Order Food</h3>
                <OrderFoodForm onSubmit={this.submitOrderFood}/> 
            </div>
        )
    }
}
export default connect()(OrderFood);
