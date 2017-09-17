// If life was easy, we could just do things the easy way:
// var getElementsByClassName = function (className) {
//   return document.getElementsByClassName(className);
// };

// You should use document.body, element.childNodes, and element.classList
// the search will necessarily be in document.body html, so no source is required, only the target

// But instead we're going to implement it from scratch:
var getElementsByClassName = function (className) {
  // allow for an additional parameter to define what is to be searched for the class
  // but default to this document's body
  const searchThis = arguments[1] || document.body;

  let elements = [];

  // recursively parses through the nodes of the DOM tree
  // NOTE: Seem to be dealing with 'DOMTokenList's and not actual arrays
  // https://developer.mozilla.org/en-US/docs/Web/API/DOMTokenList
  const addByClassName = function (nodes) {
    const children = nodes.childNodes;

    if (children) {
      for (let i = 0; i < children.length; i++) {
        const thisChild = children.item(i);
        addByClassName(thisChild);
      }
    }

    const classes = nodes.classList;
    if (classes) {
      for (let i = 0; i < classes.length; i++) {
        const thisClass = classes.item(i);
        if (thisClass === className) {
          elements.unshift(nodes); // (not .push()) because the tests have expected values in this order
        }
      }
    }

  }; // end of function addByClassName(nodes)

  // search the whole document's body (default)
  addByClassName(searchThis);

  return elements;
};
