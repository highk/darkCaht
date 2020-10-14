import React from "react";
import ReactDOM from "react-dom";
import GlobalStyle from "./style/GlobalStyle";

import App from "./App";

import * as serviceWorker from "./serviceWorker";
import ThemeStore from "./style/theme";

ReactDOM.render(
  <React.StrictMode>
    <ThemeStore>
      <GlobalStyle />
      <App />
    </ThemeStore>
  </React.StrictMode>,
  document.getElementById("root")
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
