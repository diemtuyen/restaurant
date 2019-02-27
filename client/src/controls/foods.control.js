import React, {PropTypes} from 'react';
import {FieldProps} from './FieldProps';
import {withInputError} from './hocs.control';
import renderInput from '../controls/input.control'; 
import renderDropdownList from '../controls/dropdown.control';
import { Row, Col, Button, Label, Table } from 'reactstrap';
import { Field} from 'redux-form';
import Multiselect  from 'react-widgets/lib/Multiselect';
import _ from 'lodash';
const renderFoods = ({rs, pageType, foods, kinds, suggestNote, fields, ...rest, fnShowNoteSuggest, fnAddSuggestNote}) =>
{
    const _renderDisplay = () =>{
        return(
            (fields.length > 0) && <Table responsive>
                <thead className='table-primary'>
                    <tr className='d-flex'>
                        <th className='col-md-2 col-sm-6 col-5'>{_.get(rs, `widgetOrder.menu`)}</th>
                        <th className='col-md-2 col-sm-3 col-5'>{_.get(rs, `widgetOrder.type`)}</th>
                        <th className='col-md-1 col-sm-1 col-2'>{_.get(rs, `widgetOrder.sum`)}</th>
                        <th className='col-md-2 col-sm-2 d-none d-sm-block'>{_.get(rs, `widgetOrder.takeAway`)}</th>
                        <th className='col-md-5 d-none d-md-block'>{_.get(rs, `widgetOrder.note`)}</th>
                    </tr>
                </thead>
                <tbody>
                    {fields.map((food, index) => {
                        return(
                            <tr className='d-flex'>
                                <td className='col-md-2 col-sm-6 col-5'>
                                    {_.find(foods, (f) => { return f.id == fields.get(index).foodId;}).title}
                                    <span className='d-block d-md-none text-info'>{fields.get(index).note}</span>                                    
                                    </td>
                                <td className='col-md-2 col-sm-3 col-5'>
                                    {_.find(kinds, (k) =>{ return k.id == fields.get(index).kindId;}).title}
                                    <span className='d-block d-sm-none text-warning'>{fields.get(index).isTakeAway && _.get(rs, `widgetOrder.takeAway`)}</span></td>
                                <td className='col-md-1 col-sm-1 col-2'>{fields.get(index).count}</td>
                                <td className='col-md-2 col-sm-2 d-none d-sm-block'>{fields.get(index).isTakeAway && <i class='fa fa-check' aria-hidden='true'></i>}</td>
                                <td className='col-md-5 d-none d-md-block'>{fields.get(index).note}</td>
                            </tr>
                        )
                    })}
                </tbody>
            </Table>
        )
    }
    const _renderEdit = ()=>{
        return(
        <ul className='lstField alert-primary'>            
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
                <li className='itemField' key={index}>
                    <Row className='action'>
                        <Col className='text-right'>
                            <Label takeAway>                               
                                <Field
                                    name={`${food}.isTakeAway`}
                                    id='takeAway'
                                    component='input'
                                    type='checkbox' />
                                    {' '}{_.get(rs, `widgetOrder.takeAway`)}
                            </Label>
                            <Button
                                type='button'
                                title='Remove Food'
                                onClick={() => fields.remove(index)}>
                                <i class='fa fa-trash-o' aria-hidden='true'></i>
                            </Button>
                            </Col>
                    </Row>
                    <Row className='row-info'>  
                        <Col xl='4' lg='6' md='6' sm='6' xs='12'>
                        <label>{_.get(rs, `widgetOrder.menu`)}</label>
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
                        <Col xl='4' lg='6' md='6' sm='6' xs='12'>
                        <label className='middle-label'>{_.get(rs, `widgetOrder.type`)}</label>
                        <Field
                            className='control-input'
                            name={`${food}.kindId`}
                            valueField='id'
                            textField='title'
                            component={renderDropdownList}                        
                            val={kindId}                        
                            data={kinds}/>
                        </Col>
                        <Col xl='4' lg='3' md='3' sm='3' xs='12'>
                        <label>{_.get(rs, `widgetOrder.sum`)}</label>
                        <Field
                            className='control-input'
                            name={`${food}.count`}
                            component={renderDropdownList}
                            val={countId}
                            data={[ '1', '2', '3', '4', '5', '6' ]}/> 
                        </Col>
                        <Col xl='12' lg='9' md='9' sm='9' xs='12' className='row-note'>
                            <label>{_.get(rs, `widgetOrder.note`)}</label>{' '}
                            {!openNote && pageType === 'order' && 
                                <Multiselect
                                    className='control-input'
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
                                    className={`control-input ${pageType}-page`}
                                    name={`${food}.note`}
                                    type='textarea'
                                    value={textNote}
                                    component={renderInput}
                                    autoFocus={openNote}
                            />}                                
                            {pageType === 'order' && <Button
                                type='button'
                                title='Add Note'
                                onClick={()=>fnShowNoteSuggest(food, index)}>
                                {openNote ? 'Close' : _.get(rs, `widgetOrder.addNote`)} 
                            </Button>}
                            <div style={{display:'none'}}>
                                <Field name={`${food}.openNote`}
                                id={`${food}.openNote`}
                                component='input'
                                type='checkbox' />{' '}
                                {_.get(rs, `widgetOrder.takeAway`)}
                            </div>
                        </Col>
                    </Row> 
                </li>
            )})}
        </ul>);
    }
    return (
        pageType!=='cooker'? _renderEdit(fields): _renderDisplay(fields)
    )  
};

renderFoods.propTypes = {
	...FieldProps
};

export default withInputError(renderFoods);