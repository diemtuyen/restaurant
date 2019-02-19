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
            <ul className="lstFood">            
            {fields.map((food, index) => {
                return (
                <li className="itemFood" key={index}>
                    <div className="panel">
                        <div className="panel-child">                           
                            <Row className="row-info display">  
                                <Col md={4}>
                                <span>{_.get(rs, `widgetOrder.${pageType}.menu`)}:</span>
                                <span>{_.find(options, (f) => { return f.id == fields.get(index).drinkId;}).title}</span>
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
            {fields.map((option, index) => {                
                let optionId, countId;
                if (pageType === 'alter'){
                    if (options.length > 0 && !_.isUndefined(fields.get(index).optionId)){
                        optionId = _.find(options, (f) => { return f.id == fields.get(index).optionId;});
                    }
                    countId = fields.get(index).count; 
                }                            
                return (
                <li className="itemFood" key={index}>
                    <div className="panel">
                        <div className="panel-child">
                            <Row className="row-info">  
                                <Col md={{size:4}}>
                                    <label>{_.get(rs, `widgetOrder.${pageType}.menuOption`)}</label>
                                    <Field
                                        className='control-input'
                                        name={`${option}.optionId`}
                                        valueField='id'
                                        textField='title'
                                        component={renderDropdownList}
                                        groupBy='groupName'
                                        val={optionId}
                                        data={options}/>
                                </Col>                                
                                <Col md={{size:4, offset: 2}}>
                                    <label>{_.get(rs, `widgetOrder.${pageType}.price`)}</label>
                                    <Field
                                        className='control-input'
                                        name={`${option}.count`}
                                        component={renderDropdownList}
                                        val={countId}
                                        data={[ '5000', 
                                        '10000', '15000', '20000', '25000', '30000' ]}/>
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