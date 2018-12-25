import React from 'react';
import { Button } from 'reactstrap';
import { connect } from "react-redux";
import {compose} from 'redux';
import commonWrapped from '../hocs/hocs.common';
import {bookingActions} from '../actions/booking.actions';
import _ from 'lodash'

class DetailItem extends React.Component {
  constructor(props) {
    super(props);
  }
  render () {
    return(   
      <tr>		
        <td>{this.props.index + 1}</td>
        <td>{this.props.item.count}</td>
        <td>{this.props.item.foodId}</td>
        <td>{this.props.item.kindId}</td>
        <td>{this.props.item.isTakeAway}</td>
      </tr>  
    );
  }
}

class DetailList extends React.Component {
  constructor(props) {
    super(props);
  }
  render () {
    if( !_.isUndefined(this.props.details) && !_.isNull(this.props.details)){
      var detail = this.props.details.map((item, index) => {
        return (        
          <DetailItem key={index} item={item} index={index}/>
        );
      });
      return (
        <div>
          <table className='table'>
            <thead>
              <tr>
                <th>No.</th>
                <th>Nums</th>
                <th>Food ID</th>
                <th>Kind ID</th>
                <th>Take away</th>
              </tr>
            </thead>
            <tbody>{detail}</tbody>
          </table>
        </div>
      );
    }
    else{
      return(
        <div>no item</div>
      )
    }
  }
}
  

class WidgetDetailOfOrder extends React.Component {
  constructor (props) {
    super(props);
    this.markDone = this.markDone.bind(this);
    this.state = {
      details: null
    }
  }
  componentDidMount(){
    console.log(this.props.selectOrder)
    if(this.props.selectOrder != null)
    this.setState({
      details: this.props.dispatch(bookingActions.getOrder(this.props.selectOrder))
    })    
  }
  componentWillReceiveProps(nextProps){
    this.props.dispatch(bookingActions.getOrder(nextProps.selectOrder))
    if(nextProps.selectOrder.details != undefined){
      this.setState({
        details: nextProps.selectOrder.details
     })
    }    
  }
  markDone() {
    this.props.dispatch(bookingActions.markDone(this.props.selectOrder));  
  }
  render() {
    return (
      <div className="main">
        <DetailList details={this.state.details}/>
        <Button type="button" onClick={this.markDone}>Done</Button>
      </div>
    );
  }
}
const mapStateToProps = state => {
  return {
    selectOrder: state.bookingReducer.selectOrder      
  }
}

export default compose(
  connect(mapStateToProps),
  commonWrapped()
)(WidgetDetailOfOrder)

