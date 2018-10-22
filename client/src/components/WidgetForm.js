import React from 'react'
import { Field, reduxForm } from 'redux-form'
import DropdownList from 'react-widgets/lib/DropdownList'
import SelectList from 'react-widgets/lib/SelectList'
import Multiselect from 'react-widgets/lib/Multiselect'

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

let ReactWidgetsForm = props => {
  const { handleSubmit, pristine, reset, submitting } = props
  return (
    <form onSubmit={handleSubmit}>      
        <div>
            <label>Mon</label>
            <Field
                name="noodle"
                component={renderSelectList}
                data={[ 'Bun', 'Bun thit nuong', 'Hu tiu', 'Mi', 'Hu tiu Mi', 'Hu tiu kho', 'Mien' ]}/>
        </div>
        <div>
            <label>Thit</label>
            <Field
                name="meat"
                component={renderMultiselect}
                data={['Thap cam', 'Thit nat', 'Thit gio bo', 'Gio khoanh', ' Xuong', 'Bo', 'Ga', 'Moc', 'Cha' ]}/>
        </div>
        <div>
            <label>Khong an</label>
            <Field
                name="except"
                component={renderMultiselect}
                data={['Hanh la', 'Hanh phi', 'Ngo', ' Rau', 'Ca rot', 'Dau phong']}/>
        </div>  
        <div>
            <label>So luong</label>
            <Field name="soluong" component="input" type="number" placeholder="So luong"/>
        </div>      
        <div>
            <button type="submit" disabled={pristine || submitting}>Them</button>
        </div>
    </form>
  )
}

ReactWidgetsForm = reduxForm({
  form: 'reactWidgets'  // a unique identifier for this form
})(ReactWidgetsForm)

export default ReactWidgetsForm