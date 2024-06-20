import { RouterProvider } from "react-router-dom";
import router from "../routes";
import { useReducer, createContext } from "react";
import rootReducer from "./store/rootReducer";
import { getCartFromStorage } from "./utils/storage";

const initalState = {
  searchKey: "",
  quantity: getCartFromStorage().length,
};

export const AppContext = createContext();

const App = () => {
  const [state, dispatcher] = useReducer(rootReducer, initalState);
  return (
    <AppContext.Provider
      value={{
        state,
        dispatcher,
      }}
    >
      <RouterProvider router={router} />
    </AppContext.Provider>
  );
};

export default App;
