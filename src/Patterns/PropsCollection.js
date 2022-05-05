import { useState } from "react";

function useToggle() {
  const [on, setOn] = useState(false);
  const toggle = () => setOn(!on);

  return {
    on,
    toggle,
    togglerProps: {
      "aria-pressed": "on",
      onClick: toggle,
    },
  };
}

const PropsCollection = () => {
  const { on, toggle, togglerProps } = useToggle();

  return (
    <>
      <hr />
      <div {...togglerProps}>
        {`toggle is currently ${on} click me to change`}{" "}
      </div>
      <hr />
      <button aria-label="custom-button" {...togglerProps}>
        {on ? "on" : "off"}
      </button>
    </>
  );
};

export default PropsCollection;
