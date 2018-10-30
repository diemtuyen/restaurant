import React, { Component} from 'react';
import PropTypes from 'prop-types';

class FoodElement extends Component {
    render(){
        return (
            <div>
                {this.props.data.count && <span>{this.props.data.count}</span>} {this.props.data.noodle && <b>{this.props.data.noodle}</b>} {this.props.data.meat && <i>{this.props.data.meat}</i>} {this.props.data.note && <span>~{this.props.data.note}</span>}
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