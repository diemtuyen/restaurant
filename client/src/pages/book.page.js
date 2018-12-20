import React from 'react';
import _ from 'lodash';
import { connect } from "react-redux";
import {compose} from 'redux';
import { Row, Col } from 'reactstrap';
import commonWrapped from '../hocs/hocs.common';
import {bookingActions} from '../actions/booking.actions';
import {adminActions} from '../actions/admin.actions';
import SubmitBookForm from '../components/SubmitBookForm';
import TodoApp from '../components/WidgetBook'


class BookPage extends React.Component {    
    constructor (props) {
        super(props);
        this.state={
            todoItems: []
        }
    }
    componentDidMount(){ 
        this.props.dispatch(bookingActions.getCategories()); 
    }
    render(){ 
        return(
            <div>
                <div className="title">
                    <h2>Book Management</h2>
                </div>
                <Row>
                    <Col sm="8" md="9">
                        <TodoApp initItems={this.state.todoItems} />
                        {/* <SubmitBookForm tables={this.props.tables} categories={this.props.categories} kinds={this.props.kinds} excepts={this.props.excepts} utilities={this.props.utilities}/>                         */}
                        {/* {(this.props.categories.length > 0) ?
                        <BookList items={this.props.categories} removeItem={this.removeItem}/>: 
                        <div className="alignC">There are no items in list</div>} */}
                    </Col>
                    <Col sm="4" md="3">aaab aa aaa aaa</Col>
                </Row>
            </div>
        )
    }
}

const mapStateToProps = state => {
    return {
        tables: state.bookingReducer.tables,
        categories: state.bookingReducer.categories,
        kinds: state.bookingReducer.kinds,
        excepts: state.bookingReducer.excepts,
        utilities: state.bookingReducer.utilities,
    }
  }
  
export default compose(
    connect(mapStateToProps),
    commonWrapped()
  )(BookPage);