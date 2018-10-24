import React, { Component } from 'react';
import { Link } from 'react-router-dom';
 
class Layout extends Component {
    render() {
    return (
        <div>
            <div>
                <h1>Welcome to Tien Hai</h1>
            </div>
            <div>
                {/* <ul>
                    <li><Link to={'/'}>All</Link></li>
                    <li><Link to={'/waiting'}>Waiting</Link></li>
                    <li><Link to={'/billing'}>Billing</Link></li>
                </ul> */}
                { this.props.children }
            </div>
        </div>
        );
    }
}

export default Layout;