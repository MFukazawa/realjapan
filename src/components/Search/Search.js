import React from 'react';
import styled from 'styled-components';

const Search = () => {
  return (
    <div>
        <label>From Year</label><input type="number" min="2014" max="2019"></input>
        <label>To Year</label><input type="number" min="2014" max="2019"></input>
        <label>From Quarter</label><input type="number" min="1" max="4"></input>
        <label>To Quarter</label><input type="number" min="1" max="4"></input>
        <label>Area</label><input></input>
    </div> 
  );
}

export default Search;