import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";

export default function ProdukteUpdate() {
  const [product_name, setProduct_name] = useState("");
  const [product_description, setProduct_description] = useState("");
  const [product_price, setProduct_price] = useState("");
  const [product_photo_primary, setProduct_photo_primary] = useState(false);
  const [product_photo_secondary_1, setProduct_photo_secondary_1] = useState(false);
  const [product_photo_secondary_2, setProduct_photo_secondary_2] = useState(false);
  const [product_photo_secondary_3, setProduct_photo_secondary_3] = useState(false);
  const [size1, setSize1] = useState(null);
  const [size2, setSize2] = useState(null);
  const [size3, setSize3] = useState(null);
  const [size4, setSize4] = useState(null);
  const [size5, setSize5] = useState(null);
  const [size6, setSize6] = useState(null);
  const [size7, setSize7] = useState(null);

  const { id } = useParams();

  const fetchProduct = async () => {
    try {
      const { data } = await axios.get(`/api/get/view/products/${id}`);
      const {
        product_name,
        product_description,
        product_price,
        product_photo_primary,
        product_photo_secondary_1,
        product_photo_secondary_2,
        product_photo_secondary_3,
        size1,
        size2,
        size3,
        size4,
        size5,
        size6,
        size7,
      } = data.products;
      setProduct_name(product_name);
      setProduct_description(product_description);
      setProduct_price(product_price);
      setSize1(size1);
      setSize2(size2);
      setSize3(size3);
      setSize4(size4);
      setSize5(size5);
      setSize6(size6);
      setSize7(size7);
      setProduct_photo_primary(product_photo_primary);
      setProduct_photo_secondary_1(product_photo_secondary_1);
      setProduct_photo_secondary_2(product_photo_secondary_2);
      setProduct_photo_secondary_3(product_photo_secondary_3);
    } catch (error) {
      console.error("Fehler beim Abrufen des Produkts:", error);
    }
  };

  useEffect(() => {
    fetchProduct();
  }, []);

  const handlePrimaryImageChange = (e) => {
    setProduct_photo_primary(e.target.files[0]);
  };

  const handleSecImageChange1 = (e) => {
    setProduct_photo_secondary_1(e.target.files[0]);
  };

  const handleSecImageChange2 = (e) => {
    setProduct_photo_secondary_2(e.target.files[0]);
  };

  const handleSecImageChange3 = (e) => {
    setProduct_photo_secondary_3(e.target.files[0]);
  };

const updateProduct = async (e) => {
  e.preventDefault();
  const formData = new FormData();

  formData.append("product_name", product_name);
  formData.append("product_description", product_description);
  formData.append("product_price", product_price);
  if(size1 !== null){
  formData.append("size1", size1);
  }

  if(size2 !== null){

  formData.append("size2", size2);
  }

  if(size3 !== null){

  formData.append("size3", size3);

  }

  if(size4 !== null){

  formData.append("size4", size4);
  }

  if(size5 !== null){
  formData.append("size5", size5);
}

if(size6 !== null){

  formData.append("size6", size6);

}

if(size7 !== null){

  formData.append("size7", size7);
}

if(product_photo_primary !== null){
   formData.append("product_photo_primary", product_photo_primary);
}


  if(product_photo_secondary_1 !== null){
  formData.append("product_photo_secondary_1", product_photo_secondary_1);
}
if(product_photo_secondary_2 !== null){

  formData.append("product_photo_secondary_2", product_photo_secondary_2);
}

if(product_photo_secondary_3 !== null){

  formData.append("product_photo_secondary_3", product_photo_secondary_3);
}


  try {
    await axios.post(`/api/admin/update/${id}`, formData, {
    
    });
    console.log("Formular erfolgreich geändert");
    fetchProduct();
  }catch (error) {
    console.error("Error:", error);
    if (error.response) {
      console.error("Response Data:", error.response.data);
    }
  }
  
};


  return (
    <>
      <form className="Produkte-update-form" onSubmit={updateProduct}>
        <div className="form-group">
          <label for="formGroupExampleInput">Name</label>
          <input
            type="text"
            className="form-control"
            id="formGroupExampleInput"
            placeholder="Produkt Name Eingeben"
            value={product_name}
            onChange={(e) => setProduct_name(e.target.value)}
          />
        </div>
        <div className="form-group">
          <label for="formGroupExampleInput2">Preis</label>
          <input
            type="text"
            className="form-control"
            id="formGroupExampleInput2"
            placeholder="Preis"
            value={product_price + "€"}
            onChange={(e) => setProduct_price(e.target.value)}
          />
        </div>

        <div className="form-group">
          <label for="formGroupExampleInput2">Größe 1</label>
          <input
            type="text"
            className="form-control"
            id="formGroupExampleInput2"
            placeholder="Größe 1"
            value={size1 ? size1 : ""}
            onChange={(e) => setSize1(e.target.value)}
          />
        </div>

        <div className="form-group">
          <label for="formGroupExampleInput2">Größe 2</label>
          <input
            type="text"
            className="form-control"
            id="formGroupExampleInput2"
            placeholder="Größe 2"
            value={size2 ? size2 : ""}
            onChange={(e) => setSize2(e.target.value)}
          />
        </div>

        <div className="form-group">
          <label for="formGroupExampleInput2">Größe 3</label>
          <input
            type="text"
            className="form-control"
            id="formGroupExampleInput2"
            placeholder="Größe 3"
            value={size3 ? size3 : ""}
            onChange={(e) => setSize3(e.target.value)}
          />
        </div>

        <div className="form-group">
          <label for="formGroupExampleInput2">Größe 4</label>
          <input
            type="text"
            className="form-control"
            id="formGroupExampleInput2"
            placeholder="Größe 4"
            value={size4 ? size4 : ""}
            onChange={(e) => setSize4(e.target.value)}
          />
        </div>

        <div className="form-group">
          <label for="formGroupExampleInput2">Größe 5</label>
          <input
            type="text"
            className="form-control"
            id="formGroupExampleInput2"
            placeholder="Größe 5"
            value={size5 ? size5 : ""}
            onChange={(e) => setSize5(e.target.value)}
          />
        </div>

        <div className="form-group">
          <label for="formGroupExampleInput2">Größe 6</label>
          <input
            type="text"
            className="form-control"
            id="formGroupExampleInput2"
            placeholder="Größe 6"
            value={size6 ? size6 : ""}
            onChange={(e) => setSize6(e.target.value)}
          />
        </div>

        <div className="form-group">
          <label for="formGroupExampleInput2">Größe 7</label>
          <input
            type="text"
            className="form-control"
            id="formGroupExampleInput2"
            placeholder="Größe 7"
            value={size7 ? size7 : ""}
            onChange={(e) => setSize7(e.target.value)}
          />
        </div>

        <div className="form-group">
          <label for="exampleFormControlTextarea1">Beschreibung</label>
          <textarea
            className="form-control"
            id="exampleFormControlTextarea1"
            rows="3"
            value={product_description}
            onChange={(e) => setProduct_description(e.target.value)}
          ></textarea>
        </div>

        <div className="foto-with-upload">
          <div className="form-group">
            <label for="exampleFormControlFile1">Primär Foto hochladen</label>
            <input
              type="file"
              className="form-control-file"
              id="exampleFormControlFile1"
              onChange={handlePrimaryImageChange}
            />
          </div>
          <img
            src={`/storage/product/image/${product_photo_primary}`}
            alt={``}
            className="produkt-verwalten-image"
          />
        </div>
        <hr />

        <div className="foto-with-upload">
          <div className="form-group">
            <label for="exampleFormControlFile1">
              Sekundär Foto1 hochladen
            </label>
            <input
              type="file"
              className="form-control-file"
              id="exampleFormControlFile1"
              onChange={handleSecImageChange1}
            />
          </div>
          {product_photo_secondary_1 ? (
            <img
              src={`/storage/product/image/secondary1/${product_photo_secondary_1}`}
              alt={``}
              className="produkt-verwalten-image"
            />
          ) : (
            <p style={{ paddingLeft: "50px" }}>Kein Foto</p>
          )}
        </div>

        <div className="foto-with-upload">
          <div className="form-group">
            <label for="exampleFormControlFile1">
              Sekundär Foto2 hochladen
            </label>
            <input
              type="file"
              className="form-control-file"
              id="exampleFormControlFile1"
              onChange={handleSecImageChange2}
            />
          </div>
          {product_photo_secondary_2 ? (
            <img
              src={`/storage/product/image/secondary2/${product_photo_secondary_2}`}
              alt={``}
              className="produkt-verwalten-image"
            />
          ) : (
            <p style={{ paddingLeft: "50px" }}>Kein Foto</p>
          )}{" "}
        </div>

        <div className="foto-with-upload">
          <div className="form-group">
            <label for="exampleFormControlFile1">
              Sekundär Foto3 hochladen
            </label>
            <input
              type="file"
              className="form-control-file"
              id="exampleFormControlFile1"
              onChange={handleSecImageChange3}
            />
          </div>
          {product_photo_secondary_3 ? (
            <img
              src={`/storage/product/image/secondary3/${product_photo_secondary_3}`}
              alt={``}
              className="produkt-verwalten-image"
            />
          ) : (
            <p style={{ paddingLeft: "50px" }}>Kein Foto</p>
          )}{" "}
        </div>

        <button type="submit" className="update-button">
          Aktualisieren
        </button>
      </form>
    </>
  );
}
