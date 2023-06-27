import { CssBaseline } from "@mui/material";
import { BrowserRouter } from "react-router-dom";
import Navigation from "./components/navigation/Navigation";
import React from "react";
import Router from "./components/router/Router";

export default function App() {
  return (
    <BrowserRouter>
      <CssBaseline />
      <Navigation />
      <Router />
    </BrowserRouter>
  );
}
