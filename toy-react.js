const RENDER_TO_DOM = Symbol('render to dom');

export class Component {
  constructor() {
    this.props = Object.create(null);
    this.children = [];
    this._root = null;
    this._range = null;
  }
  setAttribute(name, value) {
    this.props[name] = value;
  }
  appendChild(component) {
    this.children.push(component);
  }
  get root() {
    if (!this._root) this._root = this.render().root;
    return this._root;
  }

  get vdom() {
    return this.render().vdom;
  }
  // to make the function hard to get from outside => make it private
  // function _renderToDom(location // we can use range api) {}
  [RENDER_TO_DOM](range) {
    this._range = range;
    this.render()[RENDER_TO_DOM](range);
  }
  rerender() {
    this._range.deleteContents();
    this[RENDER_TO_DOM](this._range);
  }
  setState(newState) {
    if (this.state === null || typeof this.state !== 'object') {
      this.state = newState;
      this.rerender();
      return;
    }
    let merge = (oldState, newState) => {
      for (const key in newState) {
        if (oldState[key] === null || typeof oldState[key] !== 'object') {
          oldState[key] = newState[key];
        } else merge(oldState[p], newState([p]));
      }
    };
    merge(this.state, newState);
    this.rerender();
  }
}

class ElementWrapper extends Component {
  constructor(type) {
    super(type);
    this.root = document.createElement(type);
    this.type = type;
  }
  setAttribute(name, value) {
    if (name.match(/^on([\s\S]+)$/))
      this.root.addEventListener(
        RegExp.$1.replace(/^[\s\s]/, (c) => c.toLowerCase()),
        value
      );
    else this.root.setAttribute(name, value);
  }
  appendChild(component) {
    let range = document.createRange();
    range.setStart(this.root, this.root.childNodes.length);
    range.setEnd(this.root, this.root.childNodes.length);
    component[RENDER_TO_DOM](range);
  }
  get vdom() {
    return {
      type: this.type,
      props: this.props,
      children: this.children.map((child) => child.vdom),
      // compoenent's children
    };
  }
  [RENDER_TO_DOM](range) {
    range.deleteContents();
    range.insertNode(this.root);
  }
}

class TextWrapper extends Component {
  constructor(content) {
    super(content);
    this.content = content;
    this.root = document.createTextNode(content);
  }
  [RENDER_TO_DOM](range) {
    range.deleteContents();
    range.insertNode(this.root);
  }
  get vdom() {
    return {
      type: '#text',
      content: this.content,
    };
  }
}

export function createElement(type, attributes, ...children) {
  let e;
  if (typeof type === 'string') e = new ElementWrapper(type);
  else e = new type();
  for (const key in attributes) {
    e.setAttribute(key, attributes[key]);
  }
  let insertChildren = (children) => {
    for (const child of children) {
      if (typeof child === 'string') child = new TextWrapper(child);
      if (typeof child === 'object' && child instanceof Array) {
        insertChildren(child);
      } else {
        e.appendChild(child);
      }
    }
  };
  insertChildren(children);
  return e;
}

export function render(component, parentComponent) {
  let range = document.createRange();
  range.setStart(parentComponent, 0);
  range.setEnd(parentComponent, parentComponent.childNodes.length);
  range.deleteContents();
  component[RENDER_TO_DOM](range);
}
