import React from 'react';
import { connect } from "react-redux";
import {compose} from 'redux';
import _ from 'lodash';
import {cookingActions} from '../actions/cooking.actions';
import {Nav, NavItem, NavLink} from 'reactstrap';
import commonWrapped from '../hocs/hocs.common';
import WidgetOrderItem from '../components/WidgetOrderItem';
import {bookingActions} from '../actions/booking.actions';

class WidgetListOrder extends React.Component {
  constructor(props) {
    super(props);
  }
  // componentDidMount(){ 
  //   this.props.dispatch(bookingActions.getItems());      
  //   console.log(this.props.orders) ;  
  //   debugger   
  // }
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
      // <WidgetOrderItem/>
    )
    
  }
}
// const mapStateToProps = state => {
//   return {
//       orders: state.bookingReducer.orders
//   }
// }
export default compose(
  connect(),
  commonWrapped()
)(WidgetListOrder);

