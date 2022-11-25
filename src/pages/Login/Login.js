import React from 'react';
import { GoogleAuthProvider } from "firebase/auth";
import { useState } from "react";
import { useContext } from "react";
import { Alert, Container } from "react-bootstrap";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import { Link, Navigate, useLocation, useNavigate } from "react-router-dom";
import {
  AuthContext,
  getJWT,
  normalizeUserData

} from "../../contexts/AuthProvider/AuthProvider.js"

const Login = () => {
    const [error, setError] = useState("");
  const { setLoading, login, user } = useContext(AuthContext);
  const { providerLogin } = useContext(AuthContext);
  const location = useLocation();
  const navigate = useNavigate();

  const from = location.state?.from?.pathname || "/";

  const loginDone = (userData) => {
    console.log("user", userData);
    getJWT(userData);
    navigate(from, { replace: true });
  };

  const googleProvider = new GoogleAuthProvider();

  const handleGoogleSignIn = () => {
    providerLogin(googleProvider)
      .then((result) => {
        const userData = normalizeUserData(result.user);
        setError("");
        loginDone(userData);
      })
      .catch((error) => console.error(error))
      .finally(() => {
        setLoading(false);
      });
  };

  const handleLogIn = (event) => {
    event.preventDefault();
    const form = event.target;
    console.log("form", form);
    const email = form.email.value;
    const password = form.password.value;
    const role = form.role.value;

    login(email, password, role)
      .then((result) => {
        const userData = normalizeUserData(result.user);
        form.reset();
        setError("");
        loginDone(userData);
      })
      .catch((error) => {
        console.error(error);
        setError(error.message);
      })
      .finally(() => {
        setLoading(false);
      });
  };

  if (user) {
    return <Navigate to={from} state={{ from: location }} replace></Navigate>;
  }
  return (
    <div>
      <Container className="w-50">
        <h1 className="fs-3 fw-bold text-primary text-center">Login</h1>
        {error && (
          <Alert key={"danger"} variant={"danger"} onClose={() => setError("")} dismissible>
            {error}
          </Alert>
        )}
        <Form onSubmit={handleLogIn}>
          <Form.Group className="mb-3" controlId="formBasicEmail">
            <Form.Label>Email address</Form.Label>
            <Form.Control type="email" name="email" placeholder="Enter email" />
          </Form.Group>

          <Form.Group className="mb-3" controlId="formBasicPassword">
            <Form.Label>Password</Form.Label>
            <Form.Control
              type="password"
              name="password"
              placeholder="Password"
            />
            <Form.Group className="mb-3">
          <Form.Label >Select role</Form.Label>
          <Form.Select id="role" name="role">
            <option value="buyer">Buyer</option>
            <option value="seller">Seller</option>
          </Form.Select>
        </Form.Group>
          </Form.Group>
          <Form.Group className="mb-3" controlId="formBasicCheckbox">
            <Form.Check type="checkbox" label="Check me out" />
          </Form.Group>
          <Button variant="primary" type="submit">
            Submit
          </Button>
        </Form>
        <p className="text-center text-primary">
          Have an Account?{" "}
          <Link className="text-danger fw-bold" to="/signup">
            Sign Up
          </Link>{" "}
        </p>
        <Button variant="outline-primary mt-4" onClick={handleGoogleSignIn}>
          Google Login
        </Button>
      </Container>
    </div>
  );
};

export default Login;