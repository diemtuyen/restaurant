import _ from 'lodash';
const fnGetMessage = (form, name, validateType) => {
    const rs = _.get(window.restaurant,'resource');
    let mess='';
    let path = `${form}.${name}`;
    switch(validateType){
        case 'required':
        mess = `<i>${_.get(rs, path)}</i> ${_.get(rs,'validate.required')}`;
        break;
    }
    return mess;
}
export const email = message => value => value && !/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(value) ? message : undefined;
export let required = (value,allValues, props, name) =>{
    //https://codesandbox.io/s/ym19345xl9
    return value ? undefined : fnGetMessage(props.form, name,'required');
}