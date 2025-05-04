import "./App.css";
import "react-toastify/ReactToastify.css"
import {
  RouterProvider,
  createBrowserRouter,
  createRoutesFromElements,
  Route,
} from "react-router-dom";
import { AnimatePresence } from "framer-motion";
import AnimatedRoute from "./components/AnimatedRoute";
import Layout from "./components/Layout";
import Buttons from "./components/Buttons";
import Menu from "./components/Menu";
import Home from "./components/Home";
import { ToastContainer } from "react-toastify";
import Kitchen from "./components/Kitchen";

function App() {
  const router = createBrowserRouter(
    createRoutesFromElements(
      <Route path="/" element={<Layout />}>
        <Route index element={<Home />} />
        <Route path="chef" element={<Kitchen />} />
        <Route path=":id" element={<Buttons />} />
        <Route path=":id/menu" element={
          <AnimatePresence mode="wait" >
          <AnimatedRoute>
            <Menu />
          </AnimatedRoute>
        </AnimatePresence>
        } />
      </Route>
    )
  );
  return (
    <>
    <RouterProvider router={router} />
    <ToastContainer />
    </>
  );
}

export default App;
