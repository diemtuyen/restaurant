import React, { Component} from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import { removeFood} from '../../actions/tableActions';
import { connect } from 'react-redux';

class FoodElement extends Component {
    constructor(props){
        super(props);
        this.removeFood= this.removeFood.bind(this);
    }
    removeFood(){
        this.props.dispatch(removeFood(this.props.tableId, this.props.data._id));
        this.props.history.push("/");
    }
    render(){
        return (
            <div>
                <span className="lstOrder">
                    {this.props.data.count && <b>{this.props.data.count}</b>} {this.props.data.noodle && <b>{this.props.data.noodle}</b>} {this.props.data.meat && <b>{this.props.data.meat}</b>} {this.props.data.reject && <span> ( khong {this.props.data.reject}  )</span>} {this.props.data.note && <span>({this.props.data.note})</span>}
                    {this.props.data.hasOptionValue && <i>( THEM: {this.props.data.countOption}{' '}{this.props.data.optional} )</i>}
                </span>
                <Link to={`/table/${this.props.tableId}/food/`} onClick ={this.removeFood}>Delete</Link>
            </div>
        )
    }
}


FoodElement.propTypes = {
    data: PropTypes.shape({
        body: PropTypes.string.isRequired
    })
};

export default (connect()(FoodElement))