import React, {PropTypes} from 'react';
import {FieldProps} from './FieldProps';
import {withInputError} from './hocs.control';
import renderInput from '../controls/input.control'; 
import renderMultiselect from '../controls/multiselect.control';
import renderDropdownList from '../controls/dropdown.control';
import {required} from '../controls/FieldValidations';
import { Row, Col, Button } from 'reactstrap';
import { Field} from 'redux-form';
import _ from 'lodash';

const renderFoods = ({rs, foods, kinds, excepts, utilities, fields, meta: { touched, error, submitFailed }, showError, showWarn, ...rest}) =>{
	return (        
        <ul className="lstFood">
            {/* <li className="itemFood">
                <Button onClick={() => fields.push({})}>Add Food</Button>
            </li> */}
            {fields.map((food, index) => (
                <li className="itemFood" key={index}>
                    <div className="panel">
                        {/* <div>{rs.bookForm.foodItem}{index + 1}</div> */}
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
                            {/* <Row>            
                                <Col md={12}>
                                <label>Utility</label>
                                <Field
                                    component={renderMultiselect}
                                    name={`${food}.JsonUtility`}
                                    data={utilities}
                                    validate={[required]}
                                    showError
                                    />
                                </Col>
                            </Row>
                            <Row>
                                <Col md={12}>
                                <label>Exception</label>
                                <Field
                                    name={`${food}.JsonExcept`}
                                    component={renderMultiselect}
                                    data={excepts}/>
                                </Col>
                            </Row> */}
                            <Row className="row-note">
                                <Col md={12}>
                                <label>{_.get(rs,'bookForm.note')}</label>{' '}
                                <Field
                                    className='res-input'
                                    name={`${food}.note`}
                                    type='textarea'
                                    component={renderInput}
                                />
                                </Col>
                            </Row>
                        </div>
                    </div>                       
                </li>
            ))}
        </ul>
	);
}

renderFoods.propTypes = {
	...FieldProps
};

export default withInputError(renderFoods);