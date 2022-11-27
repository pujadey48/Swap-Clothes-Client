import React from 'react';
import { Button, Card } from 'react-bootstrap';

const CategoryCard = ({category}) => {
  const {_id, name, image}=category;
    return (
      <div className=" col-lg-4 col-md-6 col-12 p-1">
            <Card style={{ }}>
      <Card.Img variant="top" src={image} />
      <Card.ImgOverlay>
        <Card.Title className='fs-3'>{name}</Card.Title>
        {/* <Card.Text>
          This is a wider card with supporting text below as a natural lead-in
          to additional content. This content is a little bit longer.
        </Card.Text>
        <Card.Text>Last updated 3 mins ago</Card.Text> */}
        <div className='d-flex h-50 align-items-end justify-content-center'>
        {/* <Button variant="primary">Shop Now</Button> */}
        <a href={`/showCategoryProducts/${name}`} className='stretched-link fs-3 fw-semibold text-dark text-decoration-none'>Shop Now</a>
        </div>
      </Card.ImgOverlay>
    </Card>
        </div>
    );
};

export default CategoryCard;