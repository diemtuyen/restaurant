import React from 'react';
import { connect } from "react-redux";
import {compose} from 'redux';
import _ from 'lodash';
import {cookingActions} from '../actions/cooking.actions';
import {Nav, NavItem, NavLink} from 'reactstrap';
import commonWrapped from '../hocs/hocs.common';

class WidgetListOrder extends React.Component {
  constructor(props) {
    super(props);
  }
  componentDidMount(){ 
    this.props.dispatch(cookingActions.getItems()); 
     
    console.log(this.props.tables) ;     
  }
  render(){
    const lstTable = this.props.tables.map( (item, i) => {
        return ( 
          <NavItem key={i}>
            <NavLink href="#">
              {item.title}
            </NavLink>
          </NavItem> );
    });
    return(
        <Nav vertical>
          {lstTable} 
        </Nav>  
      )
  }
}
const mapStateToProps = state => {
  return {
      tables: state.bookingReducer.tables
  }
}

export default compose(
  connect(mapStateToProps),
  commonWrapped()
)(WidgetListOrder);
