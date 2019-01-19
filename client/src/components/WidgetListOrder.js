import React from 'react';
import { connect } from "react-redux";
import {compose} from 'redux';
import {Link} from 'react-router-dom';
import commonWrapped from '../hocs/hocs.common';
import _ from 'lodash';
import {bookingActions} from '../actions/booking.actions';

class WidgetListOrder extends React.Component {
  constructor(props) {
    super(props);
    this.handleClick = this.handleClick.bind(this);    
  }
  handleClick(item){
    if (this.props.pageType === 'order')
      this.props.dispatch(bookingActions.setPageType('alter'));
    if( _.isNull(this.props.selectOrder) || (!_.isNull(this.props.selectOrder) && item.id != this.props.selectOrder.id)){
      this.props.dispatch(bookingActions.setSelectOrder(item));
    }
  }
  componentDidMount(){ 
    this.props.dispatch(bookingActions.getOrders());
  }
  componentWillReceiveProps(nextProps){
    if(this.props.pageType === 'cooker' && this.props.orders.length == 0 && nextProps.orders.length > 0)
      this.props.dispatch(bookingActions.setSelectOrder(nextProps.orders[0])); 
    if( !_.isNull(nextProps.selectOrder) && !_.isUndefined(nextProps.selectOrder) && _.isNull(nextProps.selectOrder.details)){
      this.props.dispatch(bookingActions.getOrder(nextProps.selectOrder.rowGuid));     
    }    
  }
  render(){
    if (this.props.orders.length <= 0)
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
      pageType: state.bookingReducer.pageType,
      selectOrder: state.bookingReducer.selectOrder    
  }
}
export default compose(
  connect(mapStateToProps),
  commonWrapped()
)(WidgetListOrder);

