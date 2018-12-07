import React, { Component} from 'react';
import TableListing from '../presentation/TableListing';
import { connect } from 'react-redux';
import { fetchTable } from '../../actions/tableActions';
import { Col, Row } from 'reactstrap';
import TableItem from '../containers/TableItem';

class AllTable extends Component {
    constructor(props){
        super(props);
        this.state = {
            selectID: '-1'
        }
    }
    componentDidMount(){
        this.props.dispatch(fetchTable());
        this.selectTableItem = this.selectTableItem.bind(this);
    }
    selectTableItem(idx){
        this.setState({
            selectID: idx
        })
    }
    render(){

        const tableIdx = this.props.allTable.map( (tableIdx, i) => {
            return ( <TableListing data = {tableIdx} selectTableItem = {this.selectTableItem}/> );
        });

        return (
            <Row>
                <Col md={8} className="listTable">
                    <div>
                        {tableIdx}
                    </div>
                </Col>
                <Col md={4} className="detailTable">
                    {this.state.selectID}
                    { this.state.selectID == '-1' ? <div> Select any table to see detail </div> : 
                        <TableItem idx = {this.state.selectID} />}
                </Col>
            </Row>
            
        )
    }
}

const mapStateToProps = state => {
    return {
        allTable: state.tableRedu.tables
    }
}

export default connect(mapStateToProps)(AllTable)