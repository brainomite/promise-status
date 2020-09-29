# promise-status

![Node.js CI](https://github.com/brainomite/status-for-promise/workflows/Node.js%20CI/badge.svg)

Mutates a promise or a promise-like object adding status properties.

## Install

`$ npm i status-for-promise`

## API

__addStatusToPromise(promise)__
Returns the promise after it has been mutated.

## Usage

```js
const { addStatusToPromise } = require("status-for-promise");

// I'm using a native promise. You may also use a promise-like object as long as
// isSettled, isFulfilled, and isRejected don't already exist on the object, and
// it implements the promise interface with .then and .catch, you may use it. An
// error will be thrown if an incompatible library is used.
const resolvedPromise = addStatusToPromise(Promise.resolve(123));
console.log(resolvedPromise.isSettled); //=> false;
console.log(resolvedPromise.isFulfilled); //=> null;
console.log(resolvedPromise.isRejected); //=> null;

const pendingPromise = addStatusToPromise(new Promise(() => {}));
const rejectedPromise = addStatusToPromise(Promise.reject(new Error("wow")));

// This represents an async function or even a function triggered externally
// like a user clicking a button.
setTimeout(() => {
  console.log(pendingPromise.isSettled); //=> false;
  console.log(pendingPromise.isFulfilled); //=> null;
  console.log(pendingPromise.isRejected); //=> null;

  console.log(resolvedPromise.isSettled); //=> true;
  console.log(resolvedPromise.isFulfilled); //=> true;
  console.log(resolvedPromise.isRejected); //=> false;

  console.log(rejectedPromise.isSettled); //=> true;
  console.log(rejectedPromise.isFulfilled); //=> false;
  console.log(rejectedPromise.isRejected); //=> true;
});
```

## Licence

MIT
