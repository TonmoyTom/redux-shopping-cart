import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "bootstrap/dist/css/bootstrap.min.css";
import App from "./App.jsx";
import "./index.css";
import { BrowserRouter as Router } from "react-router-dom";
import { Provider } from 'react-redux';
import { store } from "./redux/app/store.js";
import { Toaster } from 'react-hot-toast';

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <Router>
      <Provider store={store}>
        <App />
        <Toaster />
      </Provider>
    </Router>
  </StrictMode>
);
