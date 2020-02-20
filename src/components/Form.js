import React, { useState, useContext } from "react";
import styled from "styled-components";
import { useFetch } from "../components/Search/hooks";
import axios from "axios";
import { searchResults } from "../App";

const Wrapper = styled.form`
  padding: 0 10%;
  background-color: rgba(255, 255, 255, 0.47);
  border-radius: 10px;
  width: 300px;
  margin: 0 auto;
`;

const SearchLabel = styled.label`
  font-size: 1em;
`;

const SearchItem = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 1em 0;
`;

const SearchSelect = styled.select`
  text-align-last: center;
  text-align: center;
  -ms-text-align-last: center;
  -moz-text-align-last: center;
`;

// End CSS

const Form = () => {
  const [state, setState] = useState({
    fromYear: "2014",
    toYear: "2014",
    fromQuarter: "1",
    toQuarter: "1",
    code: "45",
    city: ""
  });

  function handleChange(event) {
    const value = event.target.value;
    setState({
      ...state,
      [event.target.name]: value
    });
  }

  const { setData } = useContext(searchResults);

  const [prefData, loading] = useFetch("../prefectures.json");

  const [cityData, cityLoading] = useFetch(
    `https://www.land.mlit.go.jp/webland_english/api/CitySearch?area=${state.code}`
  );

  const fetchData = async e => {
    console.log("req");
    e.preventDefault();
    const response = await axios.get(
      `https://www.land.mlit.go.jp/webland_english/api/TradeListSearch?from=${state.fromYear}${state.fromQuarter}&to=${state.toYear}${state.toQuarter}&area=${state.code}&city=${state.city}`
    );
    setData(response.data.data);
    displayHeaders();
    scrollResults();
  };

  const displayHeaders = () => {
    var headers = document.getElementById("app-contents");
    if (headers.style.display === "none") {
      headers.style.display = "block";
    } else {
      headers.style.display = "block";
    }
  };

  const scrollResults = () => {
    var scroller = document.getElementById("app-wrapper");

    scroller.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <Wrapper>
      {/* From Year */}
      <SearchItem>
        <SearchLabel htmlFor="FromYear">From Year</SearchLabel>
        <SearchSelect
          name="fromYear"
          id="FromYear"
          value={state.fromYear}
          onChange={handleChange}
          required
        >
          <option value="2014">2014</option>
          <option value="2015">2015</option>
          <option value="2016">2016</option>
          <option value="2017">2017</option>
          <option value="2018">2018</option>
          <option value="2019">2019</option>
        </SearchSelect>
      </SearchItem>
      {/* To Year */}
      <SearchItem>
        <SearchLabel>To Year</SearchLabel>
        <SearchSelect
          name="toYear"
          id="ToYear"
          value={state.toYear}
          onChange={handleChange}
          required
        >
          <option value="2014">2014</option>
          <option value="2015">2015</option>
          <option value="2016">2016</option>
          <option value="2017">2017</option>
          <option value="2018">2018</option>
          <option value="2019">2019</option>
        </SearchSelect>
      </SearchItem>
      {/* From Quarter */}
      <SearchItem>
        <SearchLabel>From Quarter</SearchLabel>
        <SearchSelect
          name="fromQuarter"
          id="FromQuarter"
          value={state.fromQuarter}
          onChange={handleChange}
        >
          <option value="1">1</option>
          <option value="2">2</option>
          <option value="3">3</option>
          <option value="4">4</option>
        </SearchSelect>
      </SearchItem>
      {/* To Quarter */}
      <SearchItem>
        <SearchLabel>To Quarter</SearchLabel>
        <SearchSelect
          name="toQuarter"
          id="ToQuarter"
          value={state.toQuarter}
          onChange={handleChange}
        >
          <option value="1">1</option>
          <option value="2">2</option>
          <option value="3">3</option>
          <option value="4">4</option>
        </SearchSelect>
      </SearchItem>
      {/* Prefecture */}
      <SearchItem>
        <SearchLabel>Prefecture</SearchLabel>
        {loading ? (
          "Loading..."
        ) : (
          <SearchSelect
            name="code"
            id="Code"
            value={state.code}
            onChange={handleChange}
          >
            {prefData.data.map(({ code, name }) => (
              <option key={code} value={code}>
                {name}
              </option>
            ))}
          </SearchSelect>
        )}
      </SearchItem>
      {/* Municipality */}
      <SearchItem>
        <SearchLabel>Municipality</SearchLabel>
        {cityLoading ? (
          "Loading..."
        ) : (
          <SearchSelect
            name="city"
            id="City"
            value={state.city}
            onChange={handleChange}
          >
            {cityData.data.map(({ id, name }) => (
              <option key={id} value={id}>
                {name}
              </option>
            ))}
          </SearchSelect>
        )}
      </SearchItem>
      <div className="button-container">
        <button className="fetch-button" onClick={fetchData}>
          Search
        </button>
      </div>
    </Wrapper>
  );
};

export default Form;
