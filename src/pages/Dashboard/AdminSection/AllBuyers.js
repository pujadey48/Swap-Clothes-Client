import React, { useEffect } from "react";
import { useQuery } from "@tanstack/react-query";
import { getUrl } from "../../../Util/Util";
import Table from 'react-bootstrap/Table';
import { Link } from "react-router-dom";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { Container, Image } from "react-bootstrap";

const AllBuyers = () => {
  const { data: buyers = [], refetch } = useQuery({
    queryKey: ["buyers"],
    queryFn: async () => {
      const res = await await fetch(getUrl("/getAllBuyers"), {
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


  return (
    <Container>
      <h2>All Buyers</h2>
      <ToastContainer />
      <Table striped>
      <thead>
        <tr>
          <th>#</th>
          <th>Image</th>
          <th>Full Name</th>
          <th>email</th>
          <th>Delete</th>
        </tr>
      </thead>
      <tbody>
      {buyers.map((user, index) => (
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
        </tr>
      ))}
      </tbody>
    </Table>
      
    </Container>
  );
};

export default AllBuyers ;
