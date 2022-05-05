import React, { useState } from "react";

const ToggleContext = React.createContext();
ToggleContext.displayName = "ToggleContext";

function Toggle({ children }) {
  const [on, setOn] = useState(false);
  const toggle = () => setOn(!on);

  return (
    <ToggleContext.Provider value={{ on, toggle }}>
      {children}
    </ToggleContext.Provider>
  );
}

function useToggle() {
  const context = React.useContext(ToggleContext);
  if (!context) {
    throw new Error("useToggle must be used within <Toggle />");
  }
  return context;
}

const ToggleOn = ({ children }) => {
  const { on } = useToggle();
  return on ? children : null;
};

const ToggleOff = ({ children }) => {
  const { on } = useToggle();
  return on ? null : children;
};

const ToggleButton = (props) => {
  const { toggle, on } = useToggle();
  return (
    <div
      onClick={toggle}
      {...props}
    >{`current toggle is ${on}, click to change`}</div>
  );
};

function FlexibleCompoundComponent() {
  return (
    <>
      <Toggle>
        <ToggleOn>The toggle is on</ToggleOn>
        <ToggleOff>The toggle is off</ToggleOff>
        <span>hello</span>
        <div>
          <ToggleButton />
        </div>
      </Toggle>
    </>
  );
}

export default FlexibleCompoundComponent;
