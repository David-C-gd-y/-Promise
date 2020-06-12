import React, {  Component } from 'react';
import { createStore } from './redux';
import './App.css';
function reducer(state = 0, action) {
  switch (action.type) {
    case 'INCREMENT':
      return state + 1;
    case 'DECREMENT':
      return state - 1;
    default:
      return state;
  }
}
const store = createStore(reducer, 0);

class App extends Component {
  constructor(props) {
    super(props);
    this.state = { value: 0 };
  }

  componentDidMount() {
    this.unsubscribe = store.subscribe(() => this.setState({ value: store.getState() }))
  }

  componentWillUnmount() {
    this.unsubscribe();
  }

  render() {
    return (<div>
      <p>{this.state.value}</p>
      <button onClick={() => store.dispatch({ type: 'INCREMENT' })}>+</button>
      <button onClick={() => store.dispatch({ type: 'DECREMENT' })}>-</button>
      <button onClick={() => setTimeout(() => {
        store.dispatch({ type: 'INCREMENT' })
      }, 1000)}>1秒后 加 1</button>
    </div>)
  }
}
export default App;
