import { CDBSidebarMenuItem } from "cdbreact";
import React, { Fragment } from "react";
import { NavLink } from "react-router-dom";

const SellerOptions = () => {
  return (
    <Fragment>
      <NavLink
        exact
        to="/dashboard/addProducts"
        activeClassName="activeClicked"
        style={{ color: "inherit" }}
      >
        <CDBSidebarMenuItem icon="plus-square">Add Produtcs</CDBSidebarMenuItem>
      </NavLink>
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
    </Fragment>
  );
};

export default SellerOptions;
