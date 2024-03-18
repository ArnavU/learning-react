import React, {Suspense, lazy} from "react";
import ReactDOM from "react-dom/client";
import Header from "./components/Header";
import Body from "./components/Body";
// import About from "./components/About";
import Contact from "./components/Contact";
import Error from "./components/Error";
import RestaurantMenue from "./components/RestrauntMenue";
import { createBrowserRouter, RouterProvider, Outlet } from "react-router-dom";
import Shimmer from "./components/Shimmer";

/*
* Header
    - logo
    - nav Items
* body 
    - search
    - RestaurantContainer
        - RestaurantCards
            - Img
            - Name of Res, Star Rating, cuisine, delivery time
* footer
    - copyright
    - links
    - Address
    - Contact
*/

// Chunking
// Code Splitting
// Dynamic Bundling
// lazy loading
// on demand loading
// dynamic import

const Grocerry = lazy(()=> import("./components/Grocerry"));
const About = lazy(() => import("./components/About"));

const AppLayout = () => {
  return (
    <div className="app" style={{width: "100vw"}}>
      <Header />
      <div className="outlet-container">
        <Outlet />
      </div>
    </div>
  );
};

const root = ReactDOM.createRoot(document.getElementById("root"));

const appRouter = createBrowserRouter([
  {
    path: "/",
    element: <AppLayout />,
    children: [
      {
        path: "/",
        element: <Body />,
      },
      {
        path: "/about",
        element: <Suspense fallback={<Shimmer/>}><About /></Suspense>,
      },
      {
        path: "/contact",
        element: <Contact />,
      },
      {
        path: "/restaurants/:resId",
        element: <RestaurantMenue />,
      },
      {
        path: "/grocerry",
        element: <Suspense fallback={<Shimmer/>}><Grocerry/></Suspense>
      }
    ],
    errorElement: <Error />,
  },
]);

root.render(<RouterProvider router={appRouter} />);
