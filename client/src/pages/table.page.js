import React from 'react';
import _ from 'lodash';
import { connect } from "react-redux";
import {compose} from 'redux';
import { Row, Col } from 'reactstrap';
import commonWrapped from '../hocs/hocs.common';
import {bookingActions} from '../actions/booking.actions';
import AddTableForm from '../components/AddTableForm';

class TableList extends React.Component {
    constructor(props) {
        super(props);
        console.log(props);
    }
    render () {
        var items = this.props.items.map((item, index) => {
            return (        
                <TableItem key={index} item={item} index={index} removeItem={this.props.removeItem} markTodoDone={this.props.markTodoDone} />
            );
        });
        return (
            <div>
                <table className='table'>
                    <thead>
                        <tr>
                            <th>ID</th>
                            <th>Title</th>
                            <th>Note</th>
                            <th>Create By</th>
                            <th>Modify By</th>
                            <th>Edit</th>
                            <th>Delete</th>
                        </tr>
                    </thead>
                    <tbody>{items}</tbody>
                </table>
            </div>
        );
    }
  }
    
class TableItem extends React.Component {
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
        if (this.props.item.length <=0)
            return;
        return(   
            <tr>
                <td onClick={this.onClickDone}>{this.props.item.id}</td>
                <td onClick={this.onClickDone}>{this.props.item.title}</td>
                <td onClick={this.onClickDone}>{this.props.item.note}</td>
                <td onClick={this.onClickDone}>{this.props.item.createdBy}</td>
                <td onClick={this.onClickDone}>{this.props.item.modifiedBy}</td>                
                <td><button type="button" className="close" onClick={this.onClickClose}><i class="fa fa-pencil" aria-hidden="true"></i></button></td>
                <td><button type="button" className="close" onClick={this.onClickClose}>&times;</button></td>
            </tr>  
        );
    }
  }
class TablePage extends React.Component {    
    constructor (props) {
        super(props);
        this.removeItem = this.removeItem.bind(this);
        this.markTodoDone = this.markTodoDone.bind(this);
        this.state = {items: this.props.tables};
    }
    componentDidMount(){ 
        this.props.dispatch(bookingActions.getItems());      
        console.log(this.props.tables) ;
    }
    removeItem (itemIndex) {
        this.props.tables.splice(itemIndex, 1);
        this.setState({items: this.props.tables});
    }
    markTodoDone(itemIndex) {
        var todo = this.props.items[itemIndex];
        this.props.tables.splice(itemIndex, 1);
        todo.done = !todo.done;
        todo.done ? this.props.tables.push(todo) : this.props.tables.unshift(todo);
        this.setState({items: this.props.tables});  
    }
    render(){ 
        console.log(this.props.tables);
        return(
            <div>
                <div className="title">
                    <h2>Table Management</h2>
                </div>
               <AddTableForm />
               <TableList items={this.props.tables} removeItem={this.removeItem} markTodoDone={this.markTodoDone}/>          
            </div>
        )
    }
}

const mapStateToProps = state => {
    return {
        tables: state.bookingReducer.tables
    }
  }
  
export default compose(
    connect(mapStateToProps),
    commonWrapped()
  )(TablePage);