import { CDBSidebarMenuItem } from "cdbreact";
import React, { Fragment } from "react";
import { NavLink } from "react-router-dom";

const BuyerOptions = () => {
  return (
    <Fragment>
      <NavLink
        exact
        to="/dashboard/myOrders"
        activeClassName="activeClicked"
        style={{ color: "inherit" }}
      >
        <CDBSidebarMenuItem icon="heart">My Orders</CDBSidebarMenuItem>
      </NavLink>
    </Fragment>
  );
};

export default BuyerOptions;
