const { addStatusToPromise } = require("status-for-promise");

// Create a promise that will resolve in 5 seconds
const promiseForACake = new Promise((resolve, reject) => {
  setTimeout(() => resolve("chocolate cake"), 5000);
});

// A recursive function that will rerun every second until the
// promise resolves.
// This will simulate an async action or a user-triggered action

const bugTheChef = (promiseForFood) => {
  console.log("Chef is my food ready?");
  if (promiseForFood.isSettled && promiseForFood.isFulfilled) {
    console.log("Yes, check your table.\n");
  } else {
    console.log("No, its not ready yet. Go away.\n");
    setTimeout(() => bugTheChef(promiseForFood), 1000);
  }
};

// Lets add the status properties
addStatusToPromise(promiseForACake);

// What to do when the promise resolves
promiseForACake.then((food) => console.log(`Your ${food} is served.` + "\n"));

// lets bug the chef about our the food
bugTheChef(promiseForACake);
