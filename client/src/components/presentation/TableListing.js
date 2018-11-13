import React, {Component} from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import {Button} from 'reactstrap';
import NumberFormat from 'react-number-format';
import TableItem from '../containers/TableItem';

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
                    <div className="price">
                        {(`${this.props.data.statusTable}` !== `state_order`) &&  
                            <NumberFormat value={this.props.data.totalPrice} displayType={'text'} thousandSeparator={true} prefix={' '}/>
                        } 
                    </div>
                <div className="btnTable">
                    <Button onClick={()=>{this.props.selectTableItem(this.props.data._id)}}></Button>                     
                </div> 
            </div> 
        )
    }
}

TableListing.propTypes = {
    data: PropTypes.shape({
        _id: PropTypes.string.isRequired,
        totalPrice: PropTypes.number.isRequired,
        indexTable: PropTypes.string.isRequired,
        statusTable: PropTypes.string.isRequired
})

};
export default TableListing