import React, {PropTypes} from 'react';
import {FieldProps} from './FieldProps';
import {withInputError} from './hocs.control';

const renderInput = ({input, meta, showError, showWarn, ...rest}) =>{
	
	return (
			<input
				{...input}
				{...rest}
				className={`form-control ${showError && meta.touched && meta.error ? ' is-invalid' : ''}`}
			/>
		);
}

renderInput.propTypes = {
	...FieldProps
};

export default withInputError(renderInput);