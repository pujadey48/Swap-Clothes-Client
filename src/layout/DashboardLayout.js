import React, { useContext } from 'react';
import { Outlet } from 'react-router-dom';
import { AuthContext } from '../contexts/AuthProvider/AuthProvider';
import Header from '../pages/Header/Header';

const DeshboardLauout = () => {
    const {user} = useContext(AuthContext);
    const isBuyer = user?.role=== "buyer";
    const isSeller = user?.role=== "seller";
    return (
        <div>
            <Header></Header>
            <Outlet></Outlet>
            
        </div>
    );
};

export default DeshboardLauout;