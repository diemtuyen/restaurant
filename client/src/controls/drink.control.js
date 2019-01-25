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
const renderDrink = ({rs, pageType, utilities, fields}) =>
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
                                <span>{_.find(utilities, (f) => { return f.id == fields.get(index).drinkId;}).title}</span>
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
                let drinkId, countId;
                if (pageType === 'alter'){
                    if (utilities.length > 0 && !_.isUndefined(fields.get(index).drinkId)){
                        drinkId = _.find(utilities, (f) => { return f.id == fields.get(index).drinkId;});
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
                                        name={`${food}.drinkId`}
                                        valueField='id'
                                        textField='title'
                                        component={renderDropdownList}
                                        groupBy='groupName'
                                        val={drinkId}
                                        data={utilities}/>
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