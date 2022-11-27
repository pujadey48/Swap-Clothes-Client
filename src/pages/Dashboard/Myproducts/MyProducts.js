import React, { useEffect } from "react";
import { useQuery } from "@tanstack/react-query";
import { getUrl } from "../../../Util/Util";
import Table from 'react-bootstrap/Table';
import { Link } from "react-router-dom";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { Container } from "react-bootstrap";

const MyProducts = () => {
  const { data: myproducts = [], refetch } = useQuery({
    queryKey: ["myproducts"],
    queryFn: async () => {
      const res = await await fetch(getUrl("/myproducts"), {
        headers: {
          authorization: `Bearer ${localStorage.getItem("jwt-token")}`,
        },
      });
      const data = await res.json();
      console.log("myproducts", data);
      return data;
    },
  });

  useEffect(() => {
    refetch();
  }, []);

  const showDeleteToastMessage = () => {
    toast.success("Successfully deleted!", {
      position: toast.POSITION.TOP_RIGHT,
    });
  };

  const showAdvertiseToastMessage = () => {
    toast.success("Advertisement enabled for this product!", {
      position: toast.POSITION.TOP_RIGHT,
    });
  };

  const deleteProduct= (id)=>{
    const proceed = window.confirm(
        "Are you sure, you want to delete this review?"
      );
      if (proceed) {
        fetch(getUrl(`/product/${id}`), {
          method: "DELETE",
          headers: {
            authorization: `Bearer ${localStorage.getItem("jwt-token")}`,
          },
        })
          .then((res) => res.json())
          .then((data) => {
            if (data.deletedCount > 0) {
                refetch();
                showDeleteToastMessage();
            }
          });
      }
  }

  const advertiseProduct= (id)=>{
    const proceed = window.confirm(
        "Do you want to add this product for advertisement?"
      );
      if (proceed) {
        fetch(getUrl(`/addToAdvertisement/${id}`), {
          method: "PATCH",
          headers: {
            authorization: `Bearer ${localStorage.getItem("jwt-token")}`,
          },
        })
          .then((res) => res.json())
          .then((data) => {
            if (data.deletedCount > 0) {
                refetch();
                showAdvertiseToastMessage();
            }
          });
      }
  }

  return (
    <Container>
      <h2>My Products</h2>
      <ToastContainer />
      <Table striped>
      <thead>
        <tr>
          <th>#</th>
          <th>Name</th>
          <th>Selling Price</th>
          <th>Status</th>
          <th>Delete</th>
          <th>Advertise</th>
        </tr>
      </thead>
      <tbody>
      {myproducts.map((product, index) => (
          <tr>
          <td>{index}</td>
          <td>{product.name}</td>
          <td>{product.selling_price}</td>
          <td>{product.status}</td>
          <td><Link onClick={()=>{deleteProduct(product._id)}}>Delete</Link></td>
          <td>
            {product.status==='available' && !product.show_in_ad && (<Link onClick={()=>{advertiseProduct(product._id)}}>Advertise</Link>)}
            {product.status==='available' && product.show_in_ad && (<span >Advertising</span>)}
          </td>
        </tr>
      ))}
      </tbody>
    </Table>
      
    </Container>
  );
};

export default MyProducts;
