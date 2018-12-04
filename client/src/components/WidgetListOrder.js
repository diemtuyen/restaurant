import React from 'react';
import { connect } from "react-redux";
import {compose} from 'redux';
import _ from 'lodash';
import {cookingActions} from '../actions/cooking.actions';
import {Nav, NavItem, NavLink} from 'reactstrap';
import commonWrapped from '../hocs/hocs.common';

class WidgetListOrder extends React.Component {
  constructor(props) {
    super(props);
  }
  render(){
    const lstOrders = this.props.items.map( (item, i) => {
        return ( 
          <NavItem key={i}>
            <NavLink href="#">
              {item.title}
            </NavLink>
          </NavItem> );
    });
    return(
        <Nav vertical>
          {lstOrders} 
        </Nav>  
      )
  }
}


export default WidgetListOrder;
