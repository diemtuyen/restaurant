import React from 'react';
import {compose} from 'redux';
import { Field, reduxForm } from 'redux-form';
import { Row, Col, Button } from 'reactstrap';
import { connect } from 'react-redux';
import renderInput from '../controls/input.control'; 
import {adminActions} from '../actions/admin.actions';
import commonWrapped from '../hocs/hocs.common';
class CatalogForm extends React.Component{
    constructor(props, context){
        super(props,context);
    }
    handleSubmit = (values) => {
        const props = this.props;
        console.log(values);
        return false;
    }
    render(){
        const { pristine, reset, submitting, valid } = this.props;
        const { handleSubmit } = this.props;
        return(
            <form onSubmit={handleSubmit(this.handleSubmit)}>
                <div className="addNew">
                    <Row>
                        <Col md={12}><h5>Add new item</h5></Col>
                    </Row>                    
                    <Row>
                        <Col md={4} className="txtAddNew"><label>Tieu de</label></Col>
                        <Col md={8}>
                            <Field
                                className='res-input'
                                name='title'
                                type='text'
                                component={renderInput}
                            />
                        </Col>
                    </Row>
                    <Row>
                        <Col md={4} className="txtAddNew"><label>Ghi chu</label></Col>
                        <Col md={8}>
                            <Field
                                className='res-input'
                                name='note'
                                type='text'
                                component={renderInput}
                            />
                        </Col>
                    </Row>
                    <Row>
                        <Col md={12}>
                            <Button type="submit" disabled={!valid || pristine || submitting}>Add</Button>
                        </Col>
                    </Row>
                </div>
            </form>
        )
    }
}
export default compose(
    connect(),
    reduxForm({
        form: 'catelogForm'
    }),
    commonWrapped()
)(CatalogForm);