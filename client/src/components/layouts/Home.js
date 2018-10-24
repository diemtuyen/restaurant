import React, {Component} from 'react';
import TableListing from '../presentation/TableListing';
import AllTable from '../containers/AllTable';

class Home extends Component {
    render() {
        return (
            <div>
                <AllTable />
            </div>
        )
    }
}

export default Home;