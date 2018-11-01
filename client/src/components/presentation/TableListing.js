import React, {Component} from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import {Button} from 'reactstrap';
class TableListing extends Component {
    render() {        
        let bg = 'tableIdx'; 
        if(`${this.props.data.statusTable}` === `state_waiting`)
            bg = 'tableIdx wait';
        else if(`${this.props.data.statusTable}` === `state_billing`)
            bg = 'tableIdx bill';
        else if(`${this.props.data.statusTable}` === `state_order`)
            bg = 'tableIdx order';
        else if(`${this.props.data.statusTable}` === `state_serving`)
            bg = 'tableIdx serve';        
        return (
            <div className={bg}>            
                <div className = "titleIndex">Ban so <b>{this.props.data.indexTable}</b></div>
                <br/>
                <div>
                    <Link to={`/table/${this.props.data._id}`}>
                        {(`${this.props.data.statusTable}` == `state_order`|| `${this.props.data.statusTable}` == `state_waiting`) && <Button>Order</Button>}
                    </Link>{' '}
                    <Link to ={`/table/${this.props.data._id}`}>
                        {(`${this.props.data.statusTable}` == `state_waiting`) && <Button>Serve</Button>}
                    </Link>{' '}
                    <Link to ={`/table/${this.props.data._id}`}>
                        {(`${this.props.data.statusTable}` == `state_serving`) && <Button>Bill</Button>}
                    </Link>
                    <Link to ={`/table/${this.props.data._id}`}>{' '}
                        {(`${this.props.data.statusTable}` == `state_billing`) && <Button>Bill</Button>}
                    </Link>
                </div> 
            </div> 
        )
    }
}

TableListing.propTypes = {
    data: PropTypes.shape({
        _id: PropTypes.string.isRequired,
        indexTable: PropTypes.string.isRequired,
        statusTable: PropTypes.string.isRequired
})

};
export default TableListing