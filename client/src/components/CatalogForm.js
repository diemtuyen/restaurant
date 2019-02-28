import React from 'react';
import {compose} from 'redux';
import _ from 'lodash';
import { Field, reduxForm, reset } from 'redux-form';
import { Row, Col, Button} from 'reactstrap';
import { connect } from 'react-redux';
import renderInput from '../controls/input.control'; 
import {ofsActions} from '../actions/ofs.actions';
import commonWrapped from '../hocs/hocs.common';
import { createLoadingSelector } from '../helpers/selectors';

class CatalogForm extends React.Component{
    constructor(props, context){
        super(props,context);
    }
    // handleSubmit = (values) => {
    //     const props = this.props;
    //     console.log(values);
    //     return false;
    // }
    render(){
        const { pristine, reset, submitting, valid } = this.props;
        const { handleSubmit } = this.props;
        const rs = _.get(window.restaurant,'resource');
        return(
            // <form onSubmit={handleSubmit(this.handleSubmit)}>
            <form onSubmit={handleSubmit}>
                <Row>
                    <Col className='text-center'><h5>Add new item</h5></Col></Row>                    
                <Row>
                    <Col xs='4' className='text-right'><label>{_.get(rs, `adminPage.title`)}</label></Col>
                    <Col xs='6'>
                        <Field
                            name='title'
                            type='text'
                            component={renderInput}/></Col></Row>
                <Row>
                    <Col xs='4' className='text-right'><label>{_.get(rs, `adminPage.note`)}</label></Col>
                    <Col xs='6'>
                        <Field
                            name='note'
                            type='text'
                            component={renderInput}/></Col></Row>
                <Row>
                    <Col className='text-center'>
                        <Button type="submit" disabled={!valid || pristine || submitting}>{_.get(rs, `adminPage.btnAdd`)}</Button></Col>
                </Row>
            </form>
        )
    }
}
const loadingSelector = createLoadingSelector(['CATALOG']);
const mapStateToProps = (state) => {
    return {
        isFetching: loadingSelector(state) ,
        initialValues: state.ofs.catalogItem
    }
};
const mapDispatchToProps = (dispatch,props) => ({
    onSubmit: values => {
        let alter_props = props;
        if(!_.isUndefined(values.id) && values.id > 0){
            alter_props = {...props, type_action : 'update'};
        }else{
            alter_props  = {...props, type_action : 'add'};
        }
        dispatch(ofsActions.submitCategory(alter_props, values));
        dispatch(reset('catelogForm'));
    }
});
export default compose(
    connect(mapStateToProps, mapDispatchToProps),
    reduxForm({
        form: 'catelogForm',
        enableReinitialize : true // this is needed to refresh initial-values!!
    }),
    commonWrapped()
)(CatalogForm);