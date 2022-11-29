import React, { useContext, useState } from "react";
import { Container } from "react-bootstrap";
import Card from "react-bootstrap/Card";
import ListGroup from "react-bootstrap/ListGroup";
import {
  Navigate,
  useLoaderData,
  useLocation,
  useNavigate,
} from "react-router-dom";
import { getUrl, timeout, timestampToDate } from "../../Util/Util";
import { FaCheckCircle } from "react-icons/fa";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import axios from "axios";
import SharedModal from "../Componemts/SharedModal";
import { AuthContext } from "../../contexts/AuthProvider/AuthProvider";

const ShowCategoryProducts = () => {
  const products = useLoaderData();
  const { user } = useContext(AuthContext);
  const location = useLocation();
  const navigate = useNavigate();

  const handleClose = () => {
    setSelectedProduct(null);
    setShow(false);
  };
  const [show, setShow] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState(null);
  const handleShow = (product) => {
    if (user && user.role === "buyer") {
      setSelectedProduct(product);
      setShow(true);
    } else {
      alert("Please login as a buyer");
      navigate("/login", { replace: true });
      // return <Navigate to="/login" state={{from: location}} replace></Navigate>;
    }
  };

  const showToastMessage = (message) => {
    toast.success(message, {
      position: toast.POSITION.TOP_RIGHT,
    });
  };

  const reportProduct = (id) => {
    const proceed = window.confirm("Do you want to report this product?");
    if (proceed) {
      // fetch(getUrl(`/reportProduct/${id}`), {
      //   method: "PATCH"
      // })
      //   .then((res) => res.json())
      //   .then((data) => {
      //     console.log(data);
      //     if (data.modifiedCount > 0) {
      //         showVerifiedSuccessfullyToast();
      //     }
      //   });
      axios
        .patch(getUrl(`/reportProduct/${id}`))
        .then((res) => res.data)
        .then((data) => {
          console.log(data);
          if (data.modifiedCount > 0) {
            showToastMessage("Product reported successfully!!");
          }
        });
    }
  };

  const handleBookingStatus = async (status, message) => {
    if (status) {
      handleClose();
      showToastMessage(
        "Booking added successfully!! Redirecting to My Orders."
      );
      await timeout(3000);
      navigate("/dashboard/myOrders", { replace: true });
    } else {
      showToastMessage("Failed!! " + message);
    }
  };

  return (
    <Container>
      <div className="d-flex flex-wrap">
        <ToastContainer />

        <SharedModal
          key={"hijibiji"}
          show={show}
          handleClose={handleClose}
          product={selectedProduct}
          handleBookingStatus={handleBookingStatus}
        ></SharedModal>

        {products.length == 0 && (
          <div className="d-flex justify-content-center w-100 m-5">
            <h2 className="text-danger text-center">
              No products available in this category!!
            </h2>
          </div>
        )}

        {products.map((product) => (
          //   <Card style={{ width: "18rem" }}>
          <div className=" col-lg-3 col-md-6 col-12 p-1">
            <Card>
              <Card.Img variant="top" src={product.url} />
              <Card.Body>
                <Card.Title>{product.name}</Card.Title>
                <Card.Text>{product.description}</Card.Text>
              </Card.Body>
              <ListGroup className="list-group-flush">
                <ListGroup.Item>
                  Selling Price: {product.selling_price} taka
                </ListGroup.Item>
                <ListGroup.Item>
                  Buying Price: {product.buying_price} taka
                </ListGroup.Item>
                <ListGroup.Item>
                  Years of purchase Price: {product.years_of_purchase}
                </ListGroup.Item>
                <ListGroup.Item>Category: {product.categories}</ListGroup.Item>
                <ListGroup.Item>Condition: {product.condition}</ListGroup.Item>
                <ListGroup.Item>Status: {product.status}</ListGroup.Item>
                <ListGroup.Item>
                  Time: {timestampToDate(product.timestamp)}
                </ListGroup.Item>
                <ListGroup.Item>
                  Seller: {product.createdByName}{" "}
                  {product.createdByVerified && (
                    <FaCheckCircle
                      style={{ color: "blue", fontSize: "15px" }}
                    />
                  )}{" "}
                </ListGroup.Item>
              </ListGroup>
              <Card.Body>
                <Card.Link onClick={() => handleShow(product)}>
                  Book Now
                </Card.Link>
                <Card.Link onClick={() => reportProduct(product._id)}>
                  Report
                </Card.Link>
              </Card.Body>
            </Card>
          </div>
        ))}
      </div>
    </Container>
  );
};

export default ShowCategoryProducts;
