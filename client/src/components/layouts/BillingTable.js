import React, { Component} from 'react';
import TableListing from '../presentation/TableListing';
import { connect } from 'react-redux';
import { fetchTable } from '../../actions/tableActions';

class BillingTable extends Component {
    componentDidMount(){
        this.props.dispatch(fetchTable());
    }
    render(){
        var orders = this.props.allTable.filter(t => t.statusTable ==='state_billing');
        const tableIdx = orders.map( (tableIdx, i) => {
            return ( <TableListing data = {tableIdx} /> );
        });

        return (
            <div>
                {tableIdx}
            </div>
        )
    }
}

const mapStateToProps = state => {
    return {
        allTable: state.tableRedu.tables
    }
}

export default connect(mapStateToProps)(BillingTable)