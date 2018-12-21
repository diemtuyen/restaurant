import React from 'react';
import { connect } from "react-redux";
import {compose} from 'redux';
import {Link} from 'react-router-dom';
import {Nav, NavItem, NavLink} from 'reactstrap';
import commonWrapped from '../hocs/hocs.common';
import {bookingActions} from '../actions/booking.actions';

class WidgetListOrder extends React.Component {
  constructor(props) {
    super(props);
    this.selectOrderItem = this.selectOrderItem.bind(this);
    
  }
  selectOrderItem(id){
    this.props.dispatch(bookingActions.getOrder(id));
  }
  componentDidMount(){ 
      this.props.dispatch(bookingActions.getOrders());
  }
  render(){
    if (this.props.orders == undefined)
      return(
        <p> No items </p>
      )
    const lstOrders = this.props.orders.map( (item, i) => {
        return ( 
          // <NavItem key={i}>
          //   <NavLink href={`/cooker/${item.rowGuid}`}>
          //     <i className="fa fa-star-o" aria-hidden="true"></i>{' '}{item.title} 
          //   </NavLink>
          // </NavItem> );
          <div onClick={() => this.selectOrderItem(item.rowGuid)} key={i}>
            <Link to ='/cooker'><i className="fa fa-star-o" aria-hidden="true"></i>{' '}{item.title} </Link>
               
          </div> );
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

