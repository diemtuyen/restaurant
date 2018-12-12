import React from 'react';
import { connect } from "react-redux";
import {compose} from 'redux';
import _ from 'lodash';
import {Nav, NavItem, NavLink} from 'reactstrap';
import commonWrapped from '../hocs/hocs.common';
import {bookingActions} from '../actions/booking.actions';

class WidgetListServed extends React.Component {
  constructor(props) {
    super(props);
  }
  componentDidMount(){ 
      this.props.dispatch(bookingActions.getServed());      
      console.log(this.props.served);
  }
  render(){
    if (this.props.served == undefined)
      return(
        <p> No items </p>
      )
    const lstOrders = this.props.served.map( (item, i) => {
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
    served: state.bookingReducer.served
  }
}
export default compose(
  connect(mapStateToProps),
  commonWrapped()
)(WidgetListServed);

