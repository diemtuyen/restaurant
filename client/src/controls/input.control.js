import React, {PropTypes} from 'react';
import {FieldProps} from './FieldProps';
import {withInputError} from './hocs.control';

const renderInput = ({input, meta, showError, showWarn, ...rest}) => (
	<input
		{...input}
		{...rest}
		className='form-control'
	/>
);

renderInput.propTypes = {
	...FieldProps
};

export default withInputError(renderInput);