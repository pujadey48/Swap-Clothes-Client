import React, { useContext } from "react";
import { createContext } from "react";
import {
  createUserWithEmailAndPassword,
  getAuth,
  onAuthStateChanged,
  signInWithEmailAndPassword,
  signInWithPopup,
  signOut,
} from "firebase/auth";
import app from "../../firebase/firebase.config";
import { useState } from "react";
import { useEffect } from "react";
import { getUrl } from "../../Util/Util";
import useAdmin from "../../hooks/useAdmin";

export const AuthContext = createContext();
const auth = getAuth(app);

export const normalizeUserData = (userData) => {
  if (!userData) return userData;

  const uid = userData?.uid || "unregistered";
  const name = userData?.displayName || localStorage.getItem("name");
  const email = userData?.email;
  const photoURL = userData?.photoURL || "";
  let userRole = localStorage.getItem("role");
  if (!userRole) {
    userRole = "buyer";
  }
  const role = userRole;

  const user = { uid, name, email, photoURL, role };
  return user;
};

const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [role, setRole] = useState("buyer");
  const [isAdmin, setIsAdmin] = useState(false);
  const [loading, setLoading] = useState(true);

  const providerLogin = (provider) => {
    setLoading(true);
    localStorage.setItem("role", role);
    return signInWithPopup(auth, provider);
  };

  const createUser = (name, email, password, userRole) => {
    setLoading(true);
    localStorage.setItem("name", name);
    localStorage.setItem("role", userRole);
    setRole(userRole);
    return createUserWithEmailAndPassword(auth, email, password);
  };

  const login = (email, password, userRole) => {
    setLoading(true);
    localStorage.setItem("role", userRole);
    setRole(userRole);
    return signInWithEmailAndPassword(auth, email, password);
  };

  const logOut = () => {
    localStorage.removeItem("jwt-token");
    localStorage.removeItem("role");
    localStorage.removeItem("name");
    return signOut(auth);
  };

  const getJWT = (currentUser) => {
    // get jwt token
    fetch(getUrl("/jwt"), {
      method: "POST",
      headers: {
        "content-type": "application/json",
      },
      body: JSON.stringify(currentUser),
    })
      .then((res) => {
        //   if (res.status === 401 || res.status === 403) {
        //     return logOut();
        //   }
        return res.json();
      })
      .then((data) => {
        console.log("token", data);
        // local storage is the easiest but not the best place to store jwt token
        if (data.token) {
          localStorage.setItem("jwt-token", data.token);
          localStorage.setItem("name", data.user.name);
          localStorage.setItem("role", data.user.role);

          const updatedUser = normalizeUserData(currentUser);
          console.log("onAuthStateChanged updatedUser", updatedUser);
          setUser(updatedUser);
        } else {
          logOut()
            .then(() => {})
            .catch((error) => console.error(error));
        }
      });
  };

  useEffect(() => {
    let userRole = localStorage.getItem("role");
    if (!userRole) {
      userRole = "buyer";
    }
    setRole(userRole);
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      const normalizedUser = normalizeUserData(currentUser);
      console.log("onAuthStateChanged CurrentUser", currentUser);
      console.log("onAuthStateChanged NormalizedUser", normalizedUser);
      setUser(normalizedUser);
      if (normalizedUser) {
        getJWT(normalizedUser);
      }
      setLoading(false);
    });

    return () => {
      return unsubscribe();
    };
  }, []);

  const authInfo = {
    user,
    loading,
    setLoading,
    createUser,
    providerLogin,
    login,
    logOut,
  };

  return (
    <AuthContext.Provider value={authInfo}>{children}</AuthContext.Provider>
  );
};

export default AuthProvider;
