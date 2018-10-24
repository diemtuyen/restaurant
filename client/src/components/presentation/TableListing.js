import React, {Component} from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import {Button} from 'reactstrap';

class TableListing extends Component {
    render() {
        return (
            <div style={{ backgroundColor: `{this.props.data.statusTable}` }}>
                <div><Link to={`/table/${this.props.data._id}`}>Ban so <b>{this.props.data.indexTable}</b></Link></div>
                    <div>
                        <Button>Dat mon</Button>
                        <Button>Thanh toan</Button>
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