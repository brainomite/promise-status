const addStatusToPromise = (promise) => {
  // add private variables to the promise object
  let isSettled = false;
  let isFulfilled = null;
  let isRejected = null;

  // add getters to the object
  Object.defineProperty(promise, "isSettled", {
    get: () => isSettled,
  });

  Object.defineProperty(promise, "isFulfilled", {
    get: () => isFulfilled,
  });

  Object.defineProperty(promise, "isRejected", {
    get: () => isRejected,
  });

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

  return promise;
};

module.exports = addStatusToPromise;
