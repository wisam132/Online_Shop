import React, { useState } from "react";
import { FaEye, FaEyeSlash } from "react-icons/fa";
import "./KundenRegistrieren.css";
import axios from "axios";
import { useNavigate } from "react-router-dom";

export default function KundenRegistrieren() {
  const navigate = useNavigate();
  const [vorname, setVorname] = useState("");
  const [nachname, setNachname] = useState("");
  const [email, setEmail] = useState("");
  const [strasse, setStrasse] = useState("");
  const [plz, setPlz] = useState("");
  const [passwort, setPasswort] = useState("");
  const [passwort2, setPasswort2] = useState("");
  const [telefonnummer, setTelefonnummer] = useState("");
  const [image, setImage] = useState(null);
  const [passwordFieldType, setPasswordFieldType] = useState("password");
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState("");

  const handleCheckboxChange = () => {
    setShowPassword(!showPassword);
  };

  const handleVornameChange = (e) => {
    setVorname(e.target.value);
  };
  const handleNachnameChange = (e) => {
    setNachname(e.target.value);
  };
  const handleEmailChange = (e) => {
    setEmail(e.target.value);
  };
  const handleStrasseChange = (e) => {
    setStrasse(e.target.value);
  };
  const handletelChange = (e) => {
    setTelefonnummer(e.target.value);
  };
  const handlePlzChange = (e) => {
    setPlz(e.target.value);
  };
  const handlePasswortChange = (e) => {
    setPasswort(e.target.value);
  };
  const handlePasswort2Change = (e) => {
    setPasswort2(e.target.value);
  };
  const handleImageChange = (e) => {
    setImage(e.target.files[0]);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const data = new FormData();
    data.append("firstname", vorname);
    data.append("lastname", nachname);
    data.append("email", email);
    data.append("strasse", strasse);
    data.append("tel_number", telefonnummer);
    data.append("ZIP_code", plz);
    data.append("password", passwort);
    if (image !== null) {
      data.append("photo", image);
    }
    if (passwort !== passwort2) {
      setError("Die Passwörter sind ungleich");
      return;
    }

    await axios
      .post("http://127.0.0.1:8000/api/user/register", data)
      .then(({ data }) => {
        console.log(data.message);
        navigate("/");
      })
      .catch(({ response }) => {
        if (response && response.status === 422) {
          console.log(response.data.errors);
        } else {
          console.log(response ? response.data.message : "");
        }
      });
  };

  return (
    <>
      <form className="KundenFormular" onSubmit={handleSubmit}>
        <div className="form-group">
          <label for="vorname">Vorname*</label>
          <input
            type="text"
            className="form-control"
            id="vorname"
            placeholder="Vorname Eingeben"
            onChange={handleVornameChange}
          />
        </div>

        <div className="form-group">
          <label for="nachname">Nachname*</label>
          <input
            type="text"
            className="form-control"
            id="nachname"
            placeholder="Nachname Eingeben"
            onChange={handleNachnameChange}
          />
        </div>

        <div className="form-group">
          <label for="email">E-Mail*</label>
          <input
            type="email"
            className="form-control"
            id="email"
            placeholder="E-Mail Eingeben"
            onChange={handleEmailChange}
          />
        </div>

        <div className="form-group">
          <label for="strasse">Straße*</label>
          <input
            type="text"
            className="form-control"
            id="strasse"
            placeholder="Straße Eingeben"
            onChange={handleStrasseChange}
          />
        </div>

        <div className="form-group">
          <label for="Teleofonnummer">Teleofonnummer*</label>
          <input
            type="number"
            className="form-control"
            id="Teleofonnummer"
            placeholder="Telefonnummer Eingeben"
            onChange={handletelChange}
          />
        </div>

        <div className="form-group">
          <label for="plz">PLZ*</label>
          <input
            type="text"
            className="form-control"
            id="plz"
            placeholder="PLZ Eingeben"
            onChange={handlePlzChange}
          />
        </div>

        <div className="form-group">
          <label for="passwort">Passwort*</label>
          <div className="password-input" onChange={handlePasswortChange}>
            <input
              type={showPassword ? "text" : passwordFieldType}
              className="form-control"
              id="passwort"
              placeholder="Passwort Eingeben"
            />
            {showPassword ? (
              <FaEyeSlash
                className="password-icon"
                onClick={handleCheckboxChange}
              />
            ) : (
              <FaEye className="password-icon" onClick={handleCheckboxChange} />
            )}
          </div>
        </div>

        <div className="form-group">
          <label for="passwortBestätigen">Passwort Bestätigen*</label>
          <div className="password-input">
            <input
              type={showPassword ? "text" : passwordFieldType}
              className="form-control"
              id="passwortBestätigen"
              placeholder="Passwort Bestätigen"
              onChange={handlePasswort2Change}
              value={passwort2}
            />
            {showPassword ? (
              <FaEyeSlash
                className="password-icon"
                onClick={handleCheckboxChange}
              />
            ) : (
              <FaEye className="password-icon" onClick={handleCheckboxChange} />
            )}
          </div>
        </div>

        <label class="form-label" for="customFile">
          Bild hochladen*
        </label>
        <input
          type="file"
          class="form-control"
          id="customFile"
          onChange={handleImageChange}
        />
        <br />
        <p style={{ color: "red" }}>{error}</p>

        <button type="submit" className="Admin-zer">
          Eingeben
        </button>
      </form>
    </>
  );
}
