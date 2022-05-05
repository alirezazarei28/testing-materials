import React, { useState } from "react";

const ToggleOn = ({ on, children }) => (on ? children : null);
const ToggleOff = ({ on, children }) => (on ? null : children);
const ToggleButton = ({ on, toggle }) => (
  <div onClick={toggle}>{`current toggle is ${on}, click to change`}</div>
);

const allowedTypes = [ToggleOn, ToggleOff, ToggleButton];

function Toggle({ children }) {
  const [on, setOn] = useState(false);
  const toggle = () => setOn(!on);

  return React.Children.map(children, (child) => {
    if (allowedTypes.includes(child.type)) {
      const newChild = React.cloneElement(child, { on, toggle });
      return newChild;
    }
    return child;
  });
}

function NotAllowedType({ on, toggle }) {
  return <div>{"props will not be here so `on` is: " + on}</div>;
}

function CompoundComponent() {
  return (
    <>
      <Toggle>
        <ToggleOn>The toggle is on</ToggleOn>
        <ToggleOff>The toggle is off</ToggleOff>
        <span>hello</span>
        <ToggleButton />
        <NotAllowedType />
      </Toggle>
    </>
  );
}

export default CompoundComponent;
