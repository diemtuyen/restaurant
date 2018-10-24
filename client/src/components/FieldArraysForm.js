import React from 'react';
import { Field, FieldArray, reduxForm } from 'redux-form';
import DropdownList from 'react-widgets/lib/DropdownList'
import SelectList from 'react-widgets/lib/SelectList'
import Multiselect from 'react-widgets/lib/Multiselect'
import validate from './validate/validate';
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

const renderField = ({ input, label, type, meta: { touched, error } }) => (
  <div>
    <label>{label}</label>
    <div>
      <input {...input} type={type} placeholder={label} />
      {touched && error && <span>{error}</span>}
    </div>
  </div>
);

const renderFood = ({ fields, meta: { touched, error, submitFailed } }) => (
  <ul>
    <li>
      <button type="button" onClick={() => fields.push({})}>Add Food</button>
      {(touched || submitFailed) && error && <span>{error}</span>}
    </li>
    {fields.map((food, index) => (
      <li key={index}>
        <button
          type="button"
          title="Remove Food"
          onClick={() => fields.remove(index)}
        />
        <h4>Food #{index + 1}</h4>        
        <Field
          name={`${food}.noodle`}
          component={renderSelectList}
          data={[ 'Bun', 'Bun thit nuong', 'Hu tiu', 'Mi', 'Hu tiu Mi', 'Hu tiu kho', 'Mien' ]}/>
        <Field
          name={`${food}.meat`}
          component={renderMultiselect}
          data={['Thap cam', 'Thit nat', 'Thit gio bo', 'Gio khoanh', ' Xuong', 'Bo', 'Ga', 'Moc', 'Cha' ]}/>
        <Field
          name={`${food}.note`}
          component={renderMultiselect}
          data={['Hanh la', 'Hanh phi', 'Ngo', ' Rau', 'Ca rot', 'Dau phong']}/>
        <Field name={`${food}.count`} component="input" type="number" placeholder="So luong"/>
      </li>
    ))}
  </ul>
);

const FieldArraysForm = props => {
  const { handleSubmit, pristine, reset, submitting } = props;
  return (
    <form onSubmit={handleSubmit}>
      <Field name="tableId" component="input" type="number" placeholder="Table"/>
      <FieldArray name="foods" component={renderFood} />
      <div>
        <button type="submit" disabled={submitting}>Submit</button>
        <button type="button" disabled={pristine || submitting} onClick={reset}>
          Clear Values
        </button>
      </div>
    </form>
  );
};

export default reduxForm({
  form: 'fieldArrays', // a unique identifier for this form
  validate,
})(FieldArraysForm);
