import React from "react";
import ReactDOM from "react-dom";
import { Provider } from "react-redux";

import { Application } from "./app";
import { createStore } from "./store";

const rootElement = document.createElement("div");
document.body.appendChild(rootElement);

ReactDOM.render(
    <Provider store={createStore()}>
        <Application />
    </Provider >,
    rootElement,
);
