import React, {Component} from 'react';
import TableListing from '../presentation/TableListing';
import OrderFood from '../presentation/OrderFood'

class Home extends Component {
    render() {
        return (
            <div>
                <div> 
                    <TableListing />
                    <OrderFood />
                </div> 
            </div>
        )
    }
}

export default Home;