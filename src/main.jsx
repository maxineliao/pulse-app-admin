import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { store } from "./store.js";
import { Provider } from "react-redux";
import { RouterProvider } from "react-router-dom";
import router from "../src/router/index.jsx";
import "bootstrap/dist/js/bootstrap.bundle.min.js";

createRoot(document.getElementById("root")).render(
	// <StrictMode>
		<Provider store={store}>
			<RouterProvider router={router} />
		</Provider>
	// </StrictMode>
);
