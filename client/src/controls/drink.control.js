import React from 'react';
import {FieldProps} from './FieldProps';
import {withInputError} from './hocs.control';
import renderDropdownList from '../controls/dropdown.control';
import { Row, Col, Button } from 'reactstrap';
import { Field} from 'redux-form';
import _ from 'lodash';
const renderDrink = ({rs, pageType, drinks, fields}) =>
{
    const _renderDisplay = () =>{
        return(
            <ul className="lstField">            
            {fields.map((drink, index) => {
                return (
                <li className="itemField" key={index}>
                    <div className="panel">
                        <div className="panel-child">                           
                            <Row className="row-info display">  
                                <Col md={4}>
                                <span>{_.get(rs, `widgetOrder.${pageType}.menu`)}:</span>
                                <span>{_.find(drinks, (f) => { return f.id == fields.get(index).drinkId;}).title}</span>
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
        <ul className="lstField">            
            {fields.map((drink, index) => {                
                let drinkId, countId;
                if (pageType === 'alter'){
                    if (drinks.length > 0 && !_.isUndefined(fields.get(index).drinkId)){
                        drinkId = _.find(drinks, (f) => { return f.id == fields.get(index).drinkId;});
                    }
                    countId = fields.get(index).count; 
                }                            
                return (
                <li className="itemField" key={index}>
                    <div className="panel">
                        <div className="panel-child">
                            <Row className="row-info">  
                                <Col md={{size:4}}>
                                    <label>{_.get(rs, `widgetOrder.${pageType}.menuDrink`)}</label>
                                    <Field
                                        className='control-input'
                                        name={`${drink}.drinkId`}
                                        valueField='id'
                                        textField='title'
                                        component={renderDropdownList}
                                        val={drinkId}
                                        data={drinks}/>
                                </Col>                                
                                <Col md={{size:4, offset: 2}}>
                                    <label>{_.get(rs, `widgetOrder.${pageType}.sum`)}</label>
                                    <Field
                                        className='control-input'
                                        name={`${drink}.count`}
                                        component={renderDropdownList}
                                        val={countId}
                                        data={[ '1', 
                                        '2', '3', '4', '5', '6' ]}/>
                                 </Col>
                                <Col md={2} className="action"> 
                                    <Button
                                        type="button"
                                        title="Remove Drink"
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