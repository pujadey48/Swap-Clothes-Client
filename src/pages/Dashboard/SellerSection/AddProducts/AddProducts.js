import React, { useEffect, useState } from "react";
import { Button, Container, Form } from "react-bootstrap";
import { getUrl, timeout } from "../../../../Util/Util";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useNavigate } from "react-router-dom";

const AddProducts = () => {
  const navigate = useNavigate();
  const [categories, setCategories] = useState([]);
  console.log(categories);

  const [error, setError] = useState("");

  const showToastMessage = () => {
    toast.success("Successfully added! Redirecting to My Products.", {
      position: toast.POSITION.TOP_RIGHT,
    });
  };

  useEffect(() => {
    fetch(getUrl(`/categories`), {})
      .then((res) => {
        return res.json();
      })
      .then((data) => {
        setCategories(data);
      });
  }, []);

  const waitAndNevigateToMyProducts = async () => {
    await timeout(3000);
    navigate("/dashboard/myProducts", { replace: true });
  };

  const handleSignUp = (event) => {
    event.preventDefault();
    const form = event.target;
    console.log("form", form);
    const name = form.name.value;
    const selling_price = form.selling_price.value;
    const location = form.location.value;
    const mobile_number = form.mobile_number.value;
    const description = form.description.value;
    const buying_price = form.buying_price.value;
    const years_of_purchase = form.years_of_purchase.value;
    const categories = form.categories.value;
    const show_in_ad = form.show_in_ad.checked;
    const url = form.url.value;
    const condition = form.condition.value;

    const addProduct = {
      name: name,
      selling_price: selling_price,
      location: location,
      mobile_number: mobile_number,
      description: description,
      buying_price: buying_price,
      years_of_purchase: years_of_purchase,
      categories: categories,
      show_in_ad: show_in_ad,
      url: url,
      condition: condition,
    };

    fetch(getUrl("/product"), {
      method: "POST",
      headers: {
        "content-type": "application/json",
        authorization: `Bearer ${localStorage.getItem("jwt-token")}`,
      },
      body: JSON.stringify(addProduct),
    })
      .then((res) => res.json())
      .then((data) => {
        console.log(data);
        if (data.acknowledged) {
          //  alert("Service added successfully");
          showToastMessage();

          form.reset();
          setError("");
          waitAndNevigateToMyProducts();
        }
      })
      .catch((er) => {
        console.error(er);
        setError(er.message);
      });
  };

  // createUser(email, password, role)
  //   .then((result) => {
  //     const userData = normalizeUserData(result.user);
  //     form.reset();
  //     setError("");
  //     loginDone(userData);
  //   })
  //   .catch((e) => {
  //     console.error(e);
  //     setError(e.message);
  //   });

  return (
    <Container>
      <h2>Add Product</h2>
      <ToastContainer></ToastContainer>
      <Form className="p-5" onSubmit={handleSignUp}>
        <Form.Group className="mb-3" controlId="formBasicEmail">
          <Form.Label>Name</Form.Label>
          <Form.Control
            type="text"
            name="name"
            placeholder="Product Name"
            required
          />
        </Form.Group>

        <Form.Group className="mb-3" controlId="formBasicPassword">
          <Form.Label>Selling Price</Form.Label>
          <Form.Control
            type="text"
            name="selling_price"
            placeholder="Selling Price"
            required
          />
        </Form.Group>

        <Form.Group className="mb-3" controlId="formBasicPassword">
          <Form.Label>Location</Form.Label>
          <Form.Control
            type="text"
            name="location"
            placeholder="Location"
            required
          />
        </Form.Group>

        <Form.Group className="mb-3" controlId="formBasicPassword">
          <Form.Label>Image Url</Form.Label>
          <Form.Control
            type="text"
            name="url"
            placeholder="Image Url"
            required
          />
        </Form.Group>

        <Form.Group className="mb-3">
          <Form.Label>Condition</Form.Label>
          <Form.Select id="condition" name="condition">
            <option value="Excellent">Excellent</option>
            <option value="Good">Good</option>
            <option value="Fair">Fair</option>
          </Form.Select>
        </Form.Group>

        <Form.Group className="mb-3" controlId="formBasicPassword">
          <Form.Label>Mobile Number</Form.Label>
          <Form.Control
            type="text"
            name="mobile_number"
            placeholder="Mobile Number"
            required
          />
        </Form.Group>

        <Form.Group className="mb-3" controlId="formBasicPassword">
          <Form.Label>Description</Form.Label>
          <Form.Control
            type="text"
            name="description"
            placeholder="Description"
            required
          />
        </Form.Group>

        <Form.Group className="mb-3">
          <Form.Label>Categories</Form.Label>
          <Form.Select id="categories" name="categories">
            {/* <option value="womens">Womens</option>
            <option value="mens">Mens</option>
            <option value="kids">Kids</option> */}
            {categories.map((category) => (
              <option value={category.name}>{category.name}</option>
            ))}
          </Form.Select>
        </Form.Group>
        <Form.Group className="mb-3" controlId="formBasicPassword">
          <Form.Label>Buying Price</Form.Label>
          <Form.Control
            type="text"
            name="buying_price"
            placeholder="Buying Price"
            required
          />
        </Form.Group>

        <Form.Group className="mb-3" controlId="formBasicPassword">
          <Form.Label>Year of purchase </Form.Label>
          <Form.Control
            type="text"
            name="years_of_purchase"
            placeholder="Year of purchase"
            required
          />
        </Form.Group>

        <Form.Group className="mb-3" controlId="formBasicCheckbox">
          <Form.Check
            type="checkbox"
            name="show_in_ad"
            label="Show in Advertisement"
          />
        </Form.Group>
        <Button variant="primary" type="submit">
          Submit
        </Button>
      </Form>
    </Container>
  );
};

export default AddProducts;
