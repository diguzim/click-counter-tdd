import React from "react";
import { shallow } from "enzyme";
import App from "./App";

const setup = (props = {}, state = null) => {
  const wrapper = shallow(<App {...props} />);

  if (state) {
    wrapper.setState(state);
  }

  return wrapper;
};

const findByTestAttr = (wrapper, val) => {
  return wrapper.find(`[data-test="${val}"]`);
};

test("renders without error", () => {
  const wrapper = setup();
  console.log(wrapper.debug());
  const appComponent = findByTestAttr(wrapper, "component-app");
  expect(appComponent.length).toBe(1);
});

test("renders increment button", () => {
  const wrapper = setup();
  const button = findByTestAttr(wrapper, "increment-button");
  expect(button.length).toBe(1);
});

test("renders counter display", () => {
  const wrapper = setup();
  const counterDisplay = findByTestAttr(wrapper, "counter-display");
  expect(counterDisplay.length).toBe(1);
});

test("counter starts at 0", () => {
  const wrapper = setup();
  const initialCounterState = wrapper.state("counter");
  expect(initialCounterState).toBe(0);
});

test("clicking button increments counter display", () => {
  const counter = 7;
  const wrapper = setup(null, { counter });
  const button = findByTestAttr(wrapper, "increment-button");

  // find button and click
  button.simulate("click");
  wrapper.update();

  // find display and test value
  const counterDisplay = findByTestAttr(wrapper, "counter-display");
  expect(counterDisplay.text()).toContain(counter + 1);
});

test("renders decrement button", () => {
  const wrapper = setup();
  const button = findByTestAttr(wrapper, "decrement-button");
  expect(button.length).toBe(1);
});

test("clicking decrement button decreases counter display", () => {
  const counter = 3;
  const wrapper = setup(null, { counter });
  const button = findByTestAttr(wrapper, "decrement-button");

  button.simulate("click");
  wrapper.update();

  const counterDisplay = findByTestAttr(wrapper, "counter-display");
  expect(counterDisplay.text()).toContain(counter - 1);
});

test("clicking decrement button with zero displays error message and keeps at zero", () => {
  const wrapper = setup();
  const decrementButton = findByTestAttr(wrapper, "decrement-button");
  const incrementButton = findByTestAttr(wrapper, "increment-button");

  // there should be no error
  let errorDisplay = findByTestAttr(wrapper, "error-display");
  expect(errorDisplay.length).toBeFalsy();

  decrementButton.simulate("click");
  wrapper.update();

  // keeps displaying 0 in the counter
  const counterDisplay = findByTestAttr(wrapper, "counter-display");
  expect(counterDisplay.text()).toContain(0);

  // error should be displayed
  errorDisplay = findByTestAttr(wrapper, "error-display");
  expect(errorDisplay.length).toBeTruthy();

  incrementButton.simulate("click");
  wrapper.update();

  // error should not be displayed anymore
  errorDisplay = findByTestAttr(wrapper, "error-display");
  expect(errorDisplay.length).toBeFalsy();
});
