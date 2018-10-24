import React, { Component } from "react";
import { Values } from "redux-form-website-template";
import showResults from "../validate/showResults";
import FieldArraysForm from "../FieldArraysForm";
import { withRouter } from "react-router-dom";
import { submitTable } from '../../actions/tableActions';
import { connect } from 'react-redux';


class OrderTable extends Component{
    constructor(){
        super();
        this.state = {
            submission:{
            }
        };
        this.saveOrderTable = this.saveOrderTable.bind(this);
        this.updateSubmission = this.updateSubmission.bind(this);
    }
    updateSubmission(event){
        this.setState({
            submission: <Values form="fieldArrays" />   
        });
    }
    saveOrderTable(){
        this.props.dispatch(submitTable((this.state.submission))); 
        this.props.history.push("/");
    }
    render(){
        return(
            <div style={{ padding: 15 }}>
                <h2>Order food at Table #1</h2>
                <FieldArraysForm onSubmit={this.saveOrderTable} />
                                
            </div>
        )
    }
}

export default withRouter(connect()(OrderTable));
