import React, {Component} from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import {Button} from 'reactstrap';
import { constants } from 'os';
//import { StyleSheet, css } from 'aphrodite';
class TableListing extends Component {
    render() {
        /*const styles = StyleSheet.create({ 
            foo: { 
                backgroundColor: `"#FF0000"`,
                width: '200px',
                border: `1px solid gray`,
                textAlign: `center`,
                padding: `10px`,
                margin: `20px`,
                marginRight: `10px`,
                float: `left`
            },
          });*/
        let bg = 'tableIdx'; 
        if(`${this.props.data.statusTable}` === `state_waiting`)
            bg = 'tableIdx wait';
        else if(`${this.props.data.statusTable}` === `state_billing`)
            bg = 'tableIdx bill';
        else if(`${this.props.data.statusTable}` === `state_order`)
            bg = 'tableIdx order';
        console.log (bg);
        debugger;
        return (
            
            
            <div className={bg}>            
                {this.props.data.statusTable}
                <div><Link to={`/table/${this.props.data._id}`}>Ban so <b>{this.props.data.indexTable}</b></Link></div>
                <br/>
                <div>
                    <Button>Order</Button>{' '}
                    <Button>Bill</Button>
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