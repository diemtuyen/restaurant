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
const renderFoods = ({rs, foods, kinds, excepts, utilities, fields, ...rest, fnShowNoteSuggest}) =>{
	return (        
        <ul className="lstFood">
            {/* <li className="itemFood">
                <Button onClick={() => fields.push({})}>Add Food</Button>
            </li> */}
            {fields.map((food, index) => {
                debugger;
                const openNote = fields.get(index).openNote;
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
                                <label>{_.get(rs,'bookForm.menu')}</label>
                                <Field
                                    className='control-input'
                                    name={`${food}.food`}
                                    component={renderDropdownList}
                                    groupBy='groupName'
                                    data={foods}/>
                                </Col>
                                <Col md={4}>
                                <label>{_.get(rs,'bookForm.type')}</label>
                                <Field
                                    className='control-input'
                                    name={`${food}.Kind`}
                                    component={renderDropdownList}                        
                                    data={kinds}/>
                                </Col>
                                <Col md={4}>
                                <label>{_.get(rs,'bookForm.sum')}</label>
                                <Field
                                    className='control-input'
                                    name={`${food}.Count`}
                                    component={renderDropdownList}
                                    data={[ '1', '2', '3', '4', '5', '6' ]}/> 
                                </Col>
                            </Row> 
                            <Row className="row-note">
                                <Col md={12}>
                                    <label>{_.get(rs,'bookForm.note')}</label>{' '}
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
                                        data={foods}
                                        valueField='id'
                                        textField='title'
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
                                        {_.get(rs,'bookForm.takeAway')}
                                    </div>
                                </Col>
                            </Row>                          
                        </div>
                    </div>                       
                </li>
            )})}
        </ul>
	);
}

renderFoods.propTypes = {
	...FieldProps
};

export default withInputError(renderFoods);