import React from "react";
import { render } from "react-dom";
import Root from "./components/Root";

const mainElement = document.createElement("div");
mainElement.setAttribute("id", "root");
document.body.appendChild(mainElement);

const App = () => <Root />;

render(<App />, mainElement);
