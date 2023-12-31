import React, { useEffect, useState, useRef } from 'react';
import './Search.css';
import { Link } from 'react-router-dom';
import axios from 'axios';
import $ from "jquery"

export default function Search(props) {
  const [products, setProducts] = useState([]);
  const [name, setName] = useState([]);
  const [input, setInput] = useState('');
  const inputRef = useRef(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get('/api/get/all/products/unique');
        setProducts(response.data.uniqueProductNames);
        const newName = response.data.uniqueProductNames.map((product) => product);
        setName(newName);
        console.log(newName);
      } catch (err) {
        console.error(err);
      }
    };
  
    fetchData();
  }, []);
  

  useEffect(() => {
    if (name.length > 0 && inputRef.current) {
      const availableTags = name;
      $(inputRef.current).autocomplete({
        source: availableTags,
        select: function (event, ui) {
          setInput(ui.item.value);
          event.preventDefault();
        },
      });
    }
  }, [name]);

  const handleInputChange = (e) => {
    setInput(e.target.value);
  };

  const handleSearch = () => {
    console.log(`Searching for: ${input}`);
  };

  return (
    <>
      {props.children}

      <form className="d-flex search-form">
        <input
          ref={inputRef}
          className="form-control me-2"
          type="search"
          placeholder="Suchen"
          aria-label="Search"
          value={input}
          onChange={handleInputChange}
        />
        <Link to={`/shop/kategorie/view/suche/${encodeURIComponent(input)}`} className="search-button" onClick={handleSearch}>
          Suchen
        </Link>
      </form>
    </>
  );
}
