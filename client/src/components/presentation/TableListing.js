import React, { Component} from 'react';
import TableIndex from '../containers/TableIndex';
import { connect } from 'react-redux';

class TableListing extends Component {
    componentDidMount(){
        
    }
    render(){

        const tableIdx = this.props.allTable.map( (tableIdx, i) => {
            return ( <li key={i}><TableIndex data = {tableIdx} /></li> );
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

export default connect(mapStateToProps)(TableListing)