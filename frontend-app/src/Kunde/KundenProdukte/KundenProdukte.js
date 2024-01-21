import React, { useEffect, useState } from "react";
import { MeineBestellungenCard } from "../../Compunent/index";
import axios from "axios";
import "./KundenProdukte.css";
import { Link } from "react-router-dom";
export default function KundenProdukte() {
  const [products, setProducts] = useState([]);

  useEffect(() => {
    fetchProducts();
    console.log(products);
  }, []);

  const fetchProducts = async () => {
    try {
      const response = await axios.get("/api/get/myorder");
      setProducts(response.data.message);
      console.log("success", response.data);
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <>
      <div className="kunden-Bestellung-wrapper">
        <h3 className="kunden-Bestellung.titel">Meine Bestellungen</h3>

        {products.map((product) => (
          <Link
            to={`/shop/kategorie/view/${product.id}`}
            style={{ textDecoration: "none", color: "black" }}
          >
            <MeineBestellungenCard
              key={product.id}
              bild={`/storage/product/image/${product.product_photo_primary}`}
              titel={product.product_name}
              size={product.Size}
              value={product.quantity}
              price={product.MulPreis}
            />
          </Link>
        ))}
      </div>
    </>
  );
}
