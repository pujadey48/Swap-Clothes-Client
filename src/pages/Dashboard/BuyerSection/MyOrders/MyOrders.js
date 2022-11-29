import React from "react";
import { Button, Card, ListGroup, Table } from "react-bootstrap";
import { FaCheckCircle } from "react-icons/fa";

const MyOrders = () => {
  return (
    <div className=" col-lg-3 col-md-6 col-12 p-1">
      <Card>
        <Card.Img variant="top" src="holder.js/100px180" />
        <Card.Body>
          <Card.Title>Product Name</Card.Title>
          <Card.Text></Card.Text>
        </Card.Body>
        <ListGroup className="list-group-flush">
          <ListGroup.Item>Price: taka</ListGroup.Item>
        </ListGroup>
        <Card.Body>
          <Card.Link>Pay</Card.Link>
        </Card.Body>
      </Card>
    </div>
  );
};

export default MyOrders;
