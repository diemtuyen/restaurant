import React from 'react'
import { Field, reduxForm, formValueSelector  } from 'redux-form'
import DropdownList from 'react-widgets/lib/DropdownList'
import SelectList from 'react-widgets/lib/SelectList'
import Multiselect from 'react-widgets/lib/Multiselect'
import { connect } from 'react-redux'
import 'react-widgets/dist/css/react-widgets.css'


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

let WidgetForm = props => {
  const { noodle, meat, note, count, handleSubmit, pristine, reset, submitting  } = props
  return (
    <form onSubmit={handleSubmit} >      
        <div>
            <label>So luong</label>
            <Field name="count" component="input" type="number" placeholder="So luong"/>
        </div>
        <div>
            <label>Mon</label>
            <Field
                name="noodle"
                component={renderSelectList}
                // data={[ 'Bun', 'Bun thit nuong', 'Hu tiu', 'Mi', 'Hu tiu Mi', 'Hu tiu kho', 'Mien' ]}/>
                data={[ 'Bun', 'Hu tiu', 'Mien' ]}/>
        </div>
        <div>
            <label>Thit</label>
            <Field
                name="meat"
                component={renderMultiselect}
                // data={['Thap cam', 'Thit nat', 'Thit gio bo', 'Gio khoanh', ' Xuong', 'Bo', 'Ga', 'Moc', 'Cha' ]}/>
                data={[' Thap cam ', ' Bo ', ' Moc ', ' Cha ' ]}/>
        </div>
        <div>
            <label>Khong an</label>
            <Field
                name="note"
                component={renderMultiselect}
                // data={['Hanh la', 'Hanh phi', 'Ngo', ' Rau', 'Ca rot', 'Dau phong']}/>
                data={['Hanh la', 'Hanh phi']}/>
        </div>  
        
        <p>{count && <b>{count}: </b>} {noodle && <b>{noodle}</b>} {meat && <i>{meat}</i>} {note && <span>~{note}</span>}</p>   
        <div>
            <button type="submit" disabled={pristine || submitting}>Order</button>
        </div>
    </form>
  )
}

WidgetForm = reduxForm({
  form: 'reactWidgets'  // a unique identifier for this form
})(WidgetForm)

const selector = formValueSelector('reactWidgets') // <-- same as form name
WidgetForm = connect(
  state => {
    const { noodle, meat, note, count } = selector(state, 'noodle', 'meat', 'note', 'count')
    return {
      noodle,
      meat,
      note, 
      count
    }
  }
)(WidgetForm)

export default WidgetForm