import React from 'react';
import { connect } from "react-redux";
import {compose} from 'redux';
import {Link} from 'react-router-dom';
import commonWrapped from '../hocs/hocs.common';
import {bookingActions} from '../actions/booking.actions';

class WidgetListServed extends React.Component {
  constructor(props) {
    super(props);
    this.selectServedItem = this.selectServedItem.bind(this);
    
  }
  selectServedItem(item){
    this.props.dispatch(bookingActions.setSelectOrder(item));
  }
  componentDidMount(){ 
      this.props.dispatch(bookingActions.getServed()); 
  }
  render(){
    if (this.props.served === undefined)
      return(
        <p> No items </p>
      )
    const lstOrders = this.props.served.map( (item, i) => {
        return ( 
          <div className="nav-link" onClick={() => this.selectServedItem(item)} key={i}>
            <Link to ='/cooker'><i className="fa fa-star" aria-hidden="true"></i>{' '}{item.title} </Link>
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
    served: state.bookingReducer.served
  }
}
export default compose(
  connect(mapStateToProps),
  commonWrapped()
)(WidgetListServed);

