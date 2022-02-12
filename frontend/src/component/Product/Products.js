import React, { useEffect, useState } from "react";
import "./products.css";
import { getProduct, clearErrors } from "../../actions/productAction";
import { useSelector, useDispatch } from "react-redux";
import Loader from "../layout/Loader/Loader";
import ProductCard from "../Home/ProductCard";
import { useParams } from "react-router-dom";
import Pagination from "react-js-pagination";
import Slider from "@material-ui/core/Slider";
import Typography from "@material-ui/core/Typography";
import {useAlert} from "react-alert";
import MetaData from "../layout/MetaData";

const categories = [
    "Laptop",
    "Footwear",
    "Bottom",
    "Tops",
    "Attire",
    "Camera",
    "Smart Phones"
]

const Products = () => {
  const dispatch = useDispatch();
  const alert = useAlert();
  const { keyword } = useParams();

  const [currentPage, setCurrentPage] = useState(1);

  const [price, setPrice] = useState([0, 125000]);

  const [category, setCategory] = useState("");

  const [ratings, setRatings] = useState(0);

  const {
    products,
    loading,
    error,
    productsCount,
    resultPerPage,
    filteredProductsCount,
  } = useSelector((state) => state.products);

  const setCurrentPageNo = (e) => {
    setCurrentPage(e);
  };

  const priceHandler = (event, newPrice) => {
    setPrice(newPrice);
  };

  useEffect(() => {
      if (error) {
          alert.error(error)
          dispatch(clearErrors);
      }
    dispatch(getProduct(keyword, currentPage, price, category, ratings));
  }, [dispatch, keyword, currentPage, price, category, ratings, alert, error]);

  let count = filteredProductsCount;

  return (
    <>
      {loading ? (
        <Loader />
      ) : (
        <>
        <MetaData title="Products - Ecommerce" />
          <h2 className="productsHeading">Products</h2>

          <div className="products">
            {products &&
              products.map((product) => (
                <ProductCard key={product._id} product={product} />
              ))}
          </div>

          <div className="filterBox">
            <Typography>Price</Typography>
            <Slider
              value={price}
              onChange={priceHandler}
              valueLabelDisplay="auto"
              area-labelledby="range-slider"
              min={0}
              max={125000}
            />

            <Typography>Categories</Typography>
            <ul className="categoryBox">
              {categories.map((category) => (
                <li
                  className="category-link"
                  key={category}
                  onClick={() => setCategory(category)}
                >
                  {category}
                </li>
              ))}
            </ul>

            <fieldset>
                <Typography component="legend">Ratings Above</Typography>
                <Slider
                    value={ratings}
                    onChange={(e, newRatings) => {
                        setRatings(newRatings);
                    }}
                    area-labelledby = "continues-slider"
                    min={0}
                    max={5}
                    valueLabelDisplay="auto"
                />
            </fieldset>
          </div>

          {resultPerPage < count && (
            <div className="paginationBox">
              <Pagination
                activePage={currentPage}
                itemsCountPerPage={resultPerPage}
                totalItemsCount={productsCount}
                onChange={setCurrentPageNo}
                nextPageText="Next"
                prevPageText="Prev"
                firstPageText="1st"
                lastPageText="Last"
                itemClass="page-item"
                linkClass="page-link"
                activeClass="pageItemActive"
                activeLinkClass="pageLinkClass"
              />
            </div>
          )}
        </>
      )}
    </>
  );
};

export default Products;
