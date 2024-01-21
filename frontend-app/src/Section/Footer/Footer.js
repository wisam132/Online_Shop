import React from "react";
import { Link } from "react-router-dom";
import "./Footer.css";
import { FaAddressBook, FaPhone } from "react-icons/fa";
import { MdEmail } from "react-icons/md";

const Footer = (props) => {
  return (
    <>
      {props.children}
      <footer className="bg-dark Footer-Shop" id="tempaltemo_footer">
        <div className="container">
          <div className="row">
            <div className="col-md-4 pt-4">
              <h2 className="h2 text-success border-bottom pb-3 border-secondary logo">
                Wisam Shop
              </h2>
              <ul className="list-unstyled text-light footer-link-list">
                <li>
                  <span className="footer-icon">
                    {" "}
                    <FaAddressBook />
                  </span>
                  Schäferstraße 02, 13585, Berlin
                </li>
                <li>
                  <span className="footer-icon">
                    {" "}
                    <FaPhone />
                  </span>
                  <Link
                    className="text-decoration-none text-light"
                    href="tel:010-020-0340 "
                  >
                    0178-6729-702
                  </Link>
                </li>
                <li>
                  <span className="footer-icon">
                    {" "}
                    <MdEmail />
                  </span>
                  <Link
                    className="text-decoration-none text-light"
                    href="mailto:info@company.com"
                  >
                    w.shekhkhalil@gmail.com
                  </Link>
                </li>
              </ul>
            </div>

            <div className="col-md-4 pt-5 Footer-Products">
              <h2 className="h2 text-light border-bottom pb-3 border-secondary">
                Produkte
              </h2>
              <ul className="list-unstyled text-light footer-link-list">
                <li>
                  <Link
                    className="text-decoration-none text-light"
                    to={"/shop/kleidung"}
                    href="#"
                  >
                    Kleidung
                  </Link>
                </li>
                <li>
                  <Link
                    className="text-decoration-none text-light"
                    to={"/shop/geraete"}
                  >
                    Geräte
                  </Link>
                </li>
                <li>
                  <Link
                    className="text-decoration-none text-light"
                    to={"/shop/moebel"}
                  >
                    Möbel
                  </Link>
                </li>
              </ul>
            </div>

            <div className="col-md-4 pt-5 Footer-Info">
              <h2 className="h2 text-light border-bottom pb-3 border-secondary">
                Informationen
              </h2>
              <ul className="list-unstyled text-light footer-link-list">
                <li>
                  <Link className="text-decoration-none text-light" to={"/"}>
                    Home
                  </Link>
                </li>
                <li>
                  <Link
                    className="text-decoration-none text-light"
                    to={"/shop/warenkorb"}
                  >
                    Warenkorb
                  </Link>
                </li>
                <li>
                  <Link
                    className="text-decoration-none text-light"
                    to={"/shop/kundendaten"}
                  >
                    Meine Daten
                  </Link>
                </li>
                <li>
                  <Link
                    className="text-decoration-none text-light"
                    to={"/shop/KundenProdukte"}
                  >
                    Meine Bestellungen
                  </Link>
                </li>
              </ul>
            </div>
          </div>

          <div className="row text-light mb-4">
            <div className="col-12 mb-3">
              <div className="w-100 my-3 border-top border-secondary"></div>
            </div>
            <div className="col-auto me-auto">
              <ul className="list-inline text-left footer-icons">
                <li className="list-inline-item border border-light rounded-circle text-center">
                  <a
                    className="text-light text-decoration-none"
                    target="_blank"
                    href="http://facebook.com/"
                  >
                    <i className="fab fa-facebook-f fa-lg fa-fw"></i>
                  </a>
                </li>
                <li className="list-inline-item border border-light rounded-circle text-center">
                  <a
                    className="text-light text-decoration-none"
                    target="_blank"
                    href="https://www.instagram.com/"
                  >
                    <i className="fab fa-instagram fa-lg fa-fw"></i>
                  </a>
                </li>
                <li className="list-inline-item border border-light rounded-circle text-center">
                  <a
                    className="text-light text-decoration-none"
                    target="_blank"
                    href="https://twitter.com/"
                  >
                    <i className="fab fa-twitter fa-lg fa-fw"></i>
                  </a>
                </li>
                <li className="list-inline-item border border-light rounded-circle text-center">
                  <a
                    className="text-light text-decoration-none"
                    target="_blank"
                    href="https://www.linkedin.com/"
                  >
                    <i className="fab fa-linkedin fa-lg fa-fw"></i>
                  </a>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </footer>
    </>
  );
};

export default Footer;
