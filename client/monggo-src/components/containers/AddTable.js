import React, { Component} from 'react';
import { connect } from 'react-redux';
import {submitTable} from '../../actions/tableActions';
import { withRouter } from "react-router-dom";
import AddTableForm from "../AddTableForm";

class AddTable extends Component {
    constructor(props) {
        super(props);    
        this.submitSubmission = this.submitSubmission.bind(this);
    }
    submitSubmission(values){        
        this.props.dispatch(submitTable(values));    
        this.props.history.push("/");
    }
    render(){
        return (
            <div className="newTable">
                <AddTableForm onSubmit={this.submitSubmission}/> 
                </div>
        )
    }
}


export default withRouter(connect()(AddTable))