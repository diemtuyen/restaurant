import React, { Component} from 'react';
import FoodElement from '../presentation/FoodElement';
import OrderFood from '../presentation/OrderFood';
import { Button } from 'reactstrap';
import { updateStatusTable } from '../../actions/tableActions';
import { withRouter } from "react-router-dom";
import { connect } from 'react-redux';

class FoodPanel extends Component {

    constructor(props){
        super(props);
        this.toggleServe= this.toggleServe.bind(this);
        this.toggleBill= this.toggleBill.bind(this);
    }
    toggleServe(){
        this.props.dispatch(updateStatusTable(this.props.id, {statusTable: 'state_serving'}));
        this.props.history.push("/");
    }
    toggleBill(){
        this.props.dispatch(updateStatusTable(this.props.id, {statusTable: 'state_billing'}));
        this.props.history.push("/");
    }
    render(){
        const foodItem = this.props.foods.map( (food, i) => {
            return ( <li key={i}><FoodElement data = {food} /></li> );
        });

        return (
            <div>
                {(`${this.props.st}` == `state_order` || `${this.props.st}` == `state_waiting`) &&                
                    <OrderFood tableItemID={this.props.id}/>  
                }              
                <div>
                    <h3>List of Foods</h3>
                    {(this.props.foods.length <= 0) ? <div>No food</div> : 
                        <div>
                            <ul>{foodItem}</ul>
                                <div className="alignC">
                                    {(`${this.props.st}` == `state_waiting`) &&
                                        <Button onClick={this.toggleServe}>Serve</Button>
                                    }{' '}
                                    {(`${this.props.st}` == `state_waiting` || `${this.props.st}` == `state_serving`) &&
                                        <Button onClick={this.toggleBill}>Bill</Button>
                                    }
                                </div>                  
                        </div>
                    }
                </div>
            </div>
        )
    }
}

export default withRouter(connect()(FoodPanel))