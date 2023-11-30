import React from "react";
import { AppRegistry } from "react-native";
// import ReactDOM from "react-dom/client";
import App from "./App";
import "./web.css";

const Root = () => <App />;

const rootTag = document.getElementById("root");
AppRegistry.registerComponent("App", () => Root);
AppRegistry.runApplication("App", { rootTag });
