import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { ViewsSection } from '../../../Compunent/index';
import 'bootstrap/dist/css/bootstrap.min.css';
import { useParams } from 'react-router-dom';
import { useNavigate } from "react-router-dom";

import './View.css';

export default function View() {
  const { id } = useParams();
  const navigate = useNavigate();

  const [user_id, setUser_id] = useState();

  const [product_name, setProduct_name] = useState('');
  const [product_description, setProduct_description] = useState('');
  const [product_price, setProduct_price] = useState('');
  const [product_photo_primary, setProduct_photo_primary] = useState('');
  const [product_photo_secondary_1, setProduct_photo_secondary_1] = useState(null);
  const [product_photo_secondary_2, setProduct_photo_secondary_2] = useState(null);
  const [product_photo_secondary_3, setProduct_photo_secondary_3] = useState(null);
  const [size1, setSize1] = useState(null);
  const [size2, setSize2] = useState(null);
  const [size3, setSize3] = useState(null);
  const [size4, setSize4] = useState(null);
  const [size5, setSize5] = useState(null);
  const [size6, setSize6] = useState(null);
  const [size7, setSize7] = useState(null);

  const [quantity, setQuantity] = useState(0);
  const [selectedSize, setSelectedSize] = useState("");
  const [error, setError] = useState("");

  useEffect(() => {
    fetchProduct();
    fetchUser();
  }, []);

  async function fetchUser() {
    try {
      const { data } = await axios.get('/api/auth/user');
      setUser_id(data);
    } catch (error) {
      console.error('Error fetching user:', error.message);
    }
  }

  async function fetchProduct() {
    try {
      const response = await axios.get(`/api/product/${id}`);
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
      } = response.data.product;

      setProduct_name(product_name);
      setProduct_description(product_description);
      setProduct_price(product_price);
      setProduct_photo_primary(product_photo_primary);

      setProduct_photo_secondary_1(product_photo_secondary_1);
      setProduct_photo_secondary_2(product_photo_secondary_2);
      setProduct_photo_secondary_3(product_photo_secondary_3);

      setSize1(size1);
      setSize2(size2);
      setSize3(size3);
      setSize4(size4);
      setSize5(size5);
      setSize6(size6);
      setSize7(size7);
    } catch (error) {
      console.error('Error fetching product:', error.message);
    }
  }

  function counterUp() {
    setQuantity(quantity + 1);
  }

  function counterDown() {
    setQuantity(quantity - 1);
  }

  function handleSizeChange(e) {
    const selectedValue = e.target.value;
    setSelectedSize(selectedValue);
    console.log("Selected Size: " + selectedValue);
  }

  const handleSubmit = async (e) => {
    e.preventDefault();
  
    const formData = new FormData();
    formData.append("user_id", user_id.id);
    formData.append("product_price", product_price);
    formData.append("product_id", id);
    formData.append("quantity", quantity);
    formData.append("Size", selectedSize);
  
    try {
      if (selectedSize <= 0) {
        setError("Bitte geben Sie die Größe und die Menge ein!");
      } else if (quantity === 'Größe') {
        setError("Bitte geben Sie die Menge ein!");
      } else {
        const { data } = await axios.post("/api/order/add", formData);
        console.log(data.message);
        navigate("/shop/home");
      }
    } catch (error) {
      if (error.response && error.response.status === 422) {
        console.log(error.response.data.errors);
      } else {
        console.log(error.response.data.message);
      }
    }
  };
  
  

  return (
    <>
      <ViewsSection
        p_Primary_Photo={`/storage/product/image/${product_photo_primary}`}
        p_Secondary_Photo1={product_photo_secondary_1 ? `/storage/product/image/secondary1/${product_photo_secondary_1}` : 'https://shorturl.at/jz189'}
        p_Secondary_Photo2={product_photo_secondary_2 ? `/storage/product/image/secondary2/${product_photo_secondary_2}` : 'https://shorturl.at/jz189'}
        p_Secondary_Photo3={product_photo_secondary_3 ? `/storage/product/image/secondary3/${product_photo_secondary_3}` : 'https://shorturl.at/jz189'}
        p_Name={product_name}
        p_Desc={product_description}
        p_Price={product_price}
        p_size1={size1}
        p_size2={size2}
        p_size3={size3}
        p_size4={size4}
        p_size5={size5}
        p_size6={size6}
        p_size7={size7}
        counterUp={counterUp}
        counterDown={counterDown}
        counter={quantity}
        selectedSize={selectedSize}
        handleSubmit={handleSubmit}
        handleSizeChange = {handleSizeChange}
        error = {error}
      />
    </>
  );
}
