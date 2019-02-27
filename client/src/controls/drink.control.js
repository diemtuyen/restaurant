import React from 'react';
import {FieldProps} from './FieldProps';
import {withInputError} from './hocs.control';
import renderDropdownList from '../controls/dropdown.control';
import { Row, Col, Button, Table } from 'reactstrap';
import { Field} from 'redux-form';
import _ from 'lodash';
const renderDrink = ({rs, pageType, drinks, fields}) =>
{
    const _renderDisplay = () =>{
        return(
            (fields.length > 0) && <Table responsive>
                <thead className='table-info'>
                    <tr className='d-flex'>
                        <th className='col-md-4 col-sm-9 col-10'>{_.get(rs, `widgetOrder.menuDrink`)}</th>
                        <th className='col-md-8 col-sm-3 col-2'>{_.get(rs, `widgetOrder.sum`)}</th>
                    </tr>
                </thead>
                <tbody>
                    {fields.map((food, index) => {
                        return(
                            <tr className='d-flex'>
                                <td className='col-md-4 col-sm-9 col-10'>{_.find(drinks, (f) => { return f.id == fields.get(index).drinkId;}).title}</td>
                                <td className='col-md-8 col-sm-3 col-2'>{fields.get(index).count}</td>
                            </tr>
                        )
                    })}
                </tbody>
            </Table>
        )
    }
    const _renderEdit = ()=>{
        return(
        <ul className='lstField alert-info'>            
            {fields.map((drink, index) => {                
                let drinkId, countId;
                if (pageType === 'alter'){
                    if (drinks.length > 0 && !_.isUndefined(fields.get(index).drinkId)){
                        drinkId = _.find(drinks, (f) => { return f.id == fields.get(index).drinkId;});
                    }
                    countId = fields.get(index).count; 
                }                            
                return (
                <li className='itemField' key={index}>
                    <Row className='row-info'>  
                        <Col xl='4' lg='6' md='6' sm='6' xs='12'>
                            <label>{_.get(rs, `widgetOrder.menuDrink`)}</label>
                            <Field
                                className='control-input'
                                name={`${drink}.drinkId`}
                                valueField='id'
                                textField='title'
                                component={renderDropdownList}
                                val={drinkId}
                                data={drinks}/>
                        </Col>                                
                        <Col sm='4' xs='9'>
                            <label>{_.get(rs, `widgetOrder.sum`)}</label>
                            <Field
                                className='control-input'
                                name={`${drink}.count`}
                                component={renderDropdownList}
                                val={countId}
                                data={[ '1', 
                                '2', '3', '4', '5', '6' ]}/>
                        </Col>                                
                        <Col xl='4' lg='2' md='2' sm='2' xs='3' className='text-right'>
                            <Button
                                type='button'
                                title='Remove Drink'
                                onClick={() => fields.remove(index)}>
                                <i class='fa fa-trash-o' aria-hidden='true'></i>
                            </Button>
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

renderDrink.propTypes = {
	...FieldProps
};

export default withInputError(renderDrink);