import React, { useState, useEffect } from "react";
import "./forgotPassword.css";
import Loader from "../layout/Loader/Loader";
import { MdMailOutline } from "react-icons/md";
import { useDispatch, useSelector } from "react-redux";
import { clearErrors, forgotPassword } from "../../actions/userAction";
import { useAlert } from "react-alert";
import { useNavigate } from "react-router-dom";
import MetaData from "../layout/MetaData";

const ForgotPassword = () => {
  const dispatch = useDispatch();
  const alert = useAlert();
  const navigate = useNavigate();
  const { error, message, loading } = useSelector((state) => state.forgotPassword);

  const [email, setEmail] = useState("");

  const forgotPasswordSubmit = (e) => {
    e.preventDefault();

    const myForm = new FormData();

    myForm.set("email", email);
    dispatch(forgotPassword(myForm));
  };

  useEffect(() => {
    if (error) {
      alert.error(error);
      dispatch(clearErrors());
    }

    if (message) {
      alert.success(message);
    }
  }, [dispatch, error, alert, message]);

  return (
    <>
      {loading ? (
        <Loader />
      ) : (
        <>
          <MetaData title="Forgot Password" />
          <div className="forgotPasswordContainer">
            <div className="forgotPasswordBox">
              <h2 className="forgotPasswordHeading">Forgot Password</h2>
              <form
                encType="multipart/form-data"
                onSubmit={forgotPasswordSubmit}
                className="forgotPasswordForm"
              >
                <div className="forgotPasswordEmail">
                  <MdMailOutline />
                  <input
                    type="email"
                    placeholder="Email"
                    required
                    value={email}
                    name="email"
                    onChange={(e) => setEmail(e.target.value)}
                  />
                </div>

                <input
                  type="submit"
                  value="Send"
                  className="forgotPasswordBtn"
                />
              </form>
            </div>
          </div>
        </>
      )}
    </>
  );
};

export default ForgotPassword;
