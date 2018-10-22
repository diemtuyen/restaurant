import React, {Component} from 'react';
import { Button } from 'reactstrap';
import PropTypes from 'prop-types';

class TableIndex extends Component{
     render(){
         return(
            <div style={{ backgroundColor: `{this.props.data.statusTable}` }}>
                <div>Ban so <b>{this.props.data._id}</b></div>
                <div>
                    <Button>Dat mon</Button>
                    <Button>Thanh toan</Button>
                </div> 
            </div> 
         )
     }
}
TableIndex.propTypes = {

    data: PropTypes.shape({
        _id: PropTypes.string.isRequired,
        statusTable: PropTypes.string.isRequired
    })
};
export default TableIndex