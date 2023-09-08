import Router from "@/router";
import { HelmetProvider } from "react-helmet-async";
import { Toaster } from "./components/ui/toaster";

export default function App() {
  return (
    <HelmetProvider>
      <Toaster />
      <Router />
    </HelmetProvider>
  );
}
