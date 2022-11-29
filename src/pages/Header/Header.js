import React, { useContext } from "react";
import {
  Button,
  Container,
  Dropdown,
  Image,
  Nav,
  Navbar,
} from "react-bootstrap";
import { GoogleAuthProvider } from "firebase/auth";
import {
  AuthContext,
  getJWT,
  normalizeUserData,
} from "../../contexts/AuthProvider/AuthProvider";
import { useLocation, useNavigate } from "react-router-dom";

import { FaSignOutAlt } from "react-icons/fa";
import Logout from "../Logout/Logout";

const Header = () => {
  const { user, logOut } = useContext(AuthContext);
  const { providerLogin } = useContext(AuthContext);

  // const isBuyer = user?.role === "buyer";
  // const isSeller = user?.role === "seller";

  const location = useLocation();
  const navigate = useNavigate();

  const handleLogOut = () => {
    logOut()
      .then(() => {})
      .catch((error) => console.error(error));
  };

  const loginDone = (userData) => {
    // updateUser(userData);
    // getJWT(userData);
    // if(!localStorage.getItem("jwt-token")){
    //   handleLogOut();
    //   return;
    // }
    console.log("user", userData);
    const from = location.state?.from?.pathname || "/";
    if (from) {
      navigate(from, { replace: true });
    }
  };

  const googleProvider = new GoogleAuthProvider();

  const handleGoogleSignIn = () => {
    providerLogin(googleProvider)
      .then((result) => {
        const userData = normalizeUserData(result.user);
        loginDone(userData);
      })
      .catch((error) => console.error(error));
  };
  return (
    <div>
      <Navbar
        collapseOnSelect
        expand="lg"
        bg="light"
        variant="light"
      >
        <Container>
          <Navbar.Brand href="/" className="fs-2 fw-semibold text-dark">
            <img
              alt=""
              src="/logo3.jpeg"
              width="50"
              height="50"
              className="d-inline-block align-top"
            />{" "}
            SWAP CLOTHES
            <p className="fs-6">
              <small>For Beautiful Secondhand Clothing</small>
            </p>
          </Navbar.Brand>
          <Nav className="justify-content-center" activeKey="/home">
            <Nav.Item>
              <Nav.Link href="/">Home</Nav.Link>
            </Nav.Item>

            <Nav.Item>
              <Nav.Link href="/blog">Blogs</Nav.Link>
            </Nav.Item>
            {user && (
              <Nav.Item>
                <Nav.Link href="/dashboard">Dashboard</Nav.Link>
              </Nav.Item>
            )}

            {!user && (
              <Nav.Item>
                {/* <Nav.Link href="/login">login</Nav.Link> */}
                <Button
                  className="me-2"
                  variant="outline-primary"
                  href="/login"
                >
                  login
                </Button>
              </Nav.Item>
            )}
            {!user && (
              <Nav.Item>
                <Button
                  className="me-2"
                  variant="outline-primary"
                  href="/signup"
                >
                  SignUp
                </Button>
                {/* <Nav.Link href="/signup"><Button variant="outline-primary">SignUP</Button></Nav.Link> */}
              </Nav.Item>
            )}

            {!user && (
              <Nav.Item>
                <Button variant="outline-primary" onClick={handleGoogleSignIn}>
                  Google Login
                </Button>
              </Nav.Item>
            )}

            {user && (
              <Dropdown>
                <Dropdown.Toggle variant="link" id="dropdown-basic">
                  <Image
                    style={{ height: "30px" }}
                    roundedCircle
                    src={user?.photoURL ? user?.photoURL : "/avatar.webp"}
                  ></Image>
                </Dropdown.Toggle>

                <Dropdown.Menu>
                  <Dropdown.Item href="#/">{user?.name}</Dropdown.Item>
                  <Dropdown.Item onClick={handleLogOut}>
                    Log out <FaSignOutAlt></FaSignOutAlt>
                  </Dropdown.Item>
                </Dropdown.Menu>
              </Dropdown>
            )}
          </Nav>
        </Container>
      </Navbar>
    </div>
  );
};

export default Header;
