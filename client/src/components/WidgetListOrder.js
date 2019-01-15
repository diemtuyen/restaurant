import React from 'react';
import { connect } from "react-redux";
import {compose} from 'redux';
import {Link} from 'react-router-dom';
import commonWrapped from '../hocs/hocs.common';
import {bookingActions} from '../actions/booking.actions';

class WidgetListOrder extends React.Component {
  constructor(props) {
    super(props);
    this.handleClick = this.handleClick.bind(this);    
  }
  handleClick(item){
    this.props.dispatch(bookingActions.setSelectOrder(item));
    if (this.props.pageType === 'order')
      this.props.dispatch(bookingActions.setPageType('alter'));
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
          <div className="nav-link" onClick={() => this.handleClick(item)} key={i}>
            {this.props.pageType !== 'cooker' && <Link to ='/order'><i className="fa fa-star-o" aria-hidden="true"></i>{' '}{item.title} </Link>}
            {this.props.pageType === 'cooker' && <Link to ='/cooker'><i className="fa fa-star-o" aria-hidden="true"></i>{' '}{item.title} </Link>}
          </div>
        )});
    return( 
      <div className="sidebar">
        {lstOrders}  
      </div>
    )    
  }
}
const mapStateToProps = state => {
  return {
      orders: state.bookingReducer.orders,    
      pageType: state.bookingReducer.pageType     
  }
}
export default compose(
  connect(mapStateToProps),
  commonWrapped()
)(WidgetListOrder);

