import React from 'react';
import PropTypes from 'prop-types';
import HtmlUtils from '../helpers/htmlUtils';
const withInputError = (Comp) => props => {
	return (
	<div className={props.className ? (props.className + (props.showError && props.meta.touched && props.meta.error ? ' input-group' : '')) : (props.showError && props.meta.touched && props.meta.error ? ' has-error' : '')}>
		<Comp {...props} />
		{
			props.showError && props.meta.touched && props.meta.error && <div className='invalid-feedback'>{HtmlUtils.htmlToReact(props.meta.error)}</div>
		}
		{
			props.showWarn && props.meta.touched && props.meta.warning && <div className='invalid-feedback'>{HtmlUtils.htmlToReact(props.meta.warning)}</div>
		}
	</div>
	);
};

withInputError.propTypes = {
	className: PropTypes.string,
	showError: PropTypes.bool,
	showWarn: PropTypes.bool
};

withInputError.defaultProps = {
	showError: true,
	showWarn: true
};

export {withInputError};