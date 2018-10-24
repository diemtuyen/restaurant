import React, { Component} from 'react';
import TableListing from '../presentation/TableListing';
import { connect } from 'react-redux';
import { fetchTable } from '../../actions/tableActions';

class AllTable extends Component {
    componentDidMount(){
        this.props.dispatch(fetchTable());
    }
    render(){

        const tableIdx = this.props.allTable.map( (tableIdx, i) => {
            return ( <li key={i}><TableListing data = {tableIdx} /></li> );
        });

        return (
            <div>
                <h2>All tables</h2>
                <ul>
                    {tableIdx}
                </ul>
            </div>
        )
    }
}

const mapStateToProps = state => {
    return {
        allTable: state.tableRedu.tables
    }
}

export default connect(mapStateToProps)(AllTable)