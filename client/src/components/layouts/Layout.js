import React, { Component } from 'react';
import { Link } from 'react-router-dom';
 
class Layout extends Component {
    render() {
    return (
        <div>
            <div>
                <h1>MadOwlNews.com - Breaking news about Mad Owls</h1>
            </div>
            <div>
                <ul>
                    {/* <li><Link to={'/'}>Home</Link></li>
                    <li><Link to={'/about'}>About</Link></li>
                    <li><Link to={'/log'}>Log</Link></li>
                    <li><Link to={'/submit'}>Add news</Link></li> */}
                    <li><Link to={'/'}>All</Link></li>
                    <li><Link to={'/waiting'}>Waiting</Link></li>
                    <li><Link to={'/billing'}>Billing</Link></li>

                </ul>
                { this.props.children }
            </div>
        </div>
        );
    }
}

export default Layout;