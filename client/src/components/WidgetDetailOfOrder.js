import React from 'react';

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
        <td>{this.props.item.count}</td>
        <td>{this.props.item.tableId}</td>
        <td><button type="button" className="close" onClick={this.onClickClose}>&times;</button></td>
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
        <OrderItem key={index} item={item} index={index} removeItem={this.props.removeItem} markTodoDone={this.props.markTodoDone} />
      );
    });
    return (
      <div>
        {/* <span>Order for table </span> */}
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
  
class OrderItem extends React.Component {
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
    console.log('order item ' + this.props.item);
    return(   
      <tr className={todoClass}>
        <td onClick={this.onClickDone}>{this.props.item.id}</td>
        {/* <td>{this.props.item.details.count}</td>
        <td>{this.props.item.details.tableId}</td> */}
        <td>
          <DetailList items={this.props.item.details} removeItem={this.removeItem} markTodoDone={this.markTodoDone}/>
        </td>
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
    this.state = {items: this.props.items};
  }
  removeItem (itemIndex) {
    this.props.items.splice(itemIndex, 1);
    this.setState({items: this.props.items});
  }
  markTodoDone(itemIndex) {
    var todo = this.props.items[itemIndex];
    this.props.items.splice(itemIndex, 1);
    todo.done = !todo.done;
    todo.done ? this.props.items.push(todo) : this.props.items.unshift(todo);
    this.setState({items: this.props.items});  
  }
  render() {
    return (
      <div className="main">
        <OrderList items={this.props.items} removeItem={this.removeItem} markTodoDone={this.markTodoDone}/>
      </div>
    );
  }
}


export default WidgetDetailOfOrder;

