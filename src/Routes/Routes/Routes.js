import { createBrowserRouter } from "react-router-dom";
import Main from "../../layout/Main";
import Home from "../../pages/Home/Home";
import Login from "../../pages/Login/Login";
import Logout from "../../pages/Logout/Logout";
import Signup from "../../pages/Signup/Signup";
import DashboardLauout from "../../layout/DashboardLayout";
import MyOrders from "../../pages/Dashboard/BuyerSection/MyOrders/MyOrders";
import AddProducts from "../../pages/Dashboard/SellerSection/AddProducts/AddProducts";
import MyProducts from "../../pages/Dashboard/Myproducts/MyProducts";
import Categories from "../../pages/Categories/Categories";
import { getUrl } from "../../Util/Util";
import PrivateRoute from "../PrivateRoute/PrivateRoute";
import DisplayError from "../../pages/Error/DisplayError/DisplayError";
import ShowCategoryProducts from "../../pages/showCategoryProducts/ShowCategoryProducts";
import AdminRoute from "../AdminRoute/AdminRoute";
import AllBuyers from "../../pages/Dashboard/AdminSection/AllBuyers";
import AllSellers from "../../pages/Dashboard/AdminSection/AllSellers";
import Dashboard from "../../pages/Dashboard/Dashboard/Dashboard";
import SellerRoute from "../SellerRoute/SellerRoute";
import BuyerRoute from "../BuyerRoute/BuyerRoute";
import ReportedProducts from "../../pages/Dashboard/AdminSection/ReportedProducts";
import Blog from "../../pages/Blog/Blog"
import Payment from "../../pages/Payment/Payment";
import Error404Page from "../../pages/Error/Error404Page";


const ShowCategoryProduct = async(name) =>{
    const categoryProducts = await fetch(getUrl(`/showCategoryProducts/${name}`))
    return categoryProducts;
}

const GetBookingByID = async(id) =>{
    const booking = await fetch(getUrl(`/booking/${id}`), {
        headers: {
          authorization: `Bearer ${localStorage.getItem("jwt-token")}`,
        },
      })
    return booking;
}

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
                
            },
            {
                path:"/showCategoryProducts/:name",
                element:<ShowCategoryProducts></ShowCategoryProducts>,
                loader:({params}) => ShowCategoryProduct(params.name),
            },
            {
                path:"/blog",
                element:<Blog></Blog>,
            },
            {
              path: "*",
              element: <Error404Page></Error404Page>,
            },
        ]
    },
    {
        path:'/dashboard',
        element:<PrivateRoute><DashboardLauout></DashboardLauout></PrivateRoute>,
        errorElement: <DisplayError></DisplayError>,
        children:[
            {
                path:"/dashboard",
                element: <Dashboard></Dashboard>,
            },
            {
                path:"/dashboard/addProducts",
                element: <SellerRoute><AddProducts></AddProducts></SellerRoute>,
            },
            {
                path:'/dashboard/myOrders',
                element: <BuyerRoute><MyOrders></MyOrders></BuyerRoute> 
            },
            {
                path:'/dashboard/payment/:id',
                element: <BuyerRoute><Payment></Payment></BuyerRoute> ,
                loader:({params}) => GetBookingByID(params.id),
            },
            {
                path: "/dashboard/myProducts",
                element: <SellerRoute><MyProducts></MyProducts></SellerRoute>,
            },
            {
                path: "/dashboard/allBuyers",
                element: <AdminRoute><AllBuyers></AllBuyers></AdminRoute>,
            },
            {
                path: "/dashboard/allSellers",
                element: <AdminRoute><AllSellers></AllSellers></AdminRoute>,
            },
            {
                path: "/dashboard/reportedProducts",
                element: <AdminRoute><ReportedProducts></ReportedProducts></AdminRoute>,
            },
            {
              path: "/dashboard/*",
              element: <Error404Page></Error404Page>,
            },
            
        ]
    }
])