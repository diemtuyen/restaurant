import React from 'react'
import { Field, reduxForm, formValueSelector  } from 'redux-form'
import { Row, Col, Button } from 'reactstrap';
import { connect } from 'react-redux'

let AddTableForm = props => {
  const { statusTable, noteTable, handleSubmit, pristine, reset, submitting } = props
  return (
    <form onSubmit={handleSubmit}>
      <Row>  
          <Col md={2}>
            Number's table
          </Col>
          <Col md={10}>
            <Field name="indexTable" component="input" type="number" placeholder="Ban so" />
          </Col>
      </Row>
      <Row>  
          <Col md={2}>
            Status
          </Col>
          <Col md={10}>
            <Field name="statusTable" component="select">
              <option />
              <option value="state_order">Con trong</option>
              <option value="state_waiting">Cho phuc vu</option>
              <option value="state_billing">Cho thanh toan</option>
            </Field>
          </Col>
      </Row>
      <Row>  
          <Col md={2}>
          Notes
          </Col>
          <Col md={10}>
            <Field name="noteTable" component="textarea" />
          </Col>
      </Row>
      <Row>  
        <Button type="submit" disabled={pristine || submitting}>
        Add new table
        </Button>
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