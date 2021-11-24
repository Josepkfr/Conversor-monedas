import "./App.css";
import Dinero from "dinero.js";
import Rates from "./data/rates";
import "./App.css";
import { useEffect, useState } from "react";

Dinero.globalExchangeRatesApi = {
  currency: "EUR",
  endpoint: Rates,
};

const CurrencySelector = ({ rates, title, onChange }) => {
  return (
    <div>
      <p>{title}</p>
      <select onChange={onChange}>
        {rates.map((rate, index) => (
          <option key={index}>{rate} </option>
        ))}
      </select>
    </div>
  );
};

function App() {
  const [rates, setRates] = useState([]);
  const [originCurrency, setoriginCurrency] = useState("");
  const [targetCurrency, settargetCurrency] = useState("");
  const [originalAmount, setoriginalAmount] = useState([]);
  const [finalAmount, setfinalAmount] = useState();

  useEffect(() => {
    let data;
    Rates.then((value) => {
      data = value;
      let ratesArray = Object.keys(data.rates);
      setRates(ratesArray);
    });
  }, []);

  const convert = async () => {
    let amount = Dinero({
      amount: parseInt(originalAmount) * 100,
      currency: originCurrency,
    });
    let result = await amount.convert(targetCurrency);
    setfinalAmount(result.toFormat());
  };

  return (
    <div id="root">
      <div className="container">
        <div className="card">
          <h1>conversion entre monedas</h1>
          <div className="flex-container">
            <CurrencySelector
              onChange={(e) => setoriginCurrency(e.target.value)}
              title={`Origen: ${originCurrency}`}
              rates={rates}
            />
            <CurrencySelector
              onChange={(e) => settargetCurrency(e.target.value)}
              title={`Destino: ${targetCurrency}`}
              rates={rates}
            />
          </div>
          <input
            onChange={(e) => setoriginalAmount(e.target.value)}
            type="number"
            className="form-control"
            placeholder="cantidad en centavos"
          />
          {finalAmount && <p>El resultado es: {finalAmount}</p>}
          {targetCurrency && originCurrency && (
            <button onClick={convert} className="app-button">
              Convertir
            </button>
          )}
        </div>
      </div>
    </div>
  );
}

export default App;
