import React, {PropTypes} from 'react';
import {FieldProps} from './FieldProps';
import {withInputError} from './hocs.control';
import renderInput from '../controls/input.control'; 
import renderMultiselect from '../controls/multiselect.control';
import renderDropdownList from '../controls/dropdown.control';
import {required} from '../controls/FieldValidations';
import { Row, Col, Button } from 'reactstrap';
import { Field} from 'redux-form';

const renderFoods = ({rs, categories, kinds, excepts, utilities, fields, meta: { touched, error, submitFailed }, showError, showWarn, ...rest}) =>{
	return (        
        <ul className="lstFood">
            <li className="itemFood">
                <Button onClick={() => fields.push({})}>Add Food</Button>
            </li>
            {fields.map((food, index) => (
                <li className="itemFood" key={index}>
                    <button
                        type="button"
                        title="Remove Food"
                        onClick={() => fields.remove(index)} />
                    <div className="panel">
                        <div>{rs.bookForm.foodItem}{index + 1}</div>
                        <div className="panel-child">
                            <Row>  
                                <Col md={4}>
                                <label>Category</label>
                                <Field
                                    name={`${food}.Category`}
                                    component={renderDropdownList}
                                    data={categories}/>
                                </Col>
                                <Col md={4}>
                                <label>Type</label>
                                <Field
                                    name={`${food}.Kind`}
                                    component={renderDropdownList}                        
                                    data={kinds}/>
                                </Col>
                                <Col md={4}>
                                <label>Count</label>
                                <Field
                                    name={`${food}.Count`}
                                    component={renderDropdownList}
                                    data={[ '1', '2', '3', '4', '5', '6' ]}/> 
                                </Col>
                            </Row> 
                            <Row>            
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
                            </Row>
                            <Row>
                                <Col md={12}>
                                <label>Note</label>{' '}
                                <Field
                                    className='res-input'
                                    name={`${food}.note`}
                                    type='text'
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