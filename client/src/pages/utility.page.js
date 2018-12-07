import React from 'react';
import _ from 'lodash';
import { connect } from "react-redux";
import {compose} from 'redux';
import { Row, Col } from 'reactstrap';
import commonWrapped from '../hocs/hocs.common';
import {bookingActions} from '../actions/booking.actions';
import {adminActions} from '../actions/admin.actions';
import UtilityForm from '../components/UtilityForm';

class UtilityList extends React.Component {
    constructor(props) {
        super(props);
    }
    render () {
        var items = this.props.items.map((item, index) => {
            return (        
                <UtilityItem id ={item.id} key={index} item={item} index={index} removeItem={this.props.removeItem} markTodoDone={this.props.markTodoDone} />
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
    
class UtilityItem extends React.Component {
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
class UtilityPage extends React.Component {    
    constructor (props) {
        super(props);
        this.removeItem = this.removeItem.bind(this);
    }
    componentDidMount(){ 
        this.props.dispatch(bookingActions.getItems()); 
    }
    removeItem (item) { 
        this.props.dispatch(adminActions.deleteUtility(item));        
    }
    render(){ 
        return(
            <div>
                <div className="title">
                    <h2>Utility Management</h2>
                </div>
                <UtilityForm />
                {(this.props.utilities.length > 0) ?
                    <UtilityList items={this.props.utilities} removeItem={this.removeItem}/>: 
                    <div className="alignC">There are no items in list</div>}                         
            </div>
        )
    }
}

const mapStateToProps = state => {
    return {
        utilities: state.bookingReducer.utilities
    }
  }
  
export default compose(
    connect(mapStateToProps),
    commonWrapped()
  )(UtilityPage);