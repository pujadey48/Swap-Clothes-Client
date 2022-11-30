import React from "react";
import { Button, Card, Carousel, Col, Container, Row } from "react-bootstrap";
import Categories from "../Categories/Categories";
import Footer from "../Footer/Footer";
import AdvertisedProducts from "./AdvertisedProducts";

const Home = () => {
  return (
    <Container>
      <Carousel>
        <Carousel.Item>
          <img className="d-block w-100" src="pic1.jpeg" alt="First slide" />
          <Carousel.Caption>
            <h1 className="fs-1">Winter Collention Available</h1>
            {/* <p>Nulla vitae elit libero, a pharetra augue mollis interdum.</p> */}
          </Carousel.Caption>
        </Carousel.Item>
        <Carousel.Item>
          <img className="d-block w-100" src="pic3.webp" alt="Second slide" />

          <Carousel.Caption>
            <h1 className="fs-1">Winter'22</h1>
            {/* <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit.</p> */}
          </Carousel.Caption>
        </Carousel.Item>
        {/* <Carousel.Item>
        <img
          className="d-block w-100"
          src="holder.js/800x400?text=Third slide&bg=20232a"
          alt="Third slide"
        />

        <Carousel.Caption>
          <h3>Third slide label</h3>
          <p>
            Praesent commodo cursus magna, vel scelerisque nisl consectetur.
          </p>
        </Carousel.Caption>
      </Carousel.Item> */}
      </Carousel>
      <div>
        <Categories></Categories>
      </div>

      <div className="mt-5 mb-5">
        <AdvertisedProducts></AdvertisedProducts>
      </div>
      {/* ------ section start ------- */}

      <div className="mt-5">
        <Row>
          <Col className="p-5">
            <div className="d-flex align-items-center h-100">
            <div>
            <h1>Our Story</h1>
            <p>Founded by sisters, Harriett and Izzie, Sestri was created to deliver high quality, timeless pieces that could be pulled out of your wardrobe year after year. Investment and seasonless designs are the forefront of the brand and every piece is crafted from the highest quality fabrics and designed in-house in the UK.</p>
            <Button variant="dark">Shop Now</Button>
            </div>
            </div>
          </Col>
          <Col className="p-5 text-center">
            <Card style={{ width: '18rem' }}>
              <Card.Img variant="top" src="sectionPic2.jpeg" />
            </Card>
          </Col>
        </Row>
      </div>

      <Footer></Footer>
    </Container>
  );
};

export default Home;
