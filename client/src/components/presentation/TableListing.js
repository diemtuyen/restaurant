import React, {Component} from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import {Button} from 'reactstrap';
class TableListing extends Component {
    render() {        
        let st = 'tableIdx'; 
        if(`${this.props.data.statusTable}` === `state_waiting`)
            st = 'tableIdx wait';
        else if(`${this.props.data.statusTable}` === `state_billing`)
            st = 'tableIdx bill';
        else if(`${this.props.data.statusTable}` === `state_order`)
            st = 'tableIdx order';
        else if(`${this.props.data.statusTable}` === `state_serving`)
            st = 'tableIdx serve';        
        return (
            <div className={st}>            
                <div>Ban so <b>{this.props.data.indexTable}</b></div>
                <br/>
                <div>
                    <Link to={`/table/${this.props.data._id}`}>
                        <Button></Button>
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