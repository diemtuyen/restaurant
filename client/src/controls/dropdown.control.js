import React from 'react';
import PropTypes from 'prop-types';
import {FieldProps} from './FieldProps';
import {withInputError} from './hocs.control';
import DropdownList from 'react-widgets/lib/DropdownList';
const renderDropdownList = ({input, defaultValue, data, groupBy, valueField, textField, meta, showError, showWarn, ...rest}) =>{
    if(groupBy){
        return (
            <DropdownList {...input}
                data={data}
                valueField='id'
                textField='title'
                groupBy={groupBy}
                value={defaultValue}
                onChange={input.onChange} />
        );
    }else{
        return (
            <DropdownList {...input}
                data={data}
                valueField='id'
                textField='title'
                value={defaultValue}
                onChange={input.onChange} />
        );
        
    }
}

renderDropdownList.propTypes = {
    groupBy: PropTypes.string,
    ...FieldProps
};

export default withInputError(renderDropdownList);