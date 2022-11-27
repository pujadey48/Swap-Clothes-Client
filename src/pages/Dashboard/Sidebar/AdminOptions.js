import { CDBSidebarMenuItem } from "cdbreact";
import React, { Fragment } from "react";
import { NavLink } from "react-router-dom";

const AdminOptions = () => {
  return (
    <Fragment>
      <NavLink
        exact
        to="/dashboard/allBuyers"
        activeClassName="activeClicked"
        style={{ color: "inherit" }}
      >
        <CDBSidebarMenuItem icon="users">Buyers</CDBSidebarMenuItem>
      </NavLink>
      <NavLink
        exact
        to="/dashboard/allSellers"
        activeClassName="activeClicked"
        style={{ color: "inherit" }}
      >
        <CDBSidebarMenuItem icon="user">Sellers</CDBSidebarMenuItem>
      </NavLink>
      <NavLink
        exact
        to="/dashboard/reportedProducts"
        activeClassName="activeClicked"
        style={{ color: "inherit" }}
      >
        <CDBSidebarMenuItem icon="file">Reported Products</CDBSidebarMenuItem>
      </NavLink>
    </Fragment>
  );
};

export default AdminOptions;
