
import React, { Component } from 'react'
import PropTypes from 'prop-types'
import './Counter.css'

// Counter class (contains CounterButton)
class Counter extends Component {

    constructor() {
        super(); // Call super before this. No implicit super call in JS.
        this.state = {
            counter: 0
        }
        // bind functions to the object
        this.increment = this.increment.bind(this);
        this.decrement = this.decrement.bind(this);
        this.reset = this.reset.bind(this);
    }

    render() {
        return (
            <div className="App">
                <CounterButton by={1} incrementMethod={this.increment} decrementMethod={this.decrement} />
                <CounterButton by={5} incrementMethod={this.increment} decrementMethod={this.decrement} />
                <CounterButton by={10} incrementMethod={this.increment} decrementMethod={this.decrement} />
                <span className = "count">{this.state.counter}</span>
                <div><button className = "reset" onClick = {this.reset}>Reset</button></div>
            </div>
        );
    }

    // reset button
    reset() {
        console.log("reset");
        this.setState(
            () => {
            return {counter: 0} 
            }
        );
    }

    // Function increment (by from child)
    // increment = () => {  using arrow function removes need to do binding. But we will stick to using binding for now
    increment(by) {
        console.log(`increment from parent - ${by}`);       // template literal - embedded expressions inside string literal
        this.setState(
            (prevState) => {                                // referencing previous state
            return {counter: prevState.counter + by}        // incrementing it, and returning
            }
        );
    }

    // Function decrement (by from child)
    decrement(by) {
        console.log(`decrement from parent - ${by}`);       // template literal - embedded expressions inside string literal
        this.setState(
            (prevState) => {                                // referencing previous state
            return {counter: prevState.counter - by}        // decrementing it, and returning
            }
        );
    }
}

// Defining CounterButton, child of Counter
class CounterButton extends Component {

    // constructor() {        
    //     super(); // Call super before this. No implicit super call in JS.
    // }

    // Render button with digit of increment and create onClick listener
    // Arrow syntax is required as we need to define it as a method
    render() {
        return (
            <div className="counter">
                <button onClick={() => this.props.incrementMethod(this.props.by)}>+{this.props.by}</button>
                <button onClick={() => this.props.decrementMethod(this.props.by)}>-{this.props.by}</button>
            </div>
        );
    }

}

CounterButton.defaultProps = { // default value for properties
    by: 1
}

CounterButton.propTypes = { // type constraints - to throw error
    by: PropTypes.number
}

// export entire class out
export default Counter;