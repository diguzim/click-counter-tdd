import React from "react";
import "./App.css";

class App extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      counter: 0,
      displayError: false
    };

    this.handleOnDecrementClick = this.handleOnDecrementClick.bind(this);
  }

  handleOnDecrementClick() {
    if (this.state.counter > 0) {
      this.setState(prevState => ({ counter: prevState.counter - 1 }));
    } else {
      this.setState({ displayError: true });
    }
  }

  render() {
    return (
      <div data-test="component-app">
        <h1 data-test="counter-display">
          The counter is currently {this.state.counter}
        </h1>
        <button
          data-test="increment-button"
          onClick={() =>
            this.setState(prevState => ({
              counter: prevState.counter + 1,
              displayError: false
            }))
          }
        >
          Increment counter
        </button>
        <button
          data-test="decrement-button"
          onClick={this.handleOnDecrementClick}
        >
          Decrement counter
        </button>
        {this.state.displayError && (
          <div data-test="error-display">
            You can't decrease the counter below zero.
          </div>
        )}
      </div>
    );
  }
}

export default App;
