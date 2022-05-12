import { useState, useEffect } from "react";

import DisplayData from "./DisplayData";

const YEARS = [2013, 2014, 2015, 2016, 2017, 2018, 2019];

const Search = () => {
  const [year, setYear] = useState("latest");
  const [results, setResults] = useState([]);

  useEffect(() => {
    getPopulation();
  }, []);

  async function getPopulation() {
    const url = `https://datausa.io/api/data?drilldowns=Nation&measures=Population&year=${year}`;
    const res = await fetch(url);
    const json = await res.json();

    setResults(json.data[0]);
    setYear("");
  }

  return (
    <div>
      <form
        className="search-form"
        onSubmit={(e) => {
          e.preventDefault();
          getPopulation();
        }}
      >
        <label htmlFor="year">
          Year:{" "}
          <select
            id="year"
            value={year}
            onChange={(e) => setYear(e.target.value)}
          >
            <option />
            {YEARS.map((curYear, i) => (
              <option key={i} value={curYear}>
                {curYear}
              </option>
            ))}
          </select>
        </label>
        <button className="total-population">Get Population</button>
      </form>
      <DisplayData results={results} />
    </div>
  );
};
export default Search;
