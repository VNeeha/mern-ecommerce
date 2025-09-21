// EXTERNAL IMPORTS
import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { Provider } from "react-redux";
import { Toaster } from "react-hot-toast"; //

// LOCAL IMPORTS
import "./index.css";
import store from "./store/ecommerceStore.js";
import App from "./App.jsx";

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <Provider store={store}>
      <App />
      <Toaster position="top-center" reverseOrder={false} />{" "}
      {/* Adding Toaster */}
    </Provider>
  </StrictMode>
);
