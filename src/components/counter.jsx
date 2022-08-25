import React, { Component } from "react";

class Counter extends Component {
    state = {
        text: <h1>hello world</h1>,
    };

    render() { 
        return (
        <div>
            <span className="badge badge-primary m-2">{this.state.text}</span>
            <button>test</button>
        </div>
        );
    }
}
 
export default Counter;