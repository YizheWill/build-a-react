import { createElement } from './toy-react';

class MyComponent {
  render() {
    return <div></div>;
  }
}

render(
  <MyComponent id='a' class='c'>
    <div>abc</div>
    <div></div>
    <div></div>
  </MyComponent>
);
