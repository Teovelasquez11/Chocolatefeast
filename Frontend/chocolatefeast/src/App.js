import React, { useState } from "react";
import "./styles/chocofeast.css";

function App() {
  const [money, changeMoney] = useState(0);
  const [price, changePrice] = useState(0);
  const [wrapper, changeWrapper] = useState(0);
  const [totalChocolates, changeChoc] = useState(0);

  const url = "http://localhost:3001/calculate";
  const change = async (evt) => {
    evt.preventDefault();
    const req = { money: money, price: price, wrapper: wrapper };
    const response = await fetch(url, {
      method: "post",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(req),
    });
    const responseJSON = await response.json();
    console.log(responseJSON.totalChocolates);
    changeChoc(responseJSON.totalChocolates);
  };

  return (
    <div>
      <h1 className="titulo">Chocolate Feast App</h1>
      <form
        onSubmit={(evt) => {
          change(evt);
        }}
      >
        <div className="valores">
          <label className="texto">Money:</label>
          <input
            type="text"
            name={money}
            onChange={(evt) => changeMoney(evt.target.value)}
          />
        </div>
        <div className="valores">
          <label className="texto">Price:</label>
          <input
            type="text"
            name={price}
            onChange={(evt) => changePrice(evt.target.value)}
          />
        </div>
        <div className="valores">
          <label className="texto">Wrapper:</label>
          <input
            type="text"
            name={wrapper}
            onChange={(evt) => changeWrapper(evt.target.value)}
          />
        </div>
        <button className="boton" type="submit">
          Submit
        </button>
      </form>
      <br />
      <div className="resultado">{totalChocolates}</div>
    </div>
  );
}

export default App;
