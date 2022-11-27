import { useContext } from "react";
import { Navigate, useLocation } from "react-router-dom";
import { AuthContext } from "../../contexts/AuthProvider/AuthProvider";
import useAdmin from "../../hooks/useAdmin";
import Loading from "../../pages/Loading/Loading";

const SellerRoute = ({ children }) => {
    const { user, loading } = useContext(AuthContext);
    const isSeller = user?.role==='seller';
    const location = useLocation();

    if (loading) {
        return <Loading></Loading>
    }

    if (user && isSeller) {
        return children;
    }

    return <Navigate to="/login" state={{ from: location }} replace></Navigate>;
};

export default SellerRoute;