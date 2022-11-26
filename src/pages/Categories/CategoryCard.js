import React from 'react';
import { Button, Card } from 'react-bootstrap';

const CategoryCard = ({category}) => {
  const {_id, name, image}=category;
    return (
      <div className=" col-lg-4 col-md-6 col-12 p-1">
            <Card style={{ }}>
      <Card.Img variant="top" src={image} />
      <Card.ImgOverlay>
        <Card.Title>{name}</Card.Title>
        {/* <Card.Text>
          This is a wider card with supporting text below as a natural lead-in
          to additional content. This content is a little bit longer.
        </Card.Text>
        <Card.Text>Last updated 3 mins ago</Card.Text> */}
      </Card.ImgOverlay>
    </Card>
        </div>
    );
};

export default CategoryCard;