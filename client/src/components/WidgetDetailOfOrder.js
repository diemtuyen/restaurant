import React from 'react';
import { connect } from "react-redux";
import {compose} from 'redux';
import _ from 'lodash';
import {cookingActions} from '../actions/cooking.actions';
import commonWrapped from '../hocs/hocs.common';

class DetailList extends React.Component {
  render () {
    var items = this.props.items.map((item, index) => {
      return (
        <DetailItem key={index} item={item} index={index} removeItem={this.props.removeItem} markTodoDone={this.props.markTodoDone} />
      );
    });
    return (
      <div>
        <table className='table'>
          <thead>
            <tr>
              <th>ID</th>
              <th>Title</th>
              <th>Title</th>
              <th></th>
            </tr>
          </thead>
          <tbody>{items}</tbody>
        </table>
      </div>
    );
  }
}
  
class DetailItem extends React.Component {
  constructor(props) {
    super(props);
    this.onClickClose = this.onClickClose.bind(this);
    this.onClickDone = this.onClickDone.bind(this);
  }
  onClickClose() {
    var index = parseInt(this.props.index);
    this.props.removeItem(index);
  }
  onClickDone() {
    var index = parseInt(this.props.index);
    this.props.markTodoDone(index);
  }
  render () {
    var todoClass = this.props.item.done ? 
        "done" : "undone";
    return(   
      <tr className={todoClass}>
        <td onClick={this.onClickDone}>{this.props.item.id}</td>
        <td>{this.props.item.title}</td>
        <td>{this.props.item.title}</td>
        <td><button type="button" className="close" onClick={this.onClickClose}>&times;</button></td>
      </tr>  
    );
  }
}

class WidgetDetailOfOrder extends React.Component {
  constructor (props) {
    super(props);
    this.removeItem = this.removeItem.bind(this);
    this.markTodoDone = this.markTodoDone.bind(this);
    this.state = {orders: this.props.orders};
  }
  componentDidMount(){ 
    this.props.dispatch(cookingActions.getItems());      
    console.log(this.props.orders) ;     
  }
  removeItem (itemIndex) {
    this.props.orders.splice(itemIndex, 1);
    this.setState({orders: this.props.orders});
  }
  markTodoDone(itemIndex) {
    var todo = this.props.orders[itemIndex];
    this.props.orders.splice(itemIndex, 1);
    todo.done = !todo.done;
    todo.done ? this.props.orders.push(todo) : this.props.orders.unshift(todo);
    this.setState({orders: this.props.orders});  
  }
  render() {
    return (
      <div className="main">
        <DetailList items={this.props.orders} removeItem={this.removeItem} markTodoDone={this.markTodoDone}/>
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
)(WidgetDetailOfOrder);

