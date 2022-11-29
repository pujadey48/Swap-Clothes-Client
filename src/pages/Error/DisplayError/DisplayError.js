import React, { useContext } from "react";
import { Container } from "react-bootstrap";
import { useNavigate, useRouteError } from "react-router-dom";
import { AuthContext } from "../../../contexts/AuthProvider/AuthProvider";

const DisplayError = () => {
  const { logOut } = useContext(AuthContext);
  const error = useRouteError();
  const navigate = useNavigate();

  const handleLogOut = () => {
    logOut()
      .then(() => {
        navigate("/login");
      })
      .catch((err) => console.log(err));
  };

  return (
    <Container>
      <h3 className="text-danger text-center">Something went wrong!!!</h3>
      <p className="text-danger text-center">
        {error.stutusText || error.message}
      </p>
      <h4 className="text-danger text-center">
        Please <button onClick={handleLogOut}>Log out</button> and log back in
      </h4>
    </Container>
  );
};

export default DisplayError;
