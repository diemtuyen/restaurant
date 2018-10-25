import React, { Component} from 'react';
import PropTypes from 'prop-types';

class TableDetail extends Component {

    render(){
        return (
            <div>
                <h2>Detail for table #{this.props.data.indexTable}</h2>
            </div>
        )
    }
}

TableDetail.propTypes = {

    data: PropTypes.shape({
        _id: PropTypes.string.isRequired,
        indexTable: PropTypes.string.isRequired
    })
};

export default TableDetail