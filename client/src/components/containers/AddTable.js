import React, { Component} from 'react';
import { connect } from 'react-redux';
import {submitTable} from '../../actions/tableActions'
import { withRouter } from "react-router-dom";

class AddTable extends Component {
    constructor(){
        super();
        this.state = {
            submission:{
            }
        };
    }
    updateSubmission(event){
        let updatedSubmission = Object.assign({}, this.state.submission);

        updatedSubmission[event.target.id] = event.target.value;
        this.setState({
            submission: updatedSubmission   
        });
    }

    submitSubmission(){
        this.props.dispatch(submitTable(this.state.submission));    
        this.props.history.push("/");
    }
    render(){
        return (
            <div>
                Ban so <input onChange={this.updateSubmission.bind(this)} id="indexTable" type="number" placeholder= "Ban so ..."/><br/>
                Tinh trang <input onChange={this.updateSubmission.bind(this)} id="statusTable" type="text" /><br/>  
                Ghi chu <input onChange={this.updateSubmission.bind(this)} id="noteTable" type="text" /><br/>  
                <button onClick={this.submitSubmission.bind(this)}>Them ban moi</button>
            </div>
        )
    }
}


export default withRouter(connect()(AddTable))