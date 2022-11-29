import { useQuery } from "@tanstack/react-query";
import React, { useEffect } from "react";
import { Button, Card, Container, Image, ListGroup, Table } from "react-bootstrap";
import { FaCheckCircle } from "react-icons/fa";
import { Link } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import { getUrl } from "../../../../Util/Util";

const MyOrders = () => {
  const { data: myorders = [], refetch } = useQuery({
    queryKey: ["myorders"],
    queryFn: async () => {
      const res = await await fetch(getUrl("/myorders"), {
        headers: {
          authorization: `Bearer ${localStorage.getItem("jwt-token")}`,
        },
      });
      const data = await res.json();
      console.log("myorders", data);
      return data;
    },
  });

  useEffect(() => {
    refetch();
  }, []);

  const handlePayNow = (bookingId) => {

  }

  return (
    // <div className=" col-lg-3 col-md-6 col-12 p-1">
    //   <Card>
    //     <Card.Img variant="top" src="holder.js/100px180" />
    //     <Card.Body>
    //       <Card.Title>Product Name</Card.Title>
    //       <Card.Text></Card.Text>
    //     </Card.Body>
    //     <ListGroup className="list-group-flush">
    //       <ListGroup.Item>Price: taka</ListGroup.Item>
    //     </ListGroup>
    //     <Card.Body>
    //       <Card.Link>Pay</Card.Link>
    //     </Card.Body>
    //   </Card>
    // </div>
    <Container>
      <h2>My Products</h2>
      <ToastContainer />
      <Table striped>
      <thead>
        <tr>
          <th>#</th>
          <th>Image</th>
          <th>Title</th>
          <th>Price</th>
          <th>Payment</th>
        </tr>
      </thead>
      <tbody>
      {myorders.map((order, index) => (
          <tr>
          <td>{index}</td>
          <td><Image
                    style={{ height: "100px" }}
                    src={order.productImageUrl}
                  ></Image></td>
          <td>{order.productName}</td>
          <td>{order.productSellingPrice} taka</td>
          {/* <td><Link onClick={()=>{deleteProduct(product._id)}}>Delete</Link></td> */}
          <td>
            {order.paymentStatus==='unpaid' && (<Link to={`/dashboard/payment/${order._id}`}>Pay Now</Link>)}
            {order.paymentStatus==='paid' && (<span >Paid</span>)}
          </td>
        </tr>
      ))}
      </tbody>
    </Table>
      
    </Container>
  );
};

export default MyOrders;
