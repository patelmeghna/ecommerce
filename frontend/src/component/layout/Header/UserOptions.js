import React, { useState } from 'react';
import './header.css';
import {SpeedDial, SpeedDialAction} from '@material-ui/lab';
import { Backdrop } from '@material-ui/core';
import { MdDashboard, MdExitToApp } from 'react-icons/md';
import { FaListAlt } from 'react-icons/fa';
import { BsPerson } from 'react-icons/bs';
import { useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { useAlert } from 'react-alert';
import { logout } from '../../../actions/userAction';
import { CgShoppingCart } from 'react-icons/cg';

const UserOptions = ({user}) => {
    const {cartItems} = useSelector((state) => state.cart);

    const [open, setOpen] = useState(false);
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const alert = useAlert();

    const options = [
        { icon: <FaListAlt />, name: "Orders", func: orders },
        { icon: <BsPerson />, name: "Profile", func: account },
        { icon: <CgShoppingCart style={{color: cartItems.length>0 ? "tomato" : "unset"}} />, name: `Cart(${cartItems.length})`, func: cart },
        { icon: <MdExitToApp />, name: "Logout", func: logoutUser }
    ];

    if (user.role === "admin") {
        options.unshift({ icon: <MdDashboard />, name: "Dashboard", func: dashboard },)
    }

    function dashboard() {
        navigate("/admin/dashboard");
    };

    function orders() {
        navigate("/orders");
    };

    function account() {
        navigate("/account");
    };

    function cart() {
        navigate("/cart");
    };

    function logoutUser() {
        dispatch(logout());
        alert.success("Logout Successfully");
    }

  return (
    <>
        <Backdrop open={open} style={{zIndex: "10"}} />
        <SpeedDial
            ariaLabel="Speed dial tooltip"
            onClose={() => setOpen(false)}
            onOpen={() => setOpen(true)}
            open={open}
            direction="down"
            className='speedDial'
            style={{zIndex: "11"}}
            icon={
                <img className='speedDialIcon' src={user.avatar.url ? user.avatar.url : "./Profile.png"} alt="Profile" />
            }
        >
         {options.map((item) => (
            <SpeedDialAction
                key={item.name}
                icon={item.icon}
                tooltipTitle={item.name}
                onClick={item.func}
                tooltipOpen = {window.innerWidth <= 600 ? true : false}
            />
         ))}
        </SpeedDial>
    </>
  );
};

export default UserOptions;
