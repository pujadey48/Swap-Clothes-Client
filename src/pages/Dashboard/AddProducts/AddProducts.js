import React, { useEffect, useState } from 'react';
import { Button, Container, Form } from 'react-bootstrap';
import { getUrl } from '../../../Util/Util';

const AddProducts = () => {
    const [categories, setCategories] = useState([]);
    console.log(categories);

    useEffect(() => {
        fetch(getUrl(`/categories`), {
          
        })
          .then((res) => {
            return res.json();
          })
          .then((data) => {
            setCategories(data);
          });
      }, []);
    
    const handleSignUp = (event) => {
        event.preventDefault();
        // const form = event.target;
        // console.log("form", form);
        // const email = form.email.value;
        // const password = form.password.value;
        // const role = form.role.value;
    
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
      };
    return (
        <Container>
            <h2>AddProduct</h2>
            <Form className='p-5' onSubmit={handleSignUp} >
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
          <Form.Label >Categories</Form.Label>
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
            <Form.Check type="checkbox" name="show_in_ad" label="Show in Advertisement" />
          </Form.Group>
          <Button variant="primary" type="submit">
            Submit
          </Button>
        </Form>
        </Container>
    );
};

export default AddProducts;