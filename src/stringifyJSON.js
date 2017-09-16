// this is what you would do if you liked things to be easy:
// var stringifyJSON = JSON.stringify;

// but you don't so you're going to write it from scratch:
const stringifyJSON = function (obj) {
  const dontQuote = arguments[1] || false;

  // handle special case
  if (obj === null) {
    if (dontQuote === true) {
      return null;
    }
    return "null";
  }

  let prefix = "prefix";
  let postfix = "postfix";
  let result = "recursive call";

  if ((typeof obj === "object") && (!Array.isArray(obj))) { // look for properties
    prefix = "{";
    postfix = "}";

    // holds all of the keys + properties
    let keyVals = Object.keys(obj);

    // contents holds the stringified version of the properties
    let contents = [];
    for (let i = 0; i < keyVals.length; i++) {
      const thisKey = keyVals[i];
      const thisVal = obj[thisKey];

      if (typeof thisVal === "function") {
        continue;
      } else if (thisVal === undefined) {
        continue;
      }

      let stringified;

      stringified = stringifyJSON(thisVal, true);

      if (typeof thisVal === "string") {
        stringified = `"${stringified}"`;
      }

      let thisResult = `"${thisKey}":${stringified}`;

      if (i < keyVals.length - 1) {
        thisResult += ",";
      }

      contents.push(thisResult);
    }

    result = "";
    for (let i = 0; i < contents.length; i++) {
      result += contents[i];
    }

    return prefix + result + postfix;
  } else if (Array.isArray(obj)) {
    prefix = "[";
    postfix = "]";
    result = "";

    for (let i = 0; i < obj.length; i++) {
      let elem = obj[i];

      if (typeof elem === "object") {
        elem = stringifyJSON(elem, true);
      } else if (typeof elem === "string") {
        elem = `"${elem}"`;
      }

      result += elem;
      if (i < obj.length - 1) {
        result += ",";
      }
    }

    return prefix + result + postfix;
  } else { // presumably a primative type
    if (dontQuote === true) {
      return obj;
    } else if (typeof obj === "string") {
      return `"${obj}"`;
    } else {
      return String(obj);
    }
  }
};
