// list of properties that shouldn't exist
const PROPERTIES_THAT_SHOULD_NOT_EXIST = [
  "isSettled",
  "isFulfilled",
  "isRejected",
  "value",
  "reason",
];

const addStatusToPromise = (promise) => {
  // Lets do some error checking
  if (
    // if either then or catch doesn't exist as a function
    // start with catch as some promise-like-object implement error handling
    // differently for example, jquery
    !(typeof promise.catch === "function") ||
    !(typeof promise.then === "function")
  ) {
    throw new typeError(
      "The provided object is NOT a promise or promise-like object."
    );
  }

  checkToSeeIfPromiseAlreadyModifiedAndThrowErrorIfIs(promise);

  // no errors detected lets do this!

  const propertiesObj = {
    isSettled: false,
    isFulfilled: null,
    isRejected: null,
    value: null,
    reason: null,
  };
  // add properties to the object
  addProperties(promise, propertiesObj);

  // let us update the status based on actual result
  promise
    .then((result) => {
      propertiesObj.isSettled = true;
      propertiesObj.isFulfilled = true;
      propertiesObj.isRejected = false;
      propertiesObj.value = result;
    })
    .catch((err) => {
      propertiesObj.isSettled = true;
      propertiesObj.isFulfilled = false;
      propertiesObj.isRejected = true;
      propertiesObj.reason = err;
    });

  // we don't want the return of the then/catch chain, as that isn't the
  // original promise but a new promise with undefined implicitly returned

  // return the original promise
  return promise;
};

module.exports = { addStatusToPromise };

function checkToSeeIfPromiseAlreadyModifiedAndThrowErrorIfIs(promise) {
  // create a string with any missing properties
  const propertyErrorMsg = PROPERTIES_THAT_SHOULD_NOT_EXIST.reduce(
    (acc, property) => {
      if (property in promise) {
        acc.push(property);
      }
      return acc;
    },
    []
  ).join(" and ");

  if (propertyErrorMsg) {
    // if the propertyErrorMsg is empty
    throw new Error(
      `The promise has already been modified. The following properties already exist:
${propertyErrorMsg}`
    );
  }
}

function addProperties(promise, propertiesObj) {
  // we are making the property read only by adding a get but not a set
  Object.keys(propertiesObj).forEach((propertyStr) => {
    Object.defineProperty(promise, propertyStr, {
      get: () => propertiesObj[propertyStr],
    });
  });
}
