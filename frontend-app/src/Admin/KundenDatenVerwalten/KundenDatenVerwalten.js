import React, { useEffect, useState } from "react";
import axios from "axios";

import "./KundenDatenVerwalten.css";
import SectionWrapper from "../../Compunent/SectionWrapper/SectionWrapper";

export default function KundenDatenVerwalten() {

  /* Suchen */

  const [filterValue, setFilterValue] = useState('');
  const [users, setUsers] = useState([]);
  
  const handleInputChange = (event) => {
    setFilterValue(event.target.value.toLowerCase());
  };

  const filteredUsers = users.filter((user) =>
  (user.id && user.id.toString().toLowerCase().includes(filterValue)) ||
  (user.firstname && user.firstname.toString().toLowerCase().includes(filterValue)) ||
  (user.lastname && user.lastname.toString().toLowerCase().includes(filterValue)) ||
  (user.email && user.email.toString().toLowerCase().includes(filterValue)) ||
  (user.tel_number && user.tel_number.toString().toLowerCase().includes(filterValue)) ||
  (user.strasse && user.strasse.toString().toLowerCase().includes(filterValue)) ||
  (user.ZIP_code && user.ZIP_code.toString().toLowerCase().includes(filterValue))
);

  /* Get all Users */

  useEffect(() => {
    fetchUsers();
  }, []);

  const fetchUsers = async () => {
    try {
      const response = await axios.get("/api/get/all/users");
      setUsers(response.data.user);
    } catch (err) {
      console.error(err);
    }
  };

  /* Delete User */

  const deleteUser = async (id) => {
    try {
      await axios.delete("/api/delete/user/" + id);
      fetchUsers();
    } catch (error) {
      console.error(error.response?.data?.message || "An error occurred while deleting the user");
    }
  };

  return (
    <>
      <form>
        <SectionWrapper>
          <input
            className="form-control me-2 d-flex search-form"
            type="search"
            placeholder="Suchen"
            aria-label="Search"
            onChange={handleInputChange}
          />
          <table className="table table-striped">
            <thead>
              <tr>
                <th scope="col">ID</th>
                <th scope="col">Bild</th>
                <th scope="col">Vorname</th>
                <th scope="col">Nachname</th>
                <th scope="col">E-Mail</th>
                <th scope="col">Telefonnummer</th>
                <th scope="col">Straße</th>
                <th scope="col">PLZ</th>
                <th scope="col">Benutzer löschen</th>
              </tr>
            </thead>
            <tbody>
              {filteredUsers.map((user) => (
                <tr key={user.id}>
                  <th scope="row">{user.id}</th>
                  <td style={{ paddingLeft: "50px" }}>
                    <img
                      src={`/storage/user/image/${user.photo}`}
                      alt={`Bild von ${user.firstname} ${user.lastname}`}
                      className="produkt-verwalten-image"
                    />
                  </td>
                  <td>{user.firstname}</td>
                  <td>{user.lastname}</td>
                  <td>{user.email}</td>
                  <td>{user.tel_number}</td>
                  <td>{user.strasse}</td>
                  <td>{user.ZIP_code}</td>
                  <td>
                    <button className="delete-button" onClick={() => deleteUser(user.id)}>
                      Löschen
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </SectionWrapper>
      </form>
    </>
  );
}
