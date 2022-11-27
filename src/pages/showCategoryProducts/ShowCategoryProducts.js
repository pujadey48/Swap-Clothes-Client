import React from "react";
import { Container } from "react-bootstrap";
import Card from "react-bootstrap/Card";
import ListGroup from "react-bootstrap/ListGroup";
import { useLoaderData } from "react-router-dom";
import { getUrl, timestampToDate } from "../../Util/Util";
import { FaCheckCircle } from 'react-icons/fa';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import axios from "axios";

const ShowCategoryProducts = () => {
  const products = useLoaderData();

  

  const showVerifiedSuccessfullyToast = () => {
    toast.success("Product reported successfully", {
      position: toast.POSITION.TOP_RIGHT,
    });
  };

  const reportProduct= (id)=>{
    const proceed = window.confirm(
        "Do you want to report this product?"
      );
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
        axios.patch(getUrl(`/reportProduct/${id}`))
          .then((res) => res.data)
          .then((data) => {
            console.log(data);
            if (data.modifiedCount > 0) {
                showVerifiedSuccessfullyToast();
            }
          });
      }
  }


  return (
    <Container>
      <div className="d-flex flex-wrap">
        <ToastContainer/>
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
                <ListGroup.Item>Time: {timestampToDate(product.timestamp)}</ListGroup.Item>
                <ListGroup.Item>Seller: {product.createdByName} {product.createdByVerified 
                && (<FaCheckCircle style={{color: 'blue', fontSize: '15px'}}/>)} </ListGroup.Item>
              </ListGroup>
              <Card.Body>
                <Card.Link href="#">Book Now</Card.Link>
                <Card.Link onClick={()=>reportProduct(product._id)}>Report</Card.Link>
              </Card.Body>
            </Card>
          </div>
        ))}
      </div>
    </Container>
  );
};

export default ShowCategoryProducts;
