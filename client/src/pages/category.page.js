import React from 'react';
import { connect } from "react-redux";
import {compose} from 'redux';
import commonWrapped from '../hocs/hocs.common';
import {bookingActions} from '../actions/booking.actions';
import {adminActions} from '../actions/admin.actions';
import ofsActionType from '../constants/ofs.constants';
import CategoryForm from '../components/CategoryForm';
import CatalogForm from '../components/Catalog.Form';
import {ofsActions} from '../actions/ofs.actions';
import ConfirmModal from '../controls/confirmModal';
class CategoryList extends React.Component {
    constructor(props) {
        super(props);
    }
    render () {
        var items = this.props.items.map((item, index) => {
            return (        
                <CategoryItem id ={item.id} key={index} item={item} index={index} 
                removeItem={this.props.removeItem}
                selectedItem={this.props.selectedItem} />
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
    
class CategoryItem extends React.Component {
    constructor(props) {
        super(props);
        this.onClickDelete = this.onClickDelete.bind(this);
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
                <td><button type="button" className="close" onClick={(e)=>{
                    this.props.selectedItem(this.props.item)}
                }><i className="fa fa-pencil" aria-hidden="true"></i></button></td>
                <td><button type="button" className="close" onClick={this.onClickDelete}>&times;</button></td>
            </tr>  
        );
    }
}
class CategoryPage extends React.Component {    
    constructor (props) {
        super(props);
        this.onClickRemoveItem = this.onClickRemoveItem.bind(this);
        this.onClickEditItem = this.onClickEditItem.bind(this);
        this.state={
            catalogName:null,
            isOpen: false,
            selectedRemoveItem: null
        }
    }
    componentDidMount(){ 
        //this.props.dispatch(bookingActions.getCategories());
        this.props.dispatch(ofsActions.getCategories());
        const { name } = this.props.match.params;
        this.setState({'catalogName': name});
    }
    onClickRemoveItem (item) { 
        //this.props.dispatch(adminActions.deleteCategory(item));
        this.setState({'selectedRemoveItem': item})
        this.toggleFn();
    }
    onClickEditItem(item){
        this.props.dispatch({
            type: ofsActionType.CATALOG_SELECTED,
            data: item
        });
    }
    toggleFn = () =>{
        this.setState({isOpen: !this.state.isOpen});
    }
    okFn = (data)=>{
        this.props.dispatch(ofsActions.submitCategory({type_action : 'delete', catalogName: this.state.catalogName}, data));
    }
    render(){
        const items = this.props.cataglog[this.state.catalogName];
        return(
            <div>
                <div className="title">
                    <h2>Category Management</h2>
                </div>
                {/* <CategoryForm /> */}
                <ConfirmModal data={this.state.selectedRemoveItem} mdTitle='Modal Title' mdBody='Modal Body' isOpen={this.state.isOpen} okFn={this.okFn} toggleFn={this.toggleFn}/>
                <CatalogForm catalogName={this.state.catalogName}/>{/*'FOODS'*/}
                {/* {(this.props.foods.length > 0) ?
                    <CategoryList 
                        items={this.props.foods} 
                        items={this.props.foods}
                        removeItem={this.removeItem} 
                        selectedItem={this.selectedItem}/>: 
                    <div className="alignC">There are no items in list</div>} */}
                 {(items !== undefined && items.length > 0) ?
                    <CategoryList 
                        items={items}
                        removeItem={this.onClickRemoveItem}
                        selectedItem={this.onClickEditItem}/>: 
                    <div className="alignC">There are no items in list</div>}
            </div>
        )
    }
}

const mapStateToProps = state => {
    return {
        //foods: state.bookingReducer.foods
        cataglog: state.ofs.cataglog
    }
}
  
export default compose(
    connect(mapStateToProps),
    commonWrapped()
)(CategoryPage);