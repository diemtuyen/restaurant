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
        this.props.dispatch(submitFood(this.props.username, this.props.tableItemID, {stTable:'state_waiting', body: values})); 
    }
    render(){
        return (
            <div>
                <OrderFoodForm onSubmit={this.submitOrderFood}/> 
            </div>
        )
    }
}
const mapStateToProps = state => {
    return {
        username: state.authRedu.username        
    }
}
export default connect(mapStateToProps)(OrderFood);
