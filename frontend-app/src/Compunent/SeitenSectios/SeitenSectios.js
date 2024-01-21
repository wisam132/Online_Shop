import React from "react";
import "./SeitenSectios.css";

const SeitenSectios = (props) => {
  return (
    <>
      <section className="Sections">{props.children}</section>
    </>
  );
};

export default SeitenSectios;
