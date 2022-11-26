import React, { useEffect, useState } from 'react';
import { Container } from 'react-bootstrap';
import { useLoaderData } from 'react-router-dom';
import { getUrl } from '../../Util/Util';
import CategoryCard from './CategoryCard'


const Categories = () => {
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
    return (
        <Container>
        <h2 className="text-center mt-5">Categories</h2>
        <div className="d-flex flex-wrap">
          {categories.map((category) => (
            <CategoryCard key={category._id} category={category}></CategoryCard>
          ))}
        </div>
        </Container>
    );
};

export default Categories;