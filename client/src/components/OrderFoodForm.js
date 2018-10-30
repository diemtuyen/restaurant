import React from 'react'
import { Field, reduxForm, formValueSelector  } from 'redux-form'
import DropdownList from 'react-widgets/lib/DropdownList'
import SelectList from 'react-widgets/lib/SelectList'
import Multiselect from 'react-widgets/lib/Multiselect'
import { connect } from 'react-redux'
import 'react-widgets/dist/css/react-widgets.css'
import {Row, Col, Button} from 'reactstrap'

const renderDropdownList = ({ input, data, valueField, textField }) =>
  <DropdownList {...input}
    data={data}
    valueField={valueField}
    textField={textField}
    onChange={input.onChange} />

const renderMultiselect = ({ input, data, valueField, textField }) =>
  <Multiselect {...input}
    onBlur={() => input.onBlur()}
    value={input.value || []} // requires value to be an array
    data={data}
    valueField={valueField}
    textField={textField}
  />

const renderSelectList = ({ input, data }) =>
  <SelectList {...input}
    onBlur={() => input.onBlur()}
    data={data} />

let OrderFoodForm = props => {
  const { hasOptionValue, noodle, meat, note, count, optional, countOption, priceOption , handleSubmit, pristine, reset, submitting  } = props
  return (
    <form onSubmit={handleSubmit} >      
      <Row>  
        <Col md={6}>
          <label>Mon</label>
          <Field
            name="noodle"
            component={renderSelectList}
            data={[ 'Bun', 'Bun thit nuong', 'Hu tiu', 'Mi', 'Hu tiu Mi', 'Hu tiu kho', 'Mien' ]}/>
        </Col>
        <Col md={6}>
          <label>Thit</label>
          <Field
            name="meat"
            component={renderMultiselect}
            data={['Thap cam', 'Thit nat', 'Thit gio bo', 'Gio khoanh', ' Xuong', 'Bo', 'Ga', 'Moc', 'Cha' ]}/>
        </Col>
      </Row>
      <Row>  
        <Col md={6}>
          <label>Khong an</label>
          <Field
            name="note"
            component={renderMultiselect}
            data={['Hanh la', 'Hanh phi', 'Ngo', ' Rau', 'Ca rot', 'Dau phong']}/>
        </Col>
        <Col md={6}>
          <label>So luong</label>
          <br/>
          <Field name="count" component="input" type="number" placeholder="So luong"/>
        </Col>
      </Row>
      <div>
        <label htmlFor="hasOption">Tuy chon ?</label>
        <Field
          name="hasOption"
          id="hasOption"
          component="input"
          type="checkbox"
        />
      </div>
      {hasOptionValue &&
        <div>
          <label>Tuy chon</label>
          <Field
            name="optional"
            component={renderMultiselect}
            data={['Thit gio bo', 'Gio khoanh', ' Xuong', 'Bo', 'Ga', 'Moc', 'Cha' ]}/>
          <label>So luong</label>
          <Field name="countOption" component="input" type="number" placeholder="So luong"/>
          <label>Don gia</label>          
          <Field
            name="priceOption"
            component={renderDropdownList}
            data={[ '5000', '10000', '15000', '20000', '25000', '30000' ]}/>
        </div>
      }
      <p style={{ textAlign: 'center', color: 'red', padding: 15}}>{count && <b>{count}</b>} {noodle && <b>{noodle}</b>} {meat && <i>{meat}</i>} {note && <span>~{note}</span>}</p>  
      <div className="alignCenter">
          <Button type="submit" disabled={pristine || submitting}>Order</Button>
      </div>
    </form>
  )
}

OrderFoodForm = reduxForm({
  form: 'reactWidgets'  // a unique identifier for this form
})(OrderFoodForm)


const selector = formValueSelector('reactWidgets') // <-- same as form name
OrderFoodForm = connect(
  state => {
    const hasOptionValue = selector(state, 'hasOption');
    const { optional, countOption, priceOption } = selector(state, 'optional', 'countOption', 'priceOption');
    const { noodle, meat, note, count } = selector(state, 'noodle', 'meat', 'note', 'count')
    return {
      hasOptionValue,
      optional, countOption, priceOption,
      noodle, meat, note, count
    }
  }
)(OrderFoodForm)

export default OrderFoodForm