import React from 'react';
import _ from 'lodash';
import { connect } from "react-redux";
import {compose} from 'redux';
import { Row, Col } from 'reactstrap';
import commonWrapped from '../hocs/hocs.common';
import {bookingActions} from '../actions/booking.actions';
import {adminActions} from '../actions/admin.actions';
import TableForm from '../components/TableForm';

class TableList extends React.Component {
    constructor(props) {
        super(props);
        console.log(props);
    }
    render () {
        var items = this.props.items.map((item, index) => {
            return (        
                <TableItem id ={item.id} key={index} item={item} index={index} removeItem={this.props.removeItem} />
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
        this.onClickEdit = this.onClickEdit.bind(this);
        this.onClickDelete = this.onClickDelete.bind(this);
    }
    onClickEdit() {
        
    }
    onClickDelete() {
        this.props.removeItem(this.props.item); 
    }
    render () {        
        return(   
            <tr>
                <td>{this.props.item.id}</td>
                <td>{this.props.item.title}</td>
                <td>{this.props.item.note}</td>
                <td>{this.props.item.createdBy}</td>
                <td>{this.props.item.modifiedBy}</td>                
                <td><button type="button" className="close" onClick={this.onClickEdit}><i class="fa fa-pencil" aria-hidden="true"></i></button></td>
                <td><button type="button" className="close" onClick={this.onClickDelete}>&times;</button></td>
            </tr>  
        );
    }
}
class TablePage extends React.Component {    
    constructor (props) {
        super(props);
        this.removeItem = this.removeItem.bind(this);
    }
    componentDidMount(){ 
        this.props.dispatch(bookingActions.getItems()); 
    }
    removeItem (item) { 
        this.props.dispatch(adminActions.deleteTable(item));        
    }
    render(){ 
        console.log(this.props.tables);
        return(
            <div>
                <div className="title">
                    <h2>Table Management</h2>
                </div> 
                <TableForm/>
                {(this.props.tables.length > 0) ?
                    <TableList items={this.props.tables} removeItem={this.removeItem}/>: 
                    <div className="alignC">There are no items in list</div>}
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