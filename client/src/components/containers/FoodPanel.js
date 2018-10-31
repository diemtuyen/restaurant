import React, { Component} from 'react';
import FoodElement from '../presentation/FoodElement';
import OrderFood from '../presentation/OrderFood';
import { Button } from 'reactstrap';
import { updateTable } from '../../actions/tableActions';
import { withRouter } from "react-router-dom";
import { connect } from 'react-redux';

class FoodPanel extends Component {

    constructor(props){
        super(props);
        this.toggleStatus= this.toggleStatus.bind(this);
    }
    toggleStatus(){
        debugger;
        this.props.dispatch(updateTable(this.props.id, {statusTable: 'state_waiting'}));
        this.props.history.push("/");
    }
    render(){
        const foodItem = this.props.foods.map( (food, i) => {
            return ( <li key={i}><FoodElement data = {food} /></li> );
        });

        return (
            <div>                
                <OrderFood tableItemID={this.props.id}/>
                <h3>List of Foods</h3>
                {(this.props.foods.length <= 0) ? <div>No food</div> : 
                    <div>
                        <ul>{foodItem}</ul>
                        <div className="alignC">
                            <Button onClick={this.toggleStatus}>Done</Button>
                        </div>
                    </div>
                }
            </div>
        )
    }
}

export default withRouter(connect()(FoodPanel))