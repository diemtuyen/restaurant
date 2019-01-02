import React, {PropTypes} from 'react';
import {FieldProps} from './FieldProps';
import {withInputError} from './hocs.control';
import renderInput from '../controls/input.control'; 
import renderMultiselect from '../controls/multiselect.control';
import renderDropdownList from '../controls/dropdown.control';
import {required} from '../controls/FieldValidations';
import { Row, Col, Button } from 'reactstrap';
import { Field} from 'redux-form';
import Multiselect  from 'react-widgets/lib/Multiselect';
import _ from 'lodash';
const renderFoods = ({rs, pageType, foods, kinds, suggestNote, fields, ...rest, fnShowNoteSuggest, fnAddSuggestNote}) =>
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
                if (pageType === 'alter'){
                    if (foods.length > 0){
                        var menuId = _.find(foods, (f) => { return f.id == fields.get(index).foodId;}).id;
                    }
                    if (kinds.length > 0){
                        var kindId = _.find(kinds, (k) => { return k.id == fields.get(index).kindId;}).id;
                    }
                    var countId = fields.get(index).count; 
                }                            
                return (
                <li className="itemFood" key={index}>
                    <div className="panel">
                        <div className="panel-child">
                            <div className="action">
                                <Button
                                    type="button"
                                    title="Remove Food"
                                    onClick={() => fields.remove(index)}>
                                    Delete
                                </Button>
                            </div>
                            <Row className="row-info">  
                                <Col md={4}>
                                <label>{_.get(rs, `widgetOrder.${pageType}.menu`)}</label>
                                <Field
                                    className='control-input'
                                    name={`${food}.food`}
                                    component={renderDropdownList}
                                    groupBy='groupName'
                                    defaultValue={menuId}
                                    data={foods}/>
                                </Col>
                                <Col md={4}>
                                <label>{_.get(rs, `widgetOrder.${pageType}.type`)}</label>
                                <Field
                                    className='control-input'
                                    name={`${food}.Kind`}
                                    component={renderDropdownList}                        
                                    defaultValue={kindId}                        
                                    data={kinds}/>
                                </Col>
                                <Col md={4}>
                                <label>{_.get(rs, `widgetOrder.${pageType}.sum`)}</label>
                                <Field
                                    className='control-input'
                                    name={`${food}.Count`}
                                    component={renderDropdownList}
                                    defaultValue={countId}
                                    data={[ '1', '2', '3', '4', '5', '6' ]}/> 
                                </Col>
                            </Row> 
                            <Row className="row-note">
                                <Col md={12}>
                                    <label>{_.get(rs, `widgetOrder.${pageType}.note`)}</label>{' '}
                                    {!openNote && <Field
                                        className='res-input'
                                        name={`${food}.note`}
                                        type='textarea'
                                        component={renderInput}
                                    />}
                                    {openNote && <Multiselect
                                        className='suggestion-note'
                                        name={`${food}.noteSuggestion`}
                                        open={openNote}
                                        data={suggestNote}
                                        valueField='newId'
                                        textField='title'
                                        groupBy='group'
                                        onChange={value => {
                                            fnAddSuggestNote(food, index, value);
                                        }}
                                        value={selectedNote}
                                        onToggle={()=>fnShowNoteSuggest(food, index)}
                                    />}
                                    <Button
                                        className='bt-suggestion-note'
                                        type="button"
                                        title="Add Note"
                                        onClick={()=>fnShowNoteSuggest(food, index)}>
                                        {openNote ? 'Close' : 'Add Note'} 
                                    </Button>
                                    <div style={{display:'none'}}>
                                        <Field name={`${food}.openNote`}
                                        id={`${food}.openNote`}
                                        component="input"
                                        type="checkbox" />{' '}
                                        {_.get(rs, `widgetOrder.${pageType}.takeAway`)}
                                    </div>
                                </Col>
                            </Row>                          
                        </div>
                    </div>                       
                </li>
            )})}
        </ul>);
    }
    return (
        <div>
            {pageType!=='cooker' && _renderEdit(fields)}
            {pageType==='cooker' && _renderDisplay(fields)}
        </div>
    )  
};

renderFoods.propTypes = {
	...FieldProps
};

export default withInputError(renderFoods);