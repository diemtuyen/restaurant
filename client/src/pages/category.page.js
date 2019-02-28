import React from 'react';
import {Table} from 'reactstrap';
import { connect } from "react-redux";
import {compose} from 'redux';
import commonWrapped from '../hocs/hocs.common';
import ofsActionType from '../constants/ofs.constants';
import CatalogForm from '../components/CatalogForm';
import {ofsActions} from '../actions/ofs.actions';
import ConfirmModal from '../controls/confirmModal';
import _ from 'lodash';
class CategoryList extends React.Component{
    constructor(props) {
        super(props);
    }
    render() {
        const rs = _.get(window.restaurant,'resource');
        return(
            <Table striped responsive>
                <thead className='table-primary'>
                    <tr className='d-flex'>
                        <th className='col-1'>{_.get(rs, `adminPage.no`)}</th>
                        <th className='col-3'>{_.get(rs, `adminPage.title`)}</th>
                        <th className='col-2'>{_.get(rs, `adminPage.note`)}</th>
                        <th className='col-2'>{_.get(rs, `adminPage.createBy`)}</th>
                        <th className='col-2'>{_.get(rs, `adminPage.deleteBy`)}</th>
                        <th className='col-1'>{_.get(rs, `adminPage.edit`)}</th>
                        <th className='col-1'>{_.get(rs, `adminPage.delete`)}</th>
                    </tr>
                </thead>
                <tbody>
                    {this.props.items.map((item, index) => {
                        return(
                            <tr className='d-flex'>
                                <td className='col-1'>{index+1}</td>
                                <td className='col-3'>{item.title}</td>
                                <td className='col-2'>{item.note}</td>
                                <td className='col-2'>{item.createdBy}</td>
                                <td className='col-2'>{item.modifiedBy}</td>
                                <td className='col-1'>
                                    <button type="button" className="close" onClick={(e)=>{this.props.selectedItem(item)}}>
                                        <i className="fa fa-pencil" aria-hidden="true"></i></button></td>
                                <td className='col-1'>
                                    <button type="button" className="close" onClick={(e)=>{this.props.removeItem(item)}}>&times;</button></td>
                            </tr>
                        )
                    })}
                </tbody>
            </Table>
        )
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
        this.props.dispatch(ofsActions.getCategories());
        const { name } = this.props.match.params;
        this.setState({'catalogName': name});
    }
    onClickRemoveItem (item) { 
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
            <div className='admin-page'>
                <div className="title">
                    <h2>Category Management</h2>
                </div>
                <ConfirmModal 
                    data={this.state.selectedRemoveItem} 
                    mdTitle='Confirmation' 
                    mdBody='Are you sure you want to delete this item ?' 
                    isOpen={this.state.isOpen} 
                    okFn={this.okFn} 
                    toggleFn={this.toggleFn}/>
                <CatalogForm catalogName={this.state.catalogName}/>{/*'FOODS'*/}
                {(items !== undefined && items.length > 0) ?
                    <CategoryList 
                        items={items}
                        removeItem={this.onClickRemoveItem}
                        selectedItem={this.onClickEditItem}/>: 
                    <div className="text-center">There are no items in list</div>}
            </div>
        )
    }
}

const mapStateToProps = state => {
    return {
        cataglog: state.ofs.cataglog
    }
}
  
export default compose(
    connect(mapStateToProps),
    commonWrapped()
)(CategoryPage);