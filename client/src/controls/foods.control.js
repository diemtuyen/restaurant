import React, {PropTypes} from 'react';
import {FieldProps} from './FieldProps';
import {withInputError} from './hocs.control';
import renderInput from '../controls/input.control'; 
import renderDropdownList from '../controls/dropdown.control';
import { Row, Col, Button, Label } from 'reactstrap';
import { Field} from 'redux-form';
import Multiselect  from 'react-widgets/lib/Multiselect';
import _ from 'lodash';
const renderFoods = ({rs, pageType, foods, kinds, suggestNote, fields, ...rest, fnShowNoteSuggest, fnAddSuggestNote}) =>
{
    const _renderDisplay = () =>{
        return(
            <ul className="lstField">            
            {fields.map((food, index) => {
                return (
                <li className="itemField" key={index}>
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
                            {(fields.get(index).note || fields.get(index).isTakeAway)&& <Row className="row-note display">
                                <Col md={12}>
                                    <span>{_.get(rs, `widgetOrder.${pageType}.note`)}:</span>
                                    {fields.get(index).isTakeAway && <span className='take-away'>{_.get(rs, `widgetOrder.${pageType}.takeAway`)}</span>}
                                    {fields.get(index).note && <span>{fields.get(index).note}</span>}
                                </Col>
                            </Row>}                   
                        </div>
                    </div>                       
                </li>
            )})}
        </ul>
        )
    }
    const _renderEdit = ()=>{
        return(
        <ul className="lstField">            
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
                <li className="itemField" key={index}>
                    <div className="panel">
                        <div className="panel-child">
                            <div className="action">
                                <Label takeAway>                               
                                    <Field
                                        name={`${food}.isTakeAway`}
                                        id="takeAway"
                                        component="input"
                                        type="checkbox" />
                                        {' '}{_.get(rs, `widgetOrder.${pageType}.takeAway`)}
                                </Label>
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
                                    name={`${food}.foodId`}
                                    valueField='id'
                                    textField='title'
                                    component={renderDropdownList}
                                    groupBy='groupName'
                                    val={menuId}
                                    data={foods}/>
                                </Col>
                                <Col md={4}>
                                <label className='middle-label'>{_.get(rs, `widgetOrder.${pageType}.type`)}</label>
                                <Field
                                    className='control-input'
                                    name={`${food}.kindId`}
                                    valueField='id'
                                    textField='title'
                                    component={renderDropdownList}                        
                                    val={kindId}                        
                                    data={kinds}/>
                                </Col>
                                <Col md={4}>
                                <label>{_.get(rs, `widgetOrder.${pageType}.sum`)}</label>
                                <Field
                                    className='control-input'
                                    name={`${food}.count`}
                                    component={renderDropdownList}
                                    val={countId}
                                    data={[ '1', '2', '3', '4', '5', '6' ]}/> 
                                </Col>
                            </Row> 
                            <Row className="row-note">
                                <Col md={12}>
                                    <label>{_.get(rs, `widgetOrder.${pageType}.note`)}</label>{' '}
                                    {!openNote && pageType === 'order' && 
                                        <Multiselect
                                            className='suggestion-note'
                                            name={`${food}.noteSuggestion`}
                                            data={suggestNote}
                                            valueField='newId'
                                            textField='title'
                                            groupBy='group'
                                            onChange={value => {
                                                fnAddSuggestNote(food, index, value);
                                            }}
                                            value={addSelect? selectedNote.concat({title: textNote}) :selectedNote}
                                    />}
                                    {(openNote || pageType === 'alter') &&
                                        <Field
                                            className={`res-input ${pageType}-input`}
                                            name={`${food}.note`}
                                            type='textarea'
                                            value={textNote}
                                            component={renderInput}
                                            autoFocus={openNote}
                                    />}                                
                                    {pageType === 'order' && <Button
                                        className='bt-suggestion-note'
                                        type="button"
                                        title="Add Note"
                                        onClick={()=>fnShowNoteSuggest(food, index)}>
                                        {openNote ? 'Close' : _.get(rs, `widgetOrder.${pageType}.btnNote`)} 
                                    </Button>}
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
        <div className='groupFood'>
            {pageType!=='cooker' && _renderEdit(fields)}
            {pageType==='cooker' && _renderDisplay(fields)}
        </div>
    )  
};

renderFoods.propTypes = {
	...FieldProps
};

export default withInputError(renderFoods);