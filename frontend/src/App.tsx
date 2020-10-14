import React from "react";
import "./App.css";
import Layouts from "./Layout";

import SocketContextProvider from "./components/Socket/socket";

function App() {
  return (
    <SocketContextProvider>
      <Layouts />
    </SocketContextProvider>
  );
}

export default App;
