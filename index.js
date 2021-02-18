import { createElement, Component, render } from './toy-react';

class MyComponent extends Component {
  constructor() {
    super();
    this.state = { a: 1, b: 2 };
  }
  render() {
    return (
      <div>
        <h1>My component</h1>
        <span>{this.state.a.toString()}</span>
        {this.children}
        <button
          onclick={() => {
            this.state.a += 1;
            this.rerender();
          }}
        >
          add
        </button>
      </div>
    );
  }
}

render(
  <MyComponent id='a' class='c'>
    <div>abc</div>
  </MyComponent>,
  document.body
);
