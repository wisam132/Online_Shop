import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import "./KundenDaten.css";

export default function KundenDaten() {
  const navigate = useNavigate();

  const [id, setUserID] = useState("");
  const [firstname, setFirstname] = useState("");
  const [lastname, setLastname] = useState("");
  const [email, setEmail] = useState("");
  const [tel_number, setTel_number] = useState("");
  const [strasse, setStrasse] = useState("");
  const [ZIP_code, setZIP_code] = useState("");
  const [photo, setPhoto] = useState(null);

  /* Get User */
  function handleImageChange(e) {
    setPhoto(e.target.files[0]);
  }

  const fetchUser = async () => {
    try {
      const { data } = await axios.get("/api/auth/user");
      const {
        id,
        firstname,
        lastname,
        email,
        tel_number,
        strasse,
        ZIP_code,
        photo,
      } = data;
      setFirstname(firstname);
      setLastname(lastname);
      setEmail(email);
      setTel_number(tel_number);
      setStrasse(strasse);
      setZIP_code(ZIP_code);
      setPhoto(photo);
      setUserID(id);
    } catch (error) {
      console.error("Fehler beim Abrufen des Benutzers:", error);
    }
  };

  useEffect(() => {
    fetchUser();
  }, []);


 /* Update User */

const handleSubmit = async (e) => {
  e.preventDefault();
  const formData = new FormData();
  formData.append('_method', 'PUT');
  formData.append("firstname", firstname);
  formData.append("lastname", lastname);
  formData.append("email", email);
  formData.append("strasse", strasse);
  formData.append("tel_number", tel_number);
  formData.append("ZIP_code", ZIP_code);


  if (photo !== null) {
    formData.append("photo", photo);
  }
  

  try {
    await axios.post(`/api/user/update/${id}`, formData);
    console.log("Formular erfolgreich geändert");
    navigate('/shop/home');
  } catch ({ response }) {
    if (response.status === 422) {
      console.log(response.data.errors);
    } else {
      console.log(response.data.message);
    }
  }
};


  return (
    <>
      <form className="KundenFormular" onSubmit={handleSubmit}>
        <>
          <div className="form-group">
            <img
              src={
                photo
                  ? `/storage/user/image/${photo}`
                  : "https://shorturl.at/jz189"
              }
              className="KundenFormular-image"
              alt="Benutzerbild"
            />
          </div>
          <div className="form-group">
            <label htmlFor="vorname">Vorname</label>
            <input
              className="form-control"
              type="text"
              placeholder="Vorname"
              value={firstname}
              onChange={(e) => setFirstname(e.target.value)}
            />
          </div>

          <div className="form-group">
            <label htmlFor="nachname">Nachname</label>
            <input
              type="text"
              className="form-control"
              id="nachname"
              placeholder="Nachname"
              value={lastname}
              onChange={(e) => setLastname(e.target.value)}
            />
          </div>

          <div className="form-group">
            <label htmlFor="email">E-Mail</label>
            <input
              type="email"
              className="form-control"
              id="email"
              placeholder="E-Mail"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>

          <div className="form-group">
            <label htmlFor="tel">Telefonnummer</label>
            <input
              type="text"
              className="form-control"
              id="tel"
              placeholder="Telefonnummer"
              value={tel_number}
              onChange={(e) => setTel_number(e.target.value)}
            />
          </div>

          <div className="form-group">
            <label htmlFor="strasse">Straße</label>
            <input
              type="text"
              className="form-control"
              id="strasse"
              placeholder="Straße"
              value={strasse}
              onChange={(e) => setStrasse(e.target.value)}
            />
          </div>

          <div className="form-group">
            <label htmlFor="plz">PLZ</label>
            <input
              type="text"
              className="form-control"
              id="plz"
              placeholder="PLZ"
              value={ZIP_code}
              onChange={(e) => setZIP_code(e.target.value)}
            />
          </div>

          <label className="form-label" htmlFor="customFile">
            Bild hochladen
          </label>
          <input
            type="file"
            className="form-control"
            id="customFile"
            onChange={handleImageChange}
          />
          <br />
          <button className="KundenDaten-zer">Aktualisieren</button>
        </>
      </form>
    </>
  );
}
