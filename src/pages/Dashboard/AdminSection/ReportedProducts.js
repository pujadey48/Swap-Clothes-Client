import React, { useEffect } from "react";
import { useQuery } from "@tanstack/react-query";
import { getUrl } from "../../../Util/Util";
import Table from 'react-bootstrap/Table';
import { Link } from "react-router-dom";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { Container } from "react-bootstrap";

const ReportedProducts = () => {
  const { data: reportedProducts = [], refetch } = useQuery({
    queryKey: ["reportedProducts"],
    queryFn: async () => {
      const res = await await fetch(getUrl("/getReportedProducts"), {
        headers: {
          authorization: `Bearer ${localStorage.getItem("jwt-token")}`,
        },
      });
      const data = await res.json();
      console.log("reportedProducts", data);
      return data;
    },
  });

  useEffect(() => {
    refetch();
  }, [refetch]);

  const showDeleteToastMessage = () => {
    toast.success("Successfully deleted!", {
      position: toast.POSITION.TOP_RIGHT,
    });
  };

  const deleteProduct= (id)=>{
    const proceed = window.confirm(
        "Are you sure, you want to delete this product?"
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

  return (
    <Container>
      <h2>Reported Products</h2>
      <ToastContainer />
      <Table striped>
      <thead>
        <tr>
          <th>#</th>
          <th>Name</th>
          <th>Selling Price</th>
          <th>Status</th>
          <th>Delete</th>
        </tr>
      </thead>
      <tbody>
      {reportedProducts.map((product, index) => (
          <tr>
          <td>{index}</td>
          <td>{product.name}</td>
          <td>{product.selling_price}</td>
          <td>{product.status}</td>
          <td><Link onClick={()=>{deleteProduct(product._id)}}>Delete</Link></td>
        </tr>
      ))}
      </tbody>
    </Table>
      
    </Container>
  );
};

export default ReportedProducts;
