import React, { Component} from 'react';
import { submitFood } from '../../actions/tableActions';
import { connect } from 'react-redux';
import WidgetForm from "../WidgetForm";
import { Values } from "redux-form-website-template";

class OrderFood extends Component {
    
    constructor(){
        super();

        this.state = {
            foodItem: ''
        };
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
                <WidgetForm onSubmit={this.submitFood} />
                <Values form="fieldArrays" />
            </div>
        )
    }
}


export default connect()(OrderFood);
