import React from 'react';
import { Field, FieldArray, reduxForm } from 'redux-form';
import DropdownList from 'react-widgets/lib/DropdownList';
import Multiselect from 'react-widgets/lib/Multiselect';
import { Row, Col, Button } from 'reactstrap';
import 'react-widgets/dist/css/react-widgets.css'
import _ from 'lodash';



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

const renderField = ({ input, label, type, meta: { touched, error } }) => (
  <div>
    <label>{label}</label>
    <div>
      <input {...input} type={type} placeholder={label} />
      {touched && error && <span>{error}</span>}
    </div>
  </div>
);

const renderFoods = ({ fields, meta: { touched, error, submitFailed } }) => (
  <ul className="lstFood">
    <li className="itemFood">
      <Button onClick={() => fields.push({})}>Add Food</Button>
      {(touched || submitFailed) && error && <span>{error}</span>}
    </li>
    {fields.map((food, index) => (
      <li className="itemFood" key={index}>
        <button
          type="button"
          title="Remove Food"
          onClick={() => fields.remove(index)}
        />
        <h4>Food {index + 1}</h4>
        <Row>  
          <Col md={4}>
            <label>Category</label>
            <Field
              name={`${food}.category`}
              component={renderDropdownList}
              data={[ 'Bun', 'Hu tiu', 'Mien', 'Mi', 'Hu tiu Mi', 'Hu tiu kho', 'Bun thit nuong' ]}/>
          </Col>
          <Col md={4}>
            <label>Type</label>
            <Field
              name={`${food}.type`}
              component={renderDropdownList}
              data={['Binh thuong', 'To nho', 'To dac biet' ]}/>
          </Col>
          <Col md={4}>
            <label>Nums</label>
            <Field
              name={`${food}.nums`}
              component={renderDropdownList}
              data={[ '1', '2', '3', '4', '5', '6' ]}/> 
          </Col>
        </Row> 
        <Row>            
          <Col md={12}>
            <label>Utility</label>
            <Field
              name="utility"
              component={renderMultiselect}
              data={['Thap cam', 'Thit nat', 'Thit gio bo', 'Gio khoanh', ' Xuong', 'Bo', 'Ga', 'Moc', 'Cha' ]}/>
          </Col>
        </Row>
        <Row>
          <Col md={12}>
            <label>Exception</label>
            <Field
              name="reject"
              component={renderMultiselect}
              data={['Hanh la', 'Hanh phi', 'Tieu', 'Dau phong', 'Ngo', ' Rau', 'Ca rot']}/>
          </Col>
        </Row>
        <Row>
          <Col md={12}>
            <label>Note</label>{' '}
            <Field name="note" component="input" type="text" style={{width: 100 + '%'}}/>
          </Col>
        </Row>       
      </li>
    ))}
  </ul>
);

const OrderArraysForm = props => {
  const { handleSubmit, pristine, reset, submitting } = props;
  const rs = _.get(window.restaurant,'resource');
  return (
    <form onSubmit={handleSubmit}>
      <h2 className="alignC">{_.get(rs,'bookForm.title')}</h2> 
      <Row>
        <Col sm="6" md="8">
          <label htmlFor="table">{_.get(rs,'bookForm.tableId')}</label>
          <Field
            name="table"
            component={renderDropdownList}
            data={[ '1', '2', '3', '4', '5', '6', '7', '8', '9', '10' ]}/> 
        </Col>
        <Col sm="6" md="4">
          <br/>
          <label name="takeAway">{_.get(rs,'bookForm.takeAway')}</label>
          <Field
            name="takeAway"
            id="takeAway"
            component="input"
            type="checkbox" />
        </Col>
      </Row>
      <Row>
        <Col sm="12" md="12">        
          <FieldArray name="foods" component={renderFoods} />
        </Col>
      </Row>
      <Row>
        <Col sm="12" md="12" className="alignC">        
          <Button type="submit" disabled={submitting}>{_.get(rs,'bookForm.submit')}</Button>
        </Col>
      </Row>
    </form>
  );
};

export default reduxForm({
  form: 'OrderFieldArrays',
})(OrderArraysForm);
