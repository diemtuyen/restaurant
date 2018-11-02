import React from 'react'
import { Field, reduxForm, formValueSelector  } from 'redux-form'
import { Row, Col, Button } from 'reactstrap';
import { connect } from 'react-redux'

let AddTableForm = props => {
  const { statusTable, noteTable, handleSubmit, pristine, submitting } = props
  return (
    <form onSubmit={handleSubmit}>
      <Row>  
          <Col md={3}>
            Ban so: 
          </Col>
          <Col md={9}>
            <Field name="indexTable" component="select">
              <option />              
              <option value="1">1</option>
              <option value="2">2</option>
              <option value="3">3</option>
              <option value="4">4</option>
              <option value="5">5</option>
              <option value="6">6</option>
              <option value="7">7</option>
              <option value="8">8</option>
              <option value="9">9</option>
              <option value="10">10</option>
              <option value="11">11</option>
              <option value="12">12</option>
            </Field>
          </Col>
      </Row>
      <Row>  
          <Col md={3}>
            Trang thai:
          </Col>
          <Col md={9}>
            <Field name="statusTable" component="select">
              <option />
              <option value="state_order">Con trong</option>
              <option value="state_waiting">Cho phuc vu</option>
              <option value="state_billing">Cho thanh toan</option>
            </Field>
          </Col>
      </Row>
      <Row>  
          <Col md={3}>
          Ghi chu:
          </Col>
          <Col md={9}>
            <Field name="noteTable" component="input" type="text" fullWidth/>
          </Col>
      </Row>
      <Row>
        <Col md={{ size: 2, offset: 5 }}>          
          <Button type="submit" disabled={pristine || submitting}>
          Them moi
          </Button>
        </Col>
      </Row>
    </form>
  )
}

export default reduxForm({
  form: 'addTableForm' // a unique identifier for this form
})(AddTableForm)

const selector = formValueSelector('addTableForm') // <-- same as form name
AddTableForm = connect(
  state => {
    const { statusTable, noteTable } = selector(state, 'statusTable', 'noteTable')
    return {
      statusTable,
      noteTable
    }
  }
)(AddTableForm)