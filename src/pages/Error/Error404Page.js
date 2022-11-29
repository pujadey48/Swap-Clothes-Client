import React from "react";
import { Container, Image } from "react-bootstrap";

const Error404Page = () => {
  return (
    <Container>
      <div className="d-flex justify-content-center">
        <h1 className="text-danger">The Page is not found</h1>
      </div>

      <div className="d-flex justify-content-center">
        <Image src={"/error-404.webp"} style={{ height: "400px" }}></Image>
      </div>
    </Container>
  );
};

export default Error404Page;
