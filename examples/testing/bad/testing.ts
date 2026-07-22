// WHY WRONG: Testing implementation details (internal state), brittle
// selectors, no edge cases, and mocking too deeply.

import { shallow } from "enzyme";
import { UserCard } from "@/components/user-card";

// Testing implementation details — breaks on refactor
it("uses useState", () => {
  const wrapper = shallow(<UserCard name="Ahmed" email="a@b.com" role="admin" onRemove={() => {}} />);
  expect(wrapper.state("isConfirming")).toBe(false);
});

// Brittle selector — CSS class name change breaks test
it("renders correctly", () => {
  const wrapper = shallow(<UserCard name="Ahmed" email="a@b.com" role="admin" onRemove={() => {}} />);
  expect(wrapper.find(".flex.items-center")).toHaveLength(1);
  expect(wrapper.find(".bg-red-100")).toHaveLength(1);
});

// No user interaction testing
it("click handler exists", () => {
  const wrapper = shallow(<UserCard name="Ahmed" email="a@b.com" role="admin" onRemove={() => {}} />);
  expect(wrapper.find("button").prop("onClick")).toBeDefined();
});

// No cleanup, no edge cases, no async testing
// Tests pass but provide zero confidence
// Changing a CSS class breaks 5 tests
