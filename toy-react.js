class ElementWrapper {

}
class TextWrapper {

}
export function createElement(type, attributes, ...children) {
  let e;
  if (typeof type === 'string') e = document.createElement(type);
  else e = new type();
  for (const key in attributes) {
    e.setAttribute(key, attributes[key]);
  }
  for (const child of children) {
    if (typeof child === 'string') child = document.createTextNode(child);
    e.appendChild(child);
  }
  return e;
}


export function render(component, parentComponent)