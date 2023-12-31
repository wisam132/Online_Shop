import React, { useEffect, useState } from "react";
import SectionWrapper from "../../Compunent/SectionWrapper/SectionWrapper";
import axios from "axios";
import { Link } from "react-router-dom";
import "./ProdukteVerwalten.css";

export default function ProdukteVerwalten() {
  const [products, setProducts] = useState([]);
  const [filterValue, setFilterValue] = useState('');

  const handleInputChange = (event) => {
    setFilterValue(event.target.value.toLowerCase());
  };

  useEffect(() => {
    fetchProduct();
  }, []);

  const fetchProduct = async () => {
    try {
      const response = await axios.get("/api/get/all/products");
      setProducts(response.data.products);
    } catch (err) {
      console.error(err);
    }
  };

  const deleteProduct = (id) => {
    axios.delete(`/api/delete/product/${id}`)
      .then(({ data }) => {
        console.log(data.message);
        fetchProduct();
      })
      .catch(({ response: { data } }) => {
        console.log(data.message);
      });
  };

  const filteredProducts = products.filter((product) =>
  (product.product_name && product.product_name.toLowerCase().includes(filterValue)) ||
  (product.id && product.id.toString().toLowerCase().includes(filterValue)) ||
  (product.size1 && product.size1.toString().toLowerCase().includes(filterValue)) ||
  (product.size2 && product.size2.toString().toLowerCase().includes(filterValue)) ||
  (product.size3 && product.size3.toString().toLowerCase().includes(filterValue)) ||
  (product.size4 && product.size4.toString().toLowerCase().includes(filterValue)) ||
  (product.size5 && product.size5.toString().toLowerCase().includes(filterValue)) ||
  (product.size6 && product.size6.toString().toLowerCase().includes(filterValue)) ||
  (product.size7 && product.size7.toString().toLowerCase().includes(filterValue)) ||
  (product.product_description && product.product_description.toString().toLowerCase().includes(filterValue)) ||
  (product.product_price && product.product_price.toString().toLowerCase().includes(filterValue))
);



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
                <th scope="col">Name</th>
                <th scope="col">Größe</th>
                <th scope="col">Beschreibung</th>
                <th scope="col">Preis</th>
                <th scope="col">Aktualisieren</th>
                <th scope="col">Löschen</th>
              </tr>
            </thead>
            <tbody>
              {filteredProducts.map((product) => (
                <tr key={product.id}>
                  <th scope="row">{product.id}</th>
                  <td className="product-image-cell">
                    <img
                      src={`/storage/product/image/${product.product_photo_primary}`}
                      alt=""
                      className="produkt-verwalten-image"
                    />
                  </td>
                  <td>{product.product_name}</td>
                  <td>
                    <div>
                      {product.size1 ? `${product.size1}, ` : ""}
                      {product.size2 ? `${product.size2}, ` : ""}
                      {product.size3 ? `${product.size3}, ` : ""}
                      {product.size4 ? `${product.size4}, ` : ""}
                      {product.size5 ? `${product.size5}, ` : ""}
                      {product.size6 ? `${product.size6}, ` : ""}
                      {product.size7 ? `${product.size7}, ` : ""}
                    </div>
                  </td>
                  <td>
                    <div className="beschreibung-TD">
                      {product.product_description}
                    </div>
                  </td>
                  <td>{product.product_price}</td>
                  <td>
                    <Link to={`/admin/dashboard/Kunden_Produkte_Update/${product.id}`}>
                      <button className="update-button">Aktualisieren</button>
                    </Link>
                  </td>
                  <td>
                    <button className="delete-button" onClick={() => deleteProduct(product.id)}>Löschen</button>
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
