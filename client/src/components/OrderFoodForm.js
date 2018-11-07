import React from 'react'
import { reset, Field, reduxForm, formValueSelector  } from 'redux-form'
import DropdownList from 'react-widgets/lib/DropdownList'
import SelectList from 'react-widgets/lib/SelectList'
import Multiselect from 'react-widgets/lib/Multiselect'
import { connect } from 'react-redux'
import 'react-widgets/dist/css/react-widgets.css'
import {Row, Col, Button} from 'reactstrap'

const required = value => value ? undefined : 'Required'
const numbers = value =>(parseFloat(value) > 0) ? value : 'Required';

const renderDropdownList = ({ input, data, valueField, textField, meta: { touched, error, warning } }) =>
  <div>
    <DropdownList {...input}
      data={data}
      valueField={valueField}
      textField={textField}
      onChange={input.onChange} />
    {touched && ((error && <span className="required">{error}</span>) || (warning && <span>{warning}</span>))}
  </div>

const renderMultiselect = ({ input, data, valueField, textField, meta: { touched, error, warning } }) =>
  <div>
    <Multiselect {...input}
      onBlur={() => input.onBlur()}
      value={input.value || []} // requires value to be an array
      data={data}
      valueField={valueField}
      textField={textField}
    />
    {touched && ((error && <span className="required">{error}</span>) || (warning && <span>{warning}</span>))}
  </div>

const renderSelectList = ({ input, data }) =>
  <SelectList {...input}
    onBlur={() => input.onBlur()}
    data={data} />

let OrderFoodForm = props => {
  const { hasOptionValue, noodle, meat, reject, note, count, optional, countOption, priceOption , handleSubmit, pristine, reset, submitting  } = props
  return (
    <form onSubmit={handleSubmit} >      
      <Row>  
        <Col md={4}>
          <label>Mon</label>
          <Field
            name="noodle"
            component={renderDropdownList}
            validate={required}
            data={[ 'Bun', 'Hu tiu', 'Mien', 'Mi', 'Hu tiu Mi', 'Hu tiu kho', 'Bun thit nuong' ]}/>
        </Col>
        <Col md={4}>
          <label>Thit</label>
          <Field
            name="meat"
            component={renderMultiselect}
            validate={required}
            data={['Thap cam', 'Thit nat', 'Thit gio bo', 'Gio khoanh', ' Xuong', 'Bo', 'Ga', 'Moc', 'Cha' ]}/>
        </Col>
        <Col md={4}>
          <label>Khong an</label>
          <Field
            name="reject"
            component={renderMultiselect}
            data={['Hanh la', 'Hanh phi', 'Dau phong', 'Ngo', ' Rau', 'Ca rot']}/>
        </Col>
      </Row>
      <Row className="marginT">
        <Col md={6} className="alignR">
          <label>So luong: </label>{' '}
          <Field name="count" component="input" type="number"/>
        </Col> 
        <Col md={6}>
          <label>Ghi chu: </label>{' '}
          <Field name="note" component="input" type="text"/>
        </Col>       
      </Row> 
      <Row className="marginT alignC">
        <Col md={12}>
            <label htmlFor="hasOption">Them tuy chon ???</label>
            <Field
              name="hasOption"
              id="hasOption"
              component="input"
              type="checkbox"
            />
          </Col> 
      </Row>    
      {hasOptionValue &&
        <Row>  
          <Col md={4}>
            <label>Tuy chon</label>
            <Field
              name="optional"
              component={renderDropdownList}
              data={['Thit gio bo', 'Gio khoanh', ' Xuong', 'Bo', 'Ga', 'Moc', 'Cha' ]}/>
          </Col>
          <Col md={4}>
            <label>So luong</label><br/>
            <Field
              name="countOption"
              component={renderDropdownList}
              data={[ '1', '2', '3', '4', '5', '6', '7', '8', '9', '10', '11', '12', '13', '14' ]}/>
          </Col>
          <Col md={4}>
            <label>Don gia</label>          
            <Field
              name="priceOption"
              component={renderDropdownList}
              data={[ '5000', '10000', '15000', '20000', '25000', '30000' ]}/>
          </Col>
        </Row>
      }
      <p style={{ textAlign: 'center', color: 'blue', padding: 15}}>
        {count && <b>{count}</b>} {noodle && <b>{noodle}</b>} {meat && <b>{meat}</b>} {reject && <span> ( khong {reject}  )</span>} {note && <span>({note})</span>}
        {hasOptionValue && <i>( THEM: {countOption}{' '}{optional} )</i>}
      </p>
      <div className="alignC">
          <Button type="submit" disabled={pristine || submitting}>Order</Button>{' '}
      </div>
    </form>
  )
}
const afterSubmit = (result, dispatch) =>
  dispatch(reset('reactWidgets'));

OrderFoodForm = reduxForm({
  form: 'reactWidgets',
  onSubmitSuccess: afterSubmit,
  initialValues: { count: '1', countOption: '1' }
})(OrderFoodForm)


const selector = formValueSelector('reactWidgets') // <-- same as form name
OrderFoodForm = connect(
  state => {
    const hasOptionValue = selector(state, 'hasOption');
    const { optional, countOption, priceOption } = selector(state, 'optional', 'countOption', 'priceOption');
    const { noodle, meat, reject, note, count } = selector(state, 'noodle', 'meat', 'reject', 'note', 'count')
    return {
      hasOptionValue,
      optional, countOption, priceOption,
      noodle, meat, reject, note, count
    }
  }
)(OrderFoodForm)

export default OrderFoodForm