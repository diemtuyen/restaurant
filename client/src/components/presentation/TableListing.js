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
        return (
            <div className={bg}>            
                <div className = "titleIndex">Ban so <b>{this.props.data.indexTable}</b></div>
                <br/>
                <div>
                    <Link to={`/table/${this.props.data._id}`}><Button>Order</Button></Link>{' '}
                    <Link to ="#">
                    {(`${this.props.data.statusTable}` !== `state_order`) && <Button>Bill</Button>}
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