import React, { Component } from "react";
import { Values } from "redux-form-website-template";
import showResults from "../validate/showResults";
import FieldArraysForm from "../FieldArraysForm";

class OrderFood extends Component{
    render(){
        return(
            <div style={{ padding: 15 }}>
                <h2>Field Arrays</h2>
                <FieldArraysForm onSubmit={showResults} />
                <Values form="fieldArrays" />
            </div>
        )
    }
}
export default OrderFood
