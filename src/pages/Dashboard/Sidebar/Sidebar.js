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
import useAdmin from "../../../hooks/useAdmin";
const Sidebar = () => {
  const { user } = useContext(AuthContext);
  console.log(user);

  const isBuyer = user?.role === "buyer";
  const isSeller = user?.role === "seller";
  const [isAdmin] = useAdmin(user?.uid);

  console.log("isadmin", isAdmin);
  
  return (
    <div
      style={{ display: "flex", height: "100vh", overflow: "scroll initial" }}
    >
      <CDBSidebar textColor="black" backgroundColor="#f8f9fa">
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
            <Options isBuyer={isBuyer} isSeller={isSeller} isAdmin={isAdmin}></Options>
            
          </CDBSidebarMenu>
        </CDBSidebarContent>

        <CDBSidebarFooter style={{ textAlign: "center" }}>
          <div
            style={{
              padding: "20px 5px",
            }}
          >
            ©2025. SWAP CLOTHES
          </div>
        </CDBSidebarFooter>
      </CDBSidebar>
      <Outlet></Outlet>
    </div>
  );
};

export default Sidebar;
