import React, { Component } from 'react';
import {MdDelete} from "react-icons/md";
// import MdCreate from "react-icons/libs/md/create";

class ExpenseList extends Component{
  render(){
    return(
      <li key={this.props.id} className="list">
        <span>{this.props.val.expense}</span>
        <span>${this.props.val.amount}</span>
        <button className="btn btn-small" onClick={this.props.delMe}><MdDelete/></button>
      </li>
    )
  }
}

export default ExpenseList;
