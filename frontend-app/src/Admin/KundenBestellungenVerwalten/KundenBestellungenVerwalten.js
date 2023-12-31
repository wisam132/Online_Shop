import React, { useEffect, useState } from 'react'
import SectionWrapper from '../../Compunent/SectionWrapper/SectionWrapper'
import axios from "axios"

export default function KundenBestellungenVerwalten ()  {
  const [orders, setOrders] = useState([]); 

  const fetchOrders = async () => {
    try {
      const response = await axios.get("/api/get/users/orders");
      setOrders(response.data.Orders);
      console.log("Nachricht:", orders.message);
      console.log("Bestellungen:", orders.Orders);

      
    } catch (error) {
      console.error("Fehler beim Abrufen der Bestellungen:", error);
    }

  };
  
  useEffect(() => {
    fetchOrders(); 

  }, []);


  const handleDelete = (id) => {
    axios.delete(`/api/delete/users/orders/${id}`)
      .then(({ data }) => {
        console.log(data.message);
        fetchOrders();
      })
      .catch(({ response: { data } }) => {
        console.log(data.message);
      });
  };
  
  const [filterValue, setFilterValue] = useState('');


  const handleInputChange = (event) => {
    setFilterValue(event.target.value.toLowerCase());
  };

  const filteredOrders = orders.filter((order) => {
    const filterValueLowerCase = filterValue.trim().toLowerCase();
    const [firstNameFilter, lastNameFilter] = filterValueLowerCase.split(' ');
  
    return (
      (typeof order.id === 'string' && order.id.toLowerCase().includes(filterValueLowerCase)) ||
      (typeof order.user_id === 'string' && order.user_id.toLowerCase().includes(filterValueLowerCase)) ||
      (typeof order.firstname === 'string' && order.firstname.toLowerCase().includes(firstNameFilter)) ||
      (typeof order.lastname === 'string' && order.lastname.toLowerCase().includes(lastNameFilter)) ||
      (typeof order.strasse === 'string' && order.strasse.toLowerCase().includes(filterValueLowerCase)) ||
      (typeof order.email === 'string' && order.email.toLowerCase().includes(filterValueLowerCase)) ||
      (typeof order.product_id === 'string' && order.product_id.toLowerCase().includes(filterValueLowerCase)) ||
      (typeof order.product_name === 'string' && order.product_name.toLowerCase().includes(filterValueLowerCase)) ||
      (typeof order.Size === 'string' && order.Size.toLowerCase().includes(filterValueLowerCase)) ||
      (typeof order.quantity === 'string' && order.quantity.toLowerCase().includes(filterValueLowerCase)) ||
      (typeof order.gesamt_preis === 'string' && order.gesamt_preis.toLowerCase().includes(filterValueLowerCase))
    );
  });
  



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
                <th scope="col">Bestellung ID</th>
                <th scope="col">Kunden ID</th>
                <th scope="col">Kunden Name</th>
                <th scope="col">Kunden Straße</th>
                <th scope="col">Kunden E-Mail</th>
                <th scope="col">Produkt ID</th>
                <th scope="col">Produkt Name</th>
                <th scope="col">Größe</th>
                <th scope="col">Anzahl</th>
                <th scope="col">Preis</th>
                <th scope="col">Datum</th>
                <th scope="col">Bild</th>
                <th scope="col">Löschen</th>
              </tr>
            </thead>
            <tbody>
            {filteredOrders.map((order) => (
                <tr key={order.id}>
                  <th scope="row">{order.id}</th>
                  <td>{order.user_id}</td>
                  <td>{`${order.firstname} ${order.lastname}`}</td>
                  <td>{order.strasse}</td>
                  <td>{order.email}</td>
                  <td>{order.product_id}</td>
                  <td>{order.product_name}</td>
                  <td>{order.Size}</td>
                  <td>{order.quantity}</td>
                  <td>{order.gesamt_preis}€</td>
                  <td>{order.created_at}</td>
                  <td>
                    <img
                      src={`/storage/product/image/${order.product_photo_primary}`}
                      style={{ width: "100%", height: "200px", objectFit: "cover", objectPosition: "center" }}
                      alt=""
                      className="produkt-verwalten-image"
                    />
                  </td>
                  <td>
                    <button className="delete-button" onClick={() => handleDelete(order.id)}>
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

