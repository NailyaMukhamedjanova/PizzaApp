import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import { Menu } from "./pages/Menu/Menu";
import  Cart  from "./pages/Cart/Cart";
import { Error } from "./pages/Error/Error";
import { RouterProvider, createBrowserRouter } from "react-router-dom";
import  Layout  from "./Layout/Menu/Layout";
import Product from "./pages/Product/Product"
import { AuthLayout } from "./Layout/Menu/Auth/AuthLayout";
import  Login  from "./pages/Login/Login"
import Register from "./pages/Register/Register";
import { RequireAuth } from "./helpers/RequireAuth";
import SuccessOrder from "./pages/SuccessOrder/SuccessOrder";
import { CartProvider } from "./context/cardContext";

const router = createBrowserRouter ([
  {
    path: "/",
    element: <RequireAuth><Layout /></RequireAuth>,
    children: [
      {
        path: "/",
        element: <Menu />,
      },
       {
    path: "/cart",
    element: <Cart />,
  },
  {
    path: "/cart-success",
    element: <SuccessOrder />,
  },
  {
    path: "/product/:id",
    element: <Product/>,
    errorElement: <>Ошибка</> 
  },

 
   ]
  },
  
  {
    path: "/auth",
    element: <AuthLayout />,
    children: [ {  
    path: 'login',
    element: <Login />},

    {
      path: "register", 
      element: <Register />
    }
   
    ]
  },
    
  {
    path: "*",
    element: <Error />,
  },
    
 
]);



ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
<CartProvider>
    <RouterProvider router={router} />
  </CartProvider>  
  </React.StrictMode>
);
