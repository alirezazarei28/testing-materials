import { useState } from "react";

function callAll(...fns) {
  return (...args) => {
    fns.forEach((fn) => {
      fn && fn(...args);
    });
  };
}

function useToggle() {
  const [on, setOn] = useState(false);
  const toggle = () => setOn(!on);

  const getTogglerProps = ({ onClick, ...props } = {}) => {
    return {
      "aria-pressed": "on",
      onClick: callAll(onClick, toggle),
      ...props,
    };
  };

  return {
    on,
    toggle,
    getTogglerProps,
  };
}

const PropsGetters = () => {
  const { on, getTogglerProps } = useToggle();

  return (
    <>
      <hr />
      <div {...getTogglerProps()}>
        {`toggle is currently ${on} click me to change`}{" "}
      </div>
      <hr />
      <button
        {...getTogglerProps({
          "aria-label": "custom-button",
          onClick: () => console.info("btn clicked..."),
        })}
      >
        {on ? "on" : "off"}
      </button>
    </>
  );
};

export default PropsGetters;
