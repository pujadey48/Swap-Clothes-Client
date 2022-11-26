import React from 'react';
import BuyerOptions from './BuyerOptions';
import SellerOptions from './SellerOptions';

const Options = ({isSeller, isBuyer}) => {

        if(isSeller) return <SellerOptions></SellerOptions>;
        else if (isBuyer) return <BuyerOptions></BuyerOptions>;
};

export default Options;