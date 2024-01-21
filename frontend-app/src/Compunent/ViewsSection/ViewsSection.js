import React, { useState } from "react";
import "./ViewsSection.css";
import { IoArrowForwardSharp, IoArrowBackSharp } from "react-icons/io5";
import { Link } from "react-router-dom";

export default function ViewsSection(props) {
  return (
    <>
      <section className="views-section">
        <div className="container pb-5">
          <div className="row">
            <div className="col-lg-5 mt-5">
              <div className="card mb-3">
                <img
                  className="card-img img-fluid"
                  src={props.p_Primary_Photo}
                  alt="Card image cap"
                  id="product-detail"
                />
              </div>
              <div className="row">
                <div className="col-1 align-self-center">
                  <a
                    href="#multi-item-example"
                    role="button"
                    data-bs-slide="prev"
                  >
                    <i className="text-dark fas fa-chevron-left"></i>
                    <span
                      className="icon"
                      style={{ color: "black", fontSize: "30px" }}
                    >
                      {" "}
                      <IoArrowBackSharp />{" "}
                    </span>
                  </a>
                </div>

                <div
                  id="multi-item-example"
                  className="col-10 carousel slide carousel-multi-item"
                  data-bs-ride="carousel"
                >
                  <div
                    className="carousel-inner product-links-wap"
                    role="listbox"
                  >
                    <div className="carousel-item active">
                      <div className="row">
                        <div className="col-4">
                          <a href="#">
                            <img
                              className="card-img img-fluid"
                              src={
                                props.p_Secondary_Photo1
                                  ? props.p_Secondary_Photo1
                                  : "https://shorturl.at/jz189"
                              }
                              alt={
                                props.p_Secondary_Photo1
                                  ? "Product Image 1"
                                  : "Kein Foto"
                              }
                            />
                          </a>
                        </div>
                        <div className="col-4">
                          <a href="#">
                            <img
                              className="card-img img-fluid"
                              src={props.p_Secondary_Photo2}
                              alt="Product Image 2"
                            />
                          </a>
                        </div>
                        <div className="col-4">
                          <a href="#">
                            <img
                              className="card-img img-fluid"
                              src={props.p_Secondary_Photo3}
                              alt="Product Image 3"
                            />
                          </a>
                        </div>
                      </div>
                    </div>

                    <div className="carousel-item">
                      <div className="row">
                        <div className="col-4">
                          <a href="#">
                            <img
                              className="card-img img-fluid"
                              src={props.p_Secondary_Photo1}
                              alt="Product Image 1"
                            />
                          </a>
                        </div>
                        <div className="col-4">
                          <a href="#">
                            <img
                              className="card-img img-fluid"
                              src={props.p_Secondary_Photo2}
                              alt="Product Image 2"
                            />
                          </a>
                        </div>
                        <div className="col-4">
                          <a href="#">
                            <img
                              className="card-img img-fluid"
                              src={props.p_Secondary_Photo3}
                              alt="Product Image 3"
                            />
                          </a>
                        </div>
                      </div>
                    </div>

                    <div className="carousel-item">
                      <div className="row">
                        <div className="col-4">
                          <a href="#">
                            <img
                              className="card-img img-fluid"
                              src={props.p_Secondary_Photo1}
                              alt="Product Image 1"
                            />
                          </a>
                        </div>
                        <div className="col-4">
                          <a href="#">
                            <img
                              className="card-img img-fluid"
                              src={props.p_Secondary_Photo2}
                              alt="Product Image 2"
                            />
                          </a>
                        </div>
                        <div className="col-4">
                          <a href="#">
                            <img
                              className="card-img img-fluid"
                              src={props.p_Secondary_Photo3}
                              alt="Product Image 3"
                            />
                          </a>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="col-1 align-self-center">
                  <a
                    href="#multi-item-example"
                    role="button"
                    data-bs-slide="next"
                  >
                    <i className="text-dark fas fa-chevron-right"></i>
                    <span
                      className="icon"
                      style={{ color: "black", fontSize: "30px" }}
                    >
                      {" "}
                      <IoArrowForwardSharp />{" "}
                    </span>
                  </a>
                </div>
              </div>
            </div>
            <></>
            <div className="col-lg-7 mt-5">
              <div className="card">
                <div
                  className="card-body"
                  style={{ backgroundColor: "rgba(255, 255, 255,0.2)" }}
                >
                  <h1 className="h2" value>
                    {props.p_Name}
                  </h1>
                  <p className="h3 py-2">{props.p_Price}€</p>

                  <h6>Beschreibung:</h6>
                  <p>{props.p_Desc}</p>

                  <form action="" method="GET" onSubmit={props.handleSubmit}>
                    <input
                      type="hidden"
                      name="product-title"
                      value="Activewear"
                    />
                    <div className="row">
                      <div className="col-auto">
                        <ul className="list-inline pb-3">
                          <li
                            className="nav-item dropdown"
                            style={{ paddingRight: "50px" }}
                          >
                            <select
                              className="form-select"
                              id="sizeDropdown"
                              aria-label="Size Selector"
                              onChange={props.handleSizeChange}
                            >
                              <option selected>Größe</option>

                              <option value={props.p_size1}>
                                {props.p_size1}
                              </option>
                              <option value={props.p_size2}>
                                {props.p_size2}
                              </option>
                              <option value={props.p_size3}>
                                {props.p_size3}
                              </option>
                              <option value={props.p_size4}>
                                {props.p_size4}
                              </option>
                              <option value={props.p_size5}>
                                {props.p_size5}
                              </option>
                              <option value={props.p_size6}>
                                {props.p_size6}
                              </option>
                              <option value={props.p_size7}>
                                {props.p_size7}
                              </option>
                            </select>
                          </li>
                        </ul>
                      </div>
                      <div className="col-auto">
                        <ul className="list-inline pb-3">
                          <li className="list-inline-item text-right">
                            Quantity
                            <input
                              type="hidden"
                              name="product-quanity"
                              id="product-quanity"
                              value="1"
                            />
                          </li>
                          <li className="list-inline-item">
                            <span
                              className="btn btn-success size-Button"
                              id="btn-minus"
                              onClick={props.counterDown}
                            >
                              -
                            </span>
                          </li>
                          <li className="list-inline-item">
                            <span
                              className="badge bg-secondary second-Button"
                              id="var-value"
                              style={{ backgroundColor: "red" }}
                            >
                              {props.counter}
                            </span>
                          </li>
                          <li className="list-inline-item">
                            <span
                              className="btn btn-success size-Button"
                              id="btn-plus"
                              onClick={props.counterUp}
                            >
                              +
                            </span>
                          </li>
                        </ul>
                      </div>
                    </div>
                    <div className="row pb-3">
                      <div className="col d-grid">
                        <button
                          type="submit"
                          className="btn btn-success btn-lg size-Button"
                          name="submit"
                          value="addtocard"
                        >
                          Add To Cart
                        </button>
                      </div>
                    </div>
                  </form>
                </div>
              </div>
              <h3 style={{ color: "red" }}>{props.error}</h3>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
