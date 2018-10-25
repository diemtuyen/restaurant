import React, { Component} from 'react';
import FoodElement from '../presentation/FoodElement';
import OrderFood from '../presentation/OrderFood';

class FoodPanel extends Component {

    render(){
        const foodItem = this.props.foods.map( (food, i) => {
            return ( <li key={i}><FoodElement data = {food} /></li> );
        });

        return (
            <div>
                <h3>List of Foods</h3>
                <ul>
                    {(this.props.foods.length > 0) ? <ul>{foodItem}</ul> : <div>No food</div>}
                </ul>
                <OrderFood tableItemID={this.props.id}/>
            </div>
        )
    }
}

export default FoodPanel