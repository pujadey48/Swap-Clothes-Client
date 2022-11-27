import React, { useEffect } from "react";
import { useQuery } from "@tanstack/react-query";
import { getUrl } from "../../../Util/Util";
import Table from 'react-bootstrap/Table';
import { Link } from "react-router-dom";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { Container, Image } from "react-bootstrap";

const AllSellers = () => {
  const { data: sellers = [], refetch } = useQuery({
    queryKey: ["sellers"],
    queryFn: async () => {
      const res = await await fetch(getUrl("/getAllSellers"), {
        headers: {
          authorization: `Bearer ${localStorage.getItem("jwt-token")}`,
        },
      });
      const data = await res.json();
      console.log("buyers", data);
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

  const deleteUser= (uid)=>{
    const proceed = window.confirm(
        "Are you sure, you want to delete this user?"
      );
      if (proceed) {
        fetch(getUrl(`/user/${uid}`), {
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


  const showVerifiedSuccessfullyToast = () => {
    toast.success("The user is verified!", {
      position: toast.POSITION.TOP_RIGHT,
    });
  };

  const verifySeller= (uid)=>{
    const proceed = window.confirm(
        "Do you want to set this seller as verified?"
      );
      if (proceed) {
        fetch(getUrl(`/verifySeller/${uid}`), {
          method: "PATCH",
          headers: {
            authorization: `Bearer ${localStorage.getItem("jwt-token")}`,
          },
        })
          .then((res) => res.json())
          .then((data) => {
            console.log(data);
            if (data.modifiedCount > 0) {
                refetch();
                showVerifiedSuccessfullyToast();
            }
          });
      }
  }


  return (
    <Container>
      <h2>All Sellers</h2>
      <ToastContainer />
      <Table striped>
      <thead>
        <tr>
          <th>#</th>
          <th>Image</th>
          <th>Full Name</th>
          <th>email</th>
          <th>Delete</th>
          <th>Verify</th>
        </tr>
      </thead>
      <tbody>
      {sellers.map((user, index) => (
          <tr>
          <td>{index}</td>
          <td><Image
                    style={{ height: "30px" }}
                    roundedCircle
                    src={user.photoURL ? user.photoURL : "/avatar.webp"}
                  ></Image></td>
          <td>{user.name}</td>
          <td>{user.email}</td>
          <td><Link onClick={()=>{deleteUser(user.uid)}}>Delete</Link></td>
          <td>
            { !user.verified && (<Link onClick={()=>{verifySeller(user.uid)}}>Verify now</Link>)}
            { user.verified && (<span >verified</span>)}
          </td>
        </tr>
      ))}
      </tbody>
    </Table>
      
    </Container>
  );
};

export default AllSellers ;
