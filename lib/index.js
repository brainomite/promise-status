const addStatusToPromise = (promise) => {
  // Lets do some error checking
  if (
    // if either then or catch doesn't exist as a function
    // start with catch as some promise-like-object implement error handling
    // different for example the jquery
    !(typeof promise.catch === "function") ||
    !(typeof promise.then === "function")
  ) {
    throw new Error(
      "The provided object is NOT a promise or promise-like object. then() or catch() isn't implemented"
    );
  }

  // list of properties that should exist
  const propertiesThatShouldNotExist = [
    "isSettled",
    "isFulfilled",
    "isRejected",
  ];

  // create a string with any missing properties
  const propertyErrorMsg = propertiesThatShouldNotExist
    .reduce((acc, property) => {
      if (property in promise) {
        acc.push(property);
      }
      return acc;
    }, [])
    .join(" and ");

  if (propertyErrorMsg) {
    // if the propertyErrorMsg is empty
    throw new Error(
      "The following properties already exist: " + propertyErrorMsg
    );
  }

  // no errors detected:

  let isSettled = false;
  let isFulfilled = null;
  let isRejected = null;

  // add getters to the object
  // using closure so the internal variables that this depends on can't be
  // modified
  Object.defineProperty(promise, "isSettled", {
    get: () => isSettled,
  });

  Object.defineProperty(promise, "isFulfilled", {
    get: () => isFulfilled,
  });

  Object.defineProperty(promise, "isRejected", {
    get: () => isRejected,
  });

  // let us update the status based on actual result
  promise
    .then(() => {
      isSettled = true;
      isFulfilled = true;
      isRejected = false;
    })
    .catch(() => {
      isSettled = true;
      isFulfilled = false;
      isRejected = true;
    });

  // we don't want the return of the then/catch chain, as that isn't the
  // original promise

  // return the original promise
  return promise;
};

module.exports = { addStatusToPromise };
