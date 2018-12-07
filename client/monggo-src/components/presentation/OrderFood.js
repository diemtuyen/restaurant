import React, { Component} from 'react';
import { submitFood, updateStatusTable } from '../../actions/tableActions';
import { connect } from 'react-redux';
import OrderFoodForm from "../OrderFoodForm";

class OrderFood extends Component {   
    constructor(){
        super();
        this.submitOrderFood = this.submitOrderFood.bind(this);
    } 
    submitOrderFood(values){
        this.props.dispatch(submitFood(this.props.username, this.props.tableItemID, {body: values})); 
        if (this.props.status !== 'state_waiting')
            this.props.dispatch(updateStatusTable(this.props.tableItemID, {statusTable: 'state_waiting'}));
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
