import React, {PropTypes} from 'react';
import {FieldProps} from './FieldProps';
import {withInputError} from './hocs.control';
import renderInput from '../controls/input.control'; 
import renderMultiselect from '../controls/multiselect.control';
import renderDropdownList from '../controls/dropdown.control';
import {required} from '../controls/FieldValidations';
import { Row, Col, Button, FormGroup, Label } from 'reactstrap';
import { Field} from 'redux-form';
import Multiselect  from 'react-widgets/lib/Multiselect';
import _ from 'lodash';
const renderDrink = ({rs, pageType, foods, kinds, suggestNote, fields, ...rest, fnShowNoteSuggest, fnAddSuggestNote}) =>
{
    const _renderDisplay = () =>{
        return(
            <ul className="lstFood">            
            {fields.map((food, index) => {
                return (
                <li className="itemFood" key={index}>
                    <div className="panel">
                        <div className="panel-child">                           
                            <Row className="row-info display">  
                                <Col md={4}>
                                <span>{_.get(rs, `widgetOrder.${pageType}.menu`)}:</span>
                                <span>{_.find(foods, (f) => { return f.id == fields.get(index).foodId;}).title}</span>
                                </Col>
                                <Col md={4}>
                                <span>{_.get(rs, `widgetOrder.${pageType}.type`)}:</span>
                                <span>{_.find(kinds, (k) =>{ return k.id == fields.get(index).kindId;}).title}</span>
                                </Col>
                                <Col md={4}>
                                <span>{_.get(rs, `widgetOrder.${pageType}.sum`)}:</span>
                                <span>{fields.get(index).count}</span>
                                </Col>
                            </Row> 
                            <Row className="row-note display">
                                <Col md={12}>
                                    <span>{_.get(rs, `widgetOrder.${pageType}.note`)}:</span>
                                    <span>{fields.get(index).note}</span>
                                </Col>
                            </Row>                          
                        </div>
                    </div>                       
                </li>
            )})}
        </ul>
        )
    }
    const _renderEdit = ()=>{
        return(
        <ul className="lstFood">            
            {fields.map((food, index) => {
                const openNote = fields.get(index).openNote;
                const selectedNote = fields.get(index).selectedNote;
                var addSelect = false;
                var textNote;
                if(!openNote){
                    textNote = fields.get(index).note;
                    if (textNote!= null && textNote != undefined && _.findIndex(selectedNote, (n) => { return n.title == textNote;}) == -1){
                        addSelect = true;
                    }
                }
                let menuId, kindId,countId;
                if (pageType === 'alter'){
                    if (foods.length > 0 && !_.isUndefined(fields.get(index).foodId)){
                        menuId = _.find(foods, (f) => { return f.id == fields.get(index).foodId;});
                    }
                    if (kinds.length > 0 && !_.isUndefined(fields.get(index).kindId)){
                        kindId = _.find(kinds, (k) => { return k.id == fields.get(index).kindId;});
                    }
                    countId = fields.get(index).count; 
                }                            
                return (
                <li className="itemFood" key={index}>
                    <div className="panel">
                        <div className="panel-child">
                            <Row className="row-info">  
                                <Col md={{size:4}}>
                                    <label>{_.get(rs, `widgetOrder.${pageType}.menuDrink`)}</label>
                                    <Field
                                        className='control-input'
                                        name={`${food}.foodId`}
                                        valueField='id'
                                        textField='title'
                                        component={renderDropdownList}
                                        groupBy='groupName'
                                        val={menuId}
                                        data={foods}/>
                                </Col>                                
                                <Col md={{size:4, offset: 2}}>
                                    <label>{_.get(rs, `widgetOrder.${pageType}.sum`)}</label>
                                    <Field
                                        className='control-input'
                                        name={`${food}.count`}
                                        component={renderDropdownList}
                                        val={countId}
                                        data={[ '1', 
                                        '2', '3', '4', '5', '6' ]}/>
                                 </Col>
                                <Col md={2} className="action"> 
                                    <Button
                                        type="button"
                                        title="Remove Food"
                                        onClick={() => fields.remove(index)}>
                                        Delete
                                    </Button>
                                </Col>
                            </Row>                                                      
                        </div>
                    </div>                       
                </li>
            )})}
        </ul>);
    }
    return (
        <div className='groupDrink'>
            {pageType!=='cooker' && _renderEdit(fields)}
            {pageType==='cooker' && _renderDisplay(fields)}
        </div>
    )  
};

renderDrink.propTypes = {
	...FieldProps
};

export default withInputError(renderDrink);