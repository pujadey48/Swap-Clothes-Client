import React, { useContext, useEffect, useState } from "react";
import { Container } from "react-bootstrap";
import Card from "react-bootstrap/Card";
import ListGroup from "react-bootstrap/ListGroup";
import { useNavigate } from "react-router-dom";
import { getUrl, timeout, timestampToDate } from "../../Util/Util";
import { FaCheckCircle } from "react-icons/fa";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import axios from "axios";
import { useQuery } from "@tanstack/react-query";
import SharedModal from "../Componemts/SharedModal";
import { AuthContext } from "../../contexts/AuthProvider/AuthProvider";

const AdvertisedProducts = () => {
  const { data: advertisedProducts = [], refetch } = useQuery({
    queryKey: ["advertisedProducts"],
    queryFn: async () => {
      const res = await await axios.get(getUrl("/advertisedProducts"));
      const data = await res.data;
      console.log("advertisedProducts", data);
      return data;
    },
  });

  useEffect(() => {
    refetch();
  }, [refetch]);

  const { user } = useContext(AuthContext);

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

  const handleBookingStatus = async (status, message) => {
    if (status) {
      handleClose();
      showToastMessage("Booking added successfully!! Redirecting to My Orders.");
      await timeout(3000);
      navigate("/dashboard/myOrders", { replace: true });
    } else {
      showToastMessage("Failed!! " + message);
    }
  };

  if (advertisedProducts.length > 0) {
    return (
      <Container>
        <h2 className="text-center mt-5">Advertised Products</h2>

        <ToastContainer />

        <SharedModal
          key={"hijibiji"}
          show={show}
          handleClose={handleClose}
          product={selectedProduct}
          handleBookingStatus={handleBookingStatus}
        ></SharedModal>

        <div className="d-flex flex-wrap">
          {advertisedProducts.map((product) => (
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
                  <ListGroup.Item>
                    Category: {product.categories}
                  </ListGroup.Item>
                  <ListGroup.Item>
                    Condition: {product.condition}
                  </ListGroup.Item>
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
                  <Card.Link onClick={() => handleShow(product)}>Book Now</Card.Link>
                </Card.Body>
              </Card>
            </div>
          ))}
        </div>
      </Container>
    );
  } else {
    return <div />;
  }
};

export default AdvertisedProducts;
