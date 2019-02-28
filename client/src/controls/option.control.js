import React from 'react';
import {FieldProps} from './FieldProps';
import {withInputError} from './hocs.control';
import renderDropdownList from '../controls/dropdown.control';
import { Row, Col, Button, Table } from 'reactstrap';
import { Field} from 'redux-form';
import _ from 'lodash';
const renderOption = ({rs, pageType, options, fields}) =>
{
    const _renderDisplay = () =>{
        return(            
            (fields.length > 0) && <Table responsive>
                <thead className='table-warning'>
                    <tr className='d-flex'>
                        <th className='col-md-4 col-sm-9 col-10'>{_.get(rs, `widgetOrder.menuOption`)}</th>
                        <th className='col-md-8 col-sm-3 col-2'>{_.get(rs, `widgetOrder.price`)}</th>
                    </tr>
                </thead>
                <tbody>
                    {fields.map((option, index) => {
                        return(
                            <tr className='d-flex'>
                                <td className='col-md-4 col-sm-9 col-10'>{_.find(options, (f) => { return f.id == fields.get(index).foodId;}).title}</td>
                                <td className='col-md-8 col-sm-3 col-2'>{fields.get(index).price}</td>
                            </tr>
                        )
                    })}
                </tbody>
            </Table>
        )
    }
    const _renderEdit = ()=>{
        return(
        <ul className='lstField alert-warning'>            
            {fields.map((option, index) => {                
                let foodId, priceId;
                if (pageType === 'alter'){
                    if (options.length > 0 && !_.isUndefined(fields.get(index).foodId)){
                        foodId = _.find(options, (f) => { return f.id == fields.get(index).foodId;});
                    }
                    priceId = fields.get(index).price; 
                }                            
                return (
                <li className='itemField' key={index}>
                    <Row className='row-info'>  
                        <Col xl='4' lg='6' md='6' sm='6' xs='12'>
                            <label>{_.get(rs, `widgetOrder.menuOption`)}</label>
                            <Field
                                className='control-input'
                                name={`${option}.foodId`}
                                valueField='id'
                                textField='title'
                                component={renderDropdownList}
                                val={foodId}
                                data={options}/>
                        </Col>                                
                        <Col sm='4' xs='9'>
                            <label>{_.get(rs, `widgetOrder.price`)}</label>
                            <Field
                                className='control-input'
                                name={`${option}.price`}
                                component={renderDropdownList}
                                val={priceId}
                                data={[ '5000', 
                                '10000', '15000', '20000', '25000', '30000' ]}/>
                            </Col>
                            <Col xl='4' lg='2' md='2' sm='2' xs='3' className='text-right'>
                            <Button
                                type='button'
                                title='Remove Option'
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

renderOption.propTypes = {
	...FieldProps
};

export default withInputError(renderOption);