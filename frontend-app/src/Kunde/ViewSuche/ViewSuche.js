import React, { useEffect, useState } from "react";
import { SeiteCard, SeitenSectios } from "../../Compunent/index";
import { useParams } from "react-router-dom";
import axios from "axios";

export default function ViewSuche() {
  const [products, setProducts] = useState([]);
  const { name } = useParams();
  console.log("Input = " + name);

  const fetchProducts = async () => {
    try {
      const response = await axios.get(
        `/api/products/viewByName/${name}/${name}`
      );
      setProducts(response.data.products);
      console.log(response.data);
    } catch (err) {
      console.error(err);
    }
  };

  useEffect(() => {
    fetchProducts();
  }, []);

  return (
    <>
      {products && products.length > 0 ? (
        <SeitenSectios>
          <div className="container py-5">
            <div className="row text-center py-3"></div>

            <div className="row">
              {products.map((row) => (
                <SeiteCard
                  key={row.id}
                  image={`/storage/product/image/${row.product_photo_primary}`}
                  titel={row.product_marke}
                  description={row.product_description}
                  price={row.product_price}
                  id={row.id}
                />
              ))}
            </div>
          </div>
        </SeitenSectios>
      ) : (
        <p>Es wurden keine Produkte für den Suchbegriff {name} gefunden. </p>
      )}
    </>
  );
}
