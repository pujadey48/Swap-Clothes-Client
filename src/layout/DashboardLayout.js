import React, { useContext } from "react";
import { Container, Row } from "react-bootstrap";
import { Outlet } from "react-router-dom";
import { AuthContext } from "../contexts/AuthProvider/AuthProvider";
import Sidebar from "../pages/Dashboard/Sidebar/Sidebar";
import Header from "../pages/Header/Header";

const DeshboardLauout = () => {
  const { user } = useContext(AuthContext);
  const isBuyer = user?.role === "buyer";
  const isSeller = user?.role === "seller";
  return (
    <Container>
      <Header></Header>
      <Row >
        <div >
          <Sidebar></Sidebar>
        </div>
        {/* <div className="w-50">
          <Outlet></Outlet>
        </div> */}
      </Row>
    </Container>
  );
};

export default DeshboardLauout;
