import React, { useState, useEffect } from "react";
import axios from "axios";
import { SeitenSectios, SeiteCard, Search } from "../../Compunent/index";

export default function AddKategorieCard(props) {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchProducts().finally(() => {
      setLoading(false);
    });
  }, []);

  const fetchProducts = async () => {
    try {
      const response = await axios.get(props.url);
      setProducts(response.data);
    } catch (error) {
      console.error("Error fetching products:", error);
    }
  };

  return (
    <>
      <Search />

      <SeitenSectios>
        <div className="container py-5">
          <div className="row text-center py-3"></div>

          {loading ? (
            <p>Loading...</p>
          ) : (
            <div className="row">
              {products.length > 0 &&
                products.map((row, key) => (
                  <SeiteCard
                    image={`/storage/product/image/${row.product_photo_primary}`}
                    titel={row.product_marke}
                    price={row.product_price}
                    id={row.id}
                    key={key}
                  />
                ))}
            </div>
          )}
        </div>
      </SeitenSectios>
    </>
  );
}
