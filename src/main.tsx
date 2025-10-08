import React from "react";
import ReactDOM from "react-dom/client";
import { HashRouter } from "react-router-dom"; // use HashRouter instead of BrowserRouter
import App from "./App";
import "./index.css";
import { AuthProvider } from "./context/AuthContext";
import { CartProvider } from "./context/CartContext";
import { LoadingProvider } from "./context/LoadingContext";

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <HashRouter>
      <LoadingProvider>
        <AuthProvider>
          <CartProvider>
            <App />
          </CartProvider>
        </AuthProvider>
      </LoadingProvider>
    </HashRouter>
  </React.StrictMode>
);
