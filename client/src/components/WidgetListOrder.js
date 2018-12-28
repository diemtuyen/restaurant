import React from 'react';
import { connect } from "react-redux";
import {compose} from 'redux';
import {Link} from 'react-router-dom';
import {Nav, NavItem, NavLink} from 'reactstrap';
import commonWrapped from '../hocs/hocs.common';
import _ from 'lodash';
import {bookingActions} from '../actions/booking.actions';

class WidgetListOrder extends React.Component {
  constructor(props) {
    super(props);
    this.handleClick = this.handleClick.bind(this);    
  }
  handleClick(item){
    this.props.dispatch(bookingActions.setSelectOrder(item));
    if (this.props.pageType === 'order')
      this.props.handlePageType('alter');
  }
  componentDidMount(){ 
    this.props.dispatch(bookingActions.getOrders());
  }
  componentWillReceiveProps(nextProps){ 
    // if(nextProps.orders.length >0){
    //   let firstItem = _.first(nextProps.orders)
    //   this.props.dispatch(bookingActions.setSelectOrder(firstItem.rowGuid));
    // }    
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
      orders: state.bookingReducer.orders     
  }
}
export default compose(
  connect(mapStateToProps),
  commonWrapped()
)(WidgetListOrder);

