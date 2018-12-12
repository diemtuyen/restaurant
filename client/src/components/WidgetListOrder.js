import React from 'react';
import { connect } from "react-redux";
import {compose} from 'redux';
import _ from 'lodash';
import {Nav, NavItem, NavLink} from 'reactstrap';
import commonWrapped from '../hocs/hocs.common';
import {bookingActions} from '../actions/booking.actions';

class WidgetListOrder extends React.Component {
  constructor(props) {
    super(props);
  }
  componentDidMount(){ 
      this.props.dispatch(bookingActions.getOrders());      
      console.log(this.props.orders);
  }
  render(){
    if (this.props.orders == undefined)
      return(
        <p> No items </p>
      )
    const lstOrders = this.props.orders.map( (item, i) => {
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
const mapStateToProps = state => {
  return {
      orders: state.bookingReducer.orders
  }
}
export default compose(
  connect(mapStateToProps),
  commonWrapped()
)(WidgetListOrder);

