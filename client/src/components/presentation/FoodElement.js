import React, { Component} from 'react';
import PropTypes from 'prop-types';

class FoodElement extends Component {
    render(){
        return (
            <div>
                <p>
                    {this.props.data.count && <b>{this.props.data.count}</b>} {this.props.data.noodle && <b>{this.props.data.noodle}</b>} {this.props.data.meat && <b>{this.props.data.meat}</b>} {this.props.data.reject && <span> ( khong {this.props.data.reject}  )</span>} {this.props.data.note && <span>({this.props.data.note})</span>}
                    {this.props.data.hasOptionValue && <i>( THEM: {this.props.data.countOption}{' '}{this.props.data.optional} )</i>}
                </p>
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