import React, { useEffect, useState } from "react";
import "./Warenkorb.css";
import { ShoppingCardCard } from "../../Compunent/index";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const api = axios.create({
  baseURL: "/api",
});

export default function Warenkorb(props) {
  const navigate = useNavigate();
  const [products, setProducts] = useState([]);

  const fetchProducts = async () => {
    try {
      const response = await api.get("/order/show");
      setProducts(
        response.data.item.map((product) => ({ ...product, counter: 0 }))
      );
      console.log(response.data.item);
     props.anzahl = ("Anzahl =>"+response.data.item.length)

    } catch (error) {
      console.log("Fehler", error);
    }
  };
  const calculateTotalPrice = () => {
    const total = products.reduce(
      (sum, product) => sum + product.total_price * product.quantity,
      0
    );
    return total.toFixed(2);
  };

  useEffect(() => {
    fetchProducts();
  }, []);

  useEffect(() => {
    console.log("Products in state:", products);
    console.log("Preis  " + calculateTotalPrice());
  }, [products]);

  /* Delete */

  

  const deleteProduct = async (id) => {
    try {
      const response = await axios.delete(`/api/shop-card/delete/` + id);

      console.log(response.data.message);
      fetchProducts();
    } catch (error) {
      console.error(error.response.data.message);
    }
  };

  /**Bestellen */
  const handleBestellung = async () => {
    try {
      const response = await api.post(`/order/delete`);
      console.log(response.data.message);
      navigate("/shop/home");
    } catch (error) {
      if (error.response.status === 422) {
        console.log(error.response.data.errors);
      } else {
        console.log(error.response.data.message);
      }
    }
  };

  const handleFormSubmit = (e) => {
    e.preventDefault();
  };

  return (
    <>
      <form onSubmit={handleFormSubmit}>
        <div className="shopping-card-wrapper">
          <h3 className="shopping-card-titel">Warenkorb</h3>

          {products === null ? (
            <p>Loading...</p>
          ) : products.length > 0 ? (
            <>
              {products.map(
                (row, index) =>
                  row.quantity > 0 && (
                    <React.Fragment key={row.product_name}>
                      <ShoppingCardCard
                        bild={`/storage/product/image/${row.product_photo_primary}`}
                        titel={row.product_name}
                        color={row.Size}
                        value={row.quantity}
                        price={(row.total_price * row.quantity).toFixed(2)}
                        delete={() => deleteProduct(row.id)}
                      />
                      <div className="w-100 my-3 border-top border-secondary"></div>
                    </React.Fragment>
                  )
              )}
              <p className="shopping-card-summe">
                Summe: {calculateTotalPrice()}€
              </p>
            </>
          ) : (
            <p>Der Warenkorb ist leer.</p>
          )}
        </div>

        <button
          type="submit"
          className="shopping-card-zer"
          onClick={handleBestellung}
        >
          Bestellen
        </button>
      </form>
    </>
  );
}
