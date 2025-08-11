/* @refresh reload */
import { render } from "solid-js/web";
import "./globals.css";
import { App } from "./App";

const root = document.getElementById("root");
if (!root)
    throw new Error(
        "Failed to initialize app: could not locate the root element.",
    );

render(() => <App />, root);
