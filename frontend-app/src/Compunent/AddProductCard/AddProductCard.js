import React from "react";
import "./AddProductCard.css";
import $ from "jquery";
import "jquery-ui-dist/jquery-ui";
import { useEffect, useState } from "react";

import { useNavigate } from "react-router-dom";
import axios from "axios";

export default function AddProductCard(props) {
  const navigate = useNavigate();

  const [product_name, setProduct_name] = useState("");
  const [product_marke, setProduct_marke] = useState("");

  const [product_description, setProduct_description] = useState("");
  const [product_price, setProduct_price] = useState("");
  const [category_id, setCategory_id] = useState(props.catID);
  const [product_photo_primary, setProduct_photo_primary] = useState("");
  const [product_photo_secondary_1, setProduct_photo_secondary_1] =
    useState(null);
  const [product_photo_secondary_2, setProduct_photo_secondary_2] =
    useState(null);
  const [product_photo_secondary_3, setProduct_photo_secondary_3] =
    useState(null);
  const [size1, setSize1] = useState(null);
  const [size2, setSize2] = useState(null);
  const [size3, setSize3] = useState(null);
  const [size4, setSize4] = useState(null);
  const [size5, setSize5] = useState(null);
  const [size6, setSize6] = useState(null);
  const [size7, setSize7] = useState(null);

  function handleNameChange(e) {
    setProduct_name(e.target.value);
  }

  function handleMarkeChange(e) {
    setProduct_marke(e.target.value);
  }

  function handleDescChange(e) {
    setProduct_description(e.target.value);
  }

  function handlePriceChange(e) {
    setProduct_price(e.target.value);
  }

  function handlePrimaryPhotoChange(e) {
    setProduct_photo_primary(e.target.files[0]);
  }

  function handleSecondaryPhotoChange1(e) {
    setProduct_photo_secondary_1(e.target.files[0]);
  }

  function handleSecondaryPhotoChange2(e) {
    setProduct_photo_secondary_2(e.target.files[0]);
  }

  function handleSecondaryPhotoChange3(e) {
    setProduct_photo_secondary_3(e.target.files[0]);
  }

  function handleSizeChange1(e) {
    setSize1(e.target.value);
  }

  function handleSizeChange2(e) {
    setSize2(e.target.value);
  }

  function handleSizeChange3(e) {
    setSize3(e.target.value);
  }

  function handleSizeChange4(e) {
    setSize4(e.target.value);
  }

  function handleSizeChange5(e) {
    setSize5(e.target.value);
  }

  function handleSizeChange6(e) {
    setSize6(e.target.value);
  }

  function handleSizeChange7(e) {
    setSize7(e.target.value);
  }

  async function handleCangeInput(e) {
    e.preventDefault();
    const formData = new FormData();

    formData.append("product_name", product_name);
    formData.append("product_marke", product_marke);

    formData.append("product_description", product_description);
    formData.append("product_price", product_price);
    formData.append("category_id", category_id);
    formData.append("product_photo_primary", product_photo_primary);

    if (product_photo_secondary_1 !== null) {
      formData.append("product_photo_secondary_1", product_photo_secondary_1);
    }

    if (product_photo_secondary_2 !== null) {
      formData.append("product_photo_secondary_2", product_photo_secondary_2);
    }

    if (product_photo_secondary_3 !== null) {
      formData.append("product_photo_secondary_3", product_photo_secondary_3);
    }

    if (size1 !== null) {
      formData.append("size1", size1);
    }

    if (size2 !== null) {
      formData.append("size2", size2);
    }

    if (size3 !== null) {
      formData.append("size3", size3);
    }

    if (size4 !== null) {
      formData.append("size4", size4);
    }

    if (size5 !== null) {
      formData.append("size5", size5);
    }

    if (size6 !== null) {
      formData.append("size6", size6);
    }

    if (size7 !== null) {
      formData.append("size7", size7);
    }

    await axios
      .post("/api/product/add", formData)
      .then(({ data }) => {
        console.log(data.message);
        navigate("/admin");
      })
      .catch(({ response }) => {
        if (response.status === 422) {
          console.log(response.data.errors);
        } else {
          console.log(response.data.message);
        }
      });
  }

  useEffect(() => {
    $(function () {
      function runEffect() {
        const options = {};
        $("#effect1").show("blind", options, 500);
      }

      $("#button").on("click", function (e) {
        e.preventDefault();
        runEffect();
      });

      $("#effect1").hide();
    });
  }, []);

  useEffect(() => {
    $(function () {
      function runEffect() {
        const options = {};
        $("#effect2").show("blind", options, 500);
      }

      $("#button2").on("click", function (e) {
        e.preventDefault();
        runEffect();
      });

      $("#effect2").hide();
    });
  }, []);
  return (
    <>
      {props.children}

      <form onSubmit={handleCangeInput}>
        <div className="produkt-erstellen-section">
          <div className="produkt-erstellen-form">
            <div className="form-group produkt-erstellen-daten">
              <label>Produkt Name</label>
              <input
                type="text"
                className="form-control"
                placeholder="Produkt Name"
                onChange={handleNameChange}
              />
            </div>

            <div className="form-group produkt-erstellen-daten">
              <label>Produkt Marke</label>
              <input
                type="text"
                className="form-control"
                placeholder="Produkt Marke"
                onChange={handleMarkeChange}
              />
            </div>

            <div className="form-group produkt-erstellen-daten">
              <label>Produkt Preis</label>
              <input
                type="text"
                className="form-control"
                placeholder="Produkt Preis"
                onChange={handlePriceChange}
              />
            </div>

            <div className="form-group">
              <label>Produkt Beschreibung</label>
              <textarea
                className="form-control"
                rows="3"
                onChange={handleDescChange}
              ></textarea>
            </div>

            <div className="form-group">
              <label>Bild hochladen</label>
              <input
                type="file"
                className="form-control-file"
                onChange={handlePrimaryPhotoChange}
              />
            </div>
          </div>

          <div className="produkt-erstellen-image-upload">
            <button
              id="button"
              className="ui-state-default ui-corner-all produkt-erstellen-button"
            >
              Mehr Bilder hochladen
            </button>

            <div id="effect1">
              <div id="effect1">
                <div className="form-group">
                  <label
                    for="exampleFormControlFile1"
                    className="produkt-erstellen-label"
                  >
                    Bild 1
                  </label>
                  <input
                    type="file"
                    className="form-control-file produkt-erstellen-type-file"
                    id="exampleFormControlFile1"
                    onChange={handleSecondaryPhotoChange1}
                  />
                </div>

                <div className="form-group">
                  <label
                    for="exampleFormControlFile1"
                    className="produkt-erstellen-label"
                  >
                    Bild 2
                  </label>
                  <input
                    type="file"
                    className="form-control-file produkt-erstellen-type-file"
                    id="exampleFormControlFile1"
                    onChange={handleSecondaryPhotoChange2}
                  />
                </div>

                <div className="form-group">
                  <label
                    for="exampleFormControlFile1"
                    className="produkt-erstellen-label"
                  >
                    Bild 3
                  </label>
                  <input
                    type="file"
                    className="form-control-file produkt-erstellen-type-file"
                    id="exampleFormControlFile1"
                    onChange={handleSecondaryPhotoChange3}
                  />
                </div>
              </div>{" "}
            </div>
          </div>

          <div className="produkt-erstellen-size-upload">
            <button
              id="button2"
              className="ui-state-default ui-corner-all bilder-erstellen-button"
            >
              Mehr Größe hochladen
            </button>
            <br />
            <div id="effect2">
              <div className="form-group">
                <label
                  for="formGroupExampleInput"
                  className="produkt-erstellen-size-label"
                >
                  Größe 1
                </label>
                <input
                  type="text"
                  className="form-control prosi"
                  id="formGroupExampleInput"
                  placeholder="Größe 1"
                  onChange={handleSizeChange1}
                />
              </div>
              <div className="form-group">
                <label
                  for="formGroupExampleInput"
                  className="produkt-erstellen-size-label"
                >
                  Größe 2
                </label>
                <input
                  type="text"
                  className="form-control prosi"
                  id="formGroupExampleInput"
                  placeholder="Größe 2"
                  onChange={handleSizeChange2}
                />
              </div>

              <div className="form-group">
                <label
                  for="formGroupExampleInput"
                  className="produkt-erstellen-size-label"
                >
                  Größe 3
                </label>
                <input
                  type="text"
                  className="form-control prosi"
                  id="formGroupExampleInput"
                  placeholder="Größe 3"
                  onChange={handleSizeChange3}
                />
              </div>

              <div className="form-group">
                <label
                  for="formGroupExampleInput"
                  className="produkt-erstellen-size-label"
                >
                  Größe 4
                </label>
                <input
                  type="text"
                  className="form-control prosi"
                  id="formGroupExampleInput"
                  placeholder="Größe 4"
                  onChange={handleSizeChange4}
                />
              </div>

              <div className="form-group">
                <label
                  for="formGroupExampleInput"
                  className="produkt-erstellen-size-label"
                >
                  Größe 5
                </label>
                <input
                  type="text"
                  className="form-control prosi"
                  id="formGroupExampleInput"
                  placeholder="Größe 5"
                  onChange={handleSizeChange5}
                />
              </div>

              <div className="form-group">
                <label
                  for="formGroupExampleInput"
                  className="produkt-erstellen-size-label"
                >
                  Größe 6
                </label>
                <input
                  type="text"
                  className="form-control prosi"
                  id="formGroupExampleInput"
                  placeholder="Größe 6"
                  onChange={handleSizeChange6}
                />
              </div>

              <div className="form-group">
                <label
                  for="formGroupExampleInput"
                  className="produkt-erstellen-size-label"
                >
                  Größe 7
                </label>
                <input
                  type="text"
                  className="form-control prosi"
                  id="formGroupExampleInput"
                  placeholder="Größe 7"
                  onChange={handleSizeChange7}
                />
              </div>
            </div>
          </div>
        </div>

        <button
          type="submit"
          className="btn btn-secondary produkt-erstellen-enter-button"
        >
          Daten Speichern
        </button>
      </form>
    </>
  );
}
