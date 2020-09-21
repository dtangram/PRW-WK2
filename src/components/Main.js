import React, { Component } from 'react';
import ExpenseList from '../components/ExpenseList';

class Main extends Component{
  // NOT NEEDED WITH NEW UPDATES TO REACT VERSION 16
  // constructor(props){
  //   super(props)

    //this.
  state = {
    exList: [
      {
        expense: "Tacos",
        amount: "2.50"
      }
    ],
  }
    
    focusInput = React.createRef();
    //THIS IS NO LONGER NEEDED IF YOU CHANGE FUNCTION TO ARROW FUNCTIONS
    // this.addExpense = this.addExpense.bind(this);
    // this.changeExpense = this.changeExpense.bind(this);
    // this.changeAmount = this.changeAmount.bind(this);
    // this.removeExpense = this.removeExpense.bind(this);
  //}

  // componentWillMount(){
  //   if(localStorage.getItem("expField") && localStorage.getItem("amtField")){
  //     let currExp = document.querySelector(".currExp article ul");
  //     this.setState({currExp: currExp});
  //   }
  // }

  componentDidMount = () => {
    let exList = this.state.exList;
    this.focusInput.current.focus();
    if(localStorage.getItem(exList)){
      this.setState({exList: exList});
    }
  }

  componentWillUpdate = (nextProps, nextState) => {
    let expField = document.querySelector("#expField").value;
    let amtField = document.querySelector("#amtField").value;
    localStorage.setItem("expField", expField);
    localStorage.setItem("amtField", amtField);
  }

  changeExpense = e => {
    e.preventDefault();
    let expField = document.querySelector("#expField").value;
    let errExp = document.querySelector("#errExp");

    this.setState({expense: e.target.value});

    if(expField === null){
      errExp.innerHTML ="Please enter a name";
      return false;
    }
  }

  changeAmount = e => {
    e.preventDefault();

    let amtField = document.querySelector("#amtField").value;
    let errAmt = document.querySelector("#errAmt");
    let amountInput = e.target.value;

    amountInput = parseFloat(amountInput).toFixed(2);
    this.setState({amount: amountInput});

    if(amtField === null){
      errAmt.innerHTML = "Please enter a valid amount";
      return false;
    }
  }

  addExpense = e => {
    e.preventDefault();
    let errExp = document.querySelector("#errExp");
    let errAmt = document.querySelector("#errAmt");
    let exList = this.state.exList;

    if(exList === null){
      errExp.innerHTML ="Please enter a name";
      return false;
    }

    if(this.state.amount === 0){
      errAmt.innerHTML = "Please enter a valid amount";
      return false;
    }

    if(isNaN(this.state.amount)){
      errAmt.innerHTML = "The amount must be a number";
      return false;
    }

    this.state.exList.push({"expense": this.state.expense, "amount": this.state.amount});
    this.setState({exList});
    e.target.reset();
  }

  removeExpense = key => {
    let exList = this.state.exList;
    this.state.exList.splice(key, 1);
    this.setState({exList});
    localStorage.setItem("exList", JSON.stringify(exList));
  }

  render(){
    let myExpenses = this.state.exList.map((val, key) => {
      return <ExpenseList val={val} key={key} id={key} delMe={()=>this.removeExpense(key)}/>
    });

    return(
      <main className="ContactList">
        <section className="add">
          <h2>Add new expense</h2>
          {/*This week you will need to change the form to a component*/}
          <form name="myForm" onSubmit={this.addExpense}>
            <p id="errExp"></p>
            <input id="expField" type="text" name="expense" placeholder="Expense" ref={this.focusInput} onChange={this.changeExpense}/>

            <input id="amtField" type="text" name="amount" placeholder="Amount" onChange={this.changeAmount}/>
            <p id="errAmt"></p>
            {/*CHANGED FUNCTION TO RUN ON SUBMIT NOT BUTTON*/}
            <button type="submit" className="btn">Add</button>
          </form>
        </section>

        <section className="currExp">
          <h2>Current Expenses</h2>
          <article className="contentScroll">
            <ul className="expenseCont">{myExpenses}</ul>
          </article>
        </section>
      </main>
    )
  }
}

export default Main;
