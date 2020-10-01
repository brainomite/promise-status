const { expect } = require("chai");
const { addStatusToPromise } = require("../lib");

describe("addStatusToPromise", () => {
  it("should be a function", () => {
    expect(addStatusToPromise).to.be.instanceof(Function);
  });

  it("Should mutate and return the promise", async () => {
    const beforePromise = Promise.resolve();
    const afterPromise = addStatusToPromise(beforePromise);
    expect(beforePromise === afterPromise).to.be.true;
  });

  it("Should throw an error if the any of the properties already exist", () => {
    properties = ["isSettled", "isFulfilled", "isRejected", "value", "reason"];
    properties.forEach((property) => {
      const aThenable = {
        [property]: undefined,
        catch: () => {},
        then: () => {},
      };

      let errorThrown = false;
      let message = null;
      try {
        addStatusToPromise(aThenable);
      } catch (e) {
        errorThrown = true;
        message = e.message;
      }

      expect(errorThrown).to.be.true;
      expect(message.includes("catch")).to.be.false;
    });
  });

  it("Should throw an error if then or catch are not functions", () => {
    const notAThenable = {
      isSettled: undefined,
      isFulfilled: undefined,
      isRejected: undefined,
    };
    let errorThrown = false;
    try {
      addStatusToPromise(notAThenable);
    } catch (e) {
      errorThrown = true;
    }
    expect(errorThrown).to.be.true;
  });

  it("Should initialize in a non-settled state", () => {
    const unsettledPromise = new Promise(() => {});
    addStatusToPromise(unsettledPromise);
    expect(unsettledPromise.isSettled).to.be.false;
    expect(unsettledPromise.isFulfilled).to.be.null;
    expect(unsettledPromise.isRejected).to.be.null;
    expect(unsettledPromise.value).to.be.null;
    expect(unsettledPromise.reason).to.be.null;
  });

  it("Should correctly set properties after the promise has been resolved", (done) => {
    const resolveObj = {}
    const resolvedPromise = new Promise((resolve) => resolve(resolveObj));
    addStatusToPromise(resolvedPromise);
    setTimeout(() => {
      expect(resolvedPromise.isSettled).to.be.true;
      expect(resolvedPromise.isFulfilled).to.be.true;
      expect(resolvedPromise.isRejected).to.be.false;
      expect(resolvedPromise.value).to.be.equal(resolveObj);
      expect(resolvedPromise.reason).to.be.null;
      done();
    });
  });

  it("Should correctly set properties after the promise has been rejected", (done) => {
    const err = new Error('test')
    const rejectedPromise = new Promise((_, reject) => reject(err));
    addStatusToPromise(rejectedPromise);
    setTimeout(() => {
      expect(rejectedPromise.isSettled).to.be.true;
      expect(rejectedPromise.isFulfilled).to.be.false;
      expect(rejectedPromise.isRejected).to.be.true;
      expect(rejectedPromise.value).to.be.null;
      expect(rejectedPromise.reason).to.be.equal(err);
      done();
    });
  });
});
