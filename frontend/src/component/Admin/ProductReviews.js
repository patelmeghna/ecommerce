import React, { useEffect, useState } from "react";
import { DataGrid } from "@material-ui/data-grid";
import "./productReviews.css";
import { useSelector, useDispatch } from "react-redux";
import {
  clearErrors,
  getAllReviews,
  deleteReviews,
} from "../../actions/productAction";
import { useAlert } from "react-alert";
import { useNavigate } from "react-router-dom";
import MetaData from "../layout/MetaData";
import { Button } from "@material-ui/core";
import Sidebar from "./Sidebar";
import { MdDelete } from "react-icons/md";
import {DELETE_REVIEW_RESET} from "../../constants/productConstants";
import { Star } from "@material-ui/icons";

const ProductReviews = () => {
  const dispatch = useDispatch();

  const alert = useAlert();

  const { error: deleteError, isDeleted } = useSelector((state) => state.review);

  const { error, reviews, loading } = useSelector((state) => state.productReviews);

  const navigate = useNavigate();

  const [productId, setProductId] = useState("");

  const deleteReviewHandler = (reviewId) => {
    dispatch(deleteReviews(reviewId, productId));
  };

  const productReviewsSubmitHandler = (e) => {
    e.preventDefault();

    dispatch(getAllReviews(productId))
  }

  useEffect(() => {

    if (productId.length === 24) {
      dispatch(getAllReviews(productId))
    }

    if (error) {
      alert.error(error);
      dispatch(clearErrors());
    }

    if (deleteError) {
      alert.error(deleteError);
      dispatch(clearErrors());
    }

    if (isDeleted) {
      alert.success("Review deleted successfully");
      navigate("/admin/reviews");
      dispatch({ type: DELETE_REVIEW_RESET });
    }

  }, [dispatch, alert, error, deleteError, navigate, isDeleted, productId]);

  const columns = [
    { field: "id", headerName: "Review Id", minWidth: 200, flex: 0.5 },
    {
      field: "user",
      headerName: "User",
      minWidth: 180,
      flex: 0.6,
    },
    { field: "comment", headerName: "Comment", minWidth: 350, flex: 1 },
    {
      field: "rating",
      headerName: "Rating",
      type: "number",
      minWidth: 170,
      flex: 0.4,
      cellClassName: (params) => {
        return params.getValue(params.id, "rating") >= 3
          ? "greenColor"
          : "redColor";
      },
    },
    {
      field: "actions",
      headerName: "Actions",
      type: "number",
      minWidth: 150,
      flex: 0.3,
      sortable: false,
      renderCell: (params) => {
        return (
          <>
            <Button
              onClick={() =>
                deleteReviewHandler(params.getValue(params.id, "id"))
              }
            >
              <MdDelete />
            </Button>
          </>
        );
      },
    },
  ];

  const rows = [];

  reviews &&
    reviews.forEach((item) => {
      rows.push({
        id: item._id,
        rating: item.rating,
        comment: item.comment,
        user: item.name,
      });
    });

  return (
    <>
      <MetaData title={`All Reviews - Admin`} />

      <div className="dashboard">
        <Sidebar />

        <div className="productReviewsContainer">
          <form
            className="productReviewsForm"
            onSubmit={productReviewsSubmitHandler}
          >
            <h1 className="productReviewsFormHeading">ALL REVIEWS</h1>

            <div>
              <Star />
              <input
                type="text"
                placeholder="Product Id"
                required
                value={productId}
                onChange={(e) => setProductId(e.target.value)}
              />
            </div>

            <Button
              id="createProductBtn"
              type="submit"
              disabled={
                loading ? true : false || productId === "" ? true : false
              }
            >
              Search
            </Button>
          </form>

          {reviews &&
            reviews.length >
              0 ? (
                <DataGrid
                  rows={rows}
                  columns={columns}
                  pageSize={10}
                  disableSelectionOnClick
                  className="productListTable"
                  autoHeight
                />
              ) : (
                <h1 className="productsReviewsForHeading">No Reviews</h1>
              )}
        </div>
      </div>
    </>
  );
};

export default ProductReviews