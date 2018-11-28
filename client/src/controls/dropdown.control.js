import React, {PropTypes} from 'react';
import {FieldProps} from './FieldProps';
import {withInputError} from './hocs.control';
import DropdownList from 'react-widgets/lib/DropdownList';
const renderDropdownList = ({input, data, valueField, textField, meta, showError, showWarn, ...rest}) =>{
    return (
        <DropdownList {...input}
            data={data}
            valueField='id'
            textField='title'
            onChange={input.onChange} />
	);
}

renderDropdownList.propTypes = {
	...FieldProps
};

export default withInputError(renderDropdownList);