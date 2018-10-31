import React, { Component} from 'react';
import { connect } from 'react-redux';
import {submitTable} from '../../actions/tableActions'
import { withRouter } from "react-router-dom";
import { Button } from 'reactstrap';
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
                {/* Ban so <input onChange={this.updateSubmission.bind(this)} id="indexTable" type="number" placeholder= "Ban so ..."/><br/>
                Tinh trang <input onChange={this.updateSubmission.bind(this)} id="statusTable" type="text" /><br/>  
                Ghi chu <input onChange={this.updateSubmission.bind(this)} id="noteTable" type="text" /><br/>   */}
                </div>
        )
    }
}


export default withRouter(connect()(AddTable))