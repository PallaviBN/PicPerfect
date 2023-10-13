import React from "react";
import ReactDOM from "react-dom/client";
import Main from "./src/components/Main";
import './index.css';

const App = () => {
  return <div><Main/></div>;
};
const rootElement = document.getElementById("root");
if (!rootElement) throw new Error("Failed to find the root element");
const root = ReactDOM.createRoot(rootElement);
root.render(<App />);
