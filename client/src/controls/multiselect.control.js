import React, {PropTypes} from 'react';
import {FieldProps} from './FieldProps';
import {withInputError} from './hocs.control';
import Multiselect from 'react-widgets/lib/Multiselect';
const renderMultiselect = ({input, data, valueField, textField, meta, showError, showWarn, ...rest}) =>{
	return (
        <Multiselect {...input}
            onBlur={() => input.onBlur()}
            value={input.value || []} // requires value to be an array
            data={data}
            valueField='id'
            textField='title'/>
	);
}

renderMultiselect.propTypes = {
	...FieldProps
};

export default withInputError(renderMultiselect);