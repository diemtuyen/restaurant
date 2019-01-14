import React from 'react';
import PropTypes from 'prop-types';
import {FieldProps} from './FieldProps';
import {withInputError} from './hocs.control';
import DropdownList from 'react-widgets/lib/DropdownList';

const renderDropdownList = ({input, val, data, groupBy, valueField, textField, meta, showError, showWarn, ...rest}) =>{
    return (
        <DropdownList {...input}
            data={data}
            valueField={valueField}
            textField={textField}
            groupBy={groupBy?groupBy:''}
            defaultValue={input.value}
            onChange={input.onChange} />
    );
}


renderDropdownList.propTypes = {
    groupBy: PropTypes.string,
    ...FieldProps
};

export default withInputError(renderDropdownList);