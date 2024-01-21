import React, { useState, useEffect } from "react";
import { HomeCard } from "../../Compunent/index";
import OwlCarousel from "react-owl-carousel";
import "owl.carousel/dist/assets/owl.carousel.min.css";
import "owl.carousel/dist/assets/owl.theme.default.min.css";
import { Link } from "react-router-dom";
import { Search } from "../../Compunent/index";
import { useNavigate } from "react-router-dom";

import "./Home.css";
import axios from "axios";

export default function Home() {
  const navigation = useNavigate;
  const [Kleidung, setKleidung] = useState(null);
  const [Moebel, setMoebel] = useState(null);
  const [Gerarte, setGerarte] = useState(null);

  useEffect(() => {
    fetchKleidung();
    fetchMoebel();
    fetchGerarte();
  }, []);

  const fetchKleidung = async () => {
    try {
      const response = await axios.get("/api/home/clothes");
      setKleidung(response.data);
    } catch (error) {
      console.error("Error fetching Kleidung:", error);
    }
  };

  const fetchMoebel = async () => {
    try {
      const response = await axios.get("/api/home/furniture");
      setMoebel(response.data);
    } catch (error) {
      console.error("Error fetching Moebel:", error);
    }
  };

  const fetchGerarte = async () => {
    try {
      const response = await axios.get("/api/home/devices");
      setGerarte(response.data);
    } catch (error) {
      console.error("Error fetching Gerarte:", error);
    }
  };

  const renderOwlCarousel = (data, title) => {
    return (
      <>
        <div className="section-heading">
          <h2>{title}</h2>
        </div>
        <div className="owl-carousel-container">
          {data === null ? (
            <p>Loading...</p>
          ) : data.length > 0 ? (
            <OwlCarousel
              className="owl-theme"
              items={3}
              autoplay
              dots
              loop
              dotData
              margin={10}
              videoHeight={true}
            >
              {data.map((row, key) => (
                <Link
                  to={`/shop/kategorie/view/${row.id}`}
                  key={key}
                  className="LinkProducts"
                >
                  <HomeCard
                    KategorieBild={`/storage/product/image/${row.product_photo_primary}`}
                    KategorieName={row.product_marke}
                    KategoriePreis={row.product_price}
                  />
                </Link>
              ))}
            </OwlCarousel>
          ) : (
            <p>Keine {title.toLowerCase()} Vorhanden.</p>
          )}
        </div>
      </>
    );
  };

  return (
    <>
      <Search />
      {renderOwlCarousel(Kleidung, "Kleidung")}
      {renderOwlCarousel(Moebel, "Möbel")}
      {renderOwlCarousel(Gerarte, "Geräte")}
    </>
  );
}
