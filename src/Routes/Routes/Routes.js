import { createBrowserRouter } from "react-router-dom";
import Main from "../../layout/Main";
import Home from "../../pages/Home/Home";
import Login from "../../pages/Login/Login";
import Logout from "../../pages/Logout/Logout";
import Signup from "../../pages/Signup/Signup";

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
        ]
    }
])