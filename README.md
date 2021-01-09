# status-for-promise

![Node.js CI](https://github.com/brainomite/status-for-promise/workflows/Node.js%20CI/badge.svg) [![npm version](https://badge.fury.io/js/status-for-promise.svg)](https://badge.fury.io/js/status-for-promise)

Sometimes we need to know whether or not a promise has resolved without waiting for the resolution.
This package will allow you to know the status without having to create some sort of external state tracker to keep track of whether a promise has resolved or not.
This package mutates a promise or a promise-like object adding status properties as well as the values or error when the promise is resolved.

## Cute example

<iframe frameborder="0" width="100%" height="500px" src="https://repl.it/@AaronYoung2/CalculatingFatherlyHashfunction#index.js"></iframe>

## Install

`$ npm i status-for-promise`

## API

__addStatusToPromise(promise)__<br>
Returns the promise after it has been mutated.

The new properties are:<br>
promise.isSettled - `false` while pending, `true` after settlement<br>
promise.isFulfilled - `null` while pending, `true` if the promise resolves, otherwise `false`<br>
promise.isRejected - `null` while pending, `true` if the promise rejects, otherwise `false`.<br>
promise.value - `null` while pending, or in a fulfilled status, otherwise value that `then()` returns.<br>
promise.reason - `null` while pending, or in a rejected status, otherwise value that `catch()` returns.<br>

## Usage

```js
const { addStatusToPromise } = require("status-for-promise");

/*****
* I'm using a native promise. You may also use a promise-like object as long as
* value, reason, isSettled, isFulfilled, and isRejected don't already exist on
* the object, and it implements the promise interface with .then and .catch,
* you may use it. An error will be thrown if an incompatible library is used.
*****/

const resolvedPromise = addStatusToPromise(Promise.resolve(123));
const pendingPromise = addStatusToPromise(new Promise(() => {}));
const rejectedPromise = addStatusToPromise(Promise.reject(new Error("oops")));

/*****
 * This represents an async function or even a function triggered externally
 * like a user clicking a button.
 *
 * Do note, I didn't need to asynchronously to wait for individual promises to
 * have a status update.
 *****/
setTimeout(() => {
  console.log(pendingPromise.isSettled); //=> false;
  console.log(pendingPromise.isFulfilled); //=> null;
  console.log(pendingPromise.isRejected); //=> null;
  console.log(pendingPromise.value); //=> null;
  console.log(pendingPromise.reason); //=> null;

  console.log(resolvedPromise.isSettled); //=> true;
  console.log(resolvedPromise.isFulfilled); //=> true;
  console.log(resolvedPromise.isRejected); //=> false;
  console.log(resolvedPromise.value); //=> 123;
  console.log(resolvedPromise.reason); //=> null;

  console.log(rejectedPromise.isSettled); //=> true;
  console.log(rejectedPromise.isFulfilled); //=> false;
  console.log(rejectedPromise.isRejected); //=> true;
  console.log(rejectedPromise.value); //=> null;
  console.log(rejectedPromise.reason.message); //=> "oops";
});
```

## Licence

MIT
