import React, { Component} from 'react';
import FoodElement from '../presentation/FoodElement';
import OrderFood from '../presentation/OrderFood';
import { Button } from 'reactstrap';
import { updateStatusTable, resetTable } from '../../actions/tableActions';
import { submitReport } from '../../actions/reportActions';
import { withRouter } from "react-router-dom";
import { connect } from 'react-redux';
import NumberFormat from 'react-number-format';

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
        const dtOptions = this.props.options;
        const dtFoods = this.props.foods;
        const dtTotal = this.props.total;
        const doc = {dtOptions, dtFoods, dtTotal};
        if (this.props.st === 'state_serving')
        {
            this.props.dispatch(submitReport({data: doc}));
            this.props.dispatch(resetTable(this.props.id));
            this.props.history.push("/");
        }
        else
            this.props.dispatch(updateStatusTable(this.props.id, {statusTable: 'state_billing'}));
    }
    render(){
        const foodItem = this.props.foods.map( (food, i) => {
            return ( <li key={i}><FoodElement data = {food} tableId ={this.props.id} /></li> );
        });

        return (
            <div>
                {(`${this.props.st}` === `state_order` || `${this.props.st}` === `state_waiting`) &&                
                    <OrderFood tableItemID={this.props.id}/>  
                }              
                <div>
                    <h3 className="titleLst">List of Foods</h3>
                    {(this.props.foods.length <= 0) ? <div>No food</div> : 
                        <div>
                            <ul>{foodItem}</ul>
                                <div className="alignC">
                                    {/* <div className="price">
                                        Tong tien: 
                                        <NumberFormat value={this.props.total} displayType={'text'} thousandSeparator={true} prefix={' '} suffix={' (VND)'} />
                                    </div> */}
                                    {(`${this.props.st}` === `state_waiting`) &&
                                        <Button onClick={this.toggleServe}>Serve</Button>
                                    }{' '}
                                    {(`${this.props.st}` === `state_waiting` || `${this.props.st}` === `state_serving`) &&
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