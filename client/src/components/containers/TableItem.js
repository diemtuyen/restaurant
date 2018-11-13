import React, { Component} from 'react';
import TableDetail from '../presentation/TableDetail';
import FoodPanel from './FoodPanel';
import { connect } from 'react-redux'
import { fetchTableItem } from '../../actions/tableActions'

class TableItem extends Component {
    constructor(props){
        super(props);
    }
    // componentDidMount(){
    //     this.props.dispatch(fetchTableItem(this.props.match.params.id));
    // }
    componentWillMount(){
        this.props.dispatch(fetchTableItem(this.props.idx));
    }
    render(){
        
        return (
            <div className="detailTableItem">
                <ul>
                    { !this.props.tableItemLoading ? <div>
                        <TableDetail data={this.props.tableItem} /> 
                        <FoodPanel foods={this.props.tableItem.foods} options={this.props.tableItem.optionFoods}  id={this.props.tableItem._id} st={this.props.tableItem.statusTable} total={this.props.tableItem.totalPrice} />
                        </div> : <div>Loading</div>}
                </ul>
            </div>
        )
    }
}

const mapStateToProps = state => {
    return {
        tableItem: state.tableRedu.tableItem,
        foods: state.tableRedu.tableItem.foods,
        tableItemLoading: state.tableRedu.tableItemLoading
    }
}

export default connect(mapStateToProps)(TableItem)