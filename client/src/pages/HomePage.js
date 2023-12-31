import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Checkbox, Radio } from "antd";
import { Prices } from "../components/Prices";
import { useCart } from "../context/cart";
import axios from "axios";
import toast from "react-hot-toast";
import Layout from "./../components/Layout/Layout";
import { AiOutlineReload } from "react-icons/ai";
import "../styles/Homepage.css";

const HomePage = () => {
  const navigate = useNavigate();
  const [cart, setCart] = useCart();
  const [products, setProducts] = useState([]);
  const [categories, setCategories] = useState([]);
  const [checked, setChecked] = useState([]);
  const [radio, setRadio] = useState([]);
  const [total, setTotal] = useState(0);
  const [page, setPage] = useState(1);
  const [loading, setLoading] = useState(false);

  //get all cat
  const getAllCategory = async () => {
    try {
      const { data } = await axios.get(
        `${process.env.REACT_APP_API}/api/v1/category/get-category`
      );
      if (data?.success) {
        setCategories(data?.category);
      }
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getAllCategory();
    getTotal();
  }, []);

  //get products
  const getAllProducts = async () => {
    try {
      setLoading(true);
      const { data } = await axios.get(
        `${process.env.REACT_APP_API}/api/v1/product/product-list/${page}`
      );
      setLoading(false);
      setProducts(data.products);
    } catch (error) {
      setLoading(false);
      console.log(error);
    }
  };

  //getTotal Count
  const getTotal = async () => {
    try {
      const { data } = await axios.get(
        `${process.env.REACT_APP_API}/api/v1/product/product-count`
      );
      setTotal(data?.total);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    if (page === 1) return;
    loadMore();
  }, [page]);

  //load more
  const loadMore = async () => {
    try {
      setLoading(true);
      const { data } = await axios.get(
        `${process.env.REACT_APP_API}/api/v1/product/product-list/${page}`
      );
      setLoading(false);
      setProducts([...products, ...data?.products]);
    } catch (error) {
      console.log(error);
      setLoading(false);
    }
  };

  // filter by cat
  const handleFilter = (value, id) => {
    let all = [...checked];
    if (value) {
      all.push(id);
    } else {
      all = all.filter((c) => c !== id);
    }
    setChecked(all);
  };

  useEffect(() => {
    if (!checked.length || !radio.length) getAllProducts();
  }, [checked.length, radio.length]);

  useEffect(() => {
    if (checked.length || radio.length) filterProduct();
  }, [checked, radio]);

  //get filtered product
  const filterProduct = async () => {
    try {
      const { data } = await axios.post(
        `${process.env.REACT_APP_API}/api/v1/product/product-filters`,
        {
          checked,
          radio,
        }
      );
      setProducts(data?.products);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <Layout title={"All Products - Best offers "}>
      {/* banner image */}
      
      {/* banner image */}
      <div className="container-fluid row mt-3 home-page">
        
        <div className="col-md-9">
          <h1 className="text-center">All Products</h1>
          <div className="d-flex flex-wrap">
            {products?.map((p) => (
              <div className="card m-2" style={{backgroundColor:"#FFFFFF"}} key={p._id}>
                <img
                  src={`${process.env.REACT_APP_API}/api/v1/product/product-photo/${p._id}`}
                  className="card-img-top"
                  alt={p.name}
                />
                <div className="card-body">
                  <div className="card-name-price">
                    <h5 className="card-title">{p.name}</h5>
                    <h5 className="card-title card-price">
                      {p.price.toLocaleString("en-US", {
                        style: "currency",
                        currency: "USD",
                      })}
                    </h5>
                  </div>
                  <p className="card-text ">
                    {p.description.substring(0, 60)}...
                  </p>
                  <div className="card-name-price">
                    <button
                      className="btn btn-info ms-1"
                      onClick={() => navigate(`/product/${p.slug}`)}
                    >
                      More Details
                    </button>
                    <button
                      className="btn btn-dark ms-1"
                      onClick={() => {
                        setCart([...cart, p]);
                        localStorage.setItem(
                          "cart",
                          JSON.stringify([...cart, p])
                        );
                        toast.success("Item Added to cart");
                      }}
                    >
                      ADD TO CART
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
          <div className="m-2 p-3">
            {products && products.length < total && (
              <button
                className="btn loadmore"
                onClick={(e) => {
                  e.preventDefault();
                  setPage(page + 1);
                }}
              >
                {loading ? (
                  "Loading ..."
                ) : (
                  <>
                    {" "}
                     <AiOutlineReload />
                  </>
                )}
              </button>
            )}
          </div>
          
        </div>
        <div className="col-md-1 filters ml-auto">
        <div class="card" style={{width: 300, backgroundColor:"#ffc0cb"}}>
    <div className="card-body">
      <h4 className="card-title text-center"style={{Color:"#000000"}}>Filter By Category</h4>
      <div className="d-flex flex-column">
        {categories?.map((c) => (
          <div key={c._id} className="form-check">
            <input
              type="radio"
              className="form-check-input"
              id={`category-${c._id}`}
              onChange={(e) => handleFilter(e.target.checked, c._id)}
            />
            <label className="form-check-label" htmlFor={`category-${c._id}`}>
              {c.name}
            </label>
          </div>
        ))}
      </div>
      
      {/* Price filter */}
      <h4 className="card-title text-center mt-4" style={{Color:"#000000"}}>Filter By Price</h4>
      <div className="d-flex flex-column">
        <div className="form-check">
          <input
            type="radio"
            className="form-check-input"
            id="price-all"
            value=""
            onChange={(e) => setRadio(e.target.value)}
          />
          <label className="form-check-label" htmlFor="price-all">
            All Prices
          </label>
        </div>
        {Prices?.map((p) => (
          <div key={p._id} className="form-check">
            <input
              type="radio"
              className="form-check-input"
              id={`price-${p._id}`}
              value={p.array}
             
              onChange={(e) => setRadio(e.target.value)}
            />
            <label className="form-check-label" htmlFor={`price-${p._id}`}>
              {p.name}
            </label>
          </div>
        ))}
      </div>
      
      {/* Reset button */}
      <div className="d-flex flex-column" >
        <button
          className="btn btn-outline-dark"
          style={{borderRadius:"20px", height: "30px"}}
          onClick={() => window.location.reload()}
        >
          RESET FILTERS
        </button>
      </div>
    </div>
  </div>
</div>

      </div>
    </Layout>
  );
};

export default HomePage;

