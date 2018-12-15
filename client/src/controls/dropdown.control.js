import React from 'react';
import PropTypes from 'prop-types';
import {FieldProps} from './FieldProps';
import {withInputError} from './hocs.control';
import DropdownList from 'react-widgets/lib/DropdownList';
const renderDropdownList = ({input, data, groupBy, valueField, textField, meta, showError, showWarn, ...rest}) =>{
    if(groupBy){
        return (
            <DropdownList {...input}
                data={data}
                valueField='id'
                textField='title'
                groupBy={groupBy}
                onChange={input.onChange} />
        );
    }else{
        return (
            <DropdownList {...input}
                data={data}
                valueField='id'
                textField='title'
                onChange={input.onChange} />
        );
        
    }
}

renderDropdownList.propTypes = {
    groupBy: PropTypes.string,
    ...FieldProps
};

export default withInputError(renderDropdownList);