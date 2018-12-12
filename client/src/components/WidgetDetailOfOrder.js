import React from 'react';
import { connect } from "react-redux";
import {compose} from 'redux';
import commonWrapped from '../hocs/hocs.common';
import {bookingActions} from '../actions/booking.actions';

class OrderItem extends React.Component {
  constructor(props) {
    super(props);
    this.onClickDone = this.onClickDone.bind(this);
  }
  onClickDone() {
    debugger
    this.props.markDone(this.props.item.rowGuid);
  }
  render () {
    var todoClass = this.props.item.done ? 
        "done" : "undone";
    console.log('order item ' + this.props.item);
    return(   
      <tr className={todoClass}>		
        <td>{this.props.index + 1}</td>
        <td onClick={this.onClickDone}>{this.props.item.title}</td>
        <td>{this.props.item.tableId}</td>
        <td>{this.props.item.category}</td>
        <td>{this.props.item.kind}</td>
        <td>{this.props.item.count}</td>
        <td>{this.props.item.note}</td>
        <td><button type="button" className="close">&times;</button></td>
      </tr>  
    );
  }
}

class OrderList extends React.Component {
  constructor(props) {
    super(props);
    console.log(props);
  }
  render () {
    var items = this.props.items.map((item, index) => {
      return (        
        <OrderItem key={index} item={item} index={index} markDone={this.props.markDone}/>
      );
    });
    return (
      <div>
        <table className='table'>
          <thead>
            <tr>
              <th>No.</th>
              <th>Title</th>
              <th>Table ID</th>
              <th>Category</th>
              <th>Kind</th>
              <th>Count</th>
              <th>Note</th>
              <th></th>
            </tr>
          </thead>
          <tbody>{items}</tbody>
        </table>
      </div>
    );
  }
}
  

class WidgetDetailOfOrder extends React.Component {
  constructor (props) {
    super(props);
    this.markDone = this.markDone.bind(this);
  }
  markDone(itemIndex) {
    this.props.dispatch(bookingActions.markDone(null, itemIndex));  
  }
  componentDidMount(){ 
    this.props.dispatch(bookingActions.getOrders());      
    console.log(this.props.orders);
  }
  render() {
    return (
      <div className="main">
        <OrderList items={this.props.orders} markDone = {this.markDone}/>
      </div>
    );
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
)(WidgetDetailOfOrder)

