import React, { useContext, useId, useState } from "react";
import { Button, Form, Modal } from "react-bootstrap";
import { AuthContext } from "../../contexts/AuthProvider/AuthProvider";
import { getUrl } from "../../Util/Util";

const SharedModal = ({ show, handleClose, product, handleBookingStatus }) => {
  console.log("SharedModal product", product);
  //   const handleShow = () => setShow(true);
  const { user } = useContext(AuthContext);

  const handleBookNow = (event)=>{
    event.preventDefault();
    const form = event.target;
    console.log("form", form);
    const location = form.location.value;
    const mobile = form.phoneNo.value;

    const booking = {
      productID : product?._id,
      productImageUrl : product?.url,
      productName : product?.name,
      productSellingPrice : product?.selling_price,
      meetingLocation : location,
      mobileNo : mobile,
    }

    fetch(getUrl("/booknow"), {
      method: "POST",
      headers: {
        "content-type": "application/json",
        authorization: `Bearer ${localStorage.getItem("jwt-token")}`,
      },
      body: JSON.stringify(booking),
    })
      .then((res) => res.json())
      .then((data) => {
        console.log(data);
        handleBookingStatus(data.acknowledged, "");
      })
      .catch((er) => {
        console.error(er);
        handleBookingStatus(false, er.message);
        // setError(er.message);
      });
  }

  return (
    <Modal show={show} onHide={handleClose}>
      <Modal.Header closeButton>
        <Modal.Title>Booking Information</Modal.Title>
      </Modal.Header>
      {/* <Modal.Body>{user.name}</Modal.Body> */}
      <Form className="p-5" onSubmit={handleBookNow}>
        <Form.Group className="mb-3" controlId="formBasicEmail" disabled>
          <Form.Label>Buyer Name</Form.Label>
          <Form.Control
            name="name"
            type="text"
            defaultValue={user?.name}
            disabled
          />
        </Form.Group>

        <Form.Group className="mb-3" controlId="formBasicEmail" disabled>
          <Form.Label>Buyer email</Form.Label>
          <Form.Control
            name="email"
            type="email"
            defaultValue={user?.email}
            disabled
          />
        </Form.Group>

        <Form.Group className="mb-3" controlId="formBasicEmail" disabled>
          <Form.Label>Preduct Name</Form.Label>
          <Form.Control
            name="productName"
            type="text"
            defaultValue={product?.name}
            disabled
          />
        </Form.Group>

        <Form.Group className="mb-3" controlId="formBasicEmail" disabled>
          <Form.Label>Preduct Price</Form.Label>
          <Form.Control
            name="productPrice"
            type="text"
            defaultValue={product?.selling_price}
            disabled
          />
        </Form.Group>

        <Form.Group className="mb-3" controlId="formBasicPassword">
          <Form.Label>Meeting Location</Form.Label>
          <Form.Control
            type="text"
            name="location"
            placeholder="Location"
            required
          />
        </Form.Group>

        <Form.Group className="mb-3" controlId="formBasicPassword">
          <Form.Label>Phone No.</Form.Label>
          <Form.Control
            type="text"
            name="phoneNo"
            placeholder="Phone No."
            required
          />
        </Form.Group>

        {/* <Form.Group className="mb-3" controlId="formBasicCheckbox">
            <Form.Check type="checkbox" name="show_in_ad" label="Show in Advertisement" />
          </Form.Group> */}
        <Button variant="primary" type="submit">
          Submit
        </Button>
      </Form>
      <Modal.Footer>
        <Button variant="secondary" onClick={handleClose}>
          Close
        </Button>
        {/* <Button variant="primary" onClick={handleBookNow}>
          Save Changes
        </Button> */}
      </Modal.Footer>
    </Modal>
  );
};

export default SharedModal;
