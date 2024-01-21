import React from "react";
import {
  FaUserEdit,
  FaBoxOpen,
  FaShoppingBasket,
  FaPlus,
} from "react-icons/fa";

import { MdPersonAdd } from "react-icons/md";

import logo from "../../assets/images/logo-omar.jpeg";

import { Link } from "react-router-dom";
import "./AdminHeader.css";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { FiLogOut } from "react-icons/fi";

export default function AdminHeader() {
  const navigate = useNavigate();

  async function handleLogout() {
    try {
      await axios.post("/api/user/logout");
      navigate("/");
    } catch (error) {
      console.error("Fehler beim Logout:", error);
    }
  }
  return (
    <>
      <nav className="navbar navbar-expand-lg navbar-light">
        <div className="container-fluid">
          <Link to={"/admin"}>
            <img src={logo} alt="" className="my-logo" />
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
                <Link
                  to={"/admin/dashboard/Kunden_Daten_Verwalten"}
                  className="nav-link active"
                >
                  
                  <span className="icon">
                    <FaUserEdit />
                  </span>
                  Kundendaten verwalten
                </Link>
              </li>

              <li className="nav-item">
                <Link to={"/admin"} className="nav-link active">
                  
                  <span className="icon" style={{ paddingRight: "10px" }}>
                    <FaBoxOpen />
                  </span>
                  Produkte verwalten
                </Link>
              </li>

              <li className="nav-item">
                <Link
                  to={"/admin/dashboard/Kunden_Bestellungen_Verwalten"}
                  className="nav-link active"
                >
                  
                  <span className="icon">
                    <FaShoppingBasket />
                  </span>
                  Kundenbestellungen verwalten
                </Link>
              </li>

              <li className="nav-item">
                <Link to={"/admin/registrieren"} className="nav-link active">
                  
                  <span className="icon">
                    <MdPersonAdd />
                  </span>
                  Admin registrieren
                </Link>
              </li>

              <li className="nav-item dropdown p-erstellen ">
                <Link
                  className="nav-link dropdown-toggle dropdown "
                  href="#"
                  id="navbarDropdown"
                  role="button"
                  style={{ paddingBottom: "5px" }}
                  data-bs-toggle="dropdown"
                  aria-expanded="false"
                >
                  <span className="icon">
                    <FaPlus />
                  </span>
                  Produkt erstellen
                </Link>

                <ul className="dropdown-menu" aria-labelledby="navbarDropdown">
                  <li>
                    <Link
                      className="dropdown-item"
                      to={"/admin/dashboard/kleidung_erstellen"}
                    >
                      Kleidung
                    </Link>
                  </li>
                  <li>
                    <Link
                      className="dropdown-item"
                      to={"/admin/dashboard/geraete_ertellen"}
                    >
                      Geräte
                    </Link>
                  </li>
                  <li>
                    <Link
                      className="dropdown-item"
                      to={"/admin/dashboard/moebel_ertellen"}
                    >
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
