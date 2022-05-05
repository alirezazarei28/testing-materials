// import * as React from "react";

// function useSafeDispatch(dispatch) {
//   const mountedRef = React.useRef(false);

//   // to make this even more generic you should use the useLayoutEffect hook to
//   // make sure that you are correctly setting the mountedRef.current immediately
//   // after React updates the DOM. Even though this effect does not interact
//   // with the dom another side effect inside a useLayoutEffect which does
//   // interact with the dom may depend on the value being set
//   React.useEffect(() => {
//     mountedRef.current = true;
//     return () => {
//       mountedRef.current = false;
//     };
//   }, []);

//   return React.useCallback(
//     (...args) => (mountedRef.current ? dispatch(...args) : void 0),
//     [dispatch]
//   );
// }

// function asyncReducer(state, action) {
//   switch (action.type) {
//     case "pending": {
//       return { status: "pending", data: null, error: null };
//     }
//     case "resolved": {
//       return { status: "resolved", data: action.data, error: null };
//     }
//     case "rejected": {
//       return { status: "rejected", data: null, error: action.error };
//     }
//     default: {
//       throw new Error(`Unhandled action type: ${action.type}`);
//     }
//   }
// }

// function useAsync(initialState) {
//   const [state, unsafeDispatch] = React.useReducer(asyncReducer, {
//     status: "idle",
//     data: null,
//     error: null,
//     ...initialState,
//   });

//   const dispatch = useSafeDispatch(unsafeDispatch);

//   const { data, error, status } = state;

//   const run = React.useCallback(
//     (promise) => {
//       dispatch({ type: "pending" });
//       promise.then(
//         (data) => {
//           dispatch({ type: "resolved", data });
//         },
//         (error) => {
//           dispatch({ type: "rejected", error });
//         }
//       );
//     },
//     [dispatch]
//   );

//   return {
//     error,
//     status,
//     data,
//     run,
//   };
// }

// function Info({ name }) {
//   const { data, status, error, run } = useAsync({
//     status: name ? "pending" : "idle",
//   });

//   React.useEffect(() => {
//     if (!name) {
//       return;
//     }
//     run(fetchContact(name));
//   }, [name, run]);

//   if (status === "idle") {
//     return "Submit a pokemon";
//   } else if (status === "pending") {
//     return <PokemonInfoFallback name={pokemonName} />;
//   } else if (status === "rejected") {
//     throw error;
//   } else if (status === "resolved") {
//     return <PokemonDataView pokemon={pokemon} />;
//   }

//   throw new Error("This should be impossible");
// }

// const AsyncReducer = () => {
//   return (
//     <div>
//       <p>hi there from async reducer component</p>
//     </div>
//   );
// };

// export default AsyncReducer;
