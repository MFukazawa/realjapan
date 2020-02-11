import React, { useState } from "react";
import styled from "styled-components";
// import City from "./City";
import Area from "./Area";

// CSS Styles
const Wrapper = styled.div`
  padding: 0 10%;
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

// End styles

//

function Search() {
  const [state, setState] = useState({
    fromYear: "--",
    toYear: "--",
    fromQuarter: "",
    toQuarter: "",
    area: "--Please choose an option--"
  });

  function handleChange(event) {
    const value = event.target.value;
    setState({
      ...state,
      [event.target.name]: value
    });
  }

  return (
    <Wrapper>
      <SearchItem>
        <SearchLabel htmlFor="FromYear">From Year</SearchLabel>
        <SearchSelect
          name="fromYear"
          id="FromYear"
          value={state.fromYear}
          onChange={handleChange}
        >
          <option value="--">--</option>
          <option value="2014">2014</option>
          <option value="2015">2015</option>
          <option value="2016">2016</option>
          <option value="2017">2017</option>
          <option value="2018">2018</option>
          <option value="2019">2019</option>
        </SearchSelect>
      </SearchItem>

      <SearchItem>
        <SearchLabel>To Year</SearchLabel>
        <SearchSelect 
          name="toYear" 
          id="ToYear"
          value={state.toYear}
          onChange={handleChange}
        >
          <option value="--">--</option>
          <option value="2014">2014</option>
          <option value="2015">2015</option>
          <option value="2016">2016</option>
          <option value="2017">2017</option>
          <option value="2018">2018</option>
          <option value="2019">2019</option>
        </SearchSelect>
      </SearchItem>

      <SearchItem>
        <SearchLabel>From Quarter</SearchLabel>
        <SearchSelect 
          name="fromQuarter" 
          id="FromQuarter"
          value={state.fromQuarter}
          onChange={handleChange}
        >
          <option value="--">--</option>
          <option value="1">1</option>
          <option value="2">2</option>
          <option value="3">3</option>
          <option value="4">4</option>
        </SearchSelect>
      </SearchItem>

      <SearchItem>
        <SearchLabel>To Quarter</SearchLabel>
        <SearchSelect 
          name="toQuarter" 
          id="ToQuarter"
          value={state.toQuarter}
          onChange={handleChange}
        >
          <option value="--">--</option>
          <option value="1">1</option>
          <option value="2">2</option>
          <option value="3">3</option>
          <option value="4">4</option>
        </SearchSelect>
      </SearchItem>

      <SearchItem>
        <SearchLabel>Area</SearchLabel>
        <Area />
      </SearchItem>

      {/* <SearchItem>
        <SearchLabel>City</SearchLabel>
        <City />
      </SearchItem>

      <SearchItem>
        <SearchLabel>Station</SearchLabel>
        <SearchSelect></SearchSelect>
      </SearchItem> */}

      <button>Submit</button>
    </Wrapper>
  );
}

export default Search;
