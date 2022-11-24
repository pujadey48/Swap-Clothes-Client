import React, { useContext } from "react";
import { useState } from "react";
import { Alert, Container } from "react-bootstrap";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import { Link, Navigate, useLocation, useNavigate } from "react-router-dom";
import {
  AuthContext,
  
} from "../../contexts/AuthProvider/AuthProvider.js";
const Signup = () => {
  const [error, setError] = useState();
  const { createUser, user } = useContext(AuthContext);
  const navigate = useNavigate();
  const location = useLocation();

  const from = location.state?.from?.pathname || "/";

  const loginDone = (user) => {
    // getJWT(user);
    console.log(from);
    navigate(from, { replace: true });
  };

  const handleSignUp = (event) => {
    event.preventDefault();
    const form = event.target;
    const email = form.email.value;
    const password = form.password.value;

    createUser(email, password)
      .then((result) => {
        const user = result.user;
        console.log(user);
        form.reset();
        setError("");
        loginDone(user);
      })
      .catch((e) => {
        console.error(e);
        setError(e.message);
      });
  };
  if (user) {
    return <Navigate to={from} state={{ from: location }} replace></Navigate>;
  }

  return (
    <div>
      <Container className="w-50">
        <h1 className="fs-3 fw-bold text-primary text-center">SignUp</h1>

        {error && (
          <Alert key={"danger"} variant={"danger"} onClose={() => setError("")} dismissible>
            {error}
          </Alert>
        )}
        <Form onSubmit={handleSignUp}>
          <Form.Group className="mb-3" controlId="formBasicEmail">
            <Form.Label>Email address</Form.Label>
            <Form.Control
              type="email"
              name="email"
              placeholder="Enter email"
              required
            />
          </Form.Group>

          <Form.Group className="mb-3" controlId="formBasicPassword">
            <Form.Label>Password</Form.Label>
            <Form.Control
              type="password"
              name="password"
              placeholder="Password"
              required
            />
          </Form.Group>
          <Form.Group className="mb-3" controlId="formBasicCheckbox">
            <Form.Check type="checkbox" label="Check me out" />
          </Form.Group>
          <Button variant="primary" type="submit">
            Submit
          </Button>
        </Form>
        <p className="text-center text-primary">
          Already have an account?{" "}
          <Link className="text-danger fw-bold" to="/login">
            Login
          </Link>{" "}
        </p>
        <Button variant="outline-primary mt-4">Google Login</Button>
      </Container>
    </div>
  );
};

export default Signup;