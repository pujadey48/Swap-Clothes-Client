import React, { useContext } from "react";
import {
  CDBSidebar,
  CDBSidebarContent,
  CDBSidebarFooter,
  CDBSidebarHeader,
  CDBSidebarMenu,
  CDBSidebarMenuItem,
} from "cdbreact";
import { NavLink, Outlet } from "react-router-dom";
import { AuthContext } from "../../../contexts/AuthProvider/AuthProvider";
import SellerOptions from "./SellerOptions";
import Options from "./Options";
const Sidebar = () => {
  const { user } = useContext(AuthContext);
  console.log(user);
  const isBuyer = user?.role === "buyer";
  const isSeller = user?.role === "seller";

  
  return (
    <div
      style={{ display: "flex", height: "100vh", overflow: "scroll initial" }}
    >
      <CDBSidebar textColor="Red" backgroundColor="#f8f9fa">
        <CDBSidebarHeader prefix={<i className="fa fa-bars fa-large"></i>}>
          <a
            href="/dashboard"
            className="text-decoration-none"
            style={{ color: "inherit" }}
          >
            Dashboard
          </a>
        </CDBSidebarHeader>

        <CDBSidebarContent className="sidebar-content">
          <CDBSidebarMenu>
             {/* {user && isSeller && (
              <NavLink
                exact
                to="/dashboard/addProducts"
                activeClassName="activeClicked"
                style={{ color: "inherit" }}
              >
                <CDBSidebarMenuItem icon="plus-square">
                  Add Produtcs
                </CDBSidebarMenuItem>
              </NavLink>
            )}
         
            {user && isBuyer && (
              <NavLink
                exact
                to="/dashboard/myOrders"
                activeClassName="activeClicked"
                style={{ color: "inherit" }}
              >
                <CDBSidebarMenuItem icon="heart">My Orders</CDBSidebarMenuItem>
              </NavLink>
            )}
               
            {user && isSeller && (
              <NavLink
                exact
                to="/dashboard/myProducts"
                activeClassName="activeClicked"
                style={{ color: "inherit" }}
              >
                <CDBSidebarMenuItem icon="window-maximize">
                  My products
                </CDBSidebarMenuItem>
              </NavLink>
            )} */}
            <Options isBuyer={isBuyer} isSeller={isSeller}></Options>
            <NavLink
              exact
              to="/analytics"
              activeClassName="activeClicked"
              style={{ color: "inherit" }}
            >
              <CDBSidebarMenuItem icon="camera-retro">
                Analytics
              </CDBSidebarMenuItem>
            </NavLink>

            <NavLink
              exact
              to="/hero404"
              target="_blank"
              activeClassName="activeClicked"
              style={{ color: "inherit" }}
            >
              <CDBSidebarMenuItem icon="">404 page</CDBSidebarMenuItem>
            </NavLink>
          </CDBSidebarMenu>
        </CDBSidebarContent>

        <CDBSidebarFooter style={{ textAlign: "center" }}>
          <div
            style={{
              padding: "20px 5px",
            }}
          >
            Sidebar Footer
          </div>
        </CDBSidebarFooter>
      </CDBSidebar>
      <Outlet></Outlet>
    </div>
  );
};

export default Sidebar;
