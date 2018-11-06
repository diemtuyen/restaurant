const validate = values => {
  console.log(values)
    const errors = {};
    if (!values.noodle) {
      errors.noodle = 'Required';
    }
    if (!values.meat) {
      errors.meat = 'Required';
    }
    return errors;
  };
  
  export default validate;
  