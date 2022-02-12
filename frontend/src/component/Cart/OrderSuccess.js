import React from 'react';
import { MdCheckCircle } from 'react-icons/md';
import "./orderSuccess.css";
import { Typography } from '@material-ui/core';
import { Link } from 'react-router-dom';

const OrderSuccess = () => {
  return (
    <>
        <div className="orderSuccess">
            <MdCheckCircle />

            <Typography>Your order has been placed successfully</Typography>
            <Link to="/orders">View Orders</Link>
        </div>
    </>
  );
};

export default OrderSuccess;
