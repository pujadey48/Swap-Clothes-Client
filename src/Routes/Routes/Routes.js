import { createBrowserRouter } from "react-router-dom";
import Main from "../../layout/Main";
import Home from "../../pages/Home/Home";
import Login from "../../pages/Login/Login";
import Logout from "../../pages/Logout/Logout";
import Signup from "../../pages/Signup/Signup";
import DashboardLauout from "../../layout/DashboardLayout";
import MyOrders from "../../pages/Dashboard/MyOrders/MyOrders";
import AddProducts from "../../pages/Dashboard/AddProducts/AddProducts";
import MyProducts from "../../pages/Dashboard/Myproducts/MyProducts";
import Categories from "../../pages/Categories/Categories";
import { getUrl } from "../../Util/Util";
import PrivateRoute from "../PrivateRoute/PrivateRoute";
import DisplayError from "../../pages/DisplayError/DisplayError";

export const routes = createBrowserRouter([
    {
        path: "/",
        element: <Main></Main>,
        children:[
            {
                path:"/",
                element: <Home></Home>
            },
            {
                path:"/login",
                element:<Login></Login>,
            },
            {
                path:"/signup",
                element:<Signup></Signup>
            },
            {
                path:"/logout",
                element:<Logout></Logout>,
            },
            {
                path:"/categories",
                element:<Categories></Categories>,
                
            }
        ]
    },
    {
        path:'/dashboard',
        element:<PrivateRoute><DashboardLauout></DashboardLauout></PrivateRoute>,
        errorElement: <DisplayError></DisplayError>,
        children:[
            {
                path:"/dashboard/addProducts",
                element: <AddProducts></AddProducts>,

            },
            {
                path:'/dashboard/myOrders',
                element: <MyOrders></MyOrders>
            },
            {
                path: "/dashboard/myProducts",
                element: <MyProducts></MyProducts>,
            },
            
        ]
    }
])