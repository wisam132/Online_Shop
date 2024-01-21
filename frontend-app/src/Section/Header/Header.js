import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import { FaHome, FaShoppingCart, FaUser, FaShoppingBag } from "react-icons/fa";
import { FiLogOut } from "react-icons/fi";
import logo from "../../assets/images/logo-omar.jpeg";
import { useNavigate } from "react-router-dom";

import "./Header.css";

export default function Header() {
  const navigate = useNavigate();

  const [anzahl, setAnzahl] = useState("");

  async function handleLogout() {
    try {
      await axios.post("/api/user/logout");
      navigate("/");
    } catch (error) {
      console.error("Fehler beim Logout:", error);
    }
  }

  const fetchProducts = async () => {
    try {
      const response = await axios.get("/api/order/show");
      setAnzahl(response.data.item.length);
      fetchProducts();
    } catch (error) {
      console.error("Fehler beim Abrufen der Produkte:", error);
    }
  };

  useEffect(() => {
    fetchProducts();
  }, []);

  return (
    <>
      <nav className="navbar navbar-expand-lg navbar-light ">
        <div className="container-fluid">
          <Link to={"/shop/home"}>
            <img src={logo} alt="" className="logo" />
          </Link>
          <button
            className="navbar-toggler"
            type="button"
            data-bs-toggle="collapse"
            data-bs-target="#navbarSupportedContent"
            aria-controls="navbarSupportedContent"
            aria-expanded="false"
            aria-label="Toggle navigation"
          >
            <span className="navbar-toggler-icon"></span>
          </button>
          <div className="collapse navbar-collapse" id="navbarSupportedContent">
            <ul className="navbar-nav me-auto mb-2 mb-lg-0 -mb-2 navbar-Daten">
              <li className="nav-item">
                <Link to={"/shop/home"} className="nav-link active">
                  <span className="icon">
                    <FaHome />
                  </span>
                  Home
                </Link>
              </li>
              <li className="nav-item">
                <Link to={"/shop/warenkorb"} className="nav-link active">
                  <span className="icon">
                    <FaShoppingCart />
                  </span>
                  Warenkorb <span className="warenkorb-anzahl">{anzahl}</span>
                </Link>
              </li>
              <li className="nav-item">
                <Link to={"/shop/kundendaten"} className="nav-link active">
                  <span className="icon">
                    <FaUser />
                  </span>
                  Meine Daten
                </Link>
              </li>
              <li className="nav-item">
                <Link to={"/shop/KundenProdukte"} className="nav-link active">
                  <span className="icon">
                    <FaShoppingBag />
                  </span>
                  Meine Bestellungen
                </Link>
              </li>
              <li className="nav-item dropdown">
                <Link
                  className="nav-link dropdown-toggle dropdown"
                  href="#"
                  id="navbarDropdown"
                  role="button"
                  data-bs-toggle="dropdown"
                  aria-expanded="false"
                >
                  Kategorien
                </Link>
                <ul className="dropdown-menu" aria-labelledby="navbarDropdown">
                  <li>
                    <Link className="dropdown-item" to={"kleidung"}>
                      Kleidung
                    </Link>
                  </li>
                  <li>
                    <Link className="dropdown-item" to={"geraete"}>
                      Geräte
                    </Link>
                  </li>
                  <li>
                    <Link className="dropdown-item" to={"moebel"}>
                      Möbel
                    </Link>
                  </li>
                </ul>
              </li>
              <li className="nav-item">
                <button
                  onClick={handleLogout}
                  className="nav-link"
                  style={{ border: "none", backgroundColor: "white" }}
                >
                  <span className="icon">
                    <FiLogOut />
                  </span>
                  Abmelden
                </button>
              </li>
            </ul>
          </div>
        </div>
      </nav>
    </>
  );
}
