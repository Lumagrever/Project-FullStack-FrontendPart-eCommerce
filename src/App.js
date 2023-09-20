import React from "react";
import Home from "./pages/Home";
import Header from "./components/Header";
import Footer from "./components/Footer";
import {createBrowserRouter, Outlet, RouterProvider, ScrollRestoration} from "react-router-dom";
import Cart from "./pages/Cart";
import { productsData } from "./data/ProductsData";
import Product from "./components/Product";
import Login from "./pages/Login";
import Registration from "./pages/Registration";
import Validation from "./pages/Validation";


const Layout = () => {
  return(
    <div>
      <Header />
      <ScrollRestoration />
      <Outlet />
      <Footer />
    </div>
  )
}

const router = createBrowserRouter ([
  {
    path: "/",
    element:<Layout />,
    children: [
      {
        path: "/",
        element: <Home />,
        loader: productsData,
      },
      {
        path:"/product/:id",
        element: <Product/>
      },
      {
        path: "/cart",
        element: <Cart />,
      },
      {
        path: "/login",
        element: <Login />
      },
      {
        path: "/registration",
        element: <Registration />
      },
      {
        path: "/validation",
        element: <Validation />,
      },
    ],
  },
]);

function App() {
  return (
    <div className="font-bodyFont">
      <RouterProvider router={router}/>
    </div>
  );
}

export default App;
