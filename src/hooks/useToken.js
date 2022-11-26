import { useContext, useEffect, useState } from "react";
import { AuthContext } from "../contexts/AuthProvider/AuthProvider";
import { getUrl } from "../Util/Util";

const useToken = (currentUser) => {
  const [token, setToken] = useState("");
  const { logOut } = useContext(AuthContext);
  useEffect(() => {
    if (currentUser) {
      fetch(getUrl("/jwt"), {
        method: "POST",
        headers: {
          "content-type": "application/json",
        },
        body: JSON.stringify(currentUser),
      })
        .then((res) => {
          if (res.status === 401 || res.status === 403) {
            return logOut();
          }
          return res.json();
        })
        .then((data) => {
          if (data.accessToken) {
            localStorage.setItem("jwt-token", data.accessToken);
            setToken(data.accessToken);
          }
        });
    }
  }, [currentUser]);
  return [token];
};

export default useToken;
