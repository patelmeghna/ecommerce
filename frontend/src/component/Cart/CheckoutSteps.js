import { Step, StepLabel, Stepper, Typography } from "@material-ui/core";
import React from "react";
import "./checkoutSteps.css";
import { BiCheckDouble } from "react-icons/bi";
import { MdAccountBalance, MdLocalShipping } from "react-icons/md";

const CheckoutSteps = ({ activeStep }) => {
  const steps = [
    {
      label: <Typography>Shipping Details</Typography>,
      icon: <MdLocalShipping />,
    },
    {
      label: <Typography>Confirm Order</Typography>,
      icon: <BiCheckDouble />,
    },
    {
      label: <Typography>Payment</Typography>,
      icon: <MdAccountBalance />,
    },
  ];

  const stepStyles = {
    boxSizing: "border-box",
  };
  return (
    <>
      <Stepper alternativeLabel activeStep={activeStep} style={stepStyles}>
        {steps.map((item, index) => (
          <Step
            key={index}
            active={activeStep === index ? true : false}
            completed={activeStep >= index ? true : false}
          >
            <StepLabel style={{color: activeStep >= index ? "tomato" : "rgba(0, 0, 0, 0.649)"}} icon={item.icon}>{item.label}</StepLabel>
          </Step>
        ))}
      </Stepper>
    </>
  );
};

export default CheckoutSteps;
