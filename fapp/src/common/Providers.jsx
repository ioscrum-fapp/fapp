import React from "react";
import AuthProvider from "./Auth";

// eslint-disable-next-line react/prop-types
export default function Providers({ children }) {
  return <AuthProvider>{children}</AuthProvider>;
}
// TODO: ADD MORE PROVIDERS IF NEEDED HERE
