// EXTERNAL IMPORTS
import { RouterProvider } from "react-router-dom";
import { useDispatch } from "react-redux";

// LOCAL IMPORTS
import router from "./routes/index.jsx";
import { userActions } from "./store/userSlice.js";

const App = () => {
  const dispatch = useDispatch();

  const tempUser = JSON.parse(localStorage.getItem("user"));
  if (tempUser) {
    dispatch(userActions.signInUser({ user: tempUser }));
  }
  return <RouterProvider router={router} />;
};

export default App;
