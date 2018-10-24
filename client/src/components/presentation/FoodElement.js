import React, { Component} from 'react';
import PropTypes from 'prop-types';

class FoodElement extends Component {
    render(){
        return (
            <div>
                {this.props.data.body}
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