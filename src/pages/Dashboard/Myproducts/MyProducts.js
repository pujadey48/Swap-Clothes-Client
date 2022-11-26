import React, { useEffect } from "react";
import { useQuery } from "@tanstack/react-query";
import { getUrl } from "../../../Util/Util";

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

  return (
    <div>
      <h2>My Products</h2>

      {myproducts.map((product) => (
        <h3>{product.name}</h3>
      ))}
    </div>
  );
};

export default MyProducts;
