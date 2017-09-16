// this is what you would do if you liked things to be easy:
// var stringifyJSON = JSON.stringify;

// but you don't so you're going to write it from scratch:

const stringifyJSON = function (obj) {
  // boolean for if should surround the return value in quotes
  const dontQuote = arguments[1] || false;

  // console.log("\n\n------\n\n");

  // // console.log("callNums:" + (++callNums));

  // console.log("DON'T QUOTE:", dontQuote);

  // console.log("input:", obj);

  // handle special cases
  if (obj === null) {
    if (dontQuote === true) {
      return null;
    }
    return "null";
  }
  // else if (obj === undefined) {
  //   // return undefined;
  //   return ""; // empty string
  // }

  let prefix = "prefix";
  let postfix = "postfix";
  let result = "recursive call";

  // if typeof === object object
  // look for properties
  if ((typeof obj === "object") && (!Array.isArray(obj))) {
    prefix = "{";
    postfix = "}";


    // console.log("object:", obj);


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

      // console.log("dontQuote:", dontQuote === true);
      // console.log("not going to quote:", ((typeof thisVal === "object") || (dontQuote === true)));

      // if ((typeof thisVal === "object") || (dontQuote === true)) {
      stringified = stringifyJSON(thisVal, true);

      if (typeof thisVal === "string") {
        stringified = `"${stringified}"`;
      }

      // console.log("NOT quoting");
      // } else if (dontQuote === true) {
      //   stringified = stringifyJSON(thisVal, true);
      //   console.log("NOT quoting");
      // } else {
      //   stringified = `"${stringifyJSON(thisVal, true)}"`;
      //   console.log("QUOTING");
      // }

      // console.log("stringified:", stringified);

      let thisResult = `"${thisKey}":${stringified}`;

      // console.log("thisResult:", thisResult);

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



    // console.log("array:", obj);


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

    // console.log("primative:", obj);

    if (dontQuote === true) {

      // console.log("don't quote:", obj);

      return obj;
    } else if (typeof obj === "string") {

      // console.log("quote:", obj);

      return `"${obj}"`;
    } else {
      return String(obj);
    }
  }
};
