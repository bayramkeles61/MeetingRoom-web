import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import reportWebVitals from "./reportWebVitals";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import { ChakraProvider } from "@chakra-ui/react";

import { Provider } from "react-redux";
import { store } from "./store";
import Root from "./routes/root";
import RoomList from "./features/RoomList";
import ScreenList from "./features/ScreenList/ScreenList";
import M365Redirect from "./components/integration/M365Redirect";
import Integration from "./components/integration/integration";
import ScreenIntegration from "./components/integration/ScreenIntegration";

const root = ReactDOM.createRoot(
  document.getElementById("root") as HTMLElement
);

root.render(
  <ChakraProvider>
    <Provider store={store}>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Root />}>
            <Route index element={<RoomList />} />
            <Route path=":roomId/screens" element={<ScreenList />}></Route>
            <Route
              path=":roomId/screens/:screenId/integration"
              element={<ScreenIntegration />}
            />
            <Route path="redirect" element={<M365Redirect />} />
            <Route path="integration" element={<Integration />} />
          </Route>
        </Routes>
      </BrowserRouter>
    </Provider>
  </ChakraProvider>
);

reportWebVitals();
