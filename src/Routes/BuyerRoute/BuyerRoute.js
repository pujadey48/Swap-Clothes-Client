import { useContext } from "react";
import { Navigate, useLocation } from "react-router-dom";
import { AuthContext } from "../../contexts/AuthProvider/AuthProvider";
import useAdmin from "../../hooks/useAdmin";
import Loading from "../../pages/Loading/Loading";

const BuyerRoute = ({ children }) => {
    const { user, loading } = useContext(AuthContext);
    const isBuyer = user?.role==='buyer';
    const location = useLocation();

    if (loading) {
        return <Loading></Loading>
    }

    if (user && isBuyer) {
        return children;
    }


    return <Navigate to="/login" state={{ from: location }} replace></Navigate>;
};

export default BuyerRoute;