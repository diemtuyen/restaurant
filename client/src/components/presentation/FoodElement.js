import React, { Component} from 'react';
import PropTypes from 'prop-types';

class FoodElement extends Component {
    render(){
        return (
            <div>
                {this.props.data.count && <span>{this.props.data.count}</span>} {' '}
                {this.props.data.noodle && <span>{this.props.data.noodle}</span>}{' '} 
                {this.props.data.meat && <span>{this.props.data.meat}</span>}{' '}
                {this.props.data.note && <span>~{this.props.data.note}</span>}{' '}
                {this.props.data.hasOptionValue && <i>({this.props.data.countOption}{' '}{this.props.data.optional})</i>}
            </div>
        )
    }
}


FoodElement.propTypes = {
    data: PropTypes.shape({
        body: PropTypes.string.isRequired
    })
};

export default FoodElement