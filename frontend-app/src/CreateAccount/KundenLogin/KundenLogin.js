import React, { useState } from "react";
import "./KundenLogin.css";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";

const KundenLogin = () => {
  const navigate = useNavigate();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState("");

  const handleEmailChange = (e) => {
    setEmail(e.target.value);
  };

  const handlePasswordChange = (e) => {
    setPassword(e.target.value);
  };

  const handleCheckboxChange = () => {
    setShowPassword(!showPassword);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await axios.post(
        "/api/user/login",
        {
          email,
          password,
        },
        {
          withCredentials: true,
        }
      );

      const userRole = response.data.role;

      if (userRole === "admin") {
        navigate("/admin");
      } else {
        navigate("/shop/home");
      }

      console.log("Benutzerrolle: " + userRole);
    } catch (error) {
      console.error("Login failed:", error.response?.data || error.message);
      setError("Email oder Passwort wurde falsch eingegeben");
    }
  };

  return (
    <>
      <form className="formular" onSubmit={handleSubmit}>
        <div className="form-group">
          <label htmlFor="exampleInputEmail1">E-Mail Adresse </label>
          <input
            type="email"
            className="form-control"
            id="exampleInputEmail1"
            aria-describedby="emailHelp"
            placeholder="Enter email"
            onChange={handleEmailChange}
            value={email}
          />
        </div>
        <div className="form-group">
          <label htmlFor="exampleInputPassword1">Passwort</label>
          <input
            type={showPassword ? "text" : "password"}
            className="form-control"
            id="exampleInputPassword1"
            placeholder="Passwort"
            onChange={handlePasswordChange}
            value={password}
          />
        </div>
        <div className="form-check">
          <input
            type="checkbox"
            className="form-check-input"
            id="exampleCheck1"
            onChange={handleCheckboxChange}
          />
          <label
            className="form-check-label"
            htmlFor="exampleCheck1"
            id="check"
          >
            Passwort anzeigen
          </label>
        </div>
        <button type="submit" className="zer">
          Eingeben
        </button>
        <br />
        <br />
        <Link className="zerErstellen" to={"/registrieren"}>
          Konto Erstellen
        </Link>
        <br />
        <br />
        <p style={{ color: "red", textDecoration: "underline" }}>{error}</p>
      </form>
    </>
  );
};

export default KundenLogin;
