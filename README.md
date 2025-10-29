call npm ci || call npm install
call npm run build
mkdir "C:\ProgramData\Jenkins\.jenkins\userContent\freestyle\"
xcopy /E /I /Y "C:\ProgramData\Jenkins\.jenkins\workspace\freestyle\dist\*" "C:\ProgramData\Jenkins\.jenkins\userContent\freestyle\"



FROM node:18-alpine AS build
WORKDIR /app
COPY package*.json ./
RUN npm install
COPY . .
RUN npm run build

FROM nginx:alpine
COPY nginx.conf /etc/nginx/conf.d/default.conf
COPY --from=build /app/build /usr/share/nginx/html
EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]

















import { useEffect, useState } from "react";

function App() {
  const [amount, setAmount] = useState(1);
  const [from, setFrom] = useState("USD");
  const [to, setTo] = useState("INR");
  const [result, setResult] = useState("");
  const [rates, setRates] = useState({});

  useEffect(() => {
    fetch("https://api.exchangerate-api.com/v4/latest/USD")
      .then((res) => res.json())
      .then((data) => setRates(data.rates));
  }, []);

  const convert = () => {
    if (rates[from] && rates[to]) {
      const converted = (amount * (rates[to] / rates[from])).toFixed(2);
      setResult(`${converted} ${to}`);
    }
  };

  return (
    <div>
      <h2>React Currency Converter</h2>
      <input
        type="number"
        value={amount}
        onChange={(e) => setAmount(e.target.value)}
      />
      <select value={from} onChange={(e) => setFrom(e.target.value)}>
        {Object.keys(rates).map((r) => (
          <option key={r}>{r}</option>
        ))}
      </select>
      <select value={to} onChange={(e) => setTo(e.target.value)}>
        {Object.keys(rates).map((r) => (
          <option key={r}>{r}</option>
        ))}
      </select>
      <button onClick={convert}>Convert</button>
      <p>{result}</p>
    </div>
  );
}

export default App;

























import { useState } from "react";

function App() {
  const [query, setQuery] = useState("");
  const [recipes, setRecipes] = useState([]);

  const searchRecipes = () => {
    fetch(`https://www.themealdb.com/api/json/v1/1/search.php?s=${query}`)
      .then((res) => res.json())
      .then((data) => setRecipes(data.meals || []));
  };

  return (
    <div>
      <h2>React Recipe Finder</h2>
      <input
        type="text"
        value={query}
        onChange={(e) => setQuery(e.target.value)}
        placeholder="Enter recipe"
      />
      <button onClick={searchRecipes}>Search</button>

      {recipes.map((r) => (
        <div key={r.idMeal}>
          <p>{r.strMeal}</p>
        </div>
      ))}
    </div>
  );
}

export default App;

