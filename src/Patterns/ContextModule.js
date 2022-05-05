import React from "react";

const CounterContext = React.createContext();

function countReducer(state, action) {
  switch (action.type) {
    case "increment":
      return { ...state, count: state.count + 1 };
    case "decrement":
      return { ...state, count: state.count - 1 };
    default:
      throw new Error("wrong action type");
  }
}

function CounterProvider({ ...props }) {
  const [state, dispatch] = React.useReducer(countReducer, { count: 0 });

  const value = [state, dispatch];

  return <CounterContext.Provider value={value} {...props} />;
}

function Counter() {
  const [state, dispatch] = React.useContext(CounterContext);
  const increment = () => {
    dispatch({ type: "increment" });
  };
  const decrement = () => {
    dispatch({ type: "decrement" });
  };

  return (
    <div>
      <div>current Count is {state.count}</div>
      <button onClick={increment}>+</button>
      <button onClick={decrement}>-</button>
    </div>
  );
}

function ContextModule() {
  return (
    <>
      <CounterProvider>
        <Counter />
      </CounterProvider>
    </>
  );
}

export default ContextModule;
