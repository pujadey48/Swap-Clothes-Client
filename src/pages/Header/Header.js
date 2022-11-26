import React, { useContext } from "react";
import {
  Button,
  Container,
  Dropdown,
  Image,
  Nav,
  ButtonGroup,
  DropdownButton,
  Navbar,
  NavDropdown,
} from "react-bootstrap";
import { GoogleAuthProvider } from "firebase/auth";
import {
  AuthContext,
  getJWT,
  normalizeUserData,
} from "../../contexts/AuthProvider/AuthProvider";
import { useLocation, useNavigate } from "react-router-dom";

import { FaSignOutAlt } from "react-icons/fa";

const Header = () => {
  const { user, logOut } = useContext(AuthContext);
  const { providerLogin } = useContext(AuthContext);
  const location = useLocation();
  const navigate = useNavigate();

  const handleLogOut = () => {
    logOut()
      .then(() => {})
      .catch((error) => console.error(error));
  };

  const loginDone = (userData) => {
    getJWT(userData);
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
        className="mb-4"
        expand="lg"
        bg="light"
        variant="light"
      >
        <Container>
          <Navbar.Brand href="/" className="fs-2 fw-semibold text-danger">
            <img
              alt=""
              src="/myLogo.png"
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
              <Nav.Link href="/blogs">Blogs</Nav.Link>
            </Nav.Item>

            {user &&(
              <NavDropdown
              id="nav-dropdown-dark-example"
              title="DashBoard"
              menuVariant="dark"
            >
              <NavDropdown.Item href="#action/3.1">AddProducts</NavDropdown.Item>
              <NavDropdown.Item href="#action/3.2">
                MyOrders
              </NavDropdown.Item>
              <NavDropdown.Item href="#action/3.3">MyProducts</NavDropdown.Item>
              <NavDropdown.Divider />
              <NavDropdown.Item href="#action/3.4">
                Separated link
              </NavDropdown.Item>
            </NavDropdown>
            )

            }

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
                  <Dropdown.Item href="#/">{user?.displayName}</Dropdown.Item>
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
