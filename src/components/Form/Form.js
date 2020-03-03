import React, { useState, useContext } from "react";
import styled from "styled-components";
import { useFetch } from "./hooks";
import axios from "axios";
import { searchResults } from "../../containers/App";
import Spinner from "./Spinner";

const Form = () => {
  const [state, setState] = useState({
    fromYear: "2014",
    toYear: "2014",
    fromQuarter: "1",
    toQuarter: "1",
    code: "45",
    city: "",
    unitPrice: ""
  });

  function handleChange(event) {
    const value = event.target.value;
    setState({
      ...state,
      [event.target.name]: value
    });
  }

  const { setData } = useContext(searchResults);

  const [loadingData, setLoadingData] = useState(false);

  const [prefData, loading] = useFetch("../prefectures.json");

  const [cityData, cityLoading] = useFetch(
    `https://www.land.mlit.go.jp/webland_english/api/CitySearch?area=${state.code}`
  );

  const fetchData = async e => {
    var fromYear = document.getElementById("FromYear").value;
    var toYear = document.getElementById("ToYear").value;
    var fromQuarter = document.getElementById("FromQuarter").value;
    var toQuarter = document.getElementById("ToQuarter").value;

    // Year & Quarter validation
    if (fromYear > toYear) {
      document.getElementById("invalidYear").style.display = "inline-block";
      return false;
    }

    if (fromQuarter > toQuarter) {
      document.getElementById("invalidQuarter").style.display = "inline-block";
      return false;
    }

    e.preventDefault();
    setLoadingData(true);
    try {
      const response = await axios.get(
        `https://www.land.mlit.go.jp/webland_english/api/TradeListSearch?from=${state.fromYear}${state.fromQuarter}&to=${state.toYear}${state.toQuarter}&area=${state.code}&city=${state.city}`
      );
      setData(response.data.data);
      displayHeaders();
      scrollResults();
      setLoadingData(false);
    } catch (error) {
      console.log(error);
    }
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
      <Invalid id="invalidYear">Not a valid selection</Invalid>
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
      <Invalid id="invalidQuarter">Not a valid selection</Invalid>
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
            <option value={""}>All</option>
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
          <span className="button-text">Search</span>
          {loadingData && (
            <span>
              <Spinner />
            </span>
          )}
        </button>
      </div>
    </Wrapper>
  );
};

const Wrapper = styled.form`
  padding: 0 10%;
  background-color: rgba(255, 255, 255, 0.47);
  border-radius: 10px;
  width: 350px;
  margin: 0 auto;
  position: relative;
`;

const SearchLabel = styled.label`
  font-size: 1.2em;
`;

const SearchItem = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 1em 0;
`;

const SearchSelect = styled.select`
  font-size: 1.2em;
  text-align-last: center;
  text-align: center;
  -ms-text-align-last: center;
  -moz-text-align-last: center;
`;

const Invalid = styled.div`
  color: white;
  background-color: rgba(233, 26, 26, 0.88);
  width: 170px;
  height: 50px;
  line-height: 50px;
  border-radius: 0.4em;
  position: absolute;
  right: -100px;
  display: none;

  &::after {
    content: "";
    position: absolute;
    left: 0;
    top: 50%;
    width: 0;
    height: 0;
    border: 8px solid transparent;
    border-right-color: rgba(233, 26, 26, 0.88);
    border-left: 0;
    margin-top: -7px;
    margin-left: -8px;
  }
`;

// End CSS

export default Form;
