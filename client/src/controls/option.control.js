import React from 'react';
import {FieldProps} from './FieldProps';
import {withInputError} from './hocs.control';
import renderDropdownList from '../controls/dropdown.control';
import { Row, Col, Button } from 'reactstrap';
import { Field} from 'redux-form';
import _ from 'lodash';
const renderOption = ({rs, pageType, options, fields}) =>
{
    const _renderDisplay = () =>{
        return(
            <ul className="lstField">            
            {fields.map((option, index) => {
                return (
                <li className="itemField" key={index}>
                    <div className="panel">
                        <div className="panel-child">                           
                            <Row className="row-info display">  
                                <Col md={4}>
                                <span>{_.get(rs, `widgetOrder.${pageType}.menu`)}:</span>
                                <span>{_.find(options, (f) => { return f.id == fields.get(index).foodId;}).title}</span>
                                </Col>                                
                                <Col md={4} className="col-drink-option">
                                <span>{_.get(rs, `widgetOrder.${pageType}.price`)}:</span>
                                <span>{fields.get(index).price}</span>
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
        <ul className="lstField">            
            {fields.map((option, index) => {                
                let foodId, priceId;
                if (pageType === 'alter'){
                    if (options.length > 0 && !_.isUndefined(fields.get(index).foodId)){
                        foodId = _.find(options, (f) => { return f.id == fields.get(index).foodId;});
                    }
                    priceId = fields.get(index).price; 
                }                            
                return (
                <li className="itemField" key={index}>
                    <div className="panel">
                        <div className="panel-child">
                            <Row className="row-info">  
                                <Col md={{size:4}}>
                                    <label>{_.get(rs, `widgetOrder.${pageType}.menuOption`)}</label>
                                    <Field
                                        className='control-input'
                                        name={`${option}.foodId`}
                                        valueField='id'
                                        textField='title'
                                        component={renderDropdownList}
                                        val={foodId}
                                        data={options}/>
                                </Col>                                
                                <Col md={{size:4, offset: 1}}>
                                    <label>{_.get(rs, `widgetOrder.${pageType}.price`)}</label>
                                    <Field
                                        className='control-input'
                                        name={`${option}.price`}
                                        component={renderDropdownList}
                                        val={priceId}
                                        data={[ '5000', 
                                        '10000', '15000', '20000', '25000', '30000' ]}/>
                                 </Col>
                                <Col md={{size:2, offset: 1}} className="action"> 
                                    <Button
                                        type="button"
                                        title="Remove Option"
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
        <div className='groupOption'>
            {pageType!=='cooker' && _renderEdit(fields)}
            {pageType==='cooker' && _renderDisplay(fields)}
        </div>
    )  
};

renderOption.propTypes = {
	...FieldProps
};

export default withInputError(renderOption);