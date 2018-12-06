import React from 'react';
import _ from 'lodash';
import { connect } from "react-redux";
import {compose} from 'redux';
import { Row, Col } from 'reactstrap';
import commonWrapped from '../hocs/hocs.common';
import {bookingActions} from '../actions/booking.actions';
import {adminActions} from '../actions/admin.actions';
import AddKindForm from '../components/AddKindForm';

class KindList extends React.Component {
    constructor(props) {
        super(props);
        console.log(props);
    }
    render () {
        var items = this.props.items.map((item, index) => {
            return (        
                <KindItem id ={item.id} key={index} item={item} index={index} removeItem={this.props.removeItem} markTodoDone={this.props.markTodoDone} />
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
    
class KindItem extends React.Component {
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
        if (this.props.item.length <=0)
            return;
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
class KindPage extends React.Component {    
    constructor (props) {
        super(props);
        this.removeItem = this.removeItem.bind(this);
    }
    componentDidMount(){ 
        this.props.dispatch(bookingActions.getItems()); 
    }
    removeItem (item) { 
        this.props.dispatch(adminActions.deleteKind(item));        
    }
    render(){ 
        console.log(this.props.kinds);
        return(
            <div>
                <div className="title">
                    <h2>Kind Management</h2>
                </div>
               <AddKindForm />
               <KindList items={this.props.kinds} removeItem={this.removeItem}/>          
            </div>
        )
    }
}

const mapStateToProps = state => {
    return {
        kinds: state.bookingReducer.kinds
    }
  }
  
export default compose(
    connect(mapStateToProps),
    commonWrapped()
  )(KindPage);