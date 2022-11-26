import React from 'react';
import AdminOptions from './AdminOptions';
import BuyerOptions from './BuyerOptions';
import SellerOptions from './SellerOptions';

const Options = ({isSeller, isBuyer, isAdmin}) => {
    if (isAdmin) return <AdminOptions></AdminOptions>
    else if(isSeller) return <SellerOptions></SellerOptions>;
    else if (isBuyer) return <BuyerOptions></BuyerOptions>;

};

export default Options;